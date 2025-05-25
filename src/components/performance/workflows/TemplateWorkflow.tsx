
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Settings } from 'lucide-react';
import TemplateBuilder from '@/components/performance/TemplateBuilder';
import { AppraisalTemplate, AppraisalGoal, RatingCriteria } from '@/types/performance';
import { performanceService } from '@/services/performanceService';
import { useToast } from '@/hooks/use-toast';

const TemplateWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    goals: [] as AppraisalGoal[],
    ratingCriteria: [] as RatingCriteria[]
  });

  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'ข้อมูลพื้นฐาน', description: 'กำหนดชื่อและคำอธิบายเทมเพลต' },
    { id: 2, title: 'กำหนด KRA', description: 'เพิ่มพื้นที่ผลงานหลักและน้ำหนัก' },
    { id: 3, title: 'เกณฑ์การประเมิน', description: 'กำหนดเกณฑ์การให้คะแนนและน้ำหนัก' },
    { id: 4, title: 'ตรวจสอบและบันทึก', description: 'ตรวจสอบข้อมูลและบันทึกเทมเพลต' }
  ];

  const handleTemplateNameChange = (name: string) => {
    setTemplateData(prev => ({ ...prev, name }));
  };

  const handleDescriptionChange = (description: string) => {
    setTemplateData(prev => ({ ...prev, description }));
  };

  const handleGoalsChange = (goals: AppraisalGoal[]) => {
    setTemplateData(prev => ({ ...prev, goals }));
  };

  const handleRatingCriteriaChange = (ratingCriteria: RatingCriteria[]) => {
    setTemplateData(prev => ({ ...prev, ratingCriteria }));
  };

  const handleSave = async () => {
    try {
      const template = await performanceService.createTemplate({
        name: templateData.name,
        description: templateData.description,
        goals: templateData.goals,
        rating_criteria: templateData.ratingCriteria,
        is_active: true,
        created_by: 'current_user'
      });

      toast({
        title: 'สำเร็จ!',
        description: 'เทมเพลตถูกสร้างเรียบร้อยแล้ว'
      });

      // Reset form
      setTemplateData({
        name: '',
        description: '',
        goals: [],
        ratingCriteria: []
      });
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถสร้างเทมเพลตได้',
        variant: 'destructive'
      });
    }
  };

  const handleCancel = () => {
    setTemplateData({
      name: '',
      description: '',
      goals: [],
      ratingCriteria: []
    });
    setCurrentStep(1);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return templateData.name.trim() !== '';
      case 2:
        return templateData.goals.length > 0 && 
               templateData.goals.reduce((sum, g) => sum + g.weightage, 0) === 100;
      case 3:
        return templateData.ratingCriteria.length > 0 && 
               templateData.ratingCriteria.reduce((sum, c) => sum + c.weightage, 0) === 100;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>สร้างเทมเพลตการประเมิน</CardTitle>
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
                  <div className={`h-1 w-24 mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Builder */}
      <TemplateBuilder
        templateName={templateData.name}
        description={templateData.description}
        goals={templateData.goals}
        ratingCriteria={templateData.ratingCriteria}
        onTemplateNameChange={handleTemplateNameChange}
        onDescriptionChange={handleDescriptionChange}
        onGoalsChange={handleGoalsChange}
        onRatingCriteriaChange={handleRatingCriteriaChange}
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
        <div className="flex gap-2">
          {currentStep < 4 ? (
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceedToNext()}
            >
              ถัดไป
            </Button>
          ) : (
            <Button 
              onClick={handleSave}
              disabled={!canProceedToNext()}
              className="bg-green-600 hover:bg-green-700"
            >
              บันทึกเทมเพลต
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateWorkflow;
