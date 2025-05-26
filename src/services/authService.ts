
import { User } from '@/types/auth';

// Mock users data
const users: User[] = [
  {
    id: 'admin-1',
    email: 'admin@company.com',
    name: 'ผู้ดูแลระบบ',
    role: 'admin',
    department: 'IT',
    avatar: '/placeholder.svg'
  },
  {
    id: 'checker-1', 
    email: 'executive@company.com',
    name: 'ผู้ตรวจสอบ',
    role: 'checker',
    department: 'Management',
    avatar: '/placeholder.svg'
  },
  {
    id: 'approver-1',
    email: 'executive2@company.com', 
    name: 'ผู้อนุมัติ',
    role: 'approver',
    department: 'Management',
    avatar: '/placeholder.svg'
  },
  {
    id: 'employee-1',
    email: 'employee@company.com',
    name: 'สมชาย ใจดี',
    role: 'employee',
    department: 'การขาย',
    avatar: '/placeholder.svg'
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

  getRoles: () => [
    { id: 'admin', name: 'Administrator' },
    { id: 'checker', name: 'Checker' },
    { id: 'approver', name: 'Approver' },
    { id: 'employee', name: 'Employee' }
  ],

  getPermissions: () => [
    { id: 'view_all', name: 'View All Data' },
    { id: 'edit_users', name: 'Edit Users' },
    { id: 'approve_kpi', name: 'Approve KPI' },
    { id: 'check_kpi', name: 'Check KPI' }
  ],

  getAccessLogs: () => [
    { id: '1', user: 'admin@company.com', action: 'Login', timestamp: new Date().toISOString() },
    { id: '2', user: 'employee@company.com', action: 'View KPI', timestamp: new Date().toISOString() }
  ],

  getSecuritySettings: () => ({
    passwordPolicy: 'Strong',
    sessionTimeout: 30,
    twoFactorAuth: false
  }),

  updateSecuritySettings: (settings: any) => {
    console.log('Security settings updated:', settings);
    return { success: true };
  },

  updateUser: (user: User) => {
    console.log('User updated:', user);
    return { success: true };
  },

  createUser: (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: `user-${Date.now()}` };
    console.log('User created:', newUser);
    return { success: true, user: newUser };
  }
};
