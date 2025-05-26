
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
}

export interface AccessLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
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
