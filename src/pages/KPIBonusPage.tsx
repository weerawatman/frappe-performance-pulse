
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Send, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BalanceScoreCardInfo from '@/components/kpi/BalanceScoreCardInfo';
import KPIForm from '@/components/kpi/KPIForm';
import KPIStatusTracker from '@/components/kpi/KPIStatusTracker';
import { KPIItem, KPIBonus } from '@/types/kpi';
import { supabase } from '@/integrations/supabase/client';

const KPIBonusPage: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [kpiItems, setKpiItems] = useState<KPIItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [existingKPIBonus, setExistingKPIBonus] = useState<any>(null);

  // Load employee data and existing KPI Bonus on component mount
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      try {
        // Get employee data
        const { data: employee, error: empError } = await supabase
          .from('employees')
          .select('*')
          .eq('employee_name', user.name)
          .single();
          
        if (empError) {
          console.error('Error fetching employee:', empError);
          return;
        }
        
        setEmployeeData(employee);
        
        // Check for existing KPI Bonus
        const { data: kpiBonus, error: kpiError } = await supabase
          .from('kpi_bonus')
          .select('*')
          .eq('employee_id', employee.id)
          .single();
          
        if (kpiBonus && !kpiError) {
          setExistingKPIBonus(kpiBonus);
          
          // Load KPI items for this bonus
          const { data: kpiItemsData, error: itemsError } = await supabase
            .from('kpi_bonus_items')
            .select(`
              *,
              kpi_items:kpi_item_id (*)
            `)
            .eq('kpi_bonus_id', kpiBonus.id);
            
          if (kpiItemsData && !itemsError) {
            // Transform to match KPIItem interface
            const transformedItems = kpiItemsData.map((item: any) => ({
              id: item.kpi_items.id,
              category_id: item.kpi_items.category_id,
              category_name: item.kpi_items.category_name,
              name: item.kpi_items.name,
              description: item.kpi_items.description,
              weight: item.kpi_items.weight,
              target: item.kpi_items.target,
              measurement_method: item.kpi_items.measurement_method,
              created_at: new Date(item.kpi_items.created_at),
              scale_1_description: '',
              scale_2_description: '',
              scale_3_description: '',
              scale_4_description: ''
            }));
            setKpiItems(transformedItems);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user]);

  const totalWeight = kpiItems.reduce((sum, item) => sum + item.weight, 0);
  const canSubmit = kpiItems.length > 0 && totalWeight === 100;

  const handleSaveDraft = async () => {
    if (!employeeData || kpiItems.length === 0) {
      toast({
        title: "ไม่สามารถบันทึกได้",
        description: "กรุณาเพิ่ม KPI อย่างน้อย 1 รายการ",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let kpiBonusId = existingKPIBonus?.id;
      
      if (!existingKPIBonus) {
        // Create new KPI Bonus record
        const { data: newKPIBonus, error: bonusError } = await supabase
          .from('kpi_bonus')
          .insert([{
            employee_id: employeeData.id,
            total_weight: totalWeight,
            status: 'draft'
          }])
          .select()
          .single();
          
        if (bonusError) throw bonusError;
        kpiBonusId = newKPIBonus.id;
        setExistingKPIBonus(newKPIBonus);
      } else {
        // Update existing KPI Bonus
        const { error: updateError } = await supabase
          .from('kpi_bonus')
          .update({
            total_weight: totalWeight,
            status: 'draft',
            updated_at: new Date().toISOString()
          })
          .eq('id', existingKPIBonus.id);
          
        if (updateError) throw updateError;
      }

      // Save KPI items to database
      for (const item of kpiItems) {
        // First, insert or update the KPI item in kpi_items table
        const { data: savedKPIItem, error: itemError } = await supabase
          .from('kpi_items')
          .upsert({
            id: item.id,
            category_id: item.category_id,
            category_name: item.category_name,
            name: item.name,
            description: item.description,
            weight: item.weight,
            target: item.target,
            measurement_method: item.measurement_method
          })
          .select()
          .single();
          
        if (itemError) throw itemError;
        
        // Then link it to the KPI bonus
        const { error: linkError } = await supabase
          .from('kpi_bonus_items')
          .upsert({
            kpi_bonus_id: kpiBonusId,
            kpi_item_id: savedKPIItem.id,
            score: 0
          });
          
        if (linkError) throw linkError;
      }
      
      // Update localStorage for UI consistency
      const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
      currentStatus.bonus = 'draft';
      localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
      
      // Dispatch custom event to update other components
      window.dispatchEvent(new CustomEvent('kpiStatusUpdate', { detail: { type: 'bonus', status: 'draft' } }));
      
      toast({
        title: "บันทึกร่างสำเร็จ",
        description: "ข้อมูล KPI ได้ถูกบันทึกเป็นร่างแล้ว",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกข้อมูลได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitForApproval = async () => {
    if (!canSubmit) {
      toast({
        title: "ไม่สามารถส่งได้",
        description: "กรุณาตรวจสอบข้อมูล KPI และน้ำหนักให้ครบถ้วน",
        variant: "destructive",
      });
      return;
    }

    if (!employeeData) {
      toast({
        title: "ไม่พบข้อมูลพนักงาน",
        description: "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // First save as draft
      await handleSaveDraft();
      
      // Then update status to pending_checker
      const { error: updateError } = await supabase
        .from('kpi_bonus')
        .update({
          status: 'pending_checker',
          submitted_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('employee_id', employeeData.id);
        
      if (updateError) throw updateError;
      
      // Add history entry
      const { error: historyError } = await supabase
        .from('kpi_history')
        .insert([{
          kpi_bonus_id: existingKPIBonus?.id,
          action: 'Submitted',
          actor_name: employeeData.employee_name,
          actor_role: 'employee',
          comments: 'ส่งเพื่อรอการตรวจสอบ',
          target_role: 'checker'
        }]);
        
      if (historyError) throw historyError;
      
      // Update localStorage for UI consistency
      const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
      currentStatus.bonus = 'pending_checker';
      localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
      
      // Dispatch custom event to update other components
      window.dispatchEvent(new CustomEvent('kpiStatusUpdate', { detail: { type: 'bonus', status: 'pending_checker' } }));
      
      toast({
        title: "ส่งอนุมัติสำเร็จ",
        description: "KPI ได้ถูกส่งเพื่อรออนุมัติแล้ว การแจ้งเตือนถูกส่งให้ผู้ตรวจสอบแล้ว",
      });
      
      // Navigate back to dashboard
      navigate('/employee-dashboard');
    } catch (error) {
      console.error('Error submitting for approval:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งอนุมัติได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock KPI Bonus data for display
  const kpiBonus: KPIBonus = {
    id: existingKPIBonus?.id || '1',
    employee_id: employeeData?.id || 'EMP001',
    employee_name: employeeData?.employee_name || user?.name || 'ไม่ระบุ',
    department: employeeData?.department || 'ไม่ระบุ',
    kpi_items: [],
    total_weight: totalWeight,
    status: existingKPIBonus?.status || 'Draft',
    workflow_step: 'Self',
    history: [
      {
        id: '1',
        action: 'Created',
        actor_name: employeeData?.employee_name || user?.name || 'ไม่ระบุ',
        actor_role: 'พนักงาน',
        timestamp: new Date(),
      }
    ],
    created_at: new Date(),
    modified_at: new Date()
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/employee-dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">กำหนด KPI Bonus</h1>
              <p className="text-gray-600">จัดการและกำหนด KPI สำหรับการคำนวณโบนัส</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={isSubmitting || kpiItems.length === 0}
            >
              <Save className="w-4 h-4 mr-2" />
              บันทึกร่าง
            </Button>
            <Button 
              onClick={handleSubmitForApproval}
              disabled={isSubmitting || !canSubmit}
            >
              <Send className="w-4 h-4 mr-2" />
              ส่งอนุมัติ
            </Button>
            <Link to="/employee-dashboard">
              <Button variant="outline">
                <X className="w-4 h-4 mr-2" />
                ยกเลิก
              </Button>
            </Link>
          </div>
        </div>

        {/* Employee Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">ชื่อพนักงาน</p>
                <p className="font-semibold">{kpiBonus.employee_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">แผนก</p>
                <p className="font-semibold">{kpiBonus.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">รหัสพนักงาน</p>
                <p className="font-semibold">{employeeData?.employee_id || 'ไม่ระบุ'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="setup" className="space-y-6">
          <TabsList>
            <TabsTrigger value="setup">กำหนด KPI</TabsTrigger>
            <TabsTrigger value="status">สถานะและประวัติ</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <BalanceScoreCardInfo />
            <KPIForm 
              kpiItems={kpiItems}
              onKPIItemsChange={setKpiItems}
            />
          </TabsContent>

          <TabsContent value="status">
            <KPIStatusTracker kpiBonus={kpiBonus} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KPIBonusPage;
