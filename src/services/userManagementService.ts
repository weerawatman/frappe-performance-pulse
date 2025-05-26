
import { User, AccessLog, Role } from '@/types/auth';
import { authService } from './authService';

export const userManagementService = {
  getUsers: (): User[] => {
    return authService.getUsers();
  },

  getRoles: (): Role[] => {
    return authService.getRoles();
  },

  getAccessLogs: (userId?: string, limit?: number): AccessLog[] => {
    return authService.getAccessLogs(userId, limit);
  },

  canAccessUserData: (userId: string, targetUserId: string, action: string): boolean => {
    return authService.canAccessUserData(userId, targetUserId, action);
  }
};
