
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Eye,
  FileText,
  Star,
  Target,
  AlertTriangle
} from 'lucide-react';
import { Feedback360Analysis, FeedbackSourceType } from '@/types/feedback360';

const FeedbackAnalysisManager: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');

  // Mock analysis data
  const mockAnalyses: Feedback360Analysis[] = [
    {
      employeeId: 'EMP001',
      employeeName: 'สมชาย ใจดี',
      overallScore: 4.2,
      scoresBySource: {
        supervisor: 4.5,
        peer: 4.1,
        subordinate: 4.0,
        customer: 4.3,
        self: 3.8
      },
      scoresByCategory: {
        'ผลงาน': 4.4,
        'ความรับผิดชอบ': 4.3,
        'ภาวะผู้นำ': 4.0,
        'การทำงานเป็นทีม': 4.2,
        'การสื่อสาร': 4.1,
        'การช่วยเหลือ': 4.3,
        'การพัฒนาทีม': 3.9,
        'ความยุติธรรม': 4.1,
        'การบริการ': 4.4,
        'การตอบสนอง': 4.2
      },
      strengths: [
        'มีผลงานที่โดดเด่นและสามารถบรรลุเป้าหมายได้',
        'มีความรับผิดชอบสูงต่อหน้าที่',
        'ให้บริการลูกค้าได้ดีเยี่ยม',
        'ช่วยเหลือเพื่อนร่วมงานเป็นอย่างดี'
      ],
      developmentAreas: [
        'ควรพัฒนาทักษะการเป็นผู้นำให้มากขึ้น',
        'ควรปรับปรุงการให้คำแนะนำแก่ผู้ใต้บังคับบัญชา',
        'ควรมีความมั่นใจในตนเองมากขึ้น'
      ],
      recommendations: [
        'เข้าร่วมโปรแกรมพัฒนาภาวะผู้นำ',
        'ฝึกอบรมการเป็น Mentor',
        'เข้าร่วมกิจกรรมเสริมสร้างความมั่นใจ'
      ],
      gapAnalysis: {
        selfVsOthers: -0.4,
        supervisorVsPeers: 0.4,
        categories: {
          'ผลงาน': { self: 3.8, others: 4.6, gap: -0.8 },
          'ความรับผิดชอบ': { self: 4.0, others: 4.4, gap: -0.4 },
          'ภาวะผู้นำ': { self: 3.5, others: 4.1, gap: -0.6 },
          'การทำงานเป็นทีม': { self: 4.0, others: 4.3, gap: -0.3 },
          'การสื่อสาร': { self: 3.8, others: 4.2, gap: -0.4 }
        }
      }
    },
    {
      employeeId: 'EMP002',
      employeeName: 'สมหญิง รักษ์ดี',
      overallScore: 4.6,
      scoresBySource: {
        supervisor: 4.7,
        peer: 4.5,
        subordinate: 4.6,
        customer: 4.8,
        self: 4.4
      },
      scoresByCategory: {
        'ผลงาน': 4.8,
        'ความรับผิดชอบ': 4.6,
        'ภาวะผู้นำ': 4.5,
        'การทำงานเป็นทีม': 4.6,
        'การสื่อสาร': 4.7,
        'การช่วยเหลือ': 4.5,
        'การพัฒนาทีม': 4.4,
        'ความยุติธรรม': 4.6,
        'การบริการ': 4.9,
        'การตอบสนอง': 4.7
      },
      strengths: [
        'มีผลงานยอดเยี่ยมและเป็นแบบอย่างที่ดี',
        'มีภาวะผู้นำที่โดดเด่น',
        'สื่อสารได้ชัดเจนและมีประสิทธิภาพ',
        'ให้บริการลูกค้าในระดับเยี่ยม'
      ],
      developmentAreas: [
        'ควรเพิ่มการมอบหมายงานให้ทีม',
        'ควรพัฒนาทักษะการจัดการเวลา'
      ],
      recommendations: [
        'เป็น Mentor สำหรับพนักงานใหม่',
        'เข้าร่วมโปรแกรมผู้นำระดับสูง',
        'ฝึกอบรมการจัดการเวลา'
      ],
      gapAnalysis: {
        selfVsOthers: -0.2,
        supervisorVsPeers: 0.2,
        categories: {
          'ผลงาน': { self: 4.5, others: 4.9, gap: -0.4 },
          'ความรับผิดชอบ': { self: 4.4, others: 4.7, gap: -0.3 },
          'ภาวะผู้นำ': { self: 4.2, others: 4.6, gap: -0.4 },
          'การทำงานเป็นทีม': { self: 4.5, others: 4.7, gap: -0.2 },
          'การสื่อสาร': { self: 4.6, others: 4.8, gap: -0.2 }
        }
      }
    }
  ];

  const selectedAnalysis = mockAnalyses.find(a => a.employeeId === selectedEmployee);

  const getSourceTypeLabel = (type: FeedbackSourceType) => {
    switch (type) {
      case 'supervisor': return 'หัวหน้า';
      case 'peer': return 'เพื่อนร่วมงาน';
      case 'subordinate': return 'ผู้ใต้บังคับบัญชา';
      case 'customer': return 'ลูกค้า';
      case 'self': return 'ตนเอง';
      default: return type;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGapColor = (gap: number) => {
    if (gap > 0.5) return 'text-green-600';
    if (gap >= -0.2) return 'text-blue-600';
    if (gap >= -0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Data for charts
  const sourceScoreData = selectedAnalysis ? Object.entries(selectedAnalysis.scoresBySource).map(([source, score]) => ({
    source: getSourceTypeLabel(source as FeedbackSourceType),
    score: score || 0
  })) : [];

  const categoryScoreData = selectedAnalysis ? Object.entries(selectedAnalysis.scoresByCategory).map(([category, score]) => ({
    category,
    score
  })) : [];

  const radarData = selectedAnalysis ? Object.entries(selectedAnalysis.scoresByCategory).map(([category, score]) => ({
    category: category.length > 10 ? category.substring(0, 10) + '...' : category,
    fullCategory: category,
    score: score,
    fullMark: 5
  })) : [];

  const gapAnalysisData = selectedAnalysis ? Object.entries(selectedAnalysis.gapAnalysis.categories).map(([category, data]) => ({
    category: category.length > 10 ? category.substring(0, 10) + '...' : category,
    self: data.self,
    others: data.others,
    gap: data.gap
  })) : [];

  return (
    <div className="space-y-6">
      {/* Employee Selection */}
      <Card>
        <CardHeader>
          <CardTitle>เลือกพนักงานเพื่อวิเคราะห์ผล Feedback 360</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกพนักงาน" />
            </SelectTrigger>
            <SelectContent>
              {mockAnalyses.map(analysis => (
                <SelectItem key={analysis.employeeId} value={analysis.employeeId}>
                  {analysis.employeeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedAnalysis && (
        <>
          {/* Overall Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Star className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">คะแนนรวม</p>
                    <p className={`text-2xl font-bold ${getScoreColor(selectedAnalysis.overallScore)}`}>
                      {selectedAnalysis.overallScore.toFixed(1)}/5.0
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">จุดแข็ง</p>
                    <p className="text-2xl font-bold">{selectedAnalysis.strengths.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">จุดพัฒนา</p>
                    <p className="text-2xl font-bold">{selectedAnalysis.developmentAreas.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">ช่องว่างการรับรู้</p>
                    <p className={`text-2xl font-bold ${getGapColor(selectedAnalysis.gapAnalysis.selfVsOthers)}`}>
                      {selectedAnalysis.gapAnalysis.selfVsOthers > 0 ? '+' : ''}{selectedAnalysis.gapAnalysis.selfVsOthers.toFixed(1)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Source Scores Chart */}
            <Card>
              <CardHeader>
                <CardTitle>คะแนนจากแต่ละแหล่ง</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sourceScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>ภาพรวมตามหมวดหมู่</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 5]} />
                    <Radar
                      name="คะแนน"
                      dataKey="score"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>การวิเคราะห์ช่องว่างการรับรู้</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={gapAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="self" fill="#10B981" name="ประเมินตนเอง" />
                  <Bar dataKey="others" fill="#3B82F6" name="ผู้อื่นประเมิน" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  จุดแข็ง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedAnalysis.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm text-green-800">{strength}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Development Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-yellow-600" />
                  จุดที่ควรพัฒนา
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedAnalysis.developmentAreas.map((area, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm text-yellow-800">{area}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                ข้อเสนอแนะการพัฒนา
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedAnalysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              สร้างแผนพัฒนาจาก Feedback นี้
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackAnalysisManager;
