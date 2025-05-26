
export type NotificationType = 
  | 'appraisal_due'
  | 'appraisal_assigned' 
  | 'feedback_requested'
  | 'appraisal_completed'
  | 'deadline_approaching';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  userId: string;
  relatedId?: string; // appraisal_id, cycle_id, etc.
  relatedType?: string; // 'appraisal', 'cycle', 'feedback'
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
  actionUrl?: string;
  actionLabel?: string;
}

export interface NotificationSettings {
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  appraisalDue: boolean;
  appraisalAssigned: boolean;
  feedbackRequested: boolean;
  appraisalCompleted: boolean;
  deadlineApproaching: boolean;
  reminderDaysBefore: number;
}
