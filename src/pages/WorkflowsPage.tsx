
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList,
  Calendar,
  Award,
  MessageSquare,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import TemplateWorkflow from '@/components/performance/workflows/TemplateWorkflow';
import CycleWorkflow from '@/components/performance/workflows/CycleWorkflow';
import AppraisalWorkflow from '@/components/performance/workflows/AppraisalWorkflow';
import FeedbackWorkflow from '@/components/performance/workflows/FeedbackWorkflow';

const WorkflowsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const workflows = [
    {
      id: 'template',
      title: 'สร้างเทมเพลตการประเมิน',
      description: 'กำหนด KRA และเกณฑ์การให้คะแนน',
      icon: ClipboardList,
      steps: ['ข้อมูลพื้นฐาน', 'กำหนด KRA', 'เกณฑ์การประเมิน', 'บันทึก'],
      color: 'bg-blue-500'
    },
    {
      id: 'cycle',
      title: 'สร้างรอบการประเมิน',
      description: 'กำหนดช่วงเวลาและเลือกพนักงาน',
      icon: Calendar,
      steps: ['ข้อมูลพื้นฐาน', 'เลือกเทมเพลต', 'เลือกพนักงาน', 'การตั้งค่า', 'บันทึก'],
      color: 'bg-green-500'
    },
    {
      id: 'appraisal',
      title: 'ดำเนินการประเมิน',
      description: 'ประเมิน KRA และประเมินตนเอง',
      icon: Award,
      steps: ['เลือกการประเมิน', 'ประเมิน KRA', 'ประเมินตนเอง', 'ความคิดเห็น', 'ส่งการประเมิน'],
      color: 'bg-purple-500'
    },
    {
      id: 'feedback',
      title: 'ให้ Feedback',
      description: 'ให้คะแนนและความคิดเห็น',
      icon: MessageSquare,
      steps: ['เลือกการประเมิน', 'ให้ feedback', 'ส่ง feedback'],
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Workflows - กระบวนการทำงาน
          </h1>
          <p className="text-lg text-gray-600">
            จัดการกระบวนการทำงานของระบบประเมินผลงานอย่างเป็นขั้นตอน
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg border h-14">
            <TabsTrigger 
              value="overview"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <CheckCircle className="w-4 h-4" />
              ภาพรวม
            </TabsTrigger>
            <TabsTrigger 
              value="template"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <ClipboardList className="w-4 h-4" />
              เทมเพลต
            </TabsTrigger>
            <TabsTrigger 
              value="cycle"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Calendar className="w-4 h-4" />
              รอบการประเมิน
            </TabsTrigger>
            <TabsTrigger 
              value="appraisal"
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
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflows.map((workflow) => {
                const IconComponent = workflow.icon;
                return (
                  <Card key={workflow.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${workflow.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{workflow.title}</CardTitle>
                          <CardDescription>{workflow.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700">ขั้นตอนการทำงาน:</h4>
                        <div className="space-y-2">
                          {workflow.steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </div>
                              <span>{step}</span>
                              {index < workflow.steps.length - 1 && (
                                <ArrowRight className="w-3 h-3 text-gray-400 ml-auto" />
                              )}
                            </div>
                          ))}
                        </div>
                        <Button 
                          className="w-full mt-4"
                          onClick={() => setActiveTab(workflow.id)}
                        >
                          เริ่มกระบวนการ
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Process Flow Diagram */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>ลำดับกระบวนการทำงานโดยรวม</CardTitle>
                <CardDescription>
                  ลำดับการดำเนินงานที่แนะนำสำหรับระบบประเมินผลงาน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {workflows.map((workflow, index) => {
                    const IconComponent = workflow.icon;
                    return (
                      <div key={workflow.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-16 h-16 rounded-full ${workflow.color} flex items-center justify-center`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <div className="mt-2 text-center">
                            <div className="text-sm font-medium">{workflow.title}</div>
                            <div className="text-xs text-gray-500">{workflow.description}</div>
                          </div>
                        </div>
                        {index < workflows.length - 1 && (
                          <ArrowRight className="w-8 h-8 text-gray-400 mx-8" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <TemplateWorkflow />
          </TabsContent>

          <TabsContent value="cycle" className="space-y-6">
            <CycleWorkflow />
          </TabsContent>

          <TabsContent value="appraisal" className="space-y-6">
            <AppraisalWorkflow />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <FeedbackWorkflow />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkflowsPage;
