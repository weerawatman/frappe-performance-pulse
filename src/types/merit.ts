
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
