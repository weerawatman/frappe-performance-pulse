
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown,
  Star,
  Target,
  MessageSquare,
  FileText,
  Calendar,
  Award
} from 'lucide-react';
import KPIBonusResultsCard from '@/components/performance/results/KPIBonusResultsCard';
import KPIMeritResultsCard from '@/components/performance/results/KPIMeritResultsCard';
import FeedbackSection from '@/components/performance/results/FeedbackSection';
import DevelopmentPlanSection from '@/components/performance/results/DevelopmentPlanSection';

const EmployeePerformanceResultsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'mid-year' | 'end-year'>('mid-year');

  // Mock data - ในระบบจริงจะมาจาก API
  const mockPerformanceData = {
    'mid-year': {
      kpiBonus: {
        totalScore: 85.5,
        maxScore: 100,
        items: [
          {
            id: '1',
            name: 'ยอดขายรายเดือน',
            target: '1,000,000 บาท',
            actual: '1,200,000 บาท',
            achievement: 120,
            weight: 40,
            score: 48,
            status: 'achieved'
          },
          {
            id: '2',
            name: 'ลูกค้าใหม่ต่อเดือน',
            target: '50 ราย',
            actual: '45 ราย',
            achievement: 90,
            weight: 30,
            score: 27,
            status: 'not_achieved'
          },
          {
            id: '3',
            name: 'ความพึงพอใจลูกค้า',
            target: '4.5/5.0',
            actual: '4.2/5.0',
            achievement: 93.3,
            weight: 30,
            score: 28,
            status: 'achieved'
          }
        ],
        trend: 'up',
        previousScore: 78.2
      },
      kpiMerit: {
        totalScore: 82.5,
        components: {
          kpiAchievement: { score: 34.2, weight: 40, maxScore: 40 },
          competency: { score: 25.8, weight: 30, maxScore: 30 },
          culture: { score: 22.5, weight: 30, maxScore: 30 }
        },
        trend: 'up',
        previousScore: 79.1
      },
      feedback: [
        {
          id: '1',
          type: 'checker',
          author: 'สมชาย ผู้จัดการ',
          role: 'Checker',
          date: new Date('2024-03-15'),
          category: 'strength',
          content: 'มีผลงานยอดเยี่ยมในการขาย สามารถเกินเป้าหมายได้อย่างต่อเนื่อง'
        },
        {
          id: '2',
          type: 'checker',
          author: 'สมชาย ผู้จัดการ',
          role: 'Checker',
          date: new Date('2024-03-15'),
          category: 'development',
          content: 'ควรพัฒนาทักษะการหาลูกค้าใหม่เพื่อให้บรรลุเป้าหมาย'
        },
        {
          id: '3',
          type: 'approver',
          author: 'สมหญิง ผู้อำนวยการ',
          role: 'Approver',
          date: new Date('2024-03-20'),
          category: 'suggestion',
          content: 'แนะนำให้เข้าร่วมการฝึกอบรม Sales Excellence Program'
        }
      ]
    },
    'end-year': {
      // Similar structure for end-year data
      kpiBonus: {
        totalScore: 0,
        maxScore: 100,
        items: [],
        trend: 'stable',
        previousScore: 0
      },
      kpiMerit: {
        totalScore: 0,
        components: {
          kpiAchievement: { score: 0, weight: 40, maxScore: 40 },
          competency: { score: 0, weight: 30, maxScore: 30 },
          culture: { score: 0, weight: 30, maxScore: 30 }
        },
        trend: 'stable',
        previousScore: 0
      },
      feedback: []
    }
  };

  const currentData = mockPerformanceData[selectedPeriod];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'ดีเยี่ยม';
    if (score >= 80) return 'ดี';
    if (score >= 70) return 'ปานกลาง';
    if (score >= 60) return 'พอใช้';
    return 'ต้องปรับปรุง';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ผลการประเมินผลงาน</h1>
              <p className="text-gray-600 mt-2">ดูผลการประเมินและ Feedback จากหัวหน้าและผู้บริหาร</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">พนักงาน</p>
                <p className="font-medium">สมชาย ใจดี</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">แผนก</p>
                <p className="font-medium">ฝ่ายขาย</p>
              </div>
            </div>
          </div>
        </div>

        {/* Period Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              เลือกรอบการประเมิน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as 'mid-year' | 'end-year')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mid-year">ประเมินกลางปี</TabsTrigger>
                <TabsTrigger value="end-year">ประเมินปลายปี</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Target className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">คะแนน KPI Bonus</p>
                  <p className={`text-2xl font-bold ${getScoreColor(currentData.kpiBonus.totalScore)}`}>
                    {currentData.kpiBonus.totalScore.toFixed(1)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {currentData.kpiBonus.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-xs text-gray-600">
                      {currentData.kpiBonus.previousScore.toFixed(1)} รอบก่อน
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Star className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">คะแนน KPI Merit</p>
                  <p className={`text-2xl font-bold ${getScoreColor(currentData.kpiMerit.totalScore)}`}>
                    {currentData.kpiMerit.totalScore.toFixed(1)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {currentData.kpiMerit.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-xs text-gray-600">
                      {currentData.kpiMerit.previousScore.toFixed(1)} รอบก่อน
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Award className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">เกรดโดยรวม</p>
                  <p className={`text-2xl font-bold ${getScoreColor(currentData.kpiMerit.totalScore)}`}>
                    {getScoreGrade(currentData.kpiMerit.totalScore)}
                  </p>
                  <Badge className="mt-1" variant="outline">
                    {currentData.kpiMerit.totalScore.toFixed(1)} คะแนน
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KPI Bonus Results */}
          <KPIBonusResultsCard 
            data={currentData.kpiBonus}
            period={selectedPeriod}
          />

          {/* KPI Merit Results */}
          <KPIMeritResultsCard 
            data={currentData.kpiMerit}
            period={selectedPeriod}
          />
        </div>

        {/* Feedback Section */}
        <FeedbackSection 
          feedback={currentData.feedback}
          period={selectedPeriod}
        />

        {/* Development Plan Section */}
        <DevelopmentPlanSection 
          period={selectedPeriod}
        />
      </div>
    </div>
  );
};

export default EmployeePerformanceResultsPage;
