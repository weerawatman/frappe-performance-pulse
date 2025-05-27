
import { supabase } from '@/integrations/supabase/client';

export const updateKPIStatusToCompleted = async (employeeName: string) => {
  try {
    console.log(`Updating KPI status for ${employeeName} to completed`);
    
    // Get employee by name
    const { data: employee, error: empError } = await supabase
      .from('employees')
      .select('id')
      .eq('employee_name', employeeName)
      .single();
      
    if (empError || !employee) {
      console.error('Employee not found:', empError);
      return false;
    }
    
    // Update KPI Bonus status
    const { error: bonusError } = await supabase
      .from('kpi_bonus')
      .update({
        status: 'completed',
        approved_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('employee_id', employee.id)
      .neq('status', 'completed');
      
    if (bonusError) {
      console.error('Error updating KPI Bonus:', bonusError);
    }
    
    // Update KPI Merit status
    const { error: meritError } = await supabase
      .from('kpi_merit')
      .update({
        status: 'completed',
        approved_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('employee_id', employee.id)
      .neq('status', 'completed');
      
    if (meritError) {
      console.error('Error updating KPI Merit:', meritError);
    }
    
    console.log(`Successfully updated KPI status for ${employeeName}`);
    
    // Update localStorage to reflect the changes
    const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{}');
    currentStatus.bonus = 'completed';
    currentStatus.merit = 'completed';
    localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
    
    // Trigger refresh events
    window.dispatchEvent(new CustomEvent('kpiStatusUpdate'));
    
    return true;
  } catch (error) {
    console.error('Error in updateKPIStatusToCompleted:', error);
    return false;
  }
};

// Auto-update function to approve สมชาย ใจดี's KPI
export const autoApproveEmployee = async () => {
  const success = await updateKPIStatusToCompleted('สมชาย ใจดี');
  if (success) {
    console.log('สมชาย ใจดี KPI has been approved automatically');
  }
  return success;
};

// Function to specifically update Merit KPI to completed
export const approveMeritKPI = async (employeeName: string) => {
  try {
    console.log(`Approving Merit KPI for ${employeeName}`);
    
    // Get employee by name
    const { data: employee, error: empError } = await supabase
      .from('employees')
      .select('id')
      .eq('employee_name', employeeName)
      .single();
      
    if (empError || !employee) {
      console.error('Employee not found:', empError);
      return false;
    }
    
    // Update KPI Merit status to completed
    const { error: meritError } = await supabase
      .from('kpi_merit')
      .update({
        status: 'completed',
        approved_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('employee_id', employee.id);
      
    if (meritError) {
      console.error('Error updating KPI Merit:', meritError);
      return false;
    }
    
    console.log(`Successfully approved Merit KPI for ${employeeName}`);
    
    // Update localStorage
    const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{}');
    currentStatus.merit = 'completed';
    localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
    
    // Trigger refresh events
    window.dispatchEvent(new CustomEvent('kpiStatusUpdate'));
    
    return true;
  } catch (error) {
    console.error('Error in approveMeritKPI:', error);
    return false;
  }
};
