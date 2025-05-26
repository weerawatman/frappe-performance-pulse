
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type KPIBonus = Database['public']['Tables']['kpi_bonus']['Row'];
type KPIMerit = Database['public']['Tables']['kpi_merit']['Row'];
type Employee = Database['public']['Tables']['employees']['Row'];
type KPIItem = Database['public']['Tables']['kpi_items']['Row'];
type KPIStatus = Database['public']['Enums']['kpi_status'];

export interface KPIBonusWithEmployee extends KPIBonus {
  employee: Employee;
}

export interface KPIMeritWithEmployee extends KPIMerit {
  employee: Employee;
}

// Fetch all employees
export const getEmployees = async () => {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('employee_name');
  
  if (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
  
  return data;
};

// Fetch all KPI items
export const getKPIItems = async () => {
  const { data, error } = await supabase
    .from('kpi_items')
    .select('*')
    .order('category_name, name');
  
  if (error) {
    console.error('Error fetching KPI items:', error);
    throw error;
  }
  
  return data;
};

// Fetch KPI Bonus records with employee info
export const getKPIBonusByStatus = async (status: KPIStatus) => {
  const { data, error } = await supabase
    .from('kpi_bonus')
    .select(`
      *,
      employee:employees(*)
    `)
    .eq('status', status)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching KPI bonus:', error);
    throw error;
  }
  
  return data as KPIBonusWithEmployee[];
};

// Fetch KPI Merit records with employee info
export const getKPIMeritByStatus = async (status: KPIStatus) => {
  const { data, error } = await supabase
    .from('kpi_merit')
    .select(`
      *,
      employee:employees(*)
    `)
    .eq('status', status)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching KPI merit:', error);
    throw error;
  }
  
  return data as KPIMeritWithEmployee[];
};

// Update KPI Bonus status
export const updateKPIBonusStatus = async (
  id: string, 
  status: KPIStatus, 
  feedback?: string
) => {
  const updateData: any = { 
    status,
    updated_at: new Date().toISOString()
  };
  
  if (status === 'pending_approver') {
    updateData.checked_date = new Date().toISOString();
    updateData.checker_feedback = feedback;
  } else if (status === 'completed') {
    updateData.approved_date = new Date().toISOString();
    updateData.approver_feedback = feedback;
  } else if (status === 'rejected') {
    updateData.rejection_reason = feedback;
  }
  
  const { data, error } = await supabase
    .from('kpi_bonus')
    .update(updateData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating KPI bonus status:', error);
    throw error;
  }
  
  return data[0];
};

// Update KPI Merit status
export const updateKPIMeritStatus = async (
  id: string, 
  status: KPIStatus, 
  feedback?: string
) => {
  const updateData: any = { 
    status,
    updated_at: new Date().toISOString()
  };
  
  if (status === 'pending_approver') {
    updateData.checked_date = new Date().toISOString();
    updateData.checker_feedback = feedback;
  } else if (status === 'completed') {
    updateData.approved_date = new Date().toISOString();
    updateData.approver_feedback = feedback;
  } else if (status === 'rejected') {
    updateData.rejection_reason = feedback;
  }
  
  const { data, error } = await supabase
    .from('kpi_merit')
    .update(updateData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating KPI merit status:', error);
    throw error;
  }
  
  return data[0];
};

// Add KPI history entry
export const addKPIHistory = async (
  kpiId: string,
  kpiType: 'bonus' | 'merit',
  action: string,
  actorName: string,
  actorRole: string,
  comments?: string,
  targetRole?: string
) => {
  const historyData: any = {
    action,
    actor_name: actorName,
    actor_role: actorRole,
    comments,
    target_role: targetRole,
    timestamp: new Date().toISOString()
  };
  
  if (kpiType === 'bonus') {
    historyData.kpi_bonus_id = kpiId;
  } else {
    historyData.kpi_merit_id = kpiId;
  }
  
  const { data, error } = await supabase
    .from('kpi_history')
    .insert([historyData])
    .select();
  
  if (error) {
    console.error('Error adding KPI history:', error);
    throw error;
  }
  
  return data[0];
};

// Get employee KPI status summary
export const getEmployeeKPIStatus = async (employeeId: string) => {
  const [bonusResult, meritResult] = await Promise.all([
    supabase
      .from('kpi_bonus')
      .select('status')
      .eq('employee_id', employeeId)
      .single(),
    supabase
      .from('kpi_merit')
      .select('status')
      .eq('employee_id', employeeId)
      .single()
  ]);
  
  return {
    bonus: bonusResult.data?.status || 'not_started',
    merit: meritResult.data?.status || 'not_started'
  };
};
