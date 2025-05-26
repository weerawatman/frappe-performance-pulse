
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
    id: 'executive-1', 
    email: 'executive@company.com',
    name: 'ผู้บริหาร',
    role: 'checker',
    department: 'Management',
    avatar: '/placeholder.svg'
  },
  {
    id: 'executive-2',
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

  getAllUsers: () => users
};
