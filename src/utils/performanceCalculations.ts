
import { Appraisal, AppraisalKRA, SelfRating, FeedbackRating } from '@/types/performance';

/**
 * Calculate Goal Score from KRA/Goals
 */
export const calculateGoalScore = (kras: AppraisalKRA[]): number => {
  if (kras.length === 0) return 0;
  
  let totalWeightedScore = 0;
  let totalWeightage = 0;
  
  kras.forEach(kra => {
    totalWeightedScore += (kra.score * kra.weightage);
    totalWeightage += kra.weightage;
  });
  
  return totalWeightage > 0 ? totalWeightedScore / totalWeightage : 0;
};

/**
 * Calculate Self Assessment Score
 */
export const calculateSelfScore = (selfRatings: SelfRating[]): number => {
  if (selfRatings.length === 0) return 0;
  
  let totalWeightedScore = 0;
  let totalWeightage = 0;
  
  selfRatings.forEach(rating => {
    const normalizedScore = (rating.rating / rating.max_rating) * 100;
    totalWeightedScore += (normalizedScore * rating.weightage);
    totalWeightage += rating.weightage;
  });
  
  return totalWeightage > 0 ? totalWeightedScore / totalWeightage : 0;
};

/**
 * Calculate Feedback Score
 */
export const calculateFeedbackScore = (feedbackRatings: FeedbackRating[]): number => {
  if (feedbackRatings.length === 0) return 0;
  
  let totalWeightedScore = 0;
  let totalWeightage = 0;
  
  feedbackRatings.forEach(rating => {
    const normalizedScore = (rating.rating / rating.max_rating) * 100;
    totalWeightedScore += (normalizedScore * rating.weightage);
    totalWeightage += rating.weightage;
  });
  
  return totalWeightage > 0 ? totalWeightedScore / totalWeightage : 0;
};

/**
 * Calculate Final Score using formula
 */
export const calculateFinalScore = (
  totalScore: number,
  selfScore: number,
  avgFeedbackScore: number,
  formula?: string
): number => {
  if (!formula) {
    // Default formula if none provided
    return (totalScore * 0.6) + (selfScore * 0.2) + (avgFeedbackScore * 0.2);
  }
  
  try {
    // Replace variables in formula
    let evaluatedFormula = formula
      .replace(/total_score/g, totalScore.toString())
      .replace(/self_score/g, selfScore.toString())
      .replace(/avg_feedback_score/g, avgFeedbackScore.toString());
    
    // Simple formula evaluation (in production, use a proper math parser)
    return eval(evaluatedFormula);
  } catch (error) {
    console.error('Error evaluating formula:', error);
    // Fallback to default formula
    return (totalScore * 0.6) + (selfScore * 0.2) + (avgFeedbackScore * 0.2);
  }
};

/**
 * Get performance category based on score
 */
export const getPerformanceCategory = (score: number): {
  category: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
  label: string;
  color: string;
} => {
  if (score >= 90) {
    return { category: 'excellent', label: 'ดีเยี่ยม', color: '#10b981' };
  } else if (score >= 80) {
    return { category: 'good', label: 'ดี', color: '#3b82f6' };
  } else if (score >= 70) {
    return { category: 'average', label: 'ปานกลาง', color: '#f59e0b' };
  } else if (score >= 60) {
    return { category: 'poor', label: 'ต้องปรับปรุง', color: '#f97316' };
  } else {
    return { category: 'critical', label: 'วิกฤต', color: '#ef4444' };
  }
};

/**
 * Calculate completion percentage for appraisal
 */
export const calculateAppraisalCompletion = (appraisal: Appraisal): number => {
  let completedSteps = 0;
  let totalSteps = 4; // Draft, Self Assessment, Manager Review, Completed
  
  if (appraisal.status !== 'Draft') completedSteps++;
  if (appraisal.submitted_by_employee) completedSteps++;
  if (appraisal.reviewed_by_manager) completedSteps++;
  if (appraisal.status === 'Completed') completedSteps++;
  
  return (completedSteps / totalSteps) * 100;
};

/**
 * Validate weightage totals
 */
export const validateWeightage = (items: { weightage: number }[]): {
  isValid: boolean;
  total: number;
  message: string;
} => {
  const total = items.reduce((sum, item) => sum + item.weightage, 0);
  
  if (total === 100) {
    return { isValid: true, total, message: 'น้ำหนักถูกต้อง' };
  } else if (total < 100) {
    return { isValid: false, total, message: `น้ำหนักรวมต่ำกว่า 100% (${total}%)` };
  } else {
    return { isValid: false, total, message: `น้ำหนักรวมเกิน 100% (${total}%)` };
  }
};

/**
 * Calculate team performance statistics
 */
export const calculateTeamStats = (appraisals: Appraisal[]) => {
  const completedAppraisals = appraisals.filter(a => a.status === 'Completed');
  
  if (completedAppraisals.length === 0) {
    return {
      totalCount: appraisals.length,
      completedCount: 0,
      averageScore: 0,
      distribution: {
        excellent: 0,
        good: 0,
        average: 0,
        poor: 0,
        critical: 0
      }
    };
  }
  
  const scores = completedAppraisals.map(a => a.final_score);
  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  const distribution = {
    excellent: scores.filter(s => s >= 90).length,
    good: scores.filter(s => s >= 80 && s < 90).length,
    average: scores.filter(s => s >= 70 && s < 80).length,
    poor: scores.filter(s => s >= 60 && s < 70).length,
    critical: scores.filter(s => s < 60).length
  };
  
  return {
    totalCount: appraisals.length,
    completedCount: completedAppraisals.length,
    averageScore,
    distribution
  };
};

/**
 * Generate performance insights
 */
export const generatePerformanceInsights = (appraisals: Appraisal[]): string[] => {
  const insights: string[] = [];
  const stats = calculateTeamStats(appraisals);
  
  if (stats.completedCount === 0) {
    insights.push('ยังไม่มีการประเมินที่เสร็จสิ้น');
    return insights;
  }
  
  const completionRate = (stats.completedCount / stats.totalCount) * 100;
  
  if (completionRate < 50) {
    insights.push('อัตราการเสร็จสิ้นการประเมินต่ำกว่า 50% ควรติดตามและเร่งรัด');
  } else if (completionRate > 90) {
    insights.push('อัตราการเสร็จสิ้นการประเมินสูงเกิน 90% ยอดเยี่ยม!');
  }
  
  if (stats.averageScore >= 85) {
    insights.push('คะแนนเฉลี่ยของทีมอยู่ในระดับดีเยี่ยม');
  } else if (stats.averageScore < 70) {
    insights.push('คะแนนเฉลี่ยของทีมอยู่ในระดับที่ควรปรับปรุง');
  }
  
  const topPerformers = stats.distribution.excellent + stats.distribution.good;
  const topPerformerPercentage = (topPerformers / stats.completedCount) * 100;
  
  if (topPerformerPercentage > 70) {
    insights.push('มีผู้ปฏิบัติงานดีเยี่ยมและดีมากกว่า 70% ของทีม');
  }
  
  if (stats.distribution.poor + stats.distribution.critical > 0) {
    insights.push('มีพนักงานที่ต้องการการพัฒนาเพิ่มเติม ควรจัดทำแผนพัฒนา');
  }
  
  return insights;
};

/**
 * Format score for display
 */
export const formatScore = (score: number, decimals: number = 1): string => {
  return score.toFixed(decimals);
};

/**
 * Check if appraisal is overdue
 */
export const isAppraisalOverdue = (appraisal: Appraisal): boolean => {
  const now = new Date();
  return appraisal.end_date < now && appraisal.status !== 'Completed' && appraisal.status !== 'Cancelled';
};

/**
 * Get days remaining for appraisal
 */
export const getDaysRemaining = (endDate: Date): number => {
  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
