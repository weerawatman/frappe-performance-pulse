
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface KPIApprovalTableProps {
  userRole: 'checker' | 'approver';
}

const KPIApprovalTable: React.FC<KPIApprovalTableProps> = ({ userRole }) => {
  // Mock data - ในระบบจริงควรดึงจาก API
  const pendingKPIs = userRole === 'checker' ? [
    {
      id: '1',
      employee_name: 'สมชาย ใจดี',
      employee_id: 'EMP001',
      department: 'การขาย',
      kpi_type: 'KPI Bonus',
      submitted_date: new Date('2024-01-15'),
      status: 'pending_checker'
    },
    {
      id: '2',
      employee_name: 'สมหญิง สวยใส',
      employee_id: 'EMP002',
      department: 'การตลาด',
      kpi_type: 'KPI Merit',
      submitted_date: new Date('2024-01-16'),
      status: 'pending_checker'
    }
  ] : [
    {
      id: '3',
      employee_name: 'สมศักดิ์ ดีมาก',
      employee_id: 'EMP003',
      department: 'IT',
      kpi_type: 'KPI Bonus',
      submitted_date: new Date('2024-01-14'),
      checked_date: new Date('2024-01-17'),
      status: 'pending_approver'
    }
  ];

  const getActionLink = (kpiType: string) => {
    return userRole === 'checker' ? '/manager/kpi-checker' : '/manager/kpi-approver';
  };

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
                    {userRole === 'approver' && 'checked_date' in kpi && (
                      <td className="border border-gray-300 px-4 py-3">
                        {kpi.checked_date?.toLocaleDateString('th-TH')}
                      </td>
                    )}
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <Badge className={
                        userRole === 'checker' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }>
                        {userRole === 'checker' ? 'รอตรวจสอบ' : 'รออนุมัติ'}
                      </Badge>
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
