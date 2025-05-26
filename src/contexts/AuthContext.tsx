
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'checker' | 'approver' | 'admin';
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users with the specified names
const mockUsers: User[] = [
  {
    id: 'EMP001',
    name: 'สมชาย ใจดี',
    email: 'somchai@company.com',
    role: 'employee',
    department: 'การขาย'
  },
  {
    id: 'CHK001',
    name: 'สมศักดิ์ ดีมาก',
    email: 'somsak@company.com',
    role: 'checker',
    department: 'การขาย'
  },
  {
    id: 'APP001',
    name: 'สมบูรณ์ แอ๊ดวานซ์',
    email: 'somboon@company.com',
    role: 'approver',
    department: 'การขาย'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear all localStorage data when the app starts
    console.log('Clearing all localStorage data for fresh start');
    localStorage.removeItem('kpiStatus');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('overdueTasks');
    
    // Check for existing user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      // Mock authentication
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        return { success: false, error: 'ไม่พบผู้ใช้นี้ในระบบ' };
      }

      // Clear any existing data
      localStorage.removeItem('kpiStatus');
      localStorage.removeItem('overdueTasks');
      
      // Set default KPI status for all users
      const defaultKPIStatus = {
        bonus: 'not_started',
        merit: 'not_started'
      };
      localStorage.setItem('kpiStatus', JSON.stringify(defaultKPIStatus));
      
      // Set overdue tasks for employee
      if (foundUser.role === 'employee') {
        const overdueTasks = [
          { id: 'kpi-bonus', title: 'กำหนด KPI Bonus', type: 'kpi' },
          { id: 'kpi-merit', title: 'กำหนด KPI Merit', type: 'kpi' }
        ];
        localStorage.setItem('overdueTasks', JSON.stringify(overdueTasks));
      }
      
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      
      console.log('User logged in:', foundUser.name);
      console.log('KPI status reset to:', defaultKPIStatus);
      
      return { success: true, user: foundUser };
    } catch (error) {
      return { success: false, error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('kpiStatus');
    localStorage.removeItem('overdueTasks');
    console.log('User logged out, all data cleared');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
