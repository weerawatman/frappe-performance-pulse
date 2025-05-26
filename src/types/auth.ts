
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'checker' | 'approver' | 'employee';
  department: string;
  avatar?: string;
  position?: string;
  isActive?: boolean;
  lastLoginAt?: Date;
  managerId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  level: number;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface SecuritySettings {
  passwordPolicy: string;
  sessionTimeout: number;
  twoFactorAuth: boolean;
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

export interface AccessLog {
  id: string;
  user: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: Date;
  success: boolean;
  ipAddress: string;
}

export interface TemporaryAssignment {
  id: string;
  userId: string;
  originalRole: string;
  temporaryRole: string;
  startDate: Date;
  endDate: Date;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}
