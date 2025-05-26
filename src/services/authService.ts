import { User, Role, Permission, AccessLog, SecuritySettings, UserRole } from '@/types/auth';

export class AuthService {
  private static instance: AuthService;
  private users: User[] = [];
  private roles: Role[] = [];
  private permissions: Permission[] = [];
  private accessLogs: AccessLog[] = [];
  private currentUser: User | null = null;
  private securitySettings: SecuritySettings;

  private constructor() {
    this.initializeDefaultData();
    this.securitySettings = {
      passwordMinLength: 8,
      passwordRequireSpecialChar: true,
      sessionTimeoutMinutes: 480, // 8 hours
      maxLoginAttempts: 5,
      lockoutDurationMinutes: 30,
      enableAuditLog: true,
      enableDataEncryption: true,
      autoBackupEnabled: true,
      backupFrequencyHours: 24
    };
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private initializeDefaultData(): void {
    // Initialize permissions
    this.permissions = [
      { id: '1', name: 'view_all_appraisals', description: 'ดูการประเมินทั้งหมด', resource: 'appraisal', action: 'view_all' },
      { id: '2', name: 'create_appraisal', description: 'สร้างการประเมิน', resource: 'appraisal', action: 'create' },
      { id: '3', name: 'edit_appraisal', description: 'แก้ไขการประเมิน', resource: 'appraisal', action: 'edit' },
      { id: '4', name: 'delete_appraisal', description: 'ลบการประเมิน', resource: 'appraisal', action: 'delete' },
      { id: '5', name: 'view_own_appraisal', description: 'ดูการประเมินของตนเอง', resource: 'appraisal', action: 'view_own' },
      { id: '6', name: 'view_team_appraisals', description: 'ดูการประเมินของทีม', resource: 'appraisal', action: 'view_team' },
      { id: '7', name: 'manage_templates', description: 'จัดการเทมเพลต', resource: 'template', action: 'manage' },
      { id: '8', name: 'manage_cycles', description: 'จัดการรอบการประเมิน', resource: 'cycle', action: 'manage' },
      { id: '9', name: 'view_reports', description: 'ดูรายงาน', resource: 'report', action: 'view' },
      { id: '10', name: 'manage_users', description: 'จัดการผู้ใช้', resource: 'user', action: 'manage' },
      { id: '11', name: 'view_audit_logs', description: 'ดู Audit Log', resource: 'log', action: 'view' },
      { id: '12', name: 'manage_settings', description: 'จัดการการตั้งค่า', resource: 'settings', action: 'manage' }
    ];

    // Initialize roles
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
        name: 'manager',
        description: 'ผู้บริหาร',
        level: 2,
        permissions: this.permissions.filter(p => 
          ['view_all_appraisals', 'view_reports', 'view_audit_logs'].includes(p.name)
        )
      },
      {
        id: '3',
        name: 'department_head',
        description: 'หัวหน้าแผนก',
        level: 3,
        permissions: this.permissions.filter(p => 
          ['view_team_appraisals', 'create_appraisal', 'edit_appraisal', 'view_reports'].includes(p.name)
        )
      },
      {
        id: '4',
        name: 'employee',
        description: 'พนักงาน',
        level: 4,
        permissions: this.permissions.filter(p => 
          ['view_own_appraisal'].includes(p.name)
        )
      }
    ];

    // Initialize sample users - เพิ่ม employee user
    this.users = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@company.com',
        department: 'IT',
        position: 'System Administrator',
        role: 'admin',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Manager User',
        email: 'manager@company.com',
        department: 'Management',
        position: 'General Manager',
        role: 'manager',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Employee User',
        email: 'employee@company.com',
        department: 'Sales',
        position: 'Sales Executive',
        role: 'employee',
        isActive: true,
        createdAt: new Date()
      }
    ];
  }

  // Authentication
  login(email: string, password: string): { success: boolean; user?: User; token?: string; error?: string } {
    const user = this.users.find(u => u.email === email && u.isActive);
    
    if (!user) {
      this.logAccess('unknown', 'login', 'auth', undefined, false, 'User not found');
      return { success: false, error: 'ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
    }

    // In real implementation, verify password hash
    this.currentUser = user;
    user.lastLoginAt = new Date();
    
    this.logAccess(user.id, 'login', 'auth', undefined, true);
    
    return { 
      success: true, 
      user, 
      token: this.generateToken(user.id) 
    };
  }

  logout(): void {
    if (this.currentUser) {
      this.logAccess(this.currentUser.id, 'logout', 'auth', undefined, true);
      this.currentUser = null;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Authorization
  hasPermission(userId: string, permission: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;

    const role = this.roles.find(r => r.name === user.role);
    if (!role) return false;

    return role.permissions.some(p => p.name === permission);
  }

  canAccessResource(userId: string, resource: string, action: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;

    const role = this.roles.find(r => r.name === user.role);
    if (!role) return false;

    return role.permissions.some(p => p.resource === resource && p.action === action);
  }

  canViewAppraisal(userId: string, appraisalEmployeeId: string, department?: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;

    // Admin and Manager can view all
    if (user.role === 'admin' || user.role === 'manager') {
      return true;
    }

    // Department head can view team appraisals
    if (user.role === 'department_head' && department === user.department) {
      return true;
    }

    // Employee can view own appraisal
    if (user.role === 'employee' && userId === appraisalEmployeeId) {
      return true;
    }

    return false;
  }

  // User management
  getUsers(): User[] {
    return this.users;
  }

  createUser(userData: Omit<User, 'id' | 'createdAt' | 'isActive'>): User {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      isActive: true,
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    this.logAccess(this.currentUser?.id || 'system', 'create', 'user', newUser.id, true);
    
    return newUser;
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    this.logAccess(this.currentUser?.id || 'system', 'update', 'user', userId, true);
    
    return this.users[userIndex];
  }

  deactivateUser(userId: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;

    user.isActive = false;
    this.logAccess(this.currentUser?.id || 'system', 'deactivate', 'user', userId, true);
    
    return true;
  }

  // Access logging
  logAccess(userId: string, action: string, resource: string, resourceId?: string, success: boolean = true, errorMessage?: string): void {
    if (!this.securitySettings.enableAuditLog) return;

    const user = this.users.find(u => u.id === userId);
    const accessLog: AccessLog = {
      id: Date.now().toString(),
      userId,
      userName: user?.name || 'Unknown',
      action,
      resource,
      resourceId,
      ipAddress: '127.0.0.1', // In real app, get from request
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      success,
      errorMessage
    };

    this.accessLogs.push(accessLog);
  }

  getAccessLogs(userId?: string, resource?: string, limit: number = 100): AccessLog[] {
    let logs = this.accessLogs;

    if (userId) {
      logs = logs.filter(log => log.userId === userId);
    }

    if (resource) {
      logs = logs.filter(log => log.resource === resource);
    }

    return logs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Security settings
  getSecuritySettings(): SecuritySettings {
    return this.securitySettings;
  }

  updateSecuritySettings(updates: Partial<SecuritySettings>): void {
    this.securitySettings = { ...this.securitySettings, ...updates };
    this.logAccess(this.currentUser?.id || 'system', 'update', 'security_settings', undefined, true);
  }

  // Utility methods
  private generateToken(userId: string): string {
    // In real implementation, use JWT or similar
    return `token_${userId}_${Date.now()}`;
  }

  getRoles(): Role[] {
    return this.roles;
  }

  getPermissions(): Permission[] {
    return this.permissions;
  }
}

export const authService = AuthService.getInstance();
