
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, FileText } from 'lucide-react';
import MeritEvaluationTable from './MeritEvaluationTable';

interface KPIMeritEvaluationProps {
  period: 'mid' | 'end';
  userRole?: 'employee' | 'checker' | 'approver';
}

const KPIMeritEvaluation: React.FC<KPIMeritEvaluationProps> = ({ 
  period, 
  userRole = 'employee' 
}) => {
  const [kpiBonusScore] = useState(75); // Mock KPI Bonus score

  const getBadgeVariant = (role: string): "default" | "secondary" | "outline" => {
    switch (role) {
      case 'employee':
        return 'secondary';
      case 'checker':
        return 'default';
      case 'approver':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'employee':
        return 'พนักงาน';
      case 'checker':
        return 'ผู้ตรวจสอบ';
      case 'approver':
        return 'ผู้อนุมัติ';
      default:
        return 'พนักงาน';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              ประเมิน KPI Merit - {period === 'mid' ? 'ครั้งที่ 1 (กลางปี)' : 'ครั้งที่ 2 (ปลายปี)'}
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant={getBadgeVariant(userRole)}>
                {getRoleText(userRole)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {kpiBonusScore}%
              </div>
              <div className="text-sm text-gray-600">KPI Achievement (40%)</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                -
              </div>
              <div className="text-sm text-gray-600">Competency (30%)</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                -
              </div>
              <div className="text-sm text-gray-600">Culture (30%)</div>
            </div>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="text-sm text-yellow-700">
              <strong>การคำนวณคะแนน:</strong> ใช้คะแนนจาก Approver เป็นคะแนนสุดท้าย หากยังไม่มีจะใช้คะแนนจาก Checker หากยังไม่มีจะใช้คะแนนจากการประเมินตนเอง
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Merit Evaluation Tabs */}
      <Tabs defaultValue="competency" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="competency" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Competency Assessment
          </TabsTrigger>
          <TabsTrigger value="culture" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Culture Assessment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="competency">
          <MeritEvaluationTable period={period} userRole={userRole} />
        </TabsContent>

        <TabsContent value="culture">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Culture Assessment จะพัฒนาในเวอร์ชันถัดไป</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KPIMeritEvaluation;
