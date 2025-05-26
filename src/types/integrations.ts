
export interface SystemIntegration {
  id: string;
  name: string;
  type: IntegrationType;
  status: 'Connected' | 'Disconnected' | 'Error';
  apiEndpoint?: string;
  apiKey?: string;
  lastSync?: Date;
  syncInterval: number; // minutes
  autoSync: boolean;
  config: IntegrationConfig;
}

export type IntegrationType = 
  | 'hrms'
  | 'payroll'
  | 'training'
  | 'succession-planning';

export interface IntegrationConfig {
  dataMapping: { [key: string]: string };
  syncFields: string[];
  filters?: IntegrationFilter[];
  webhooks?: WebhookConfig[];
}

export interface IntegrationFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
}

export interface WebhookConfig {
  event: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers?: { [key: string]: string };
}

export interface SyncLog {
  id: string;
  integrationId: string;
  integrationName: string;
  timestamp: Date;
  status: 'Success' | 'Failed' | 'Partial';
  recordsProcessed: number;
  recordsSuccessful: number;
  recordsFailed: number;
  errorMessage?: string;
  details: SyncLogDetail[];
}

export interface SyncLogDetail {
  recordId: string;
  action: 'Created' | 'Updated' | 'Skipped' | 'Failed';
  message?: string;
}

// HRMS Integration Types
export interface HRMSEmployee {
  employee_id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  manager_id?: string;
  join_date: Date;
  status: 'Active' | 'Inactive' | 'Terminated';
  org_structure: OrgStructure;
}

export interface OrgStructure {
  department_id: string;
  department_name: string;
  cost_center: string;
  hierarchy_level: number;
  parent_department_id?: string;
}

// Payroll Integration Types
export interface PayrollData {
  employee_id: string;
  performance_score: number;
  salary_adjustment: {
    current_salary: number;
    recommended_increase: number;
    effective_date: Date;
  };
  bonus_calculation: {
    base_bonus: number;
    performance_multiplier: number;
    total_bonus: number;
  };
}

// Training Integration Types
export interface TrainingRecommendation {
  employee_id: string;
  development_areas: string[];
  recommended_courses: TrainingCourse[];
  priority: 'High' | 'Medium' | 'Low';
  completion_deadline?: Date;
}

export interface TrainingCourse {
  course_id: string;
  course_name: string;
  provider: string;
  duration_hours: number;
  cost: number;
  skills_covered: string[];
}

export interface TrainingRecord {
  employee_id: string;
  course_id: string;
  completion_date: Date;
  score?: number;
  certification?: string;
  feedback?: string;
}

// Succession Planning Integration Types
export interface SuccessionCandidate {
  employee_id: string;
  employee_name: string;
  current_position: string;
  target_position: string;
  readiness_level: 'Ready Now' | 'Ready in 1-2 years' | 'Ready in 3+ years';
  performance_score: number;
  potential_rating: 'High' | 'Medium' | 'Low';
  development_plan: string[];
  risk_of_loss: 'High' | 'Medium' | 'Low';
}

export interface SuccessionPlan {
  position_id: string;
  position_name: string;
  department: string;
  critical_role: boolean;
  candidates: SuccessionCandidate[];
  development_timeline: string;
  backup_plans: string[];
}
