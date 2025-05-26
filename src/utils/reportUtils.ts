
import { Appraisal, Employee, AppraisalCycle } from '@/types/performance';
import { 
  DepartmentReport, 
  PositionReport, 
  CycleReport, 
  IndividualReport, 
  KRAReport,
  PerformanceLevel,
  ScoreDistribution,
  ReportFilters
} from '@/types/reports';

export const getPerformanceLevel = (score: number): PerformanceLevel => {
  if (score >= 4.5) return 'excellent';
  if (score >= 3.5) return 'good';
  if (score >= 2.5) return 'average';
  return 'poor';
};

export const getScoreDistribution = (scores: number[]): ScoreDistribution => {
  return scores.reduce((acc, score) => {
    const level = getPerformanceLevel(score);
    acc[level]++;
    return acc;
  }, { excellent: 0, good: 0, average: 0, poor: 0 });
};

export const generateDepartmentReports = (
  appraisals: Appraisal[],
  employees: Employee[]
): DepartmentReport[] => {
  const completedAppraisals = appraisals.filter(a => a.status === 'Completed');
  const departmentMap = new Map<string, Appraisal[]>();

  completedAppraisals.forEach(appraisal => {
    const dept = appraisal.department;
    if (!departmentMap.has(dept)) {
      departmentMap.set(dept, []);
    }
    departmentMap.get(dept)!.push(appraisal);
  });

  return Array.from(departmentMap.entries()).map(([department, deptAppraisals]) => {
    const scores = deptAppraisals.map(a => a.final_score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const distribution = getScoreDistribution(scores);

    return {
      department,
      averageScore,
      totalEmployees: deptAppraisals.length,
      excellentPerformers: distribution.excellent,
      goodPerformers: distribution.good,
      averagePerformers: distribution.average,
      poorPerformers: distribution.poor,
      scores
    };
  });
};

export const generatePositionReports = (
  appraisals: Appraisal[],
  employees: Employee[]
): PositionReport[] => {
  const completedAppraisals = appraisals.filter(a => a.status === 'Completed');
  const positionMap = new Map<string, Appraisal[]>();

  completedAppraisals.forEach(appraisal => {
    const employee = employees.find(e => e.id === appraisal.employee_id);
    const position = employee?.position || 'Unknown';
    
    if (!positionMap.has(position)) {
      positionMap.set(position, []);
    }
    positionMap.get(position)!.push(appraisal);
  });

  return Array.from(positionMap.entries()).map(([position, posAppraisals]) => {
    const scores = posAppraisals.map(a => a.final_score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const distribution = getScoreDistribution(scores);

    return {
      position,
      averageScore,
      totalEmployees: posAppraisals.length,
      excellentPerformers: distribution.excellent,
      goodPerformers: distribution.good,
      averagePerformers: distribution.average,
      poorPerformers: distribution.poor,
      scores
    };
  });
};

export const generateCycleReports = (
  appraisals: Appraisal[],
  cycles: AppraisalCycle[]
): CycleReport[] => {
  return cycles.map(cycle => {
    const cycleAppraisals = appraisals.filter(a => a.appraisal_cycle_id === cycle.id);
    const completedAppraisals = cycleAppraisals.filter(a => a.status === 'Completed');
    const scores = completedAppraisals.map(a => a.final_score);
    const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
    const distribution = getScoreDistribution(scores);

    return {
      cycleId: cycle.id,
      cycleName: cycle.name,
      startDate: cycle.start_date,
      endDate: cycle.end_date,
      averageScore,
      totalAppraisals: cycleAppraisals.length,
      completedAppraisals: completedAppraisals.length,
      excellentPerformers: distribution.excellent,
      goodPerformers: distribution.good,
      averagePerformers: distribution.average,
      poorPerformers: distribution.poor,
      scores
    };
  });
};

export const generateIndividualReports = (
  appraisals: Appraisal[],
  employees: Employee[],
  cycles: AppraisalCycle[]
): IndividualReport[] => {
  return employees.map(employee => {
    const employeeAppraisals = appraisals.filter(a => a.employee_id === employee.id);
    const completedAppraisals = employeeAppraisals.filter(a => a.status === 'Completed');
    
    const appraisalData = completedAppraisals.map(appraisal => {
      const cycle = cycles.find(c => c.id === appraisal.appraisal_cycle_id);
      return {
        cycleId: appraisal.appraisal_cycle_id,
        cycleName: cycle?.name || 'Unknown Cycle',
        finalScore: appraisal.final_score,
        totalScore: appraisal.total_score,
        selfScore: appraisal.self_score,
        feedbackScore: appraisal.avg_feedback_score,
        status: appraisal.status,
        date: appraisal.modified_at
      };
    });

    const scores = completedAppraisals.map(a => a.final_score);
    const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
    
    // Calculate trend
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (scores.length > 1) {
      const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
      const secondHalf = scores.slice(Math.floor(scores.length / 2));
      const firstAvg = firstHalf.reduce((sum, s) => sum + s, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, s) => sum + s, 0) / secondHalf.length;
      
      if (secondAvg > firstAvg + 0.2) trend = 'improving';
      else if (secondAvg < firstAvg - 0.2) trend = 'declining';
    }

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      position: employee.position,
      appraisals: appraisalData,
      averageScore,
      trend,
      feedbacks: [] // Can be populated from feedback data
    };
  });
};

export const generateKRAReports = (
  appraisals: Appraisal[],
  cycles: AppraisalCycle[]
): KRAReport[] => {
  const kraMap = new Map<string, { scores: number[], departments: Map<string, number[]>, cycles: Map<string, number[]> }>();

  appraisals.filter(a => a.status === 'Completed').forEach(appraisal => {
    appraisal.appraisal_kra.forEach(kra => {
      if (!kraMap.has(kra.kra)) {
        kraMap.set(kra.kra, {
          scores: [],
          departments: new Map(),
          cycles: new Map()
        });
      }

      const kraData = kraMap.get(kra.kra)!;
      kraData.scores.push(kra.score);

      // Department breakdown
      if (!kraData.departments.has(appraisal.department)) {
        kraData.departments.set(appraisal.department, []);
      }
      kraData.departments.get(appraisal.department)!.push(kra.score);

      // Cycle breakdown
      if (!kraData.cycles.has(appraisal.appraisal_cycle_id)) {
        kraData.cycles.set(appraisal.appraisal_cycle_id, []);
      }
      kraData.cycles.get(appraisal.appraisal_cycle_id)!.push(kra.score);
    });
  });

  return Array.from(kraMap.entries()).map(([kraName, data]) => {
    const averageScore = data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length;
    
    // Calculate trend (simplified)
    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (data.scores.length > 4) {
      const firstQuarter = data.scores.slice(0, Math.floor(data.scores.length / 4));
      const lastQuarter = data.scores.slice(-Math.floor(data.scores.length / 4));
      const firstAvg = firstQuarter.reduce((sum, s) => sum + s, 0) / firstQuarter.length;
      const lastAvg = lastQuarter.reduce((sum, s) => sum + s, 0) / lastQuarter.length;
      
      if (lastAvg > firstAvg + 0.2) trend = 'improving';
      else if (lastAvg < firstAvg - 0.2) trend = 'declining';
    }

    const departmentBreakdown = Array.from(data.departments.entries()).map(([dept, scores]) => ({
      department: dept,
      averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length
    }));

    const cycleTrend = Array.from(data.cycles.entries()).map(([cycleId, scores]) => {
      const cycle = cycles.find(c => c.id === cycleId);
      return {
        cycleId,
        cycleName: cycle?.name || 'Unknown',
        averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length
      };
    });

    return {
      kra: kraName,
      averageScore,
      totalEvaluations: data.scores.length,
      trend,
      departmentBreakdown,
      cycleTrend
    };
  });
};

export const getScoreColorClass = (score: number): string => {
  const level = getPerformanceLevel(score);
  switch (level) {
    case 'excellent': return 'text-green-600';
    case 'good': return 'text-blue-600';
    case 'average': return 'text-yellow-600';
    case 'poor': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export const getScoreBgColorClass = (score: number): string => {
  const level = getPerformanceLevel(score);
  switch (level) {
    case 'excellent': return 'bg-green-100';
    case 'good': return 'bg-blue-100';
    case 'average': return 'bg-yellow-100';
    case 'poor': return 'bg-red-100';
    default: return 'bg-gray-100';
  }
};

export const getTrendIcon = (trend: 'improving' | 'declining' | 'stable'): string => {
  switch (trend) {
    case 'improving': return '📈';
    case 'declining': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};

export const getTrendColorClass = (trend: 'improving' | 'declining' | 'stable'): string => {
  switch (trend) {
    case 'improving': return 'text-green-600';
    case 'declining': return 'text-red-600';
    case 'stable': return 'text-gray-600';
    default: return 'text-gray-600';
  }
};
