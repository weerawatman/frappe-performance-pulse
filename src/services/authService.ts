
import { User, SecuritySettings, AccessLog, Role, Permission } from '@/types/auth';

// Mock users data
const users: User[] = [
  {
    id: 'admin-1',
    email: 'admin@company.com',
    name: 'ผู้ดูแลระบบ',
    role: 'admin',
    department: 'IT',
    avatar: '/placeholder.svg',
    position: 'System Administrator',
    isActive: true,
    lastLoginAt: new Date()
  },
  {
    id: 'checker-1', 
    email: 'executive@company.com',
    name: 'ผู้ตรวจสอบ',
    role: 'checker',
    department: 'Management',
    avatar: '/placeholder.svg',
    position: 'Manager',
    isActive: true,
    lastLoginAt: new Date()
  },
  {
    id: 'approver-1',
    email: 'executive2@company.com', 
    name: 'ผู้อนุมัติ',
    role: 'approver',
    department: 'Management',
    avatar: '/placeholder.svg',
    position: 'Director',
    isActive: true,
    lastLoginAt: new Date()
  },
  {
    id: 'employee-1',
    email: 'employee@company.com',
    name: 'สมชาย ใจดี',
    role: 'employee',
    department: 'การขาย',
    avatar: '/placeholder.svg',
    position: 'Sales Representative',
    isActive: true,
    lastLoginAt: new Date()
  }
];

export const authService = {
  login: (email: string, password: string) => {
    const user = users.find(u => u.email === email);
    
    if (user && password === 'password') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  getAllUsers: () => users,

  getUsers: () => users,

  getRoles: (): Role[] => [
    { 
      id: 'admin', 
      name: 'admin', 
      description: 'Administrator', 
      level: 1,
      permissions: [
        { id: 'manage_users', name: 'Manage Users', description: 'Can manage user accounts' },
        { id: 'view_all', name: 'View All Data', description: 'Can view all system data' }
      ]
    },
    { 
      id: 'checker', 
      name: 'checker', 
      description: 'Checker', 
      level: 2,
      permissions: [
        { id: 'check_kpi', name: 'Check KPI', description: 'Can check KPI submissions' }
      ]
    },
    { 
      id: 'approver', 
      name: 'approver', 
      description: 'Approver', 
      level: 3,
      permissions: [
        { id: 'approve_kpi', name: 'Approve KPI', description: 'Can approve KPI submissions' }
      ]
    },
    { 
      id: 'employee', 
      name: 'employee', 
      description: 'Employee', 
      level: 4,
      permissions: [
        { id: 'submit_kpi', name: 'Submit KPI', description: 'Can submit KPI data' }
      ]
    }
  ],

  getPermissions: (): Permission[] => [
    { id: 'view_all', name: 'View All Data', description: 'View all system data' },
    { id: 'edit_users', name: 'Edit Users', description: 'Edit user information' },
    { id: 'approve_kpi', name: 'Approve KPI', description: 'Approve KPI submissions' },
    { id: 'check_kpi', name: 'Check KPI', description: 'Check KPI submissions' }
  ],

  getAccessLogs: (userId?: string, limit?: number): AccessLog[] => [
    { 
      id: '1', 
      user: 'admin@company.com', 
      userName: 'ผู้ดูแลระบบ',
      action: 'Login', 
      resource: 'Authentication',
      timestamp: new Date(), 
      success: true,
      ipAddress: '192.168.1.1'
    },
    { 
      id: '2', 
      user: 'employee@company.com', 
      userName: 'สมชาย ใจดี',
      action: 'View KPI', 
      resource: 'KPI Management',
      timestamp: new Date(), 
      success: true,
      ipAddress: '192.168.1.2'
    }
  ],

  getSecuritySettings: (): SecuritySettings => ({
    passwordPolicy: 'Strong',
    sessionTimeout: 30,
    twoFactorAuth: false,
    passwordMinLength: 8,
    passwordRequireSpecialChar: true,
    sessionTimeoutMinutes: 480,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 15,
    enableAuditLog: true,
    enableDataEncryption: true,
    autoBackupEnabled: true,
    backupFrequencyHours: 24
  }),

  updateSecuritySettings: (settings: SecuritySettings) => {
    console.log('Security settings updated:', settings);
    return { success: true };
  },

  updateUser: (userId: string, userData: Partial<User>) => {
    console.log('User updated:', userId, userData);
    return { success: true };
  },

  createUser: (userData: Omit<User, 'id'>) => {
    const newUser = { ...userData, id: `user-${Date.now()}` };
    console.log('User created:', newUser);
    return { success: true, user: newUser };
  },

  canAccessUserData: (userId: string, targetUserId: string, action: string): boolean => {
    return true; // Simplified for demo
  }
};
