
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, User, Calendar } from 'lucide-react';
import { KPIBonus } from '@/types/kpi';

interface KPIStatusTrackerProps {
  kpiBonus: KPIBonus;
}

const KPIStatusTracker: React.FC<KPIStatusTrackerProps> = ({ kpiBonus }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">ร่าง</Badge>;
      case 'Pending_Approval':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">รออนุมัติ</Badge>;
      case 'Approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">อนุมัติแล้ว</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">ส่งกลับแก้ไข</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getWorkflowStepIcon = (step: string, isActive: boolean) => {
    const iconClass = isActive ? "text-blue-600" : "text-gray-400";
    switch (step) {
      case 'Self':
        return <User className={`w-5 h-5 ${iconClass}`} />;
      case 'Checker':
        return <CheckCircle className={`w-5 h-5 ${iconClass}`} />;
      case 'Approver':
        return <AlertCircle className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Clock className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'Created':
        return 'สร้างเอกสาร';
      case 'Submitted':
        return 'ส่งอนุมัติ';
      case 'Approved':
        return 'อนุมัติ';
      case 'Rejected':
        return 'ส่งกลับแก้ไข';
      case 'Modified':
        return 'แก้ไข';
      default:
        return action;
    }
  };

  const workflowSteps = [
    { id: 'Self', name: 'พนักงาน', description: 'กำหนด KPI' },
    { id: 'Checker', name: 'ผู้ตรวจสอบ', description: 'ตรวจสอบความถูกต้อง' },
    { id: 'Approver', name: 'ผู้อนุมัติ', description: 'อนุมัติ KPI' }
  ];

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>สถานะปัจจุบัน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">สถานะ</p>
              {getStatusBadge(kpiBonus.status)}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">ขั้นตอนปัจจุบัน</p>
              <div className="flex items-center gap-2">
                {getWorkflowStepIcon(kpiBonus.workflow_step, true)}
                <span className="font-medium">
                  {workflowSteps.find(s => s.id === kpiBonus.workflow_step)?.name}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">จำนวน KPI</p>
              <p className="font-semibold">{kpiBonus.kpi_items.length} รายการ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle>ขั้นตอนการอนุมัติ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => {
              const isActive = step.id === kpiBonus.workflow_step;
              const isCompleted = workflowSteps.findIndex(s => s.id === kpiBonus.workflow_step) > index;
              
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isCompleted ? 'bg-green-100 border-green-500' :
                    isActive ? 'bg-blue-100 border-blue-500' :
                    'bg-gray-100 border-gray-300'
                  }`}>
                    {getWorkflowStepIcon(step.id, isActive || isCompleted)}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                      {step.name}
                    </h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {isCompleted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      เสร็จสิ้น
                    </Badge>
                  )}
                  {isActive && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      กำลังดำเนินการ
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle>ประวัติการดำเนินการ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kpiBonus.history.map((historyItem) => (
              <div key={historyItem.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{getActionText(historyItem.action)}</span>
                    <span className="text-sm text-gray-600">โดย {historyItem.actor_name}</span>
                    <Badge variant="outline" className="text-xs">
                      {historyItem.actor_role}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {historyItem.timestamp.toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {historyItem.comments && (
                    <p className="text-sm text-gray-700 mt-1 p-2 bg-gray-50 rounded">
                      {historyItem.comments}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPIStatusTracker;
