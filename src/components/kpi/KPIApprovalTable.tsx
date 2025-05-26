
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Eye, Clock, User } from 'lucide-react';

interface KPIApprovalItem {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  kpiType: 'KPI Bonus' | 'KPI Merit';
  submittedDate: Date;
  status: 'pending_checker' | 'pending_approver';
  totalKPIs: number;
}

interface KPIApprovalTableProps {
  userRole: 'checker' | 'approver';
}

const KPIApprovalTable: React.FC<KPIApprovalTableProps> = ({ userRole }) => {
  const { toast } = useToast();
  
  // Mock data for pending approvals
  const [pendingApprovals, setPendingApprovals] = useState<KPIApprovalItem[]>([
    {
      id: '1',
      employeeName: 'สมชาย ใจดี',
      employeeId: 'EMP001',
      department: 'การขาย',
      kpiType: 'KPI Bonus',
      submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: userRole === 'checker' ? 'pending_checker' : 'pending_approver',
      totalKPIs: 5
    },
    {
      id: '2',
      employeeName: 'สมหญิง ดีใจ',
      employeeId: 'EMP002',
      department: 'การตลาด',
      kpiType: 'KPI Merit',
      submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: userRole === 'checker' ? 'pending_checker' : 'pending_approver',
      totalKPIs: 3
    }
  ]);

  const handleApprove = async (itemId: string) => {
    const item = pendingApprovals.find(p => p.id === itemId);
    if (!item) return;

    try {
      // Remove from pending list
      setPendingApprovals(prev => prev.filter(p => p.id !== itemId));
      
      if (userRole === 'checker') {
        toast({
          title: "อนุมัติสำเร็จ",
          description: `${item.kpiType} ของ ${item.employeeName} ได้ถูกส่งไปยัง Approver แล้ว`,
        });
      } else {
        toast({
          title: "อนุมัติสำเร็จ",
          description: `${item.kpiType} ของ ${item.employeeName} ได้รับการอนุมัติเรียบร้อยแล้ว`,
        });
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอนุมัติได้",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (itemId: string) => {
    const item = pendingApprovals.find(p => p.id === itemId);
    if (!item) return;

    try {
      // Remove from pending list
      setPendingApprovals(prev => prev.filter(p => p.id !== itemId));
      
      toast({
        title: "ไม่อนุมัติ",
        description: `${item.kpiType} ของ ${item.employeeName} ถูกส่งกลับไปแก้ไข`,
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถดำเนินการได้",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_checker':
        return <Badge className="bg-blue-100 text-blue-700">รอ Checker</Badge>;
      case 'pending_approver':
        return <Badge className="bg-purple-100 text-purple-700">รอ Approve</Badge>;
      default:
        return <Badge variant="secondary">ไม่ทราบสถานะ</Badge>;
    }
  };

  const getDaysAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} วันที่แล้ว`;
  };

  if (pendingApprovals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            รอการอนุมัติ ({userRole === 'checker' ? 'Checker' : 'Approver'})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>ไม่มีรายการที่รอการอนุมัติ</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          รอการอนุมัติ ({userRole === 'checker' ? 'Checker' : 'Approver'}) ({pendingApprovals.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.employeeName}</h4>
                    <p className="text-sm text-gray-600">{item.employeeId} - {item.department}</p>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">ประเภท KPI</p>
                  <p className="font-medium">{item.kpiType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">จำนวน KPI</p>
                  <p className="font-medium">{item.totalKPIs} รายการ</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">วันที่ส่ง</p>
                  <p className="font-medium">{getDaysAgo(item.submittedDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">สถานะ</p>
                  <p className="font-medium">
                    {userRole === 'checker' ? 'รอตรวจสอบ' : 'รออนุมัติ'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  ดูรายละเอียด
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleApprove(item.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  อนุมัติ
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleReject(item.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  ไม่อนุมัติ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIApprovalTable;
