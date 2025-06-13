
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireManager?: boolean;
  requireManagerOrAdmin?: boolean;
  requireEmployee?: boolean;
  requireChecker?: boolean;
  requireApprover?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  requireManager = false,
  requireManagerOrAdmin = false,
  requireEmployee = false,
  requireChecker = false,
  requireApprover = false
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
    if (user?.role === 'checker' || user?.role === 'approver') {
      return <Navigate to="/" replace />;
    } else if (user?.role === 'employee') {
      return <Navigate to="/employee-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Check for checker-only access
  if (requireChecker && user?.role !== 'checker') {
    if (user?.role === 'admin') {
      return <Navigate to="/" replace />;
    } else if (user?.role === 'employee') {
      return <Navigate to="/employee-dashboard" replace />;
    } else if (user?.role === 'approver') {
      return <Navigate to="/approver-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Check for approver-only access
  if (requireApprover && user?.role !== 'approver') {
    if (user?.role === 'admin') {
      return <Navigate to="/" replace />;
    } else if (user?.role === 'employee') {
      return <Navigate to="/employee-dashboard" replace />;
    } else if (user?.role === 'checker') {
      return <Navigate to="/checker-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Check for manager-only access (using checker/approver roles)
  if (requireManager && user?.role !== 'checker' && user?.role !== 'approver') {
    if (user?.role === 'admin') {
      return <Navigate to="/" replace />;
    } else if (user?.role === 'employee') {
      return <Navigate to="/employee-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Check for employee-only access (strict employee only)
  if (requireEmployee && user?.role !== 'employee') {
    if (user?.role === 'admin' || user?.role === 'checker' || user?.role === 'approver') {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/employee-dashboard" replace />;
  }

  // Check for manager or admin access (using checker/approver or admin roles)
  if (requireManagerOrAdmin && user?.role !== 'checker' && user?.role !== 'approver' && user?.role !== 'admin') {
    return <Navigate to="/employee-dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
