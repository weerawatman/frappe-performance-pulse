
import { KPIItem } from '@/types/kpi';

export interface KPIBonusScoring {
  kpi_id: string;
  achievement_percentage: number;
  weight: number;
  calculated_score: number;
}

export interface CompetencyScoring {
  id: string;
  level: number;
  weight: number;
  calculated_score: number;
}

export interface CultureScoring {
  id: string;
  level: number;
  weight: number;
  calculated_score: number;
}

export interface KPIMeritScoring {
  kpi_achievement_score: number; // 40%
  kpi_achievement_weight: number;
  competency_score: number; // 30%
  competency_weight: number;
  culture_score: number; // 30%
  culture_weight: number;
  total_score: number;
}

/**
 * แปลงระดับการประเมินเป็นคะแนนและเปอร์เซ็นต์
 */
export const convertLevelToScore = (level: number): { score: number; percentage: number } => {
  switch (level) {
    case 1:
      return { score: 1, percentage: 50 }; // ต่ำกว่า 60%
    case 2:
      return { score: 2, percentage: 65 }; // 60-69%
    case 3:
      return { score: 3, percentage: 75 }; // 70-79%
    case 4:
      return { score: 4, percentage: 85 }; // 80-89%
    case 5:
      return { score: 5, percentage: 95 }; // 90% ขึ้นไป
    default:
      return { score: 0, percentage: 0 };
  }
};

/**
 * แปลงเปอร์เซ็นต์เป็นระดับ
 */
export const convertPercentageToLevel = (percentage: number): number => {
  if (percentage >= 90) return 5;
  if (percentage >= 80) return 4;
  if (percentage >= 70) return 3;
  if (percentage >= 60) return 2;
  return 1;
};

/**
 * คำนวณคะแนน KPI Bonus
 */
export const calculateKPIBonusScore = (
  kpiItems: KPIItem[],
  evaluations: { [key: string]: { achievement_percentage: number } }
): {
  individual_scores: KPIBonusScoring[];
  total_score: number;
  total_weight: number;
  is_weight_valid: boolean;
} => {
  const individual_scores: KPIBonusScoring[] = [];
  let total_score = 0;
  let total_weight = 0;

  kpiItems.forEach(kpi => {
    const evaluation = evaluations[kpi.id];
    const achievement_percentage = evaluation?.achievement_percentage || 0;
    
    // คะแนนแต่ละข้อ = % ความสำเร็จ × Weight / 100
    const calculated_score = (achievement_percentage * kpi.weight) / 100;
    
    individual_scores.push({
      kpi_id: kpi.id,
      achievement_percentage,
      weight: kpi.weight,
      calculated_score
    });

    total_score += calculated_score;
    total_weight += kpi.weight;
  });

  return {
    individual_scores,
    total_score,
    total_weight,
    is_weight_valid: total_weight === 100
  };
};

/**
 * คำนวณคะแนน Competency
 */
export const calculateCompetencyScore = (
  competencyItems: { id: string; weight: number }[],
  evaluations: { [key: string]: { level: number } }
): {
  individual_scores: CompetencyScoring[];
  total_score: number;
  total_weight: number;
  is_weight_valid: boolean;
} => {
  const individual_scores: CompetencyScoring[] = [];
  let total_score = 0;
  let total_weight = 0;

  competencyItems.forEach(item => {
    const evaluation = evaluations[item.id];
    const level = evaluation?.level || 0;
    const { score } = convertLevelToScore(level);
    
    // คะแนนแต่ละข้อ = ระดับการประเมิน × Weight / 5 (เพื่อแปลงเป็นเปอร์เซ็นต์)
    const calculated_score = (score * item.weight) / 5;
    
    individual_scores.push({
      id: item.id,
      level,
      weight: item.weight,
      calculated_score
    });

    total_score += calculated_score;
    total_weight += item.weight;
  });

  return {
    individual_scores,
    total_score,
    total_weight,
    is_weight_valid: total_weight === 100
  };
};

/**
 * คำนวณคะแนน Culture
 */
export const calculateCultureScore = (
  cultureItems: { id: string; weight: number }[],
  evaluations: { [key: string]: { level: number } }
): {
  individual_scores: CultureScoring[];
  total_score: number;
  total_weight: number;
  is_weight_valid: boolean;
} => {
  const individual_scores: CultureScoring[] = [];
  let total_score = 0;
  let total_weight = 0;

  cultureItems.forEach(item => {
    const evaluation = evaluations[item.id];
    const level = evaluation?.level || 0;
    const { score } = convertLevelToScore(level);
    
    // คะแนนแต่ละข้อ = ระดับการประเมิน × Weight / 5 (เพื่อแปลงเป็นเปอร์เซ็นต์)
    const calculated_score = (score * item.weight) / 5;
    
    individual_scores.push({
      id: item.id,
      level,
      weight: item.weight,
      calculated_score
    });

    total_score += calculated_score;
    total_weight += item.weight;
  });

  return {
    individual_scores,
    total_score,
    total_weight,
    is_weight_valid: total_weight === 100
  };
};

/**
 * คำนวณคะแนน KPI Merit รวม
 */
export const calculateKPIMeritScore = (
  kpiBonusScore: number,
  competencyScore: number,
  cultureScore: number
): KPIMeritScoring => {
  // แปลงคะแนน KPI Bonus เป็นคะแนนสำหรับ Merit (40%)
  const kpi_achievement_score = (kpiBonusScore * 40) / 100;
  
  // คะแนน Competency (30%)
  const competency_final_score = (competencyScore * 30) / 100;
  
  // คะแนน Culture (30%)
  const culture_final_score = (cultureScore * 30) / 100;
  
  // คะแนนรวม
  const total_score = kpi_achievement_score + competency_final_score + culture_final_score;

  return {
    kpi_achievement_score,
    kpi_achievement_weight: 40,
    competency_score: competency_final_score,
    competency_weight: 30,
    culture_score: culture_final_score,
    culture_weight: 30,
    total_score
  };
};

/**
 * กำหนดสีตามคะแนน
 */
export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 60) return 'text-orange-600';
  return 'text-red-600';
};

/**
 * กำหนดเกรดตามคะแนน
 */
export const getScoreGrade = (score: number): string => {
  if (score >= 90) return 'ดีเยี่ยม';
  if (score >= 80) return 'ดี';
  if (score >= 70) return 'ปานกลาง';
  if (score >= 60) return 'พอใช้';
  return 'ต้องปรับปรุง';
};

/**
 * กำหนดสีพื้นหลังตามคะแนน
 */
export const getScoreBgColor = (score: number): string => {
  if (score >= 90) return 'bg-green-50';
  if (score >= 80) return 'bg-blue-50';
  if (score >= 70) return 'bg-yellow-50';
  if (score >= 60) return 'bg-orange-50';
  return 'bg-red-50';
};
