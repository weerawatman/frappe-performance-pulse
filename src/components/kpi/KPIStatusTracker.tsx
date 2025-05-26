
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, AlertCircle, User } from 'lucide-react';
import { KPIBonus, KPIBonusHistory } from '@/types/kpi';

interface KPIStatusTrackerProps {
  kpiBonus: KPIBonus;
}

const statusConfig = {
  'Draft': { 
    label: 'ร่าง', 
    color: 'bg-gray-100 text-gray-800', 
    icon: AlertCircle 
  },
  'Pending_Approval': { 
    label: 'รออนุมัติ', 
    color: 'bg-yellow-100 text-yellow-800', 
    icon: Clock 
  },
  'Approved': { 
    label: 'อนุมัติแล้ว', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle 
  },
  'Rejected': { 
    label: 'ส่งกลับแก้ไข', 
    color: 'bg-red-100 text-red-800', 
    icon: XCircle 
  }
};

const workflowSteps = [
  { id: 'Self', label: 'พนักงาน', description: 'กำหนด KPI' },
  { id: 'Checker', label: 'ผู้ตรวจสอบ', description: 'ตรวจสอบความถูกต้อง' },
  { id: 'Approver', label: 'ผู้อนุมัติ', description: 'อนุมัติ KPI' }
];

const KPIStatusTracker: React.FC<KPIStatusTrackerProps> = ({ kpiBonus }) => {
  const currentStatus = statusConfig[kpiBonus.status];
  const StatusIcon = currentStatus.icon;

  const getCurrentStepIndex = () => {
    return workflowSteps.findIndex(step => step.id === kpiBonus.workflow_step);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StatusIcon className="w-5 h-5" />
            สถานะปัจจุบัน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge className={currentStatus.color}>
                {currentStatus.label}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                อัปเดตล่าสุด: {kpiBonus.modified_at.toLocaleDateString('th-TH')}
              </p>
            </div>
            {kpiBonus.comments && (
              <div className="max-w-md">
                <p className="text-sm font-medium text-gray-900">ความคิดเห็น:</p>
                <p className="text-sm text-gray-600">{kpiBonus.comments}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle>ขั้นตอนการอนุมัติ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStepIndex 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {index < currentStepIndex ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div className="text-center mt-2">
                  <p className={`text-sm font-medium ${
                    index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  <p className={`text-xs ${
                    index <= currentStepIndex ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className={`h-0.5 w-full mt-4 ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
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
            {kpiBonus.history.map((item, index) => (
              <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{item.action}</span>
                    <span className="text-sm text-gray-600">
                      โดย {item.actor_name} ({item.actor_role})
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {item.timestamp.toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {item.comments && (
                    <p className="text-sm text-gray-700 mt-1">{item.comments}</p>
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
