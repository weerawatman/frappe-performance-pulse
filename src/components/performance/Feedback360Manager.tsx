
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageCircle, 
  BarChart3, 
  Target,
  Plus,
  Eye,
  Send,
  Clock,
  CheckCircle2
} from 'lucide-react';
import FeedbackRequestManager from './feedback360/FeedbackRequestManager';
import FeedbackCollectionManager from './feedback360/FeedbackCollectionManager';
import FeedbackAnalysisManager from './feedback360/FeedbackAnalysisManager';
import DevelopmentPlanManager from './feedback360/DevelopmentPlanManager';
import { Feedback360Request, Feedback360Response, Feedback360Analysis } from '@/types/feedback360';

const Feedback360Manager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');

  // Mock data for demonstration
  const mockRequests: Feedback360Request[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'สมชาย ใจดี',
      appraisalId: 'APP001',
      sources: [
        { id: '1', name: 'ผู้จัดการ A', email: 'manager@company.com', type: 'supervisor', relationship: 'หัวหน้าโดยตรง', isRequired: true },
        { id: '2', name: 'เพื่อนร่วมงาน B', email: 'peer1@company.com', type: 'peer', relationship: 'เพื่อนร่วมทีม', isRequired: true },
        { id: '3', name: 'เพื่อนร่วมงาน C', email: 'peer2@company.com', type: 'peer', relationship: 'เพื่อนร่วมแผนก', isRequired: false },
        { id: '4', name: 'ผู้ใต้บังคับบัญชา D', email: 'sub@company.com', type: 'subordinate', relationship: 'ทีมงาน', isRequired: true },
        { id: '5', name: 'ลูกค้า E', email: 'customer@client.com', type: 'customer', relationship: 'ลูกค้าหลัก', isRequired: false }
      ],
      status: 'In Progress',
      deadline: new Date('2024-02-15'),
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'สมหญิง รักษ์ดี',
      appraisalId: 'APP002',
      sources: [
        { id: '6', name: 'ผู้จัดการ F', email: 'manager2@company.com', type: 'supervisor', relationship: 'หัวหน้าโดยตรง', isRequired: true },
        { id: '7', name: 'เพื่อนร่วมงาน G', email: 'peer3@company.com', type: 'peer', relationship: 'เพื่อนร่วมทีม', isRequired: true }
      ],
      status: 'Completed',
      deadline: new Date('2024-01-31'),
      createdAt: new Date('2024-01-01'),
      completedAt: new Date('2024-01-25')
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Badge variant="secondary">ร่าง</Badge>;
      case 'Sent':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">ส่งแล้ว</Badge>;
      case 'In Progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">กำลังดำเนินการ</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Clock className="w-4 h-4" />;
      case 'Sent':
        return <Send className="w-4 h-4" />;
      case 'In Progress':
        return <MessageCircle className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Feedback 360 องศา</h2>
          <p className="text-gray-600">ระบบรวบรวมและวิเคราะห์ feedback จากหลายมุมมอง</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          สร้าง Feedback 360 ใหม่
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">คำขอ Feedback ทั้งหมด</p>
                <p className="text-2xl font-bold">{mockRequests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">กำลังดำเนินการ</p>
                <p className="text-2xl font-bold">
                  {mockRequests.filter(r => r.status === 'In Progress').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">เสร็จสิ้นแล้ว</p>
                <p className="text-2xl font-bold">
                  {mockRequests.filter(r => r.status === 'Completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">อัตราการตอบกลับ</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            การจัดการคำขอ
          </TabsTrigger>
          <TabsTrigger value="collection" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            รวบรวม Feedback
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            วิเคราะห์ผล
          </TabsTrigger>
          <TabsTrigger value="development" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            แผนพัฒนา
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <FeedbackRequestManager requests={mockRequests} />
        </TabsContent>

        <TabsContent value="collection">
          <FeedbackCollectionManager requests={mockRequests} />
        </TabsContent>

        <TabsContent value="analysis">
          <FeedbackAnalysisManager />
        </TabsContent>

        <TabsContent value="development">
          <DevelopmentPlanManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Feedback360Manager;
