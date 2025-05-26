
export interface EvaluationLevel {
  level: number;
  title: string;
  description: string;
  behavioral_examples: string[];
}

export interface CompetencyItem {
  id: string;
  name: string;
  description: string;
  weight: number;
  self_score: number;
  supervisor_score: number;
  evaluation_levels: EvaluationLevel[];
}

export interface CultureItem {
  id: string;
  name: string;
  description: string;
  weight: number;
  self_score: number;
  supervisor_score: number;
  evaluation_levels: EvaluationLevel[];
}

export interface KPIMerit {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  period: string;
  year: number;
  kpi_achievement_score: number;
  kpi_achievement_weight: number;
  competency_weight: number;
  culture_weight: number;
  competency_items: CompetencyItem[];
  culture_items: CultureItem[];
  total_score?: number;
  status: 'draft' | 'submitted' | 'pending_checker' | 'pending_approver' | 'approved' | 'rejected';
  submitted_at?: Date;
  checked_at?: Date;
  approved_at?: Date;
  checker_feedback?: string;
  approver_feedback?: string;
}
