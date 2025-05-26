
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Eye, Send, MessageSquare, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const KPICheckerPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const pendingKPIs = [
    {
      id: '1',
      employee_id: 'EMP001',
      employee_name: 'สมชาย ใจดี',
      department: 'การขาย',
      kpi_type: 'KPI Bonus',
      submitted_date: new Date(),
      status: 'pending_checker'
    }
  ];

  const handleApprove = async () => {
    if (!selectedKPI) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update status in localStorage
      const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
      if (selectedKPI.kpi_type === 'KPI Bonus') {
        currentStatus.bonus = 'pending_approver';
      } else {
        currentStatus.merit = 'pending_approver';
      }
      localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
      
      toast({
        title: "ส่งต่อสำเร็จ",
        description: `KPI ของ ${selectedKPI.employee_name} ถูกส่งต่อให้ผู้อนุมัติแล้ว`,
      });
      
      setSelectedKPI(null);
      setFeedback('');
      
      // Navigate back to checker dashboard
      navigate('/checker-dashboard');
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งต่อได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedKPI || !feedback.trim()) {
      toast({
        title: "กรุณาให้ Feedback",
        description: "กรุณาระบุเหตุผลในการส่งกลับแก้ไข",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update status in localStorage
      const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
      if (selectedKPI.kpi_type === 'KPI Bonus') {
        currentStatus.bonus = 'draft';
      } else {
        currentStatus.merit = 'draft';
      }
      localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
      
      toast({
        title: "ส่งกลับแก้ไขสำเร็จ",
        description: `KPI ของ ${selectedKPI.employee_name} ถูกส่งกลับให้แก้ไขแล้ว`,
      });
      
      setSelectedKPI(null);
      setFeedback('');
      
      // Navigate back to checker dashboard
      navigate('/checker-dashboard');
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งกลับได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/checker-dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ตรวจสอบ KPI</h1>
              <p className="text-gray-600">ตรวจสอบและให้ความเห็นต่อ KPI ที่พนักงานส่งมา</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Checker
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>รายการ KPI ที่รอตรวจสอบ ({pendingKPIs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingKPIs.map((kpi) => (
                    <div
                      key={kpi.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedKPI?.id === kpi.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedKPI(kpi)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{kpi.employee_name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {kpi.department}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {kpi.kpi_type}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          ส่งเมื่อ: {kpi.submitted_date?.toLocaleDateString('th-TH')}
                        </span>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedKPI ? (
              <Card>
                <CardHeader>
                  <CardTitle>ตรวจสอบ KPI - {selectedKPI.employee_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">ชื่อพนักงาน</p>
                        <p className="font-semibold">{selectedKPI.employee_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">แผนก</p>
                        <p className="font-semibold">{selectedKPI.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ประเภท KPI</p>
                        <p className="font-semibold">{selectedKPI.kpi_type}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="feedback">ความเห็นและข้อเสนอแนะ</Label>
                      <Textarea
                        id="feedback"
                        placeholder="กรุณาระบุความเห็นและข้อเสนอแนะสำหรับ KPI นี้..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleApprove}
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        ส่งต่อให้ผู้อนุมัติ
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={handleReject}
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        ส่งกลับแก้ไข
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    เลือก KPI เพื่อดูรายละเอียด
                  </h3>
                  <p className="text-gray-600">
                    กรุณาเลือก KPI จากรายการทางซ้ายเพื่อดูรายละเอียดและให้ความเห็น
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICheckerPage;
