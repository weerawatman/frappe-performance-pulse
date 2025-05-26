
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, CheckCircle, XCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getKPIBonusByStatus, 
  getKPIMeritByStatus, 
  updateKPIBonusStatus,
  updateKPIMeritStatus,
  addKPIHistory,
  type KPIBonusWithEmployee,
  type KPIMeritWithEmployee
} from '@/services/kpiService';

interface PendingKPI {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  kpi_type: 'KPI Bonus' | 'KPI Merit';
  submitted_date: Date;
  status: string;
}

const KPICheckerPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedKPI, setSelectedKPI] = useState<PendingKPI | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingKPIs, setPendingKPIs] = useState<PendingKPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingKPIs();
  }, []);

  const fetchPendingKPIs = async () => {
    try {
      setLoading(true);
      const [bonusData, meritData] = await Promise.all([
        getKPIBonusByStatus('pending_checker'),
        getKPIMeritByStatus('pending_checker')
      ]);

      const kpis: PendingKPI[] = [];

      bonusData.forEach((bonus: KPIBonusWithEmployee) => {
        if (bonus.employee) {
          kpis.push({
            id: bonus.id,
            employee_id: bonus.employee.id,
            employee_name: bonus.employee.employee_name,
            department: bonus.employee.department,
            kpi_type: 'KPI Bonus',
            submitted_date: new Date(bonus.submitted_date || bonus.created_at),
            status: bonus.status || 'pending_checker'
          });
        }
      });

      meritData.forEach((merit: KPIMeritWithEmployee) => {
        if (merit.employee) {
          kpis.push({
            id: merit.id,
            employee_id: merit.employee.id,
            employee_name: merit.employee.employee_name,
            department: merit.employee.department,
            kpi_type: 'KPI Merit',
            submitted_date: new Date(merit.submitted_date || merit.created_at),
            status: merit.status || 'pending_checker'
          });
        }
      });

      setPendingKPIs(kpis);
    } catch (error) {
      console.error('Error fetching pending KPIs:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูล KPI ได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedKPI) return;
    
    setIsSubmitting(true);
    try {
      if (selectedKPI.kpi_type === 'KPI Bonus') {
        await updateKPIBonusStatus(selectedKPI.id, 'pending_approver', feedback);
      } else {
        await updateKPIMeritStatus(selectedKPI.id, 'pending_approver', feedback);
      }

      await addKPIHistory(
        selectedKPI.id,
        selectedKPI.kpi_type === 'KPI Bonus' ? 'bonus' : 'merit',
        'Forwarded',
        'Checker',
        'checker',
        feedback,
        'approver'
      );
      
      toast({
        title: "ส่งต่อสำเร็จ",
        description: `KPI ของ ${selectedKPI.employee_name} ถูกส่งต่อให้ผู้อนุมัติแล้ว`,
      });
      
      setSelectedKPI(null);
      setFeedback('');
      await fetchPendingKPIs();
      
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
      if (selectedKPI.kpi_type === 'KPI Bonus') {
        await updateKPIBonusStatus(selectedKPI.id, 'draft', feedback);
      } else {
        await updateKPIMeritStatus(selectedKPI.id, 'draft', feedback);
      }

      await addKPIHistory(
        selectedKPI.id,
        selectedKPI.kpi_type === 'KPI Bonus' ? 'bonus' : 'merit',
        'Rejected',
        'Checker',
        'checker',
        feedback,
        'employee'
      );
      
      toast({
        title: "ส่งกลับแก้ไขสำเร็จ",
        description: `KPI ของ ${selectedKPI.employee_name} ถูกส่งกลับให้แก้ไขแล้ว`,
      });
      
      setSelectedKPI(null);
      setFeedback('');
      await fetchPendingKPIs();
      
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
