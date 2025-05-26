
import { Notification, NotificationSettings, NotificationType } from '@/types/notifications';
import { Appraisal, AppraisalCycle } from '@/types/performance';

export class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];
  private settings: Map<string, NotificationSettings> = new Map();

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
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

  // Delete notification
  deleteNotification(notificationId: string): boolean {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      this.notifications.splice(index, 1);
      return true;
    }
    return false;
  }

  // Send notification (email/push)
  private sendNotification(notification: Notification): void {
    const userSettings = this.settings.get(notification.userId);
    if (!userSettings) return;

    console.log(`Sending notification: ${notification.title} to user ${notification.userId}`);
    
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

  // Specific notification creators
  notifyAppraisalDue(appraisal: Appraisal): void {
    this.createNotification({
      title: 'การประเมินผลงานครบกำหนด',
      message: `การประเมินผลงานของคุณครบกำหนดแล้ว กรุณาเข้าไปดำเนินการ`,
      type: 'appraisal_due',
      priority: 'high',
      userId: appraisal.employee_id,
      relatedId: appraisal.id,
      relatedType: 'appraisal',
      actionUrl: `/performance/appraisal/${appraisal.id}`,
      actionLabel: 'ดำเนินการประเมิน'
    });
  }

  notifyAppraisalAssigned(appraisal: Appraisal, assignedToId: string): void {
    this.createNotification({
      title: 'ได้รับมอบหมายให้ประเมินพนักงาน',
      message: `คุณได้รับมอบหมายให้ประเมินผลงานของ ${appraisal.employee_name}`,
      type: 'appraisal_assigned',
      priority: 'medium',
      userId: assignedToId,
      relatedId: appraisal.id,
      relatedType: 'appraisal',
      actionUrl: `/performance/appraisal/${appraisal.id}`,
      actionLabel: 'เข้าสู่การประเมิน'
    });
  }

  notifyFeedbackRequested(appraisal: Appraisal, reviewerId: string): void {
    this.createNotification({
      title: 'ขอให้ประเมินและให้ Feedback',
      message: `กรุณาให้ feedback สำหรับการประเมินของ ${appraisal.employee_name}`,
      type: 'feedback_requested',
      priority: 'medium',
      userId: reviewerId,
      relatedId: appraisal.id,
      relatedType: 'feedback',
      actionUrl: `/performance/feedback/${appraisal.id}`,
      actionLabel: 'ให้ Feedback'
    });
  }

  notifyAppraisalCompleted(appraisal: Appraisal): void {
    this.createNotification({
      title: 'การประเมินเสร็จสิ้นแล้ว',
      message: `การประเมินผลงานของคุณเสร็จสิ้นแล้ว คะแนนรวม: ${appraisal.final_score.toFixed(2)}`,
      type: 'appraisal_completed',
      priority: 'low',
      userId: appraisal.employee_id,
      relatedId: appraisal.id,
      relatedType: 'appraisal',
      actionUrl: `/performance/result/${appraisal.id}`,
      actionLabel: 'ดูผลการประเมิน'
    });
  }

  notifyDeadlineApproaching(appraisal: Appraisal, daysLeft: number): void {
    this.createNotification({
      title: 'ใกล้ถึงกำหนดส่งการประเมิน',
      message: `เหลือเวลาอีก ${daysLeft} วัน สำหรับการประเมินผลงาน`,
      type: 'deadline_approaching',
      priority: 'medium',
      userId: appraisal.employee_id,
      relatedId: appraisal.id,
      relatedType: 'appraisal',
      actionUrl: `/performance/appraisal/${appraisal.id}`,
      actionLabel: 'ดำเนินการประเมิน'
    });
  }

  // Check for upcoming deadlines
  checkAppraisalDeadlines(appraisals: Appraisal[]): void {
    const now = new Date();
    
    appraisals.forEach(appraisal => {
      const userSettings = this.getUserSettings(appraisal.employee_id);
      const daysUntilDeadline = Math.ceil(
        (appraisal.end_date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysUntilDeadline <= userSettings.reminderDaysBefore && 
          daysUntilDeadline > 0 && 
          appraisal.status !== 'Completed') {
        this.notifyDeadlineApproaching(appraisal, daysUntilDeadline);
      }
    });
  }
}

export const notificationService = NotificationService.getInstance();
