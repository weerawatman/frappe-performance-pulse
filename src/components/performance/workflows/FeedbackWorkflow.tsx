
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Settings } from 'lucide-react';
import FeedbackManager from '@/components/performance/FeedbackManager';
import { Appraisal, EmployeePerformanceFeedback } from '@/types/performance';
import { performanceService } from '@/services/performanceService';
import { useToast } from '@/hooks/use-toast';

const FeedbackWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAppraisal, setSelectedAppraisal] = useState<Appraisal | null>(null);
  const [existingFeedback, setExistingFeedback] = useState<EmployeePerformanceFeedback | null>(null);

  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'เลือกการประเมิน', description: 'เลือกการประเมินที่ต้องการให้ feedback' },
    { id: 2, title: 'ให้ feedback', description: 'ให้คะแนนและความคิดเห็น' },
    { id: 3, title: 'ตรวจสอบและส่ง', description: 'ตรวจสอบข้อมูลและส่ง feedback' }
  ];

  // Get appraisals that are ready for manager review
  const appraisals = performanceService.getAppraisals().filter(a => 
    a.status === 'Manager Review' || a.status === 'Completed'
  );

  const handleAppraisalSelect = (appraisalId: string) => {
    const appraisal = performanceService.getAppraisal(appraisalId);
    if (appraisal) {
      setSelectedAppraisal(appraisal);
      
      // Check if feedback already exists
      const feedbacks = performanceService.getFeedbacksByAppraisal(appraisalId);
      const currentUserFeedback = feedbacks.find(f => f.reviewer_id === 'current_user'); // In real app, use actual user ID
      setExistingFeedback(currentUserFeedback || null);
    }
  };

  const handleFeedbackSave = async (feedback: Omit<EmployeePerformanceFeedback, 'id' | 'created_at' | 'modified_at'>) => {
    try {
      if (existingFeedback) {
        // Update existing feedback
        await performanceService.updateFeedback(existingFeedback.id, feedback);
        toast({
          title: 'สำเร็จ!',
          description: 'Feedback ถูกบันทึกเรียบร้อยแล้ว'
        });
      } else {
        // Create new feedback
        const newFeedback = await performanceService.createFeedback(feedback);
        setExistingFeedback(newFeedback);
        toast({
          title: 'สำเร็จ!',
          description: 'Feedback ถูกบันทึกเรียบร้อยแล้ว'
        });
      }
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึก feedback ได้',
        variant: 'destructive'
      });
    }
  };

  const handleFeedbackSubmit = async (feedback: Omit<EmployeePerformanceFeedback, 'id' | 'created_at' | 'modified_at'>) => {
    try {
      let finalFeedback: EmployeePerformanceFeedback;
      
      if (existingFeedback) {
        // Update existing feedback
        finalFeedback = await performanceService.updateFeedback(existingFeedback.id, feedback) as EmployeePerformanceFeedback;
      } else {
        // Create new feedback
        finalFeedback = await performanceService.createFeedback(feedback);
      }

      // Update appraisal with feedback score and final score
      if (selectedAppraisal) {
        const allFeedbacks = performanceService.getFeedbacksByAppraisal(selectedAppraisal.id);
        const submittedFeedbacks = allFeedbacks.filter(f => f.status === 'Submitted');
        
        // Calculate average feedback score
        const avgFeedbackScore = submittedFeedbacks.length > 0
          ? submittedFeedbacks.reduce((sum, f) => sum + f.total_score, 0) / submittedFeedbacks.length
          : 0;
        
        // Calculate final score using the formula or default weights
        const finalScore = selectedAppraisal.calculate_final_score_based_on_formula
          ? calculateWithFormula(selectedAppraisal, avgFeedbackScore)
          : (selectedAppraisal.total_score * 0.6) + (selectedAppraisal.self_score * 0.2) + (avgFeedbackScore * 0.2);

        await performanceService.updateAppraisal(selectedAppraisal.id, {
          avg_feedback_score: avgFeedbackScore,
          final_score: Math.round(finalScore),
          reviewed_by_manager: true,
          reviewed_date: new Date(),
          status: 'Completed'
        });
      }

      toast({
        title: 'สำเร็จ!',
        description: 'Feedback ถูกส่งเรียบร้อยแล้ว การประเมินเสร็จสิ้น'
      });

      // Reset
      setSelectedAppraisal(null);
      setExistingFeedback(null);
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถส่ง feedback ได้',
        variant: 'destructive'
      });
    }
  };

  const calculateWithFormula = (appraisal: Appraisal, avgFeedbackScore: number): number => {
    // Simple formula parser - in real app, use a proper formula parser
    const formula = appraisal.final_score_formula || '';
    
    try {
      const formulaWithValues = formula
        .replace(/goal_score/g, appraisal.total_score.toString())
        .replace(/self_score/g, appraisal.self_score.toString())
        .replace(/feedback_score/g, avgFeedbackScore.toString());
      
      // Note: In production, use a safe formula evaluator
      return eval(formulaWithValues);
    } catch (error) {
      // Fallback to default calculation
      return (appraisal.total_score * 0.6) + (appraisal.self_score * 0.2) + (avgFeedbackScore * 0.2);
    }
  };

  const getTemplate = (templateId: string) => {
    return performanceService.getTemplate(templateId);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedAppraisal !== null;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>ให้ Feedback การประเมิน</CardTitle>
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
                  <div className={`h-1 w-32 mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>เลือกการประเมินที่ต้องการให้ Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>การประเมินที่รอ Feedback</Label>
                <Select value={selectedAppraisal?.id || ''} onValueChange={handleAppraisalSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกการประเมิน" />
                  </SelectTrigger>
                  <SelectContent>
                    {appraisals.map(appraisal => (
                      <SelectItem key={appraisal.id} value={appraisal.id}>
                        {appraisal.employee_name} - {new Date(appraisal.start_date).getFullYear()}
                        <Badge className="ml-2" variant={appraisal.status === 'Completed' ? 'default' : 'secondary'}>
                          {appraisal.status}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedAppraisal && (
                <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-medium mb-2">รายละเอียดการประเมิน</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">พนักงาน:</span> {selectedAppraisal.employee_name}
                    </div>
                    <div>
                      <span className="text-gray-600">คะแนน KRA:</span> {selectedAppraisal.total_score}%
                    </div>
                    <div>
                      <span className="text-gray-600">คะแนนประเมินตนเอง:</span> {selectedAppraisal.self_score}%
                    </div>
                    <div>
                      <span className="text-gray-600">วันที่ส่ง:</span> 
                      {selectedAppraisal.submitted_date 
                        ? new Date(selectedAppraisal.submitted_date).toLocaleDateString('th-TH')
                        : '-'
                      }
                    </div>
                  </div>
                  
                  {existingFeedback && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="text-sm text-yellow-800">
                        <strong>หมายเหตุ:</strong> คุณได้ให้ feedback สำหรับการประเมินนี้แล้ว 
                        (สถานะ: {existingFeedback.status === 'Submitted' ? 'ส่งแล้ว' : 'ร่าง'})
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep >= 2 && selectedAppraisal && (
        <FeedbackManager
          appraisalId={selectedAppraisal.id}
          employeeName={selectedAppraisal.employee_name}
          reviewerName="ผู้จัดการ" // In real app, get from current user
          ratingCriteria={getTemplate(selectedAppraisal.appraisal_template_id)?.rating_criteria || []}
          existingFeedback={existingFeedback || undefined}
          onSave={handleFeedbackSave}
          onSubmit={handleFeedbackSubmit}
          isReadOnly={existingFeedback?.status === 'Submitted'}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          ย้อนกลับ
        </Button>
        {currentStep < 3 && (
          <Button 
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceedToNext()}
          >
            ถัดไป
          </Button>
        )}
      </div>
    </div>
  );
};

export default FeedbackWorkflow;
