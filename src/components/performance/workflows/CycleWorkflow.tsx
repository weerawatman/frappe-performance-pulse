
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Settings } from 'lucide-react';
import CycleManager from '@/components/performance/CycleManager';
import { AppraisalCycle } from '@/types/performance';
import { performanceService } from '@/services/performanceService';
import { useToast } from '@/hooks/use-toast';

const CycleWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'ข้อมูลพื้นฐาน', description: 'กำหนดชื่อและช่วงเวลาการประเมิน' },
    { id: 2, title: 'เลือกเทมเพลต', description: 'เลือกเทมเพลตการประเมิน' },
    { id: 3, title: 'เลือกพนักงาน', description: 'เพิ่มรายชื่อพนักงานที่จะถูกประเมิน' },
    { id: 4, title: 'การตั้งค่า', description: 'กำหนดสูตรคำนวณและการตั้งค่าอื่นๆ' },
    { id: 5, title: 'ตรวจสอบและบันทึก', description: 'ตรวจสอบข้อมูลและบันทึกรอบการประเมิน' }
  ];

  const templates = performanceService.getTemplates();
  const employees = performanceService.getEmployees();

  const handleSave = async (cycleData: Omit<AppraisalCycle, 'id' | 'created_at' | 'modified_at'>) => {
    try {
      const cycle = await performanceService.createCycle(cycleData);
      
      // Auto-create appraisals for all employees in the cycle
      const appraisals = await performanceService.createAppraisalsForCycle(cycle.id);
      
      toast({
        title: 'สำเร็จ!',
        description: `รอบการประเมินถูกสร้างเรียบร้อยแล้ว สร้างการประเมิน ${appraisals.length} รายการ`
      });

      setCurrentStep(1);
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถสร้างรอบการประเมินได้',
        variant: 'destructive'
      });
    }
  };

  const handleCancel = () => {
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>สร้างรอบการประเมิน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : currentStep === step.id ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      <Settings className="w-5 h-5" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-16 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cycle Manager */}
      <CycleManager
        templates={templates}
        employees={employees}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          ย้อนกลับ
        </Button>
        <Button 
          onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
          disabled={currentStep === 5}
        >
          ถัดไป
        </Button>
      </div>
    </div>
  );
};

export default CycleWorkflow;
