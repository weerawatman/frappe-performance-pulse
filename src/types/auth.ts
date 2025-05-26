
export type UserRole = 'admin' | 'executive' | 'approver' | 'checker' | 'employee';

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  level: number; // 1=highest (admin), 5=lowest (employee)
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: UserRole;
  checkerId?: string; // Checker assigned to this user
  approverId?: string; // Approver assigned to this user
  managerId?: string; // Direct manager
  subordinates?: string[]; // List of subordinate user IDs
  temporaryAssignments?: TemporaryAssignment[]; // Temporary role assignments
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface TemporaryAssignment {
  id: string;
  assigneeId: string; // Who is assigned the temporary role
  originalUserId: string; // Original user who is temporarily unavailable
  role: 'checker' | 'approver';
  startDate: Date;
  endDate: Date;
  reason: string;
  isActive: boolean;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  targetUserId?: string; // For actions affecting other users
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
  details?: any; // Additional context
}

export interface SecuritySettings {
  passwordMinLength: number;
  passwordRequireSpecialChar: boolean;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;
  enableAuditLog: boolean;
  enableDataEncryption: boolean;
  autoBackupEnabled: boolean;
  backupFrequencyHours: number;
  requireApprovalForCriticalChanges: boolean;
  enableRoleBasedNotifications: boolean;
}

export interface OrganizationStructure {
  id: string;
  name: string;
  parentId?: string;
  type: 'company' | 'division' | 'department' | 'team';
  managerId?: string;
  checkerId?: string;
  approverId?: string;
  members: string[]; // User IDs
}
