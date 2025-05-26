
import { Appraisal, Employee, AppraisalCycle } from './performance';

export interface DepartmentReport {
  department: string;
  averageScore: number;
  totalEmployees: number;
  excellentPerformers: number;
  goodPerformers: number;
  averagePerformers: number;
  poorPerformers: number;
  scores: number[];
}

export interface PositionReport {
  position: string;
  averageScore: number;
  totalEmployees: number;
  excellentPerformers: number;
  goodPerformers: number;
  averagePerformers: number;
  poorPerformers: number;
  scores: number[];
}

export interface CycleReport {
  cycleId: string;
  cycleName: string;
  startDate: Date;
  endDate: Date;
  averageScore: number;
  totalAppraisals: number;
  completedAppraisals: number;
  excellentPerformers: number;
  goodPerformers: number;
  averagePerformers: number;
  poorPerformers: number;
  scores: number[];
}

export interface IndividualReport {
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  appraisals: {
    cycleId: string;
    cycleName: string;
    finalScore: number;
    totalScore: number;
    selfScore: number;
    feedbackScore: number;
    status: string;
    date: Date;
  }[];
  averageScore: number;
  trend: 'improving' | 'declining' | 'stable';
  feedbacks: string[];
}

export interface KRAReport {
  kra: string;
  averageScore: number;
  totalEvaluations: number;
  trend: 'improving' | 'declining' | 'stable';
  departmentBreakdown: {
    department: string;
    averageScore: number;
  }[];
  cycleTrend: {
    cycleId: string;
    cycleName: string;
    averageScore: number;
  }[];
}

export interface ReportFilters {
  departments?: string[];
  positions?: string[];
  cycles?: string[];
  employees?: string[];
  dateRange?: {
    startDate?: Date;
    endDate?: Date;
  };
}

export type PerformanceLevel = 'excellent' | 'good' | 'average' | 'poor';

export interface ScoreDistribution {
  excellent: number;
  good: number;
  average: number;
  poor: number;
}
