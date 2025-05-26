
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getKPIBonusByStatus, getKPIMeritByStatus, type KPIBonusWithEmployee, type KPIMeritWithEmployee } from '@/services/kpiService';

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
      
      const [bonusData, meritData] = await Promise.all([
        getKPIBonusByStatus(status),
        getKPIMeritByStatus(status)
      ]);

      const kpis: PendingKPI[] = [];

      // Process KPI Bonus data
      bonusData.forEach((bonus: KPIBonusWithEmployee) => {
        if (bonus.employee) {
          kpis.push({
            id: bonus.id,
            employee_name: bonus.employee.employee_name,
            employee_id: bonus.employee.employee_id,
            department: bonus.employee.department,
            kpi_type: 'KPI Bonus',
            submitted_date: new Date(bonus.submitted_date || bonus.created_at),
            checked_date: bonus.checked_date ? new Date(bonus.checked_date) : undefined,
            status: bonus.status || 'pending_checker'
          });
        }
      });

      // Process KPI Merit data
      meritData.forEach((merit: KPIMeritWithEmployee) => {
        if (merit.employee) {
          kpis.push({
            id: merit.id,
            employee_name: merit.employee.employee_name,
            employee_id: merit.employee.employee_id,
            department: merit.employee.department,
            kpi_type: 'KPI Merit',
            submitted_date: new Date(merit.submitted_date || merit.created_at),
            checked_date: merit.checked_date ? new Date(merit.checked_date) : undefined,
            status: merit.status || 'pending_checker'
          });
        }
      });

      setPendingKPIs(kpis);
    } catch (error) {
      console.error('Error fetching pending KPIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionLink = (kpiType: string) => {
    return userRole === 'checker' ? '/manager/kpi-checker' : '/manager/kpi-approver';
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
                      <Link to={getActionLink(kpi.kpi_type)}>
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
