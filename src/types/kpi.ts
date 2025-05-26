
export interface BalanceScoreCardCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface KPIItem {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  description: string;
  weight: number;
  target: string;
  measurement_method: string;
  created_at: Date;
}

export interface KPIBonus {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  kpi_items: KPIItem[];
  total_weight: number;
  status: 'Draft' | 'Pending_Approval' | 'Approved' | 'Rejected';
  workflow_step: 'Self' | 'Checker' | 'Approver';
  submitted_date?: Date;
  approved_date?: Date;
  comments?: string;
  history: KPIBonusHistory[];
  created_at: Date;
  modified_at: Date;
  // New fields for approval workflow
  checker_id?: string;
  checker_feedback?: string;
  checker_approved_date?: Date;
  approver_id?: string;
  approver_feedback?: string;
  rejection_reason?: string;
  rejected_to?: 'employee' | 'checker';
}

export interface KPIBonusHistory {
  id: string;
  action: 'Created' | 'Submitted' | 'Approved' | 'Rejected' | 'Modified' | 'Forwarded';
  actor_name: string;
  actor_role: string;
  comments?: string;
  timestamp: Date;
  target_role?: string; // For tracking where it was sent
}

// Create KPIMerit interface extending similar structure
export interface KPIMerit {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  kpi_achievement_score: number;
  kpi_achievement_weight: number;
  competency_items: any[]; // Import from merit types
  competency_weight: number;
  culture_items: any[]; // Import from merit types
  culture_weight: number;
  total_score: number;
  status: 'Draft' | 'Pending_Approval' | 'Approved' | 'Rejected';
  workflow_step: 'Self' | 'Checker' | 'Approver';
  submitted_date?: Date;
  approved_date?: Date;
  comments?: string;
  history: KPIBonusHistory[]; // Reuse same history interface
  created_at: Date;
  modified_at: Date;
  // Approval workflow fields
  checker_id?: string;
  checker_feedback?: string;
  checker_approved_date?: Date;
  approver_id?: string;
  approver_feedback?: string;
  rejection_reason?: string;
  rejected_to?: 'employee' | 'checker';
}

export const BALANCE_SCORECARD_CATEGORIES: BalanceScoreCardCategory[] = [
  {
    id: '1',
    name: 'Financial Perspective',
    description: 'การเงินและผลตอบแทนทางการเงิน',
    color: 'bg-green-100 text-green-800',
    icon: 'DollarSign'
  },
  {
    id: '2',
    name: 'Customer Perspective',
    description: 'ความพึงพอใจและการบริการลูกค้า',
    color: 'bg-blue-100 text-blue-800',
    icon: 'Users'
  },
  {
    id: '3',
    name: 'Internal Process',
    description: 'กระบวนการภายในและประสิทธิภาพการดำเนินงาน',
    color: 'bg-purple-100 text-purple-800',
    icon: 'Cog'
  },
  {
    id: '4',
    name: 'Learning & Growth',
    description: 'การเรียนรู้และการพัฒนาพนักงาน',
    color: 'bg-orange-100 text-orange-800',
    icon: 'BookOpen'
  }
];
