import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userManagementService } from '@/services/userManagementService';

export const usePermissions = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const roles = userManagementService.getRoles();
      const userRole = roles.find(r => r.name === user.role);
      if (userRole) {
        setPermissions(userRole.permissions.map(p => p.name));
      }
    }
  }, [user]);

  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  const canAccessUserData = (targetUserId: string, action: string): boolean => {
    if (!user) return false;
    return userManagementService.canAccessUserData(user.id, targetUserId, action);
  };

  const canViewOwnData = (): boolean => {
    return hasPermission('view_own_kpi') || hasPermission('view_own_evaluation');
  };

  const canEditOwnData = (): boolean => {
    return hasPermission('edit_own_kpi') || hasPermission('edit_own_evaluation');
  };

  const canCheckSubordinates = (): boolean => {
    return hasPermission('check_evaluation') || hasPermission('view_subordinate_kpi');
  };

  const canApprove = (): boolean => {
    return hasPermission('approve_kpi') || hasPermission('approve_evaluation');
  };

  const canViewReports = (): boolean => {
    return hasPermission('view_all_reports') || hasPermission('view_team_reports');
  };

  const canManageUsers = (): boolean => {
    return hasPermission('manage_users');
  };

  const canManageSystem = (): boolean => {
    return hasPermission('manage_settings') || hasPermission('manage_organization');
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const isExecutive = (): boolean => {
    return user?.role === 'checker' || user?.role === 'approver';
  };

  const isApprover = (): boolean => {
    return user?.role === 'approver';
  };

  const isChecker = (): boolean => {
    return user?.role === 'checker';
  };

  const isEmployee = (): boolean => {
    return user?.role === 'employee';
  };

  return {
    permissions,
    hasPermission,
    canAccessUserData,
    canViewOwnData,
    canEditOwnData,
    canCheckSubordinates,
    canApprove,
    canViewReports,
    canManageUsers,
    canManageSystem,
    isAdmin,
    isExecutive,
    isApprover,
    isChecker,
    isEmployee
  };
};
