import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Send, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import KPIForm from '@/components/kpi/KPIForm';
import { KPIItem } from '@/types/kpi';

const KPIBonusPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [kpiItems, setKpiItems] = useState<KPIItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeId, setEmployeeId] = useState<string | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      if (!user?.name) return;

      // Get employee ID from database
      const { data: employee } = await supabase
        .from('employees')
        .select('id')
        .eq('employee_name', user.name)
        .single();

      if (employee) {
        setEmployeeId(employee.id);
      }

      // Try to load existing draft from localStorage first
      const savedKPI = localStorage.getItem('kpi_bonus_draft');
      if (savedKPI) {
        try {
          const parsed = JSON.parse(savedKPI);
          if (parsed.kpiItems) {
            setKpiItems(parsed.kpiItems);
          }
        } catch (error) {
          console.error('Error loading saved KPI:', error);
        }
      }
    };

    initializeData();
  }, [user]);

  const totalWeight = kpiItems.reduce((sum, item) => sum + item.weight, 0);
  const isWeightValid = totalWeight === 100;

  const handleKPIItemsChange = (items: KPIItem[]) => {
    setKpiItems(items);
    // Auto-save to localStorage
    localStorage.setItem('kpi_bonus_draft', JSON.stringify({ kpiItems: items }));
  };

  const handleSaveDraft = async () => {
    if (!employeeId) {
      toast({
        title: "ไม่พบข้อมูลพนักงาน",
        description: "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save to database as draft
      const { data: existingKPI } = await supabase
        .from('kpi_bonus')
        .select('id')
        .eq('employee_id', employeeId)
        .single();

      if (existingKPI) {
        // Update existing record
        const { error } = await supabase
          .from('kpi_bonus')
          .update({
            status: 'draft',
            total_weight: totalWeight,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingKPI.id);

        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('kpi_bonus')
          .insert([{
            employee_id: employeeId,
            status: 'draft',
            total_weight: totalWeight
          }]);

        if (error) throw error;
      }

      // Keep localStorage for consistency
      localStorage.setItem('kpi_bonus_draft', JSON.stringify({ kpiItems }));
      
      // Update KPI status
      const kpiStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
      kpiStatus.bonus = 'draft';
      localStorage.setItem('kpiStatus', JSON.stringify(kpiStatus));
      
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('kpiStatusUpdate'));
      
      toast({
        title: "บันทึกร่างสำเร็จ",
        description: "ข้อมูล KPI Bonus ถูกบันทึกเป็นร่างแล้ว",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกร่างได้",
        variant: "destructive",
      });
    }
  };

  const handleSubmitForApproval = async () => {
    if (kpiItems.length === 0) {
      toast({
        title: "กรุณาเพิ่ม KPI",
        description: "กรุณาเพิ่ม KPI อย่างน้อย 1 รายการ",
        variant: "destructive",
      });
      return;
    }

    if (!isWeightValid) {
      toast({
        title: "น้ำหนักไม่ถูกต้อง",
        description: "น้ำหนักรวมต้องเท่ากับ 100%",
        variant: "destructive",
      });
      return;
    }

    if (!employeeId) {
      toast({
        title: "ไม่พบข้อมูลพนักงาน",
        description: "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check if KPI record exists
      const { data: existingKPI } = await supabase
        .from('kpi_bonus')
        .select('id')
        .eq('employee_id', employeeId)
        .single();

      if (existingKPI) {
        // Update existing record to pending_checker
        const { error } = await supabase
          .from('kpi_bonus')
          .update({
            status: 'pending_checker',
            total_weight: totalWeight,
            submitted_date: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existingKPI.id);

        if (error) throw error;
      } else {
        // Create new record with pending_checker status
        const { error } = await supabase
          .from('kpi_bonus')
          .insert([{
            employee_id: employeeId,
            status: 'pending_checker',
            total_weight: totalWeight,
            submitted_date: new Date().toISOString()
          }]);

        if (error) throw error;
      }

      // Save submitted data to localStorage for reference
      localStorage.setItem('kpi_bonus_submitted', JSON.stringify({ 
        kpiItems,
        submittedDate: new Date().toISOString(),
        submittedBy: user?.name
      }));
      
      // Update KPI status to pending_checker
      const kpiStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
      kpiStatus.bonus = 'pending_checker';
      localStorage.setItem('kpiStatus', JSON.stringify(kpiStatus));
      
      // Remove draft
      localStorage.removeItem('kpi_bonus_draft');
      
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('kpiStatusUpdate'));
      
      toast({
        title: "ส่งอนุมัติสำเร็จ",
        description: "KPI Bonus ถูกส่งเพื่อขออนุมัติแล้ว",
      });
      
      // Navigate back to employee dashboard
      navigate('/employee-dashboard');
    } catch (error) {
      console.error('Error submitting KPI Bonus:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งอนุมัติได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900">KPI Bonus</h1>
              <p className="text-gray-600">กำหนดเป้าหมายและผลงานสำหรับ KPI Bonus</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              รวม: {totalWeight}%
            </Badge>
            {!isWeightValid && totalWeight > 0 && (
              <Badge variant="destructive">
                ต้องเท่ากับ 100%
              </Badge>
            )}
          </div>
        </div>

        {/* Weight Warning */}
        {!isWeightValid && totalWeight > 0 && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              น้ำหนักรวมต้องเท่ากับ 100% (ปัจจุบัน: {totalWeight}%)
            </AlertDescription>
          </Alert>
        )}

        {/* KPI Form */}
        <KPIForm 
          kpiItems={kpiItems}
          onKPIItemsChange={handleKPIItemsChange}
        />

        {/* Action Buttons */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {kpiItems.length === 0 
                  ? "กรุณาเพิ่ม KPI อย่างน้อย 1 รายการ"
                  : `มี KPI ทั้งหมด ${kpiItems.length} รายการ น้ำหนักรวม ${totalWeight}%`
                }
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกร่าง
                </Button>
                <Button 
                  onClick={handleSubmitForApproval}
                  disabled={isSubmitting || kpiItems.length === 0 || !isWeightValid}
                >
                  <Send className="w-4 h-4 mr-2" />
                  ส่งอนุมัติ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KPIBonusPage;
