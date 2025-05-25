
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Calendar,
  Plus,
  BarChart3,
  ClipboardList,
  MessageSquare,
  Award
} from 'lucide-react';
import AppraisalTemplateManager from '@/components/performance/AppraisalTemplateManager';
import AppraisalCycleManager from '@/components/performance/AppraisalCycleManager';
import AppraisalManager from '@/components/performance/AppraisalManager';
import PerformanceDashboard from '@/components/performance/PerformanceDashboard';

const PerformanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demonstration
  const stats = {
    total_appraisals: 2000,
    completed_appraisals: 1650,
    pending_appraisals: 350,
    average_score: 78.5,
    excellent_performers: 320,
    good_performers: 890,
    average_performers: 440,
    poor_performers: 0
  };

  const completionRate = (stats.completed_appraisals / stats.total_appraisals) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Performance Management
              </h1>
              <p className="text-lg text-gray-600">
                จัดการการประเมินผลงานพนักงานและ KPI อย่างมีประสิทธิภาพ
              </p>
            </div>
            <div className="flex gap-3">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-5 h-5 mr-2" />
                สร้างการประเมินใหม่
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-blue-100">
                    การประเมินทั้งหมด
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold">
                    {stats.total_appraisals.toLocaleString()}
                  </CardTitle>
                </div>
                <Users className="w-10 h-10 text-blue-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-green-100">
                    เสร็จสิ้นแล้ว
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold">
                    {stats.completed_appraisals.toLocaleString()}
                  </CardTitle>
                </div>
                <Target className="w-10 h-10 text-green-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-orange-100">
                    รอดำเนินการ
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold">
                    {stats.pending_appraisals.toLocaleString()}
                  </CardTitle>
                </div>
                <Calendar className="w-10 h-10 text-orange-200" />
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-purple-100">
                    คะแนนเฉลี่ย
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold">
                    {stats.average_score}%
                  </CardTitle>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-200" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              ความคืบหน้าการประเมิน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">ความสำเร็จโดยรวม</span>
                <span className="text-2xl font-bold text-green-600">
                  {completionRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={completionRate} className="h-3" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.excellent_performers}</div>
                  <div className="text-sm text-gray-600">ดีเยี่ยม (90-100%)</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.good_performers}</div>
                  <div className="text-sm text-gray-600">ดี (80-89%)</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.average_performers}</div>
                  <div className="text-sm text-gray-600">ปานกลาง (70-79%)</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{stats.poor_performers}</div>
                  <div className="text-sm text-gray-600">ต้องปรับปรุง (&lt;70%)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg border h-14">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4" />
              แดชบอร์ด
            </TabsTrigger>
            <TabsTrigger 
              value="templates"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <ClipboardList className="w-4 h-4" />
              เทมเพลต
            </TabsTrigger>
            <TabsTrigger 
              value="cycles"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Calendar className="w-4 h-4" />
              รอบการประเมิน
            </TabsTrigger>
            <TabsTrigger 
              value="appraisals"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Award className="w-4 h-4" />
              การประเมิน
            </TabsTrigger>
            <TabsTrigger 
              value="feedback"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <MessageSquare className="w-4 h-4" />
              ฟีดแบ็ก
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <PerformanceDashboard />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <AppraisalTemplateManager />
          </TabsContent>

          <TabsContent value="cycles" className="space-y-6">
            <AppraisalCycleManager />
          </TabsContent>

          <TabsContent value="appraisals" className="space-y-6">
            <AppraisalManager />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>ระบบ Feedback และการประเมินแบบ 360 องศา</CardTitle>
                <CardDescription>
                  จัดการและดูผลการให้ feedback จากผู้บังคับบัญชาและเพื่อนร่วมงาน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    ระบบ Feedback กำลังพัฒนา
                  </h3>
                  <p className="text-gray-500">
                    ฟีเจอร์นี้จะเปิดใช้งานในเร็วๆ นี้
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceManagement;
