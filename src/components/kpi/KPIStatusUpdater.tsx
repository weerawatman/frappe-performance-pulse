
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

// Create complete KPI data for somchai@company.com
export const createCompleteKPIData = async (employeeName: string) => {
  try {
    console.log(`Creating complete KPI data for ${employeeName}`);
    
    // Get or create employee
    let { data: employee, error: empError } = await supabase
      .from('employees')
      .select('id')
      .eq('employee_name', employeeName)
      .single();
      
    if (empError || !employee) {
      // Create employee if not exists
      const { data: newEmployee, error: createError } = await supabase
        .from('employees')
        .insert([{
          employee_id: 'EMP001',
          employee_name: employeeName,
          department: 'การขาย',
          position: 'พนักงานขาย',
          email: 'somchai@company.com'
        }])
        .select()
        .single();
        
      if (createError) {
        console.error('Error creating employee:', createError);
        return false;
      }
      employee = newEmployee;
    }
    
    // Create KPI Items first
    const kpiItems = [
      {
        category_id: '1',
        category_name: 'Financial Perspective',
        name: 'เพิ่มยอดขายสินค้า',
        description: 'เพิ่มยอดขายสินค้าให้ได้ตามเป้าหมายที่กำหนด',
        weight: 30,
        target: 'เพิ่มยอดขาย 15% จากปีที่แล้ว',
        measurement_method: 'คำนวณจากยอดขายรวมในระบบ'
      },
      {
        category_id: '2',
        category_name: 'Customer Perspective',
        name: 'ความพึงพอใจของลูกค้า',
        description: 'เพิ่มความพึงพอใจของลูกค้าใหม่และลูกค้าเดิม',
        weight: 25,
        target: 'ความพึงพอใจของลูกค้า >= 85%',
        measurement_method: 'สำรวจความพึงพอใจรายไตรมาส'
      },
      {
        category_id: '3',
        category_name: 'Internal Process',
        name: 'ปรับปรุงกระบวนการทำงาน',
        description: 'ปรับปรุงกระบวนการทำงานให้มีประสิทธิภาพมากขึ้น',
        weight: 25,
        target: 'ลดเวลาการทำงาน 20%',
        measurement_method: 'วัดจากเวลาเฉลี่ยในการทำงาน'
      },
      {
        category_id: '4',
        category_name: 'Learning & Growth',
        name: 'พัฒนาความรู้และทักษะ',
        description: 'เข้าร่วมการฝึกอบรมและพัฒนาทักษะใหม่',
        weight: 20,
        target: 'เข้าร่วมการฝึกอบรม >= 40 ชั่วโมง/ปี',
        measurement_method: 'นับจำนวนชั่วโมงการฝึกอบรม'
      }
    ];

    // Insert or update KPI items
    for (const item of kpiItems) {
      await supabase
        .from('kpi_items')
        .upsert(item, { onConflict: 'category_id,name' });
    }

    // Create completed KPI Bonus
    const { data: kpiBonus, error: bonusInsertError } = await supabase
      .from('kpi_bonus')
      .upsert([{
        employee_id: employee.id,
        status: 'completed',
        total_weight: 100,
        submitted_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        checked_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        approved_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        checker_feedback: 'KPI มีความชัดเจนและสามารถวัดผลได้ อนุมัติให้ดำเนินการต่อ',
        approver_feedback: 'KPI สอดคล้องกับเป้าหมายองค์กร อนุมัติ',
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }], { onConflict: 'employee_id' })
      .select()
      .single();

    if (bonusInsertError) {
      console.error('Error creating KPI Bonus:', bonusInsertError);
      return false;
    }

    // Create completed KPI Merit
    const { data: kpiMerit, error: meritInsertError } = await supabase
      .from('kpi_merit')
      .upsert([{
        employee_id: employee.id,
        status: 'completed',
        kpi_achievement_score: 75,
        kpi_achievement_weight: 40,
        competency_weight: 30,
        culture_weight: 30,
        total_score: 82.5,
        submitted_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        checked_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        approved_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        checker_feedback: 'KPI Merit มีความครบถ้วนและเหมาะสม อนุมัติให้ดำเนินการต่อ',
        approver_feedback: 'KPI Merit ผ่านการพิจารณา อนุมัติ',
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }], { onConflict: 'employee_id' })
      .select()
      .single();

    if (meritInsertError) {
      console.error('Error creating KPI Merit:', meritInsertError);
      return false;
    }

    // Get KPI items for bonus items creation
    const { data: allKpiItems } = await supabase
      .from('kpi_items')
      .select('*')
      .in('category_id', ['1', '2', '3', '4']);

    // Create KPI Bonus Items
    if (allKpiItems && kpiBonus) {
      for (const item of allKpiItems) {
        await supabase
          .from('kpi_bonus_items')
          .upsert([{
            kpi_bonus_id: kpiBonus.id,
            kpi_item_id: item.id,
            actual_result: `ผลงานจริงสำหรับ ${item.name}`,
            score: item.weight * 0.85 // 85% achievement
          }], { onConflict: 'kpi_bonus_id,kpi_item_id' });
      }
    }

    // Create Competency Items for Merit
    if (kpiMerit) {
      const competencyItems = [
        { name: 'การวางแผนและจัดระเบียบ', description: 'ความสามารถในการวางแผนงานและจัดระเบียบ', weight: 15, self_score: 4, supervisor_score: 4 },
        { name: 'การแก้ไขปัญหา', description: 'ความสามารถในการแก้ไขปัญหาและตัดสินใจ', weight: 15, self_score: 4, supervisor_score: 3 }
      ];

      for (const comp of competencyItems) {
        await supabase
          .from('competency_items')
          .upsert([{
            kpi_merit_id: kpiMerit.id,
            ...comp
          }], { onConflict: 'kpi_merit_id,name' });
      }

      // Create Culture Items for Merit
      const cultureItems = [
        { name: 'การทำงานเป็นทีม', description: 'ความสามารถในการทำงานร่วมกับผู้อื่น', weight: 15, self_score: 5, supervisor_score: 4 },
        { name: 'ความรับผิดชอบ', description: 'ความรับผิดชอบต่องานที่ได้รับมอบหมาย', weight: 15, self_score: 4, supervisor_score: 5 }
      ];

      for (const culture of cultureItems) {
        await supabase
          .from('culture_items')
          .upsert([{
            kpi_merit_id: kpiMerit.id,
            ...culture
          }], { onConflict: 'kpi_merit_id,name' });
      }
    }

    console.log(`Successfully created complete KPI data for ${employeeName}`);
    
    // Update localStorage
    const currentStatus = { bonus: 'completed', merit: 'completed' };
    localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
    
    // Trigger refresh events
    window.dispatchEvent(new CustomEvent('kpiStatusUpdate'));
    
    return true;
  } catch (error) {
    console.error('Error in createCompleteKPIData:', error);
    return false;
  }
};

// Auto-update function to approve สมชาย ใจดี's KPI
export const autoApproveEmployee = async () => {
  const success = await createCompleteKPIData('สมชาย ใจดี');
  if (success) {
    console.log('สมชาย ใจดี KPI data has been created and approved automatically');
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
