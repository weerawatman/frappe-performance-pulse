
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  manager_id?: string;
  join_date: Date;
  employee_id: string;
}

export interface AppraisalTemplate {
  id: string;
  name: string;
  description?: string;
  goals: AppraisalGoal[];
  rating_criteria: RatingCriteria[];
  is_active: boolean;
  created_by: string;
  created_at: Date;
  modified_at: Date;
}

export interface AppraisalGoal {
  id: string;
  kra: string; // Key Result Area
  description: string;
  weightage: number; // น้ำหนักเปอร์เซ็นต์
  target?: string;
  measurement_criteria?: string;
}

export interface RatingCriteria {
  id: string;
  criteria: string;
  description: string;
  weightage: number;
  max_rating: number;
}

export interface AppraisalCycle {
  id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  appraisal_template_id: string;
  kra_evaluation_method: 'Manual' | 'Automatic';
  appraisees: AppraisalCycleEmployee[];
  final_score_formula?: string;
  calculate_final_score_based_on_formula: boolean;
  status: 'Draft' | 'Active' | 'Completed' | 'Cancelled';
  created_by: string;
  created_at: Date;
  modified_at: Date;
}

export interface AppraisalCycleEmployee {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  appraisal_template_id?: string; // สามารถใช้เทมเพลตต่างจากค่าเริ่มต้นได้
}

export interface Appraisal {
  id: string;
  employee_id: string;
  employee_name: string;
  appraisal_cycle_id: string;
  appraisal_template_id: string;
  start_date: Date;
  end_date: Date;
  status: 'Draft' | 'Self Assessment' | 'Manager Review' | 'Completed' | 'Cancelled';
  rate_goals_manually: boolean;
  
  // KRA/Goals data
  appraisal_kra: AppraisalKRA[];
  goals: ManualGoal[];
  
  // Self assessment
  self_ratings: SelfRating[];
  self_comments?: string;
  
  // Scores
  total_score: number;
  self_score: number;
  avg_feedback_score: number;
  final_score: number;
  
  // Workflow
  submitted_by_employee: boolean;
  submitted_date?: Date;
  reviewed_by_manager: boolean;
  reviewed_date?: Date;
  manager_comments?: string;
  
  created_at: Date;
  modified_at: Date;
}

export interface AppraisalKRA {
  id: string;
  kra: string;
  description: string;
  weightage: number;
  target?: string;
  achievement?: string;
  score: number;
  manager_score?: number;
  comments?: string;
  manager_comments?: string;
}

export interface ManualGoal {
  id: string;
  goal: string;
  description: string;
  weightage: number;
  target?: string;
  achievement?: string;
  score: number;
  comments?: string;
}

export interface SelfRating {
  id: string;
  criteria: string;
  description: string;
  weightage: number;
  max_rating: number;
  rating: number;
  comments?: string;
}

export interface EmployeePerformanceFeedback {
  id: string;
  appraisal_id: string;
  employee_id: string;
  employee_name: string;
  reviewer_id: string;
  reviewer_name: string;
  feedback: string;
  feedback_ratings: FeedbackRating[];
  total_score: number;
  status: 'Draft' | 'Submitted';
  created_at: Date;
  modified_at: Date;
}

export interface FeedbackRating {
  id: string;
  criteria: string;
  description: string;
  weightage: number;
  max_rating: number;
  rating: number;
  comments?: string;
}

export interface PerformanceStats {
  total_appraisals: number;
  completed_appraisals: number;
  pending_appraisals: number;
  average_score: number;
  excellent_performers: number;
  good_performers: number;
  average_performers: number;
  poor_performers: number;
}

export type ScoreCategory = 'excellent' | 'good' | 'average' | 'poor' | 'critical';
