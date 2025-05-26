
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/auth';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = authService.login(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        
        // Navigate based on user role
        switch (result.user.role) {
          case 'admin':
            navigate('/');
            break;
          case 'checker':
            navigate('/checker-dashboard');
            break;
          case 'approver':
            navigate('/approver-dashboard');
            break;
          case 'employee':
            navigate('/employee-dashboard');
            break;
          default:
            navigate('/employee-dashboard');
        }
        
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
      }
    } catch (error) {
      return { success: false, error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
