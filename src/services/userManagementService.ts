
import { User, Role, Permission, AccessLog, SecuritySettings, UserRole, TemporaryAssignment, OrganizationStructure } from '@/types/auth';

export class UserManagementService {
  private static instance: UserManagementService;
  private users: User[] = [];
  private roles: Role[] = [];
  private permissions: Permission[] = [];
  private accessLogs: AccessLog[] = [];
  private temporaryAssignments: TemporaryAssignment[] = [];
  private organizationStructure: OrganizationStructure[] = [];
  private currentUser: User | null = null;
  private securitySettings: SecuritySettings;

  private constructor() {
    this.initializeDefaultData();
    this.securitySettings = {
      passwordMinLength: 8,
      passwordRequireSpecialChar: true,
      sessionTimeoutMinutes: 480,
      maxLoginAttempts: 5,
      lockoutDurationMinutes: 30,
      enableAuditLog: true,
      enableDataEncryption: true,
      autoBackupEnabled: true,
      backupFrequencyHours: 24,
      requireApprovalForCriticalChanges: true,
      enableRoleBasedNotifications: true
    };
  }

  static getInstance(): UserManagementService {
    if (!UserManagementService.instance) {
      UserManagementService.instance = new UserManagementService();
    }
    return UserManagementService.instance;
  }

  private initializeDefaultData(): void {
    // Initialize comprehensive permissions
    this.permissions = [
      // Employee permissions
      { id: '1', name: 'view_own_kpi', description: 'ดู KPI ของตนเอง', resource: 'kpi', action: 'view_own' },
      { id: '2', name: 'edit_own_kpi', description: 'แก้ไข KPI ของตนเอง', resource: 'kpi', action: 'edit_own' },
      { id: '3', name: 'view_own_evaluation', description: 'ดูการประเมินของตนเอง', resource: 'evaluation', action: 'view_own' },
      { id: '4', name: 'edit_own_evaluation', description: 'แก้ไขการประเมินของตนเอง', resource: 'evaluation', action: 'edit_own' },
      { id: '5', name: 'view_own_feedback', description: 'ดู Feedback ของตนเอง', resource: 'feedback', action: 'view_own' },
      { id: '6', name: 'view_own_history', description: 'ดูประวัติการประเมินของตนเอง', resource: 'history', action: 'view_own' },

      // Checker permissions
      { id: '7', name: 'view_subordinate_kpi', description: 'ดู KPI ของผู้ใต้บังคับบัญชา', resource: 'kpi', action: 'view_subordinate' },
      { id: '8', name: 'edit_subordinate_kpi', description: 'แก้ไข KPI ของผู้ใต้บังคับบัญชา', resource: 'kpi', action: 'edit_subordinate' },
      { id: '9', name: 'check_evaluation', description: 'ตรวจสอบการประเมิน', resource: 'evaluation', action: 'check' },
      { id: '10', name: 'provide_feedback', description: 'ให้ Feedback', resource: 'feedback', action: 'provide' },
      { id: '11', name: 'view_subordinate_history', description: 'ดูประวัติของผู้ใต้บังคับบัญชา', resource: 'history', action: 'view_subordinate' },

      // Approver permissions
      { id: '12', name: 'approve_kpi', description: 'อนุมัติ KPI', resource: 'kpi', action: 'approve' },
      { id: '13', name: 'approve_evaluation', description: 'อนุมัติการประเมิน', resource: 'evaluation', action: 'approve' },
      { id: '14', name: 'view_team_reports', description: 'ดูรายงานของทีม', resource: 'reports', action: 'view_team' },

      // Executive permissions
      { id: '15', name: 'view_all_reports', description: 'ดูรายงานทั้งหมด', resource: 'reports', action: 'view_all' },
      { id: '16', name: 'view_analytics', description: 'ดูการวิเคราะห์', resource: 'analytics', action: 'view' },
      { id: '17', name: 'view_comparisons', description: 'ดูการเปรียบเทียบ', resource: 'comparisons', action: 'view' },

      // Admin permissions
      { id: '18', name: 'manage_users', description: 'จัดการผู้ใช้', resource: 'users', action: 'manage' },
      { id: '19', name: 'manage_roles', description: 'จัดการบทบาท', resource: 'roles', action: 'manage' },
      { id: '20', name: 'manage_organization', description: 'จัดการโครงสร้างองค์กร', resource: 'organization', action: 'manage' },
      { id: '21', name: 'manage_cycles', description: 'จัดการรอบการประเมิน', resource: 'cycles', action: 'manage' },
      { id: '22', name: 'manage_templates', description: 'จัดการเทมเพลต', resource: 'templates', action: 'manage' },
      { id: '23', name: 'manage_settings', description: 'จัดการการตั้งค่า', resource: 'settings', action: 'manage' },
      { id: '24', name: 'view_audit_logs', description: 'ดู Audit Log', resource: 'logs', action: 'view' }
    ];

    // Initialize roles with appropriate permissions
    this.roles = [
      {
        id: '1',
        name: 'admin',
        description: 'ผู้ดูแลระบบ',
        level: 1,
        permissions: this.permissions // Admin has all permissions
      },
      {
        id: '2',
        name: 'executive',
        description: 'ผู้บริหาร',
        level: 2,
        permissions: this.permissions.filter(p => 
          ['view_all_reports', 'view_analytics', 'view_comparisons', 'view_audit_logs'].includes(p.name)
        )
      },
      {
        id: '3',
        name: 'approver',
        description: 'ผู้อนุมัติ',
        level: 3,
        permissions: this.permissions.filter(p => 
          ['view_subordinate_kpi', 'edit_subordinate_kpi', 'approve_kpi', 'approve_evaluation', 
           'provide_feedback', 'view_subordinate_history', 'view_team_reports'].includes(p.name)
        )
      },
      {
        id: '4',
        name: 'checker',
        description: 'ผู้ตรวจสอบ',
        level: 4,
        permissions: this.permissions.filter(p => 
          ['view_subordinate_kpi', 'edit_subordinate_kpi', 'check_evaluation', 
           'provide_feedback', 'view_subordinate_history'].includes(p.name)
        )
      },
      {
        id: '5',
        name: 'employee',
        description: 'พนักงาน',
        level: 5,
        permissions: this.permissions.filter(p => 
          ['view_own_kpi', 'edit_own_kpi', 'view_own_evaluation', 'edit_own_evaluation', 
           'view_own_feedback', 'view_own_history'].includes(p.name)
        )
      }
    ];

    // Initialize sample users with hierarchy
    this.users = [
      {
        id: 'ADM001',
        name: 'System Administrator',
        email: 'admin@company.com',
        department: 'IT',
        position: 'System Administrator',
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        subordinates: []
      },
      {
        id: 'EXE001',
        name: 'Chief Executive Officer',
        email: 'ceo@company.com',
        department: 'Executive',
        position: 'CEO',
        role: 'executive',
        isActive: true,
        createdAt: new Date(),
        subordinates: ['APP001', 'APP002']
      },
      {
        id: 'APP001',
        name: 'Sales Director',
        email: 'sales.director@company.com',
        department: 'Sales',
        position: 'Director',
        role: 'approver',
        managerId: 'EXE001',
        isActive: true,
        createdAt: new Date(),
        subordinates: ['CHK001', 'CHK002']
      },
      {
        id: 'CHK001',
        name: 'Sales Manager',
        email: 'sales.manager@company.com',
        department: 'Sales',
        position: 'Manager',
        role: 'checker',
        managerId: 'APP001',
        approverId: 'APP001',
        isActive: true,
        createdAt: new Date(),
        subordinates: ['EMP001', 'EMP002']
      },
      {
        id: 'EMP001',
        name: 'Sales Representative',
        email: 'employee@company.com',
        department: 'Sales',
        position: 'Sales Executive',
        role: 'employee',
        managerId: 'CHK001',
        checkerId: 'CHK001',
        approverId: 'APP001',
        isActive: true,
        createdAt: new Date(),
        subordinates: []
      }
    ];
  }

  // User Management
  getUsers(): User[] {
    return this.users;
  }

  getUserById(userId: string): User | null {
    return this.users.find(u => u.id === userId) || null;
  }

  getUsersByRole(role: UserRole): User[] {
    return this.users.filter(u => u.role === role);
  }

  getSubordinates(userId: string): User[] {
    const user = this.getUserById(userId);
    if (!user || !user.subordinates) return [];
    
    return this.users.filter(u => user.subordinates!.includes(u.id));
  }

  getHierarchy(userId: string): { superiors: User[], subordinates: User[] } {
    const user = this.getUserById(userId);
    if (!user) return { superiors: [], subordinates: [] };

    const superiors: User[] = [];
    if (user.managerId) {
      const manager = this.getUserById(user.managerId);
      if (manager) superiors.push(manager);
    }
    if (user.checkerId && user.checkerId !== user.managerId) {
      const checker = this.getUserById(user.checkerId);
      if (checker) superiors.push(checker);
    }
    if (user.approverId && user.approverId !== user.managerId && user.approverId !== user.checkerId) {
      const approver = this.getUserById(user.approverId);
      if (approver) superiors.push(approver);
    }

    const subordinates = this.getSubordinates(userId);

    return { superiors, subordinates };
  }

  // Permission Checking
  hasPermission(userId: string, permission: string): boolean {
    const user = this.getUserById(userId);
    if (!user) return false;

    const role = this.roles.find(r => r.name === user.role);
    if (!role) return false;

    return role.permissions.some(p => p.name === permission);
  }

  canAccessUserData(requesterId: string, targetUserId: string, action: string): boolean {
    const requester = this.getUserById(requesterId);
    const target = this.getUserById(targetUserId);
    
    if (!requester || !target) return false;

    // Admin can access everything
    if (requester.role === 'admin') return true;

    // Executive can view all reports
    if (requester.role === 'executive' && action.includes('view')) return true;

    // Users can access their own data
    if (requesterId === targetUserId) return true;

    // Check hierarchy relationships
    const requesterSubordinates = this.getSubordinates(requesterId);
    const isSubordinate = requesterSubordinates.some(s => s.id === targetUserId);

    if (isSubordinate) {
      const role = this.roles.find(r => r.name === requester.role);
      if (!role) return false;

      const hasSubordinatePermission = role.permissions.some(p => 
        p.action.includes('subordinate') && action.includes(p.resource)
      );

      return hasSubordinatePermission;
    }

    return false;
  }

  // Temporary Assignment Management
  createTemporaryAssignment(assignment: Omit<TemporaryAssignment, 'id' | 'isActive'>): TemporaryAssignment {
    const newAssignment: TemporaryAssignment = {
      ...assignment,
      id: Date.now().toString(),
      isActive: true
    };

    this.temporaryAssignments.push(newAssignment);
    this.logAccess(this.currentUser?.id || 'system', 'create_temp_assignment', 'assignment', newAssignment.id, true);

    return newAssignment;
  }

  getActiveTemporaryAssignments(userId: string): TemporaryAssignment[] {
    const now = new Date();
    return this.temporaryAssignments.filter(ta => 
      ta.assigneeId === userId && 
      ta.isActive && 
      ta.startDate <= now && 
      ta.endDate >= now
    );
  }

  // Access Logging
  logAccess(userId: string, action: string, resource: string, resourceId?: string, success: boolean = true, errorMessage?: string): void {
    if (!this.securitySettings.enableAuditLog) return;

    const user = this.getUserById(userId);
    const accessLog: AccessLog = {
      id: Date.now().toString(),
      userId,
      userName: user?.name || 'Unknown',
      action,
      resource,
      resourceId,
      ipAddress: '127.0.0.1',
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      success,
      errorMessage
    };

    this.accessLogs.push(accessLog);
  }

  getAccessLogs(filters?: {
    userId?: string;
    resource?: string;
    action?: string;
    startDate?: Date;
    endDate?: Date;
  }, limit: number = 100): AccessLog[] {
    let logs = this.accessLogs;

    if (filters) {
      if (filters.userId) {
        logs = logs.filter(log => log.userId === filters.userId);
      }
      if (filters.resource) {
        logs = logs.filter(log => log.resource === filters.resource);
      }
      if (filters.action) {
        logs = logs.filter(log => log.action === filters.action);
      }
      if (filters.startDate) {
        logs = logs.filter(log => log.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        logs = logs.filter(log => log.timestamp <= filters.endDate!);
      }
    }

    return logs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Role and Permission Management
  getRoles(): Role[] {
    return this.roles;
  }

  getPermissions(): Permission[] {
    return this.permissions;
  }

  assignRole(userId: string, role: UserRole): boolean {
    const user = this.getUserById(userId);
    if (!user) return false;

    const oldRole = user.role;
    user.role = role;

    this.logAccess(this.currentUser?.id || 'system', 'assign_role', 'user', userId, true, 
      `Role changed from ${oldRole} to ${role}`);

    return true;
  }

  // Security Settings
  getSecuritySettings(): SecuritySettings {
    return this.securitySettings;
  }

  updateSecuritySettings(updates: Partial<SecuritySettings>): void {
    this.securitySettings = { ...this.securitySettings, ...updates };
    this.logAccess(this.currentUser?.id || 'system', 'update_security_settings', 'settings', undefined, true);
  }
}

export const userManagementService = UserManagementService.getInstance();
