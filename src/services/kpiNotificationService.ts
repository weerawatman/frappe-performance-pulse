
import { Notification, NotificationSettings, NotificationType } from '@/types/notifications';
import { KPIBonus } from '@/types/kpi';

export class KPINotificationService {
  private static instance: KPINotificationService;
  private notifications: Notification[] = [];
  private settings: Map<string, NotificationSettings> = new Map();

  static getInstance(): KPINotificationService {
    if (!KPINotificationService.instance) {
      KPINotificationService.instance = new KPINotificationService();
    }
    return KPINotificationService.instance;
  }

  // Create notification
  createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
      isRead: false
    };
    
    this.notifications.push(newNotification);
    
    // Send email/push notification based on user settings
    this.sendNotification(newNotification);
    
    return newNotification;
  }

  // Get notifications for user
  getNotifications(userId: string, unreadOnly: boolean = false): Notification[] {
    return this.notifications
      .filter(n => n.userId === userId && (!unreadOnly || !n.isRead))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Mark notification as read
  markAsRead(notificationId: string): boolean {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.isRead) {
      notification.isRead = true;
      notification.readAt = new Date();
      return true;
    }
    return false;
  }

  // Mark all notifications as read for user
  markAllAsRead(userId: string): number {
    let count = 0;
    this.notifications
      .filter(n => n.userId === userId && !n.isRead)
      .forEach(n => {
        n.isRead = true;
        n.readAt = new Date();
        count++;
      });
    return count;
  }

  // Send notification (email/push)
  private sendNotification(notification: Notification): void {
    const userSettings = this.settings.get(notification.userId);
    if (!userSettings) return;

    console.log(`Sending KPI notification: ${notification.title} to user ${notification.userId}`);
    
    // Here you would integrate with email service or push notification service
    if (userSettings.emailEnabled) {
      this.sendEmailNotification(notification);
    }
    
    if (userSettings.pushEnabled) {
      this.sendPushNotification(notification);
    }
  }

  private sendEmailNotification(notification: Notification): void {
    // Integration with email service
    console.log(`Email notification sent: ${notification.title}`);
  }

  private sendPushNotification(notification: Notification): void {
    // Integration with push notification service
    console.log(`Push notification sent: ${notification.title}`);
  }

  // Notification settings
  getUserSettings(userId: string): NotificationSettings {
    return this.settings.get(userId) || {
      userId,
      emailEnabled: true,
      pushEnabled: true,
      kpiSubmitted: true,
      kpiApproved: true,
      kpiRejected: true,
      kpiNeedsCheck: true,
      kpiNeedsApproval: true,
      appraisalDue: true,
      appraisalAssigned: true,
      feedbackRequested: true,
      appraisalCompleted: true,
      deadlineApproaching: true,
      reminderDaysBefore: 3
    };
  }

  updateUserSettings(userId: string, settings: Partial<NotificationSettings>): void {
    const currentSettings = this.getUserSettings(userId);
    this.settings.set(userId, { ...currentSettings, ...settings });
  }

  // KPI-specific notification creators
  notifyKPISubmitted(kpi: KPIBonus, checkerIds: string[]): void {
    // Notify employee
    this.createNotification({
      title: 'KPI ถูกส่งเรียบร้อยแล้ว',
      message: `KPI ของคุณได้ถูกส่งเพื่อรอการตรวจสอบแล้ว`,
      type: 'kpi_submitted',
      priority: 'medium',
      userId: kpi.employee_id,
      relatedId: kpi.id,
      relatedType: 'kpi_bonus',
      actionUrl: `/employee/kpi-bonus`,
      actionLabel: 'ดู KPI'
    });

    // Notify checkers
    checkerIds.forEach(checkerId => {
      this.createNotification({
        title: 'มี KPI ใหม่ที่รอการตรวจสอบ',
        message: `${kpi.employee_name} ได้ส่ง KPI เพื่อรอการตรวจสอบ`,
        type: 'kpi_needs_check',
        priority: 'high',
        userId: checkerId,
        relatedId: kpi.id,
        relatedType: 'kpi_bonus',
        actionUrl: `/kpi-checker`,
        actionLabel: 'ตรวจสอบ KPI'
      });
    });
  }

  notifyKPIChecked(kpi: KPIBonus, approverIds: string[], isApproved: boolean): void {
    if (isApproved) {
      // Notify approvers
      approverIds.forEach(approverId => {
        this.createNotification({
          title: 'มี KPI ใหม่ที่รอการอนุมัติ',
          message: `KPI ของ ${kpi.employee_name} ผ่านการตรวจสอบแล้ว รอการอนุมัติ`,
          type: 'kpi_needs_approval',
          priority: 'high',
          userId: approverId,
          relatedId: kpi.id,
          relatedType: 'kpi_bonus',
          actionUrl: `/kpi-approver`,
          actionLabel: 'อนุมัติ KPI'
        });
      });
    } else {
      // Notify employee of rejection
      this.createNotification({
        title: 'KPI ถูกส่งกลับแก้ไข',
        message: `KPI ของคุณถูกส่งกลับจากผู้ตรวจสอบ กรุณาตรวจสอบและแก้ไข`,
        type: 'kpi_rejected',
        priority: 'high',
        userId: kpi.employee_id,
        relatedId: kpi.id,
        relatedType: 'kpi_bonus',
        actionUrl: `/employee/kpi-bonus`,
        actionLabel: 'แก้ไข KPI'
      });
    }
  }

  notifyKPIApproved(kpi: KPIBonus, isApproved: boolean, rejectedTo?: 'checker' | 'employee'): void {
    if (isApproved) {
      // Notify employee of approval
      this.createNotification({
        title: 'KPI ได้รับการอนุมัติแล้ว',
        message: `KPI ของคุณได้รับการอนุมัติเรียบร้อยแล้ว`,
        type: 'kpi_approved',
        priority: 'low',
        userId: kpi.employee_id,
        relatedId: kpi.id,
        relatedType: 'kpi_bonus',
        actionUrl: `/employee/kpi-bonus`,
        actionLabel: 'ดู KPI'
      });
    } else {
      // Notify based on rejection target
      if (rejectedTo === 'employee') {
        this.createNotification({
          title: 'KPI ถูกส่งกลับแก้ไข',
          message: `KPI ของคุณถูกส่งกลับจากผู้อนุมัติ กรุณาตรวจสอบและแก้ไข`,
          type: 'kpi_rejected',
          priority: 'high',
          userId: kpi.employee_id,
          relatedId: kpi.id,
          relatedType: 'kpi_bonus',
          actionUrl: `/employee/kpi-bonus`,
          actionLabel: 'แก้ไข KPI'
        });
      } else if (rejectedTo === 'checker') {
        // Notify checker - would need checker ID in real implementation
        console.log('Notifying checker of rejection');
      }
    }
  }

  // Get notification counts for dashboard
  getNotificationCounts(userId: string): {
    total: number;
    unread: number;
    byType: Record<NotificationType, number>;
  } {
    const userNotifications = this.getNotifications(userId);
    const unreadNotifications = userNotifications.filter(n => !n.isRead);
    
    const byType: Record<NotificationType, number> = {
      kpi_submitted: 0,
      kpi_approved: 0,
      kpi_rejected: 0,
      kpi_needs_check: 0,
      kpi_needs_approval: 0,
      appraisal_due: 0,
      appraisal_assigned: 0,
      feedback_requested: 0,
      appraisal_completed: 0,
      deadline_approaching: 0
    };

    unreadNotifications.forEach(n => {
      byType[n.type]++;
    });

    return {
      total: userNotifications.length,
      unread: unreadNotifications.length,
      byType
    };
  }
}

export const kpiNotificationService = KPINotificationService.getInstance();
