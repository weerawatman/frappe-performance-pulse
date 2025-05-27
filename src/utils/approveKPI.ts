
import { supabase } from '@/integrations/supabase/client';

export const approveKPIForEmployee = async (employeeName: string) => {
  try {
    console.log(`Approving KPI for ${employeeName}`);
    
    // Get employee by name
    const { data: employee, error: empError } = await supabase
      .from('employees')
      .select('id')
      .eq('employee_name', employeeName)
      .single();
      
    if (empError || !employee) {
      console.error('Employee not found:', empError);
      return { success: false, error: 'Employee not found' };
    }
    
    const now = new Date().toISOString();
    
    // Update KPI Bonus to completed
    const { error: bonusError } = await supabase
      .from('kpi_bonus')
      .update({
        status: 'completed',
        approved_date: now,
        updated_at: now
      })
      .eq('employee_id', employee.id);
      
    // Update KPI Merit to completed  
    const { error: meritError } = await supabase
      .from('kpi_merit')
      .update({
        status: 'completed',
        approved_date: now,
        updated_at: now
      })
      .eq('employee_id', employee.id);
      
    if (bonusError || meritError) {
      console.error('Errors updating KPI:', { bonusError, meritError });
      return { success: false, error: 'Failed to update KPI status' };
    }
    
    console.log(`Successfully approved KPI for ${employeeName}`);
    
    // Update localStorage for immediate UI update
    if (employeeName === 'สมชาย ใจดี') {
      const currentStatus = { bonus: 'completed', merit: 'completed' };
      localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
    }
    
    // Trigger refresh events
    window.dispatchEvent(new CustomEvent('kpiStatusUpdate'));
    
    return { success: true };
  } catch (error) {
    console.error('Error in approveKPIForEmployee:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// Immediately approve สมชาย ใจดี's KPI
export const immediateApproval = () => {
  setTimeout(async () => {
    const result = await approveKPIForEmployee('สมชาย ใจดี');
    if (result.success) {
      console.log('✅ สมชาย ใจดี KPI approved successfully');
    } else {
      console.error('❌ Failed to approve สมชาย ใจดี KPI:', result.error);
    }
  }, 1000);
};

// Auto-run the approval
immediateApproval();
