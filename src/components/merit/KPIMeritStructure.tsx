
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Heart, TrendingUp } from 'lucide-react';
import { KPIMerit } from '@/types/merit';

interface KPIMeritStructureProps {
  kpiMerit: KPIMerit;
}

const KPIMeritStructure: React.FC<KPIMeritStructureProps> = ({ kpiMerit }) => {
  const components = [
    {
      id: 'kpi',
      name: 'KPI Achievement',
      description: 'ผลการทำงานตามเป้าหมาย KPI ที่กำหนดไว้',
      weight: kpiMerit.kpi_achievement_weight,
      score: kpiMerit.kpi_achievement_score,
      icon: <Target className="w-6 h-6" />,
      color: 'bg-green-100 text-green-700',
      status: 'เสร็จสิ้น'
    },
    {
      id: 'competency',
      name: 'Competency',
      description: 'ความสามารถและทักษะที่จำเป็นสำหรับตำแหน่งงาน',
      weight: kpiMerit.competency_weight,
      score: null,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-700',
      status: 'กำลังประเมิน'
    },
    {
      id: 'culture',
      name: 'Culture',
      description: 'การปฏิบัติตามค่านิยมและวัฒนธรรมองค์กร',
      weight: kpiMerit.culture_weight,
      score: null,
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-700',
      status: 'กำลังประเมิน'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          โครงสร้าง KPI Merit
        </CardTitle>
        <p className="text-sm text-gray-600">
          การประเมิน KPI Merit ประกอบด้วย 3 ส่วนหลัก สำหรับการพิจารณาปรับขึ้นเงินเดือน
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {components.map((component) => (
            <div key={component.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${component.color}`}>
                  {component.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{component.name}</h4>
                    <Badge variant="outline" className="text-sm">
                      {component.weight}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary"
                      className={component.score !== null ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                    >
                      {component.status}
                    </Badge>
                    {component.score !== null && (
                      <span className="text-lg font-bold text-gray-900">{component.score} คะแนน</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">การคำนวณคะแนนรวม</h4>
              <p className="text-sm text-blue-700 mb-2">
                คะแนนรวม = (KPI Achievement × 40%) + (Competency × 30%) + (Culture × 30%)
              </p>
              <p className="text-sm text-blue-600">
                <strong>หมายเหตุ:</strong> Competency และ Culture จะต้องได้รับการประเมินจากผู้บังคับบัญชาก่อนที่จะส่งอนุมัติ
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIMeritStructure;
