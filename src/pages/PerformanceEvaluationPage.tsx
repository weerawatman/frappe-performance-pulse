
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Users, Award, Building } from 'lucide-react';
import KPIBonusEvaluation from '@/components/performance/evaluation/KPIBonusEvaluation';
import KPIMeritEvaluation from '@/components/performance/evaluation/KPIMeritEvaluation';
import CultureEvaluationTable from '@/components/performance/evaluation/CultureEvaluationTable';
import CorporateKPIDashboard from '@/components/performance/kpi/CorporateKPIDashboard';

interface PerformanceEvaluationPageProps {
  userRole?: 'employee' | 'checker' | 'approver' | 'admin';
}

const PerformanceEvaluationPage: React.FC<PerformanceEvaluationPageProps> = ({ userRole = 'employee' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'mid' | 'end'>('mid');
  const [activeTab, setActiveTab] = useState('kpi-bonus');

  const isAdmin = userRole === 'admin';

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
              ปี 2025
            </Badge>
            {isAdmin && (
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                <Building className="w-4 h-4 mr-1" /> Admin
              </Badge>
            )}
          </div>
        </div>

        {isAdmin && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Corporate KPI Dashboard (Admin View)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CorporateKPIDashboard />
            </CardContent>
          </Card>
        )}

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
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="kpi-bonus" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              KPI Bonus
            </TabsTrigger>
            <TabsTrigger value="kpi-merit" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              KPI Merit
            </TabsTrigger>
            <TabsTrigger value="culture" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Culture
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kpi-bonus">
            <KPIBonusEvaluation period={selectedPeriod} />
          </TabsContent>

          <TabsContent value="kpi-merit">
            <KPIMeritEvaluation period={selectedPeriod} />
          </TabsContent>

          <TabsContent value="culture">
            <CultureEvaluationTable period={selectedPeriod} userRole={userRole} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceEvaluationPage;
