
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: 'low' | 'medium' | 'high';
  userId: string;
  relatedId?: string;
  relatedType?: 'kpi_bonus' | 'kpi_merit' | 'appraisal' | 'feedback';
  actionUrl?: string;
  actionLabel?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

export type NotificationType = 
  | 'kpi_submitted'
  | 'kpi_approved'
  | 'kpi_rejected'
  | 'kpi_needs_check'
  | 'kpi_needs_approval'
  | 'appraisal_due'
  | 'appraisal_assigned'
  | 'feedback_requested'
  | 'appraisal_completed'
  | 'deadline_approaching';

export interface NotificationSettings {
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  kpiSubmitted: boolean;
  kpiApproved: boolean;
  kpiRejected: boolean;
  kpiNeedsCheck: boolean;
  kpiNeedsApproval: boolean;
  appraisalDue: boolean;
  appraisalAssigned: boolean;
  feedbackRequested: boolean;
  appraisalCompleted: boolean;
  deadlineApproaching: boolean;
  reminderDaysBefore: number;
}
