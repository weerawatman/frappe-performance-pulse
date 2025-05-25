
import { useState, useEffect } from 'react';
import { 
  AppraisalTemplate, 
  AppraisalCycle, 
  Appraisal, 
  EmployeePerformanceFeedback,
  PerformanceStats 
} from '@/types/performance';
import { calculateTeamStats } from '@/utils/performanceCalculations';

// Mock data - in real application, this would come from API
const mockTemplates: AppraisalTemplate[] = [
  {
    id: '1',
    name: 'เทมเพลตมาตรฐาน - พนักงานทั่วไป',
    description: 'เทมเพลตสำหรับการประเมินพนักงานทั่วไป',
    goals: [],
    rating_criteria: [],
    is_active: true,
    created_by: 'admin',
    created_at: new Date(),
    modified_at: new Date()
  }
];

const mockCycles: AppraisalCycle[] = [
  {
    id: '1',
    name: 'การประเมินผลงานประจำปี 2024',
    start_date: new Date('2024-01-01'),
    end_date: new Date('2024-03-31'),
    appraisal_template_id: '1',
    kra_evaluation_method: 'Manual',
    appraisees: [],
    calculate_final_score_based_on_formula: true,
    status: 'Active',
    created_by: 'admin',
    created_at: new Date(),
    modified_at: new Date()
  }
];

export const usePerformanceData = () => {
  const [templates, setTemplates] = useState<AppraisalTemplate[]>(mockTemplates);
  const [cycles, setCycles] = useState<AppraisalCycle[]>(mockCycles);
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [feedbacks, setFeedbacks] = useState<EmployeePerformanceFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate performance statistics
  const stats: PerformanceStats = {
    total_appraisals: appraisals.length,
    completed_appraisals: appraisals.filter(a => a.status === 'Completed').length,
    pending_appraisals: appraisals.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length,
    average_score: appraisals.length > 0 
      ? appraisals.filter(a => a.status === 'Completed')
          .reduce((sum, a) => sum + a.final_score, 0) / 
        appraisals.filter(a => a.status === 'Completed').length || 0
      : 0,
    excellent_performers: appraisals.filter(a => a.final_score >= 90).length,
    good_performers: appraisals.filter(a => a.final_score >= 80 && a.final_score < 90).length,
    average_performers: appraisals.filter(a => a.final_score >= 70 && a.final_score < 80).length,
    poor_performers: appraisals.filter(a => a.final_score < 70 && a.final_score > 0).length
  };

  // Template operations
  const createTemplate = async (template: Omit<AppraisalTemplate, 'id' | 'created_at' | 'modified_at'>) => {
    setLoading(true);
    try {
      const newTemplate: AppraisalTemplate = {
        ...template,
        id: Date.now().toString(),
        created_at: new Date(),
        modified_at: new Date()
      };
      setTemplates(prev => [...prev, newTemplate]);
      return newTemplate;
    } catch (err) {
      setError('Failed to create template');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTemplate = async (id: string, updates: Partial<AppraisalTemplate>) => {
    setLoading(true);
    try {
      setTemplates(prev => prev.map(t => 
        t.id === id 
          ? { ...t, ...updates, modified_at: new Date() }
          : t
      ));
    } catch (err) {
      setError('Failed to update template');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (id: string) => {
    setLoading(true);
    try {
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete template');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cycle operations
  const createCycle = async (cycle: Omit<AppraisalCycle, 'id' | 'created_at' | 'modified_at'>) => {
    setLoading(true);
    try {
      const newCycle: AppraisalCycle = {
        ...cycle,
        id: Date.now().toString(),
        created_at: new Date(),
        modified_at: new Date()
      };
      setCycles(prev => [...prev, newCycle]);
      return newCycle;
    } catch (err) {
      setError('Failed to create cycle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCycle = async (id: string, updates: Partial<AppraisalCycle>) => {
    setLoading(true);
    try {
      setCycles(prev => prev.map(c => 
        c.id === id 
          ? { ...c, ...updates, modified_at: new Date() }
          : c
      ));
    } catch (err) {
      setError('Failed to update cycle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCycle = async (id: string) => {
    setLoading(true);
    try {
      setCycles(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError('Failed to delete cycle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Appraisal operations
  const createAppraisal = async (appraisal: Omit<Appraisal, 'id' | 'created_at' | 'modified_at'>) => {
    setLoading(true);
    try {
      const newAppraisal: Appraisal = {
        ...appraisal,
        id: Date.now().toString(),
        created_at: new Date(),
        modified_at: new Date()
      };
      setAppraisals(prev => [...prev, newAppraisal]);
      return newAppraisal;
    } catch (err) {
      setError('Failed to create appraisal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAppraisal = async (id: string, updates: Partial<Appraisal>) => {
    setLoading(true);
    try {
      setAppraisals(prev => prev.map(a => 
        a.id === id 
          ? { ...a, ...updates, modified_at: new Date() }
          : a
      ));
    } catch (err) {
      setError('Failed to update appraisal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAppraisal = async (id: string) => {
    setLoading(true);
    try {
      setAppraisals(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError('Failed to delete appraisal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Feedback operations
  const createFeedback = async (feedback: Omit<EmployeePerformanceFeedback, 'id' | 'created_at' | 'modified_at'>) => {
    setLoading(true);
    try {
      const newFeedback: EmployeePerformanceFeedback = {
        ...feedback,
        id: Date.now().toString(),
        created_at: new Date(),
        modified_at: new Date()
      };
      setFeedbacks(prev => [...prev, newFeedback]);
      return newFeedback;
    } catch (err) {
      setError('Failed to create feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Utility functions
  const getTemplateById = (id: string) => templates.find(t => t.id === id);
  const getCycleById = (id: string) => cycles.find(c => c.id === id);
  const getAppraisalById = (id: string) => appraisals.find(a => a.id === id);
  const getAppraisalsByCycle = (cycleId: string) => appraisals.filter(a => a.appraisal_cycle_id === cycleId);
  const getFeedbacksByAppraisal = (appraisalId: string) => feedbacks.filter(f => f.appraisal_id === appraisalId);

  const clearError = () => setError(null);

  return {
    // Data
    templates,
    cycles,
    appraisals,
    feedbacks,
    stats,
    
    // State
    loading,
    error,
    
    // Template operations
    createTemplate,
    updateTemplate,
    deleteTemplate,
    
    // Cycle operations
    createCycle,
    updateCycle,
    deleteCycle,
    
    // Appraisal operations
    createAppraisal,
    updateAppraisal,
    deleteAppraisal,
    
    // Feedback operations
    createFeedback,
    
    // Utility functions
    getTemplateById,
    getCycleById,
    getAppraisalById,
    getAppraisalsByCycle,
    getFeedbacksByAppraisal,
    clearError
  };
};

export default usePerformanceData;
