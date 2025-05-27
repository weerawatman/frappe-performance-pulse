
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface KPIRecord {
  id: string;
  employee_name: string;
  status: string;
  type: 'bonus' | 'merit';
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
      
      // Get KPI Bonus records for สมชาย ใจดี
      const { data: bonusData, error: bonusError } = await supabase
        .from('kpi_bonus')
        .select(`
          *,
          employees!inner (
            employee_name
          )
        `)
        .eq('employees.employee_name', 'สมชาย ใจดี');

      if (bonusError) {
        console.error('Error fetching bonus data:', bonusError);
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
        .eq('employees.employee_name', 'สมชาย ใจดี');

      if (meritError) {
        console.error('Error fetching merit data:', meritError);
      }

      const records: KPIRecord[] = [];

      if (bonusData) {
        bonusData.forEach((bonus: any) => {
          records.push({
            id: bonus.id,
            employee_name: bonus.employees.employee_name,
            status: bonus.status,
            type: 'bonus'
          });
        });
      }

      if (meritData) {
        meritData.forEach((merit: any) => {
          records.push({
            id: merit.id,
            employee_name: merit.employees.employee_name,
            status: merit.status,
            type: 'merit'
          });
        });
      }

      console.log('Found KPI records for สมชาย ใจดี:', records);
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

  const updateKPIStatus = async (kpiId: string, type: 'bonus' | 'merit') => {
    try {
      setUpdating(kpiId);
      
      const tableName = type === 'bonus' ? 'kpi_bonus' : 'kpi_merit';
      
      const { error } = await supabase
        .from(tableName)
        .update({
          status: 'completed',
          approved_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', kpiId);

      if (error) throw error;

      toast({
        title: "อัปเดตสำเร็จ",
        description: `KPI ${type === 'bonus' ? 'Bonus' : 'Merit'} ได้รับการอนุมัติแล้ว`,
      });

      // Refresh the data
      await fetchKPIRecords();
      
      // Trigger custom event to update other components
      window.dispatchEvent(new CustomEvent('kpiStatusUpdate'));
      
      // Also update localStorage for immediate UI update
      const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{}');
      if (type === 'bonus') {
        currentStatus.bonus = 'completed';
      } else {
        currentStatus.merit = 'completed';
      }
      localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));

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
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          อัปเดตสถานะ KPI - สมชาย ใจดี
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {kpiRecords.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">
                  KPI {record.type === 'bonus' ? 'Bonus' : 'Merit'}
                </h4>
                <p className="text-sm text-gray-600">{record.employee_name}</p>
                <Badge 
                  className={
                    record.status === 'completed' ? 'bg-green-100 text-green-700' :
                    record.status === 'pending_approver' ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }
                >
                  {record.status === 'completed' ? 'เสร็จสิ้น' :
                   record.status === 'pending_approver' ? 'รออนุมัติ' :
                   'รอตรวจสอบ'}
                </Badge>
              </div>
              
              {record.status !== 'completed' && (
                <Button
                  onClick={() => updateKPIStatus(record.id, record.type)}
                  disabled={updating === record.id}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {updating === record.id ? 'กำลังอัปเดต...' : 'อนุมัติ'}
                </Button>
              )}
            </div>
          ))}
          
          {kpiRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>ไม่พบข้อมูล KPI สำหรับ สมชาย ใจดี</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateKPIStatus;
