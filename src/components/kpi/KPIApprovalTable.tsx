
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface KPIApprovalTableProps {
  userRole: 'checker' | 'approver';
}

interface PendingKPI {
  id: string;
  employee_name: string;
  employee_id: string;
  department: string;
  kpi_type: 'KPI Bonus' | 'KPI Merit';
  submitted_date: Date;
  checked_date?: Date;
  status: string;
}

const KPIApprovalTable: React.FC<KPIApprovalTableProps> = ({ userRole }) => {
  const [pendingKPIs, setPendingKPIs] = useState<PendingKPI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingKPIs();
  }, [userRole]);

  const fetchPendingKPIs = async () => {
    try {
      setLoading(true);
      const status = userRole === 'checker' ? 'pending_checker' : 'pending_approver';
      console.log('Fetching KPIs with status:', status);
      
      const kpis: PendingKPI[] = [];

      // Fetch KPI Bonus data with employee information
      const { data: bonusData, error: bonusError } = await supabase
        .from('kpi_bonus')
        .select(`
          *,
          employees!inner (
            employee_name,
            employee_id,
            department
          )
        `)
        .eq('status', status)
        .order('submitted_date', { ascending: false });

      if (bonusError) {
        console.error('Error fetching KPI bonus:', bonusError);
      } else if (bonusData) {
        console.log('Found KPI Bonus records:', bonusData);
        bonusData.forEach((bonus: any) => {
          kpis.push({
            id: bonus.id,
            employee_name: bonus.employees.employee_name,
            employee_id: bonus.employees.employee_id,
            department: bonus.employees.department,
            kpi_type: 'KPI Bonus',
            submitted_date: new Date(bonus.submitted_date || bonus.created_at),
            checked_date: bonus.checked_date ? new Date(bonus.checked_date) : undefined,
            status: bonus.status || 'pending_checker'
          });
        });
      }

      // Fetch KPI Merit data with employee information
      const { data: meritData, error: meritError } = await supabase
        .from('kpi_merit')
        .select(`
          *,
          employees!inner (
            employee_name,
            employee_id,
            department
          )
        `)
        .eq('status', status)
        .order('submitted_date', { ascending: false });

      if (meritError) {
        console.error('Error fetching KPI merit:', meritError);
      } else if (meritData) {
        console.log('Found KPI Merit records:', meritData);
        meritData.forEach((merit: any) => {
          kpis.push({
            id: merit.id,
            employee_name: merit.employees.employee_name,
            employee_id: merit.employees.employee_id,
            department: merit.employees.department,
            kpi_type: 'KPI Merit',
            submitted_date: new Date(merit.submitted_date || merit.created_at),
            checked_date: merit.checked_date ? new Date(merit.checked_date) : undefined,
            status: merit.status || 'pending_checker'
          });
        });
      }

      console.log('Total pending KPIs found:', kpis.length);
      setPendingKPIs(kpis);
    } catch (error) {
      console.error('Error fetching pending KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionLink = (kpiType: string, kpiId: string) => {
    if (userRole === 'checker') {
      return `/manager/kpi-checker?kpi=${kpiId}&type=${kpiType.toLowerCase().replace(' ', '_')}`;
    } else {
      return `/manager/kpi-approver?kpi=${kpiId}&type=${kpiType.toLowerCase().replace(' ', '_')}`;
    }
  };

  const getStatusBadge = (status: string) => {
    if (userRole === 'checker') {
      return (
        <Badge className="bg-blue-100 text-blue-700">
          รอตรวจสอบ
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-purple-100 text-purple-700">
          รออนุมัติ
        </Badge>
      );
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            รายการ KPI ที่รอการ{userRole === 'checker' ? 'ตรวจสอบ' : 'อนุมัติ'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          รายการ KPI ที่รอการ{userRole === 'checker' ? 'ตรวจสอบ' : 'อนุมัติ'} ({pendingKPIs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingKPIs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium">ชื่อพนักงาน</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium">รหัสพนักงาน</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium">แผนก</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium">ประเภท KPI</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-medium">วันที่ส่ง</th>
                  {userRole === 'approver' && (
                    <th className="border border-gray-300 px-4 py-3 text-left font-medium">วันที่ตรวจสอบ</th>
                  )}
                  <th className="border border-gray-300 px-4 py-3 text-center font-medium">สถานะ</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-medium">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {pendingKPIs.map((kpi, index) => (
                  <tr key={kpi.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-3">{kpi.employee_name}</td>
                    <td className="border border-gray-300 px-4 py-3">{kpi.employee_id}</td>
                    <td className="border border-gray-300 px-4 py-3">{kpi.department}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <Badge variant="outline">{kpi.kpi_type}</Badge>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {kpi.submitted_date.toLocaleDateString('th-TH')}
                    </td>
                    {userRole === 'approver' && (
                      <td className="border border-gray-300 px-4 py-3">
                        {kpi.checked_date?.toLocaleDateString('th-TH') || '-'}
                      </td>
                    )}
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      {getStatusBadge(kpi.status)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <Link to={getActionLink(kpi.kpi_type, kpi.id)}>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          {userRole === 'checker' ? 'ตรวจสอบ' : 'อนุมัติ'}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ไม่มี KPI ที่รอการ{userRole === 'checker' ? 'ตรวจสอบ' : 'อนุมัติ'}
            </h3>
            <p className="text-gray-600">
              ขณะนี้ไม่มี KPI ที่ต้องดำเนินการ
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIApprovalTable;
