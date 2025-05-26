import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Settings, User, Target, MessageSquare } from 'lucide-react';
import { Appraisal, AppraisalKRA, SelfRating } from '@/types/performance';
import { performanceService } from '@/services/performanceService';
import { useToast } from '@/hooks/use-toast';
import ScoreBreakdown from '@/components/performance/ScoreBreakdown';
import { calculateAllScores } from '@/utils/performanceScoring';

const AppraisalWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAppraisal, setSelectedAppraisal] = useState<Appraisal | null>(null);
  const [kraScores, setKraScores] = useState<{[key: string]: number}>({});
  const [selfRatings, setSelfRatings] = useState<SelfRating[]>([]);
  const [selfComments, setSelfComments] = useState('');

  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'เลือกการประเมิน', description: 'เลือกการประเมินที่ต้องการดำเนินการ' },
    { id: 2, title: 'ประเมิน KRA', description: 'ให้คะแนนตามพื้นที่ผลงานหลัก' },
    { id: 3, title: 'ประเมินตนเอง', description: 'ประเมินตนเองตามเกณฑ์ที่กำหนด' },
    { id: 4, title: 'ความคิดเห็น', description: 'เพิ่มความคิดเห็นและข้อเสนอแนะ' },
    { id: 5, title: 'ตรวจสอบและส่ง', description: 'ตรวจสอบข้อมูลและส่งการประเมิน' }
  ];

  const appraisals = performanceService.getAppraisals().filter(a => 
    a.status === 'Draft' || a.status === 'Self Assessment'
  );

  const handleAppraisalSelect = (appraisalId: string) => {
    const appraisal = performanceService.getAppraisal(appraisalId);
    if (appraisal) {
      setSelectedAppraisal(appraisal);
      
      // Initialize KRA scores
      const kraScoresInit: {[key: string]: number} = {};
      appraisal.appraisal_kra.forEach(kra => {
        kraScoresInit[kra.id] = kra.score || 0;
      });
      setKraScores(kraScoresInit);
      
      // Initialize self ratings
      setSelfRatings(appraisal.self_ratings || []);
      setSelfComments(appraisal.self_comments || '');
    }
  };

  const updateKraScore = (kraId: string, score: number) => {
    setKraScores(prev => ({ ...prev, [kraId]: score }));
  };

  const updateSelfRating = (criteriaId: string, rating: number, comments?: string) => {
    setSelfRatings(prev => prev.map(sr => 
      sr.id === criteriaId 
        ? { ...sr, rating, comments: comments !== undefined ? comments : sr.comments }
        : sr
    ));
  };

  const calculateKraTotal = () => {
    if (!selectedAppraisal) return 0;
    
    // Use the new scoring system
    const cycle = performanceService.getCycle(selectedAppraisal.appraisal_cycle_id);
    if (!cycle) return 0;

    // Update appraisal with current scores
    const updatedAppraisal = {
      ...selectedAppraisal,
      appraisal_kra: selectedAppraisal.appraisal_kra.map(kra => ({
        ...kra,
        score: kraScores[kra.id] || 0
      }))
    };

    const scoreResult = calculateAllScores(updatedAppraisal, cycle, []);
    return scoreResult.goalScore;
  };

  const calculateSelfTotal = () => {
    if (!selectedAppraisal) return 0;
    
    const cycle = performanceService.getCycle(selectedAppraisal.appraisal_cycle_id);
    if (!cycle) return 0;

    // Update appraisal with current self ratings
    const updatedAppraisal = {
      ...selectedAppraisal,
      self_ratings: selfRatings
    };

    const scoreResult = calculateAllScores(updatedAppraisal, cycle, []);
    return scoreResult.selfScore;
  };

  const handleSubmit = async () => {
    if (!selectedAppraisal) return;

    try {
      // Update KRA scores
      const updatedKra = selectedAppraisal.appraisal_kra.map(kra => ({
        ...kra,
        score: kraScores[kra.id] || 0
      }));

      const updatedAppraisal = {
        ...selectedAppraisal,
        appraisal_kra: updatedKra,
        self_ratings: selfRatings,
        self_comments: selfComments,
        status: 'Manager Review' as const,
        submitted_by_employee: true,
        submitted_date: new Date()
      };

      // Update appraisal first
      await performanceService.updateAppraisal(selectedAppraisal.id, updatedAppraisal);
      
      // Then calculate and update scores
      await performanceService.updateAppraisalScores(selectedAppraisal.id);

      toast({
        title: 'สำเร็จ!',
        description: 'การประเมินถูกส่งเรียบร้อยแล้ว'
      });

      // Reset
      setSelectedAppraisal(null);
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถส่งการประเมินได้',
        variant: 'destructive'
      });
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedAppraisal !== null;
      case 2:
        return selectedAppraisal?.appraisal_kra.every(kra => kraScores[kra.id] > 0);
      case 3:
        return selfRatings.every(sr => sr.rating > 0);
      case 4:
        return selfComments.trim() !== '';
      default:
        return true;
    }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>ดำเนินการประเมิน</CardTitle>
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

      {/* Step Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              เลือกการประเมิน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>การประเมินที่พร้อมดำเนินการ</Label>
                <Select value={selectedAppraisal?.id || ''} onValueChange={handleAppraisalSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกการประเมิน" />
                  </SelectTrigger>
                  <SelectContent>
                    {appraisals.map(appraisal => (
                      <SelectItem key={appraisal.id} value={appraisal.id}>
                        {appraisal.employee_name} - {new Date(appraisal.start_date).getFullYear()}
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
                      <span className="text-gray-600">สถานะ:</span> 
                      <Badge className="ml-2">{selectedAppraisal.status}</Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">ช่วงเวลา:</span> 
                      {new Date(selectedAppraisal.start_date).toLocaleDateString('th-TH')} - 
                      {new Date(selectedAppraisal.end_date).toLocaleDateString('th-TH')}
                    </div>
                    <div>
                      <span className="text-gray-600">จำนวน KRA:</span> {selectedAppraisal.appraisal_kra.length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && selectedAppraisal && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              ประเมิน KRA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selectedAppraisal.appraisal_kra.map((kra) => (
                <div key={kra.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{kra.kra}</h4>
                      <p className="text-sm text-gray-600 mb-2">{kra.description}</p>
                      <Badge variant="outline">น้ำหนัก: {kra.weightage}%</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {kraScores[kra.id] || 0}/100
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>คะแนน (0-100)</Label>
                    <div className="flex gap-2">
                      {[0, 20, 40, 60, 80, 100].map((score) => (
                        <Button
                          key={score}
                          variant={kraScores[kra.id] === score ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateKraScore(kra.id, score)}
                          className="w-16"
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                    <Progress value={kraScores[kra.id] || 0} className="h-2" />
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{calculateKraTotal()}%</div>
                  <div className="text-sm text-gray-600">คะแนนรวม KRA ถ่วงน้ำหนัก</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && selectedAppraisal && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              ประเมินตนเอง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selfRatings.map((rating) => (
                <div key={rating.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{rating.criteria}</h4>
                      <p className="text-sm text-gray-600 mb-2">{rating.description}</p>
                      <Badge variant="outline">น้ำหนัก: {rating.weightage}%</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {rating.rating}/{rating.max_rating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>คะแนน</Label>
                    <div className="flex gap-2">
                      {Array.from({ length: rating.max_rating }, (_, i) => i + 1).map((score) => (
                        <Button
                          key={score}
                          variant={rating.rating === score ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateSelfRating(rating.id, score)}
                          className="w-12 h-12"
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      1 = ต้องปรับปรุง, {Math.ceil(rating.max_rating/2)} = ปานกลาง, {rating.max_rating} = ดีเยี่ยม
                    </div>
                    
                    <div>
                      <Label>ความคิดเห็นเพิ่มเติม</Label>
                      <Textarea
                        value={rating.comments || ''}
                        onChange={(e) => updateSelfRating(rating.id, rating.rating, e.target.value)}
                        placeholder="ความคิดเห็นเพิ่มเติมสำหรับเกณฑ์นี้..."
                      />
                    </div>
                    
                    <Progress value={(rating.rating / rating.max_rating) * 100} className="h-2" />
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{calculateSelfTotal()}%</div>
                  <div className="text-sm text-gray-600">คะแนนรวมการประเมินตนเอง</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              ความคิดเห็นและข้อเสนอแนะ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="selfComments">ความคิดเห็นเพิ่มเติม</Label>
                <Textarea
                  id="selfComments"
                  value={selfComments}
                  onChange={(e) => setSelfComments(e.target.value)}
                  placeholder="เพิ่มความคิดเห็น ข้อเสนอแนะ หรือสิ่งที่ต้องการพัฒนา..."
                  rows={6}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 5 && selectedAppraisal && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>สรุปการประเมิน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{calculateKraTotal().toFixed(2)}</div>
                    <div className="text-sm text-gray-600">คะแนน KRA</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{calculateSelfTotal().toFixed(2)}</div>
                    <div className="text-sm text-gray-600">คะแนนประเมินตนเอง</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{((calculateKraTotal() + calculateSelfTotal()) / 2).toFixed(2)}</div>
                    <div className="text-sm text-gray-600">คะแนนรวม (ประมาณ)</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">ความคิดเห็นเพิ่มเติม</h4>
                  <p className="text-gray-600">{selfComments || 'ไม่มีความคิดเห็นเพิ่มเติม'}</p>
                </div>

                {/* Preview Score Breakdown */}
                {selectedAppraisal && (() => {
                  const cycle = performanceService.getCycle(selectedAppraisal.appraisal_cycle_id);
                  if (!cycle) return null;

                  const updatedAppraisal = {
                    ...selectedAppraisal,
                    appraisal_kra: selectedAppraisal.appraisal_kra.map(kra => ({
                      ...kra,
                      score: kraScores[kra.id] || 0
                    })),
                    self_ratings: selfRatings
                  };

                  const scoreResult = calculateAllScores(updatedAppraisal, cycle, []);
                  
                  return (
                    <div className="mt-6">
                      <h4 className="font-medium mb-4">ตัวอย่างการคำนวณคะแนน</h4>
                      <ScoreBreakdown scoreResult={scoreResult} showBreakdown={false} />
                    </div>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
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
        <div className="flex gap-2">
          {currentStep < 5 ? (
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceedToNext()}
            >
              ถัดไป
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!canProceedToNext()}
              className="bg-green-600 hover:bg-green-700"
            >
              ส่งการประเมิน
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppraisalWorkflow;
