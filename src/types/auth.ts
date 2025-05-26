
export type UserRole = 'admin' | 'manager' | 'department_head' | 'employee';

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
  level: number; // 1=highest (admin), 4=lowest (employee)
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  role: UserRole;
  managerId?: string;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
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
}
