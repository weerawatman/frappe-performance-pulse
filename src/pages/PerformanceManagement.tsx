
import React from 'react';
import PerformanceDashboard from '@/components/performance/PerformanceDashboard';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import Feedback360Manager from '@/components/performance/Feedback360Manager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  MessageCircle,
  Target
} from 'lucide-react';

const PerformanceManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
            <p className="text-gray-600">จัดการระบบประเมินผลงานและพัฒนาพนักงาน</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter userId="1" />
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="feedback360" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Feedback 360°
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <PerformanceDashboard />
          </TabsContent>

          <TabsContent value="feedback360">
            <Feedback360Manager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceManagement;
