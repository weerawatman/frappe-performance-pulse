
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, GitBranch, BookOpen, TrendingUp, Database, Lightbulb } from 'lucide-react';
import KPICascadeVisualization from '@/components/kpi/KPICascadeVisualization';
import KPILibrary from '@/components/kpi/KPILibrary';
import SMARTGoalHelper from '@/components/kpi/SMARTGoalHelper';
import RealTimeKPIDashboard from '@/components/kpi/RealTimeKPIDashboard';
import DataIntegrationManager from '@/components/kpi/DataIntegrationManager';

const KPIManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cascade');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">การจัดการ KPI ขั้นสูง</h1>
            <p className="text-gray-600">ระบบจัดการ KPI แบบครบวงจร สำหรับปี 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <Target className="w-4 h-4 mr-2" />
              ปี 2025
            </Badge>
          </div>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab('cascade')}>
            <CardContent className="p-4">
              <GitBranch className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold text-sm">KPI Cascade</h3>
              <p className="text-xs text-gray-600">ความเชื่อมโยงของ KPI</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab('library')}>
            <CardContent className="p-4">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold text-sm">ไลบรารี KPI</h3>
              <p className="text-xs text-gray-600">เทมเพลตและตัวอย่าง</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab('smart')}>
            <CardContent className="p-4">
              <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <h3 className="font-semibold text-sm">SMART Goals</h3>
              <p className="text-xs text-gray-600">เครื่องมือช่วยกำหนด</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab('realtime')}>
            <CardContent className="p-4">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold text-sm">Real-time</h3>
              <p className="text-xs text-gray-600">ติดตามแบบเรียลไทม์</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab('integration')}>
            <CardContent className="p-4">
              <Database className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-semibold text-sm">Data Integration</h3>
              <p className="text-xs text-gray-600">เชื่อมโยงข้อมูล</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="cascade" className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              KPI Cascade
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              ไลบรารี
            </TabsTrigger>
            <TabsTrigger value="smart" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              SMART Goals
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Real-time
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Integration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cascade">
            <KPICascadeVisualization />
          </TabsContent>

          <TabsContent value="library">
            <KPILibrary />
          </TabsContent>

          <TabsContent value="smart">
            <SMARTGoalHelper />
          </TabsContent>

          <TabsContent value="realtime">
            <RealTimeKPIDashboard />
          </TabsContent>

          <TabsContent value="integration">
            <DataIntegrationManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KPIManagementPage;
