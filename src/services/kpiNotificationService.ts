
import { notificationService } from '@/services/notificationService';
import { KPIBonus } from '@/types/kpi';
import { KPIMerit } from '@/types/merit';

export class KPINotificationService {
  private static instance: KPINotificationService;

  static getInstance(): KPINotificationService {
    if (!KPINotificationService.instance) {
      KPINotificationService.instance = new KPINotificationService();
    }
    return KPINotificationService.instance;
  }

  // KPI Bonus Notifications
  notifyKPIBonusSubmitted(kpiBonus: KPIBonus): void {
    // Notify checker
    notificationService.createNotification({
      title: 'มี KPI Bonus ใหม่ที่รอตรวจสอบ',
      message: `${kpiBonus.employee_name} (${kpiBonus.department}) ส่ง KPI Bonus เพื่อขอรับการตรวจสอบ`,
      type: 'kpi_needs_check',
      priority: 'medium',
      userId: 'CHECKER001', // In real app, get from workflow assignment
      relatedId: kpiBonus.id,
      relatedType: 'kpi_bonus',
      actionUrl: `/kpi-checker`,
      actionLabel: 'ตรวจสอบ KPI'
    });

    // Notify employee
    notificationService.createNotification({
      title: 'ส่ง KPI Bonus สำเร็จ',
      message: `KPI Bonus ของคุณถูกส่งเพื่อรอการตรวจสอบแล้ว`,
      type: 'kpi_submitted',
      priority: 'low',
      userId: kpiBonus.employee_id,
      relatedId: kpiBonus.id,
      relatedType: 'kpi_bonus',
      actionUrl: `/employee/kpi-bonus`,
      actionLabel: 'ดู KPI ของฉัน'
    });
  }

  notifyKPIBonusChecked(kpiBonus: KPIBonus, checkerFeedback: string): void {
    // Notify approver
    notificationService.createNotification({
      title: 'มี KPI Bonus ใหม่ที่รอการอนุมัติ',
      message: `${kpiBonus.employee_name} (${kpiBonus.department}) - KPI Bonus ผ่านการตรวจสอบแล้ว รอการอนุมัติ`,
      type: 'kpi_needs_approval',
      priority: 'medium',
      userId: 'APPROVER001', // In real app, get from workflow assignment
      relatedId: kpiBonus.id,
      relatedType: 'kpi_bonus',
      actionUrl: `/kpi-approver`,
      actionLabel: 'อนุมัติ KPI'
    });

    // Notify employee
    notificationService.createNotification({
      title: 'KPI Bonus ผ่านการตรวจสอบ',
      message: `KPI Bonus ของคุณผ่านการตรวจสอบแล้ว กำลังรอการอนุมัติ${checkerFeedback ? ` - ข้อเสนอแนะ: ${checkerFeedback}` : ''}`,
      type: 'kpi_submitted',
      priority: 'low',
      userId: kpiBonus.employee_id,
      relatedId: kpiBonus.id,
      relatedType: 'kpi_bonus',
      actionUrl: `/employee/kpi-bonus`,
      actionLabel: 'ดู KPI ของฉัน'
    });
  }

  notifyKPIBonusApproved(kpiBonus: KPIBonus): void {
    // Notify employee
    notificationService.createNotification({
      title: 'KPI Bonus ได้รับการอนุมัติแล้ว',
      message: `ยินดีด้วย! KPI Bonus ของคุณได้รับการอนุมัติแล้ว`,
      type: 'kpi_approved',
      priority: 'high',
      userId: kpiBonus.employee_id,
      relatedId: kpiBonus.id,
      relatedType: 'kpi_bonus',
      actionUrl: `/employee/results`,
      actionLabel: 'ดูผลการอนุมัติ'
    });

    // Notify manager
    notificationService.createNotification({
      title: 'KPI Bonus ของทีมได้รับการอนุมัติ',
      message: `KPI Bonus ของ ${kpiBonus.employee_name} ได้รับการอนุมัติแล้ว`,
      type: 'kpi_approved',
      priority: 'low',
      userId: 'MANAGER001', // In real app, get from employee's manager
      relatedId: kpiBonus.id,
      relatedType: 'kpi_bonus',
      actionUrl: `/performance`,
      actionLabel: 'ดูผลงานทีม'
    });
  }

  notifyKPIBonusRejected(kpiBonus: KPIBonus, feedback: string): void {
    // Notify employee
    notificationService.createNotification({
      title: 'KPI Bonus ต้องแก้ไข',
      message: `KPI Bonus ของคุณต้องการการแก้ไข - ${feedback}`,
      type: 'kpi_rejected',
      priority: 'high',
      userId: kpiBonus.employee_id,
      relatedId: kpiBonus.id,
      relatedType: 'kpi_bonus',
      actionUrl: `/employee/kpi-bonus`,
      actionLabel: 'แก้ไข KPI'
    });
  }

  // KPI Merit Notifications
  notifyKPIMeritSubmitted(kpiMerit: KPIMerit): void {
    // Notify checker
    notificationService.createNotification({
      title: 'มี KPI Merit ใหม่ที่รอตรวจสอบ',
      message: `${kpiMerit.employee_name} (${kpiMerit.department}) ส่ง KPI Merit เพื่อขอรับการตรวจสอบ`,
      type: 'kpi_needs_check',
      priority: 'medium',
      userId: 'CHECKER001',
      relatedId: kpiMerit.id,
      relatedType: 'kpi_merit',
      actionUrl: `/kpi-checker`,
      actionLabel: 'ตรวจสอบ KPI Merit'
    });

    // Notify employee
    notificationService.createNotification({
      title: 'ส่ง KPI Merit สำเร็จ',
      message: `KPI Merit ของคุณถูกส่งเพื่อรอการตรวจสอบแล้ว`,
      type: 'kpi_submitted',
      priority: 'low',
      userId: kpiMerit.employee_id,
      relatedId: kpiMerit.id,
      relatedType: 'kpi_merit',
      actionUrl: `/employee/kpi-merit`,
      actionLabel: 'ดู KPI Merit ของฉัน'
    });
  }

  // Deadline Notifications
  notifyKPIDeadlineApproaching(userId: string, type: 'bonus' | 'merit', daysLeft: number): void {
    const title = type === 'bonus' ? 'ใกล้ถึงกำหนดส่ง KPI Bonus' : 'ใกล้ถึงกำหนดส่ง KPI Merit';
    const actionUrl = type === 'bonus' ? '/employee/kpi-bonus' : '/employee/kpi-merit';
    
    notificationService.createNotification({
      title,
      message: `เหลือเวลาอีก ${daysLeft} วัน สำหรับการกำหนด ${type === 'bonus' ? 'KPI Bonus' : 'KPI Merit'}`,
      type: 'deadline_approaching',
      priority: daysLeft <= 1 ? 'high' : 'medium',
      userId,
      actionUrl,
      actionLabel: 'ดำเนินการ'
    });
  }

  notifyEvaluationDeadlineApproaching(userId: string, evaluationType: string, daysLeft: number): void {
    notificationService.createNotification({
      title: 'ใกล้ถึงกำหนดการประเมิน',
      message: `เหลือเวลาอีก ${daysLeft} วัน สำหรับการประเมิน${evaluationType}`,
      type: 'deadline_approaching',
      priority: daysLeft <= 1 ? 'high' : 'medium',
      userId,
      actionUrl: '/employee/evaluation',
      actionLabel: 'เข้าสู่การประเมิน'
    });
  }

  // Checker and Approver Notifications
  notifyCheckerPending(checkerIds: string[], pendingCount: number): void {
    checkerIds.forEach(checkerId => {
      notificationService.createNotification({
        title: 'มีงานรอการตรวจสอบ',
        message: `คุณมี KPI รอการตรวจสอบจำนวน ${pendingCount} รายการ`,
        type: 'kpi_needs_check',
        priority: pendingCount > 5 ? 'high' : 'medium',
        userId: checkerId,
        actionUrl: '/kpi-checker',
        actionLabel: 'ตรวจสอบ KPI'
      });
    });
  }

  notifyApproverPending(approverIds: string[], pendingCount: number): void {
    approverIds.forEach(approverId => {
      notificationService.createNotification({
        title: 'มีงานรอการอนุมัติ',
        message: `คุณมี KPI รอการอนุมัติจำนวน ${pendingCount} รายการ`,
        type: 'kpi_needs_approval',
        priority: pendingCount > 5 ? 'high' : 'medium',
        userId: approverId,
        actionUrl: '/kpi-approver',
        actionLabel: 'อนุมัติ KPI'
      });
    });
  }

  // Batch notification for deadlines
  checkAndNotifyDeadlines(): void {
    // This would typically run as a scheduled job
    console.log('Checking for upcoming deadlines...');
    
    // Mock check for KPI deadlines
    const upcomingDeadlines = [
      { userId: 'EMP001', type: 'bonus' as const, daysLeft: 3 },
      { userId: 'EMP002', type: 'merit' as const, daysLeft: 1 },
    ];

    upcomingDeadlines.forEach(deadline => {
      this.notifyKPIDeadlineApproaching(deadline.userId, deadline.type, deadline.daysLeft);
    });

    // Mock check for evaluation deadlines
    const evaluationDeadlines = [
      { userId: 'EMP003', type: 'กลางปี', daysLeft: 2 },
      { userId: 'EMP004', type: 'ปลายปี', daysLeft: 5 },
    ];

    evaluationDeadlines.forEach(deadline => {
      this.notifyEvaluationDeadlineApproaching(deadline.userId, deadline.type, deadline.daysLeft);
    });
  }
}

export const kpiNotificationService = KPINotificationService.getInstance();
