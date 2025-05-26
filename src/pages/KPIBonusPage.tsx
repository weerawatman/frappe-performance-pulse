
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import BalanceScoreCardInfo from '@/components/kpi/BalanceScoreCardInfo';
import KPIForm from '@/components/kpi/KPIForm';
import KPIStatusTracker from '@/components/kpi/KPIStatusTracker';
import { KPIItem, KPIBonus } from '@/types/kpi';
import { kpiNotificationService } from '@/services/kpiNotificationService';

const KPIBonusPage: React.FC = () => {
  const { toast } = useToast();
  const [kpiItems, setKpiItems] = useState<KPIItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock KPI Bonus data
  const [kpiBonus] = useState<KPIBonus>({
    id: '1',
    employee_id: 'EMP001',
    employee_name: 'สมชาย ใจดี',
    department: 'การขาย',
    kpi_items: [],
    total_weight: 0,
    status: 'Draft',
    workflow_step: 'Self',
    history: [
      {
        id: '1',
        action: 'Created',
        actor_name: 'สมชาย ใจดี',
        actor_role: 'พนักงาน',
        timestamp: new Date(),
      }
    ],
    created_at: new Date(),
    modified_at: new Date()
  });

  const totalWeight = kpiItems.reduce((sum, item) => sum + item.weight, 0);
  const canSubmit = kpiItems.length > 0 && totalWeight === 100;

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save draft status to localStorage
      const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
      currentStatus.bonus = 'draft';
      localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
      
      // Dispatch custom event to update other components
      window.dispatchEvent(new CustomEvent('kpiStatusUpdate'));
      
      toast({
        title: "บันทึกร่างสำเร็จ",
        description: "ข้อมูล KPI ได้ถูกบันทึกเป็นร่างแล้ว",
      });
    } catch (error) {
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

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save submitted status to localStorage
      const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
      currentStatus.bonus = 'pending_checker';
      localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
      
      // Dispatch custom event to update other components
      window.dispatchEvent(new CustomEvent('kpiStatusUpdate'));
      
      toast({
        title: "ส่งอนุมัติสำเร็จ",
        description: "KPI ได้ถูกส่งเพื่อรออนุมัติแล้ว การแจ้งเตือนถูกส่งให้ผู้ตรวจสอบแล้ว",
      });
    } catch (error) {
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
                <p className="font-semibold">{kpiBonus.employee_id}</p>
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
