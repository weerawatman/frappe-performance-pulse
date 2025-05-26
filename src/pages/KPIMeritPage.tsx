
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Send, X, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import KPIMeritStructure from '@/components/merit/KPIMeritStructure';
import CompetencyTable from '@/components/merit/CompetencyTable';
import CultureTable from '@/components/merit/CultureTable';

const KPIMeritPage: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('structure');

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "ส่งอนุมัติสำเร็จ",
        description: "KPI Merit ได้ถูกส่งเพื่อรออนุมัติแล้ว",
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
              <p className="text-gray-600">จัดการและกำหนด KPI สำหรับการปรับเงินเดือน</p>
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
              onClick={handleSubmit}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">ชื่อพนักงาน</p>
                <p className="font-semibold">สมชาย ใจดี</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">แผนก</p>
                <p className="font-semibold">การขาย</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">รหัสพนักงาน</p>
                <p className="font-semibold">EMP001</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="structure" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              โครงสร้าง KPI Merit
            </TabsTrigger>
            <TabsTrigger value="competency">สมรรถนะ</TabsTrigger>
            <TabsTrigger value="culture">วัฒนธรรม</TabsTrigger>
          </TabsList>

          <TabsContent value="structure">
            <KPIMeritStructure />
          </TabsContent>

          <TabsContent value="competency">
            <CompetencyTable />
          </TabsContent>

          <TabsContent value="culture">
            <CultureTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KPIMeritPage;
