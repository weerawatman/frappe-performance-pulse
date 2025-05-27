
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, User, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface KPIRecord {
  id: string;
  employee_name: string;
  status: string;
  type: 'bonus' | 'merit';
  submitted_date?: string;
  checked_date?: string;
}

const UpdateKPIStatus: React.FC = () => {
  const { toast } = useToast();
  const [kpiRecords, setKpiRecords] = useState<KPIRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchKPIRecords();
  }, []);

  const fetchKPIRecords = async () => {
    try {
      setLoading(true);
      console.log('Fetching KPI records for สมชาย ใจดี...');
      
      const records: KPIRecord[] = [];

      // Get KPI Bonus records for สมชาย ใจดี
      const { data: bonusData, error: bonusError } = await supabase
        .from('kpi_bonus')
        .select(`
          *,
          employees!inner (
            employee_name
          )
        `)
        .eq('employees.employee_name', 'สมชาย ใจดี')
        .order('created_at', { ascending: false });

      if (bonusError) {
        console.error('Error fetching bonus data:', bonusError);
      } else if (bonusData && bonusData.length > 0) {
        console.log('Found KPI Bonus records:', bonusData);
        bonusData.forEach((bonus: any) => {
          records.push({
            id: bonus.id,
            employee_name: bonus.employees.employee_name,
            status: bonus.status || 'not_started',
            type: 'bonus',
            submitted_date: bonus.submitted_date,
            checked_date: bonus.checked_date
          });
        });
      }

      // Get KPI Merit records for สมชาย ใจดี
      const { data: meritData, error: meritError } = await supabase
        .from('kpi_merit')
        .select(`
          *,
          employees!inner (
            employee_name
          )
        `)
        .eq('employees.employee_name', 'สมชาย ใจดี')
        .order('created_at', { ascending: false });

      if (meritError) {
        console.error('Error fetching merit data:', meritError);
      } else if (meritData && meritData.length > 0) {
        console.log('Found KPI Merit records:', meritData);
        meritData.forEach((merit: any) => {
          records.push({
            id: merit.id,
            employee_name: merit.employees.employee_name,
            status: merit.status || 'not_started',
            type: 'merit',
            submitted_date: merit.submitted_date,
            checked_date: merit.checked_date
          });
        });
      }

      console.log('Total KPI records found:', records.length);
      setKpiRecords(records);
    } catch (error) {
      console.error('Error fetching KPI records:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูล KPI ได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateKPIStatus = async (kpiId: string, type: 'bonus' | 'merit', currentStatus: string) => {
    try {
      setUpdating(kpiId);
      console.log(`Updating ${type} KPI ${kpiId} from ${currentStatus} to next status`);
      
      let nextStatus = 'completed';
      let updateData: any = {
        updated_at: new Date().toISOString()
      };

      // Determine next status based on current status
      if (currentStatus === 'not_started' || currentStatus === 'draft') {
        nextStatus = 'pending_checker';
        updateData.status = nextStatus;
        updateData.submitted_date = new Date().toISOString();
      } else if (currentStatus === 'pending_checker') {
        nextStatus = 'pending_approver';
        updateData.status = nextStatus;
        updateData.checked_date = new Date().toISOString();
      } else if (currentStatus === 'pending_approver') {
        nextStatus = 'completed';
        updateData.status = nextStatus;
        updateData.approved_date = new Date().toISOString();
      } else {
        // Already completed
        toast({
          title: "แจ้งเตือน",
          description: "KPI นี้เสร็จสิ้นแล้ว",
        });
        setUpdating(null);
        return;
      }
      
      const tableName = type === 'bonus' ? 'kpi_bonus' : 'kpi_merit';
      
      const { error } = await supabase
        .from(tableName)
        .update(updateData)
        .eq('id', kpiId);

      if (error) throw error;

      toast({
        title: "อัปเดตสำเร็จ",
        description: `KPI ${type === 'bonus' ? 'Bonus' : 'Merit'} ถูกอัปเดตเป็น ${nextStatus}`,
      });

      // Refresh the data
      await fetchKPIRecords();
      
      // Trigger custom event to update other components
      window.dispatchEvent(new CustomEvent('kpiStatusUpdate'));
      
      // Update localStorage for immediate UI update
      const currentKpiStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{}');
      if (type === 'bonus') {
        currentKpiStatus.bonus = nextStatus;
      } else {
        currentKpiStatus.merit = nextStatus;
      }
      localStorage.setItem('kpiStatus', JSON.stringify(currentKpiStatus));

    } catch (error) {
      console.error('Error updating KPI status:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัปเดตสถานะได้",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not_started': return 'ยังไม่เริ่ม';
      case 'draft': return 'ร่าง';
      case 'pending_checker': return 'รอ Checker';
      case 'pending_approver': return 'รอ Approver';
      case 'completed': return 'เสร็จสิ้น';
      default: return status;
    }
  };

  const getNextAction = (status: string) => {
    switch (status) {
      case 'not_started': 
      case 'draft': 
        return 'ส่งให้ Checker';
      case 'pending_checker': 
        return 'Checker อนุมัติ';
      case 'pending_approver': 
        return 'Approver อนุมัติ';
      case 'completed': 
        return 'เสร็จสิ้นแล้ว';
      default: 
        return 'อัปเดต';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            จำลองการทำงานของระบบ - สมชาย ใจดี
          </div>
          <Button
            onClick={fetchKPIRecords}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            รีเฟรช
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {kpiRecords.length > 0 ? (
            kpiRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">
                    KPI {record.type === 'bonus' ? 'Bonus' : 'Merit'}
                  </h4>
                  <p className="text-sm text-gray-600">{record.employee_name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      className={
                        record.status === 'completed' ? 'bg-green-100 text-green-700' :
                        record.status === 'pending_approver' ? 'bg-purple-100 text-purple-700' :
                        record.status === 'pending_checker' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }
                    >
                      {getStatusText(record.status)}
                    </Badge>
                    {record.submitted_date && (
                      <span className="text-xs text-gray-500">
                        ส่งเมื่อ: {new Date(record.submitted_date).toLocaleDateString('th-TH')}
                      </span>
                    )}
                  </div>
                </div>
                
                {record.status !== 'completed' && (
                  <Button
                    onClick={() => updateKPIStatus(record.id, record.type, record.status)}
                    disabled={updating === record.id}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {updating === record.id ? 'กำลังอัปเดต...' : getNextAction(record.status)}
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>ไม่พบข้อมูล KPI สำหรับ สมชาย ใจดี</p>
              <p className="text-sm mt-2">กรุณาให้พนักงานเริ่มกำหนด KPI ก่อน</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateKPIStatus;
