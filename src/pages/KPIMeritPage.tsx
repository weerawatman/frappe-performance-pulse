
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Send, X, Target, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import KPIMeritStructure from '@/components/merit/KPIMeritStructure';
import CompetencyTable from '@/components/merit/CompetencyTable';
import CultureTable from '@/components/merit/CultureTable';
import KPIStatusTracker from '@/components/kpi/KPIStatusTracker';
import { KPIMerit, DEFAULT_COMPETENCY_ITEMS, DEFAULT_CULTURE_ITEMS } from '@/types/merit';
import { KPIBonus } from '@/types/kpi';
import { kpiNotificationService } from '@/services/kpiNotificationService';

const KPIMeritPage: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock KPI Merit data
  const [kpiMerit] = useState<KPIMerit>({
    id: '1',
    employee_id: 'EMP001',
    employee_name: 'สมชาย ใจดี',
    department: 'การขาย',
    kpi_achievement_score: 85,
    kpi_achievement_weight: 40,
    competency_items: DEFAULT_COMPETENCY_ITEMS,
    competency_weight: 30,
    culture_items: DEFAULT_CULTURE_ITEMS,
    culture_weight: 30,
    total_score: 0,
    status: 'Draft',
    workflow_step: 'Self',
    submitted_date: undefined,
    approved_date: undefined,
    comments: '',
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

  // Convert KPIMerit to KPIBonus for status tracker
  const kpiBonus: KPIBonus = {
    id: kpiMerit.id,
    employee_id: kpiMerit.employee_id,
    employee_name: kpiMerit.employee_name,
    department: kpiMerit.department,
    kpi_items: [],
    total_weight: 100,
    status: kpiMerit.status,
    workflow_step: kpiMerit.workflow_step,
    submitted_date: kpiMerit.submitted_date,
    approved_date: kpiMerit.approved_date,
    comments: kpiMerit.comments,
    history: kpiMerit.history,
    created_at: kpiMerit.created_at,
    modified_at: kpiMerit.modified_at
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "บันทึกร่างสำเร็จ",
        description: "ข้อมูล KPI Merit ได้ถูกบันทึกเป็นร่างแล้ว",
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
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Send notifications
      const updatedKPIMerit = {
        ...kpiMerit,
        status: 'Pending_Approval' as const,
        workflow_step: 'Checker' as const,
        submitted_date: new Date()
      };
      
      kpiNotificationService.notifyKPIMeritSubmitted(updatedKPIMerit);
      
      toast({
        title: "ส่งอนุมัติสำเร็จ",
        description: "KPI Merit ได้ถูกส่งเพื่อรออนุมัติแล้ว การแจ้งเตือนถูกส่งให้ผู้ตรวจสอบแล้ว",
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
              <h1 className="text-3xl font-bold text-gray-900">กำหนด KPI Merit</h1>
              <p className="text-gray-600">ประเมินเพื่อปรับขึ้นเงินเดือนจาก KPI Achievement, Competency และ Culture</p>
            </div>
          </div>
          
          {/* Action Buttons */}
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
              disabled={isSubmitting}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">ชื่อพนักงาน</p>
                <p className="font-semibold">{kpiMerit.employee_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">แผนก</p>
                <p className="font-semibold">{kpiMerit.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">รหัสพนักงาน</p>
                <p className="font-semibold">{kpiMerit.employee_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">คะแนน KPI Achievement</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {kpiMerit.kpi_achievement_score} คะแนน
                  </Badge>
                  <span className="text-sm text-gray-600">({kpiMerit.kpi_achievement_weight}%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="setup" className="space-y-6">
          <TabsList>
            <TabsTrigger value="setup">กำหนด KPI Merit</TabsTrigger>
            <TabsTrigger value="status">สถานะและประวัติ</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <KPIMeritStructure kpiMerit={kpiMerit} />
            <CompetencyTable competencyItems={kpiMerit.competency_items} />
            <CultureTable cultureItems={kpiMerit.culture_items} />
          </TabsContent>

          <TabsContent value="status">
            <KPIStatusTracker kpiBonus={kpiBonus} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KPIMeritPage;
