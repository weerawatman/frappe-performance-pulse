
import { 
  Appraisal, 
  AppraisalKRA, 
  SelfRating, 
  EmployeePerformanceFeedback, 
  AppraisalCycle 
} from '@/types/performance';

export interface ScoreCalculationResult {
  goalScore: number;
  selfScore: number;
  feedbackScore: number;
  finalScore: number;
  breakdown: {
    kraScores: { kraId: string; kra: string; score: number; weightedScore: number }[];
    selfRatings: { criteriaId: string; criteria: string; score: number; weightedScore: number }[];
    feedbackScores: number[];
  };
}

/**
 * Calculate Goal Score based on KRA evaluation method
 */
export const calculateGoalScore = (
  kraList: AppraisalKRA[],
  evaluationMethod: 'Manual' | 'Automatic'
): { totalScore: number; kraScores: { kraId: string; kra: string; score: number; weightedScore: number }[] } => {
  const kraScores = kraList.map(kra => {
    let score = 0;
    let weightedScore = 0;

    if (evaluationMethod === 'Automatic') {
      // For automatic: goal_completion (assumed to be stored in achievement field as percentage)
      const goalCompletion = parseFloat(kra.achievement || '0') || 0;
      score = goalCompletion;
      weightedScore = (goalCompletion * kra.weightage) / 100;
    } else {
      // For manual: use the score directly
      score = kra.score || 0;
      weightedScore = (score * kra.weightage) / 100;
    }

    return {
      kraId: kra.id,
      kra: kra.kra,
      score,
      weightedScore
    };
  });

  let totalScore = 0;
  if (evaluationMethod === 'Automatic') {
    // Convert to 5-point scale
    const totalWeightedScore = kraScores.reduce((sum, kra) => sum + kra.weightedScore, 0);
    totalScore = totalWeightedScore / 20; // Convert to 5-point scale
  } else {
    // Sum all weighted scores
    totalScore = kraScores.reduce((sum, kra) => sum + kra.weightedScore, 0);
  }

  return { totalScore: Math.round(totalScore * 100) / 100, kraScores };
};

/**
 * Calculate Self Score based on self ratings
 */
export const calculateSelfScore = (
  selfRatings: SelfRating[]
): { totalScore: number; selfRatingScores: { criteriaId: string; criteria: string; score: number; weightedScore: number }[] } => {
  const selfRatingScores = selfRatings.map(rating => {
    // score = rating * 5 * weightage / 100
    const normalizedRating = (rating.rating / rating.max_rating) * 5;
    const weightedScore = (normalizedRating * rating.weightage) / 100;

    return {
      criteriaId: rating.id,
      criteria: rating.criteria,
      score: normalizedRating,
      weightedScore
    };
  });

  const totalScore = selfRatingScores.reduce((sum, rating) => sum + rating.weightedScore, 0);

  return { 
    totalScore: Math.round(totalScore * 100) / 100, 
    selfRatingScores 
  };
};

/**
 * Calculate Average Feedback Score
 */
export const calculateFeedbackScore = (
  feedbacks: EmployeePerformanceFeedback[]
): { averageScore: number; feedbackScores: number[] } => {
  const submittedFeedbacks = feedbacks.filter(f => f.status === 'Submitted');
  
  if (submittedFeedbacks.length === 0) {
    return { averageScore: 0, feedbackScores: [] };
  }

  const feedbackScores = submittedFeedbacks.map(f => f.total_score);
  const averageScore = feedbackScores.reduce((sum, score) => sum + score, 0) / feedbackScores.length;

  return { 
    averageScore: Math.round(averageScore * 100) / 100, 
    feedbackScores 
  };
};

/**
 * Calculate Final Score based on cycle configuration
 */
export const calculateFinalScore = (
  goalScore: number,
  selfScore: number,
  feedbackScore: number,
  cycle: AppraisalCycle
): number => {
  if (cycle.calculate_final_score_based_on_formula && cycle.final_score_formula) {
    try {
      // Simple formula parser - replace variables with actual values
      const formula = cycle.final_score_formula
        .replace(/goal_score/g, goalScore.toString())
        .replace(/self_score/g, selfScore.toString())
        .replace(/feedback_score/g, feedbackScore.toString());
      
      // Note: In production, use a safe formula evaluator like expr-eval
      const result = eval(formula);
      return Math.round(result * 100) / 100;
    } catch (error) {
      console.error('Error evaluating formula:', error);
      // Fallback to default calculation
    }
  }

  // Default calculation: average of all scores
  const finalScore = (goalScore + selfScore + feedbackScore) / 3;
  return Math.round(finalScore * 100) / 100;
};

/**
 * Calculate all scores for an appraisal
 */
export const calculateAllScores = (
  appraisal: Appraisal,
  cycle: AppraisalCycle,
  feedbacks: EmployeePerformanceFeedback[]
): ScoreCalculationResult => {
  // Calculate Goal Score
  const { totalScore: goalScore, kraScores } = calculateGoalScore(
    appraisal.appraisal_kra,
    cycle.kra_evaluation_method
  );

  // Calculate Self Score
  const { totalScore: selfScore, selfRatingScores } = calculateSelfScore(
    appraisal.self_ratings
  );

  // Calculate Feedback Score
  const { averageScore: feedbackScore, feedbackScores } = calculateFeedbackScore(feedbacks);

  // Calculate Final Score
  const finalScore = calculateFinalScore(goalScore, selfScore, feedbackScore, cycle);

  return {
    goalScore,
    selfScore,
    feedbackScore,
    finalScore,
    breakdown: {
      kraScores,
      selfRatings: selfRatingScores,
      feedbackScores
    }
  };
};

/**
 * Get performance rating based on final score
 */
export const getPerformanceRating = (score: number): {
  rating: string;
  color: string;
  description: string;
} => {
  if (score >= 4.5) {
    return {
      rating: 'ดีเยี่ยม',
      color: 'text-green-600 bg-green-50',
      description: 'ประสิทธิภาพเหนือความคาดหวัง'
    };
  } else if (score >= 3.5) {
    return {
      rating: 'ดี',
      color: 'text-blue-600 bg-blue-50',
      description: 'ประสิทธิภาพตามความคาดหวัง'
    };
  } else if (score >= 2.5) {
    return {
      rating: 'ปานกลาง',
      color: 'text-yellow-600 bg-yellow-50',
      description: 'ประสิทธิภาพต้องปรับปรุง'
    };
  } else if (score >= 1.5) {
    return {
      rating: 'ต่ำ',
      color: 'text-orange-600 bg-orange-50',
      description: 'ประสิทธิภาพต้องปรับปรุงอย่างเร่งด่วน'
    };
  } else {
    return {
      rating: 'ต่ำมาก',
      color: 'text-red-600 bg-red-50',
      description: 'ประสิทธิภาพไม่เป็นไปตามมาตรฐาน'
    };
  }
};
