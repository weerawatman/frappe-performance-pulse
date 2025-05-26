
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, CheckCircle, XCircle, ArrowLeft, UserCheck, MessageSquare } from 'lucide-react';
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
  checked_date?: Date;
  status: string;
}

const KPIApproverPage: React.FC = () => {
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
        getKPIBonusByStatus('pending_approver'),
        getKPIMeritByStatus('pending_approver')
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
            checked_date: bonus.checked_date ? new Date(bonus.checked_date) : undefined,
            status: bonus.status || 'pending_approver'
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
            checked_date: merit.checked_date ? new Date(merit.checked_date) : undefined,
            status: merit.status || 'pending_approver'
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

  const handleFinalApprove = async () => {
    if (!selectedKPI) return;
    
    setIsSubmitting(true);
    try {
      if (selectedKPI.kpi_type === 'KPI Bonus') {
        await updateKPIBonusStatus(selectedKPI.id, 'completed', feedback);
      } else {
        await updateKPIMeritStatus(selectedKPI.id, 'completed', feedback);
      }

      await addKPIHistory(
        selectedKPI.id,
        selectedKPI.kpi_type === 'KPI Bonus' ? 'bonus' : 'merit',
        'Approved',
        'Approver',
        'approver',
        feedback
      );
      
      toast({
        title: "อนุมัติสำเร็จ",
        description: `KPI ของ ${selectedKPI.employee_name} ได้รับการอนุมัติแล้ว`,
      });
      
      setSelectedKPI(null);
      setFeedback('');
      await fetchPendingKPIs();
      
      navigate('/approver-dashboard');
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอนุมัติได้",
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
        'Approver',
        'approver',
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
      
      navigate('/approver-dashboard');
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
            <Link to="/approver-dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">อนุมัติ KPI</h1>
              <p className="text-gray-600">อนุมัติ KPI ที่ผ่านการตรวจสอบแล้ว</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <UserCheck className="w-4 h-4 mr-1" />
            Approver
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>รายการ KPI ที่รอการอนุมัติ ({pendingKPIs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingKPIs.map((kpi) => (
                    <div
                      key={kpi.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedKPI?.id === kpi.id 
                          ? 'border-green-500 bg-green-50' 
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
                          ผ่าน Checker แล้ว
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
                  <CardTitle>อนุมัติ KPI - {selectedKPI.employee_name}</CardTitle>
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
                      <Label htmlFor="approval-feedback">ความเห็นเพิ่มเติม (ถ้ามี)</Label>
                      <Textarea
                        id="approval-feedback"
                        placeholder="ระบุความเห็นเพิ่มเติมสำหรับการอนุมัติหรือการส่งกลับแก้ไข..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Button 
                          onClick={handleFinalApprove}
                          disabled={isSubmitting}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          อนุมัติ KPI
                        </Button>
                      </div>
                      
                      <div className="flex-1">
                        <Button 
                          variant="destructive"
                          onClick={handleReject}
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          ส่งกลับแก้ไข
                        </Button>
                      </div>
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
                    กรุณาเลือก KPI จากรายการทางซ้ายเพื่อดูรายละเอียดและดำเนินการอนุมัติ
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

export default KPIApproverPage;
