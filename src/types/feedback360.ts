
export type FeedbackSourceType = 
  | 'supervisor'
  | 'peer'
  | 'subordinate'
  | 'customer'
  | 'self';

export interface FeedbackSource {
  id: string;
  name: string;
  email: string;
  type: FeedbackSourceType;
  relationship: string;
  isRequired: boolean;
}

export interface Feedback360Request {
  id: string;
  employeeId: string;
  employeeName: string;
  appraisalId: string;
  sources: FeedbackSource[];
  status: 'Draft' | 'Sent' | 'In Progress' | 'Completed';
  deadline: Date;
  createdAt: Date;
  completedAt?: Date;
}

export interface Feedback360Response {
  id: string;
  requestId: string;
  sourceId: string;
  sourceName: string;
  sourceType: FeedbackSourceType;
  responses: QuestionResponse[];
  overallComment: string;
  strengths: string[];
  developmentAreas: string[];
  status: 'Draft' | 'Submitted';
  submittedAt?: Date;
  createdAt: Date;
}

export interface QuestionResponse {
  questionId: string;
  question: string;
  category: string;
  rating: number;
  maxRating: number;
  comment?: string;
}

export interface FeedbackQuestion {
  id: string;
  question: string;
  category: string;
  sourceTypes: FeedbackSourceType[];
  maxRating: number;
  isRequired: boolean;
}

export interface Feedback360Analysis {
  employeeId: string;
  employeeName: string;
  overallScore: number;
  scoresBySource: { [key in FeedbackSourceType]?: number };
  scoresByCategory: { [category: string]: number };
  strengths: string[];
  developmentAreas: string[];
  recommendations: string[];
  gapAnalysis: {
    selfVsOthers: number;
    supervisorVsPeers: number;
    categories: { [category: string]: { self: number; others: number; gap: number } };
  };
}

export interface DevelopmentPlan {
  id: string;
  employeeId: string;
  employeeName: string;
  basedOnFeedback360Id: string;
  goals: DevelopmentGoal[];
  status: 'Draft' | 'Active' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface DevelopmentGoal {
  id: string;
  area: string;
  description: string;
  actions: string[];
  timeline: string;
  resources: string[];
  measurableOutcomes: string[];
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
}
