
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Users, Award } from 'lucide-react';
import KPIBonusEvaluation from '@/components/performance/evaluation/KPIBonusEvaluation';
import KPIMeritEvaluation from '@/components/performance/evaluation/KPIMeritEvaluation';

const PerformanceEvaluationPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'mid' | 'end'>('mid');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ประเมินผลงาน</h1>
            <p className="text-gray-600">ประเมินผลงาน KPI Bonus และ KPI Merit</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <Calendar className="w-4 h-4 mr-2" />
              ปี 2024
            </Badge>
          </div>
        </div>

        {/* Period Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>เลือกรอบการประเมิน</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as 'mid' | 'end')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mid" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  ประเมินกลางปี
                </TabsTrigger>
                <TabsTrigger value="end" className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  ประเมินปลายปี
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Evaluation Tabs */}
        <Tabs defaultValue="kpi-bonus" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="kpi-bonus" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              KPI Bonus
            </TabsTrigger>
            <TabsTrigger value="kpi-merit" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              KPI Merit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kpi-bonus">
            <KPIBonusEvaluation period={selectedPeriod} />
          </TabsContent>

          <TabsContent value="kpi-merit">
            <KPIMeritEvaluation period={selectedPeriod} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceEvaluationPage;
