
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
}

export interface KPIBonusHistory {
  id: string;
  action: 'Created' | 'Submitted' | 'Approved' | 'Rejected' | 'Modified';
  actor_name: string;
  actor_role: string;
  comments?: string;
  timestamp: Date;
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
