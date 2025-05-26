
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireManager?: boolean;
  requireManagerOrAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  requireManager = false,
  requireManagerOrAdmin = false
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check for admin-only access
  if (requireAdmin && user?.role !== 'admin') {
    if (user?.role === 'manager') {
      return <Navigate to="/manager-dashboard" replace />;
    }
    return <Navigate to="/employee-dashboard" replace />;
  }

  // Check for manager-only access
  if (requireManager && user?.role !== 'manager') {
    if (user?.role === 'admin') {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/employee-dashboard" replace />;
  }

  // Check for manager or admin access
  if (requireManagerOrAdmin && user?.role !== 'manager' && user?.role !== 'admin') {
    return <Navigate to="/employee-dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
