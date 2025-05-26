
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
  Award,
  GitBranch,
  Settings,
  FileText
} from 'lucide-react';
import AppraisalTemplateManager from '@/components/performance/AppraisalTemplateManager';
import AppraisalCycleManager from '@/components/performance/AppraisalCycleManager';
import AppraisalManager from '@/components/performance/AppraisalManager';
import PerformanceDashboard from '@/components/performance/PerformanceDashboard';
import FeedbackManager from '@/components/performance/FeedbackManager';
import { Link } from 'react-router-dom';

const PerformanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demonstration
  const stats = {
    total_appraisals: 2000,
    completed_appraisals: 1650,
    pending_appraisals: 350,
    average_score: 4.12,
    excellent_performers: 320,
    good_performers: 890,
    average_performers: 440,
    poor_performers: 10
  };

  const completionRate = (stats.completed_appraisals / stats.total_appraisals) * 100;

  const recentActivities = [
    {
      id: '1',
      type: 'appraisal_completed',
      message: 'สมชาย ใจดี เสร็จสิ้นการประเมินตนเอง',
      time: '5 นาทีที่แล้ว',
      icon: Award
    },
    {
      id: '2',
      type: 'feedback_received',
      message: 'ได้รับ feedback จากผู้จัดการสำหรับ สมหญิง รักษ์ดี',
      time: '15 นาทีที่แล้ว',
      icon: MessageSquare
    },
    {
      id: '3',
      type: 'template_created',
      message: 'สร้างเทมเพลตใหม่: การประเมินผู้เชี่ยวชาญ',
      time: '1 ชั่วโมงที่แล้ว',
      icon: ClipboardList
    },
    {
      id: '4',
      type: 'cycle_started',
      message: 'เริ่มรอบการประเมินไตรมาส Q1/2024',
      time: '2 ชั่วโมงที่แล้ว',
      icon: Calendar
    }
  ];

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
              <Link to="/workflows">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Workflows
                </Button>
              </Link>
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
                    {stats.average_score.toFixed(2)}
                  </CardTitle>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-200" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 shadow-lg border-0">
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
                    <div className="text-sm text-gray-600">ดีเยี่ยม</div>
                    <div className="text-xs text-gray-500">(4.5-5.0)</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.good_performers}</div>
                    <div className="text-sm text-gray-600">ดี</div>
                    <div className="text-xs text-gray-500">(3.5-4.49)</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{stats.average_performers}</div>
                    <div className="text-sm text-gray-600">ปานกลาง</div>
                    <div className="text-xs text-gray-500">(2.5-3.49)</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{stats.poor_performers}</div>
                    <div className="text-sm text-gray-600">ต้องปรับปรุง</div>
                    <div className="text-xs text-gray-500">(&lt;2.5)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                กิจกรรมล่าสุด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                ดูกิจกรรมทั้งหมด
              </Button>
            </CardContent>
          </Card>
        </div>

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
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  ระบบ Feedback และการประเมินแบบ 360 องศา
                </CardTitle>
                <CardDescription>
                  จัดการและดูผลการให้ feedback จากผู้บังคับบัญชาและเพื่อนร่วมงาน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
                    <CardContent className="pt-6 text-center">
                      <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-medium text-blue-900 mb-2">ให้ Feedback</h3>
                      <p className="text-sm text-blue-700 mb-4">ประเมินและให้ feedback พนักงาน</p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        เริ่มให้ Feedback
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-green-300 bg-green-50">
                    <CardContent className="pt-6 text-center">
                      <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-medium text-green-900 mb-2">ดู Feedback</h3>
                      <p className="text-sm text-green-700 mb-4">ดู feedback ที่ได้รับ</p>
                      <Button size="sm" variant="outline" className="border-green-600 text-green-600">
                        ดู Feedback
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-purple-300 bg-purple-50">
                    <CardContent className="pt-6 text-center">
                      <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="font-medium text-purple-900 mb-2">รายงาน Feedback</h3>
                      <p className="text-sm text-purple-700 mb-4">สรุปผล feedback และแนวโน้ม</p>
                      <Button size="sm" variant="outline" className="border-purple-600 text-purple-600">
                        ดูรายงาน
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    ระบบ Feedback กำลังพัฒนาเพิ่มเติม
                  </h3>
                  <p className="text-gray-500 mb-4">
                    ใช้หน้า Workflows สำหรับการดำเนินการ feedback ในระหว่างนี้
                  </p>
                  <Link to="/workflows">
                    <Button>
                      <GitBranch className="w-4 h-4 mr-2" />
                      ไปที่ Workflows
                    </Button>
                  </Link>
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
