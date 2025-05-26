
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Calculator, Save, Send, X } from 'lucide-react';
import { KPIItem } from '@/types/kpi';
import { useToast } from '@/hooks/use-toast';

interface KPIBonusEvaluationProps {
  period: 'mid' | 'end';
}

interface KPIEvaluation {
  kpi_id: string;
  actual_result: string;
  achievement_percentage: number;
  evidence_files: string[];
  additional_info: string;
  calculated_score: number;
}

const KPIBonusEvaluation: React.FC<KPIBonusEvaluationProps> = ({ period }) => {
  const [approvedKPIs, setApprovedKPIs] = useState<KPIItem[]>([]);
  const [evaluations, setEvaluations] = useState<{[key: string]: KPIEvaluation}>({});
  const [totalScore, setTotalScore] = useState(0);
  const [status, setStatus] = useState<'draft' | 'submitted' | 'approved'>('draft');
  const { toast } = useToast();

  // Mock approved KPIs - in real app, fetch from API
  useEffect(() => {
    const mockKPIs: KPIItem[] = [
      {
        id: '1',
        category_id: '1',
        category_name: 'Financial Perspective',
        name: 'เพิ่มยอดขายสินค้า',
        description: 'เพิ่มยอดขายสินค้าให้ได้ตามเป้าหมายที่กำหนด',
        weight: 30,
        target: 'เพิ่มยอดขาย 15% จากปีที่แล้ว',
        measurement_method: 'คำนวณจากยอดขายรวมในระบบ',
        created_at: new Date()
      },
      {
        id: '2',
        category_id: '2',
        category_name: 'Customer Perspective',
        name: 'ความพึงพอใจของลูกค้า',
        description: 'เพิ่มความพึงพอใจของลูกค้าใหม่และลูกค้าเดิม',
        weight: 25,
        target: 'ความพึงพอใจของลูกค้า >= 85%',
        measurement_method: 'สำรวจความพึงพอใจรายไตรมาส',
        created_at: new Date()
      },
      {
        id: '3',
        category_id: '3',
        category_name: 'Internal Process',
        name: 'ปรับปรุงกระบวนการทำงาน',
        description: 'ปรับปรุงกระบวนการทำงานให้มีประสิทธิภาพมากขึ้น',
        weight: 25,
        target: 'ลดเวลาการทำงาน 20%',
        measurement_method: 'วัดจากเวลาเฉลี่ยในการทำงาน',
        created_at: new Date()
      },
      {
        id: '4',
        category_id: '4',
        category_name: 'Learning & Growth',
        name: 'พัฒนาความรู้และทักษะ',
        description: 'เข้าร่วมการฝึกอบรมและพัฒนาทักษะใหม่',
        weight: 20,
        target: 'เข้าร่วมการฝึกอบรม >= 40 ชั่วโมง/ปี',
        measurement_method: 'นับจำนวนชั่วโมงการฝึกอบรม',
        created_at: new Date()
      }
    ];
    setApprovedKPIs(mockKPIs);

    // Initialize evaluations
    const initialEvaluations: {[key: string]: KPIEvaluation} = {};
    mockKPIs.forEach(kpi => {
      initialEvaluations[kpi.id] = {
        kpi_id: kpi.id,
        actual_result: '',
        achievement_percentage: 0,
        evidence_files: [],
        additional_info: '',
        calculated_score: 0
      };
    });
    setEvaluations(initialEvaluations);
  }, []);

  const updateEvaluation = (kpiId: string, field: keyof KPIEvaluation, value: any) => {
    setEvaluations(prev => {
      const updated = {
        ...prev,
        [kpiId]: {
          ...prev[kpiId],
          [field]: value
        }
      };

      // Calculate score when achievement percentage changes
      if (field === 'achievement_percentage') {
        const kpi = approvedKPIs.find(k => k.id === kpiId);
        if (kpi) {
          updated[kpiId].calculated_score = (value * kpi.weight) / 100;
        }
      }

      return updated;
    });
  };

  // Calculate total score
  useEffect(() => {
    const total = Object.values(evaluations).reduce((sum, evaluation) => sum + evaluation.calculated_score, 0);
    setTotalScore(total);
  }, [evaluations]);

  const handleFileUpload = (kpiId: string, files: FileList | null) => {
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      updateEvaluation(kpiId, 'evidence_files', fileNames);
      toast({
        title: 'อัปโหลดไฟล์สำเร็จ',
        description: `อัปโหลดไฟล์ ${fileNames.length} ไฟล์`
      });
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: 'บันทึกร่างสำเร็จ',
      description: 'บันทึกข้อมูลการประเมินเป็นร่างแล้ว'
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    const incompleteKPIs = approvedKPIs.filter(kpi => {
      const evaluation = evaluations[kpi.id];
      return !evaluation.actual_result || evaluation.achievement_percentage === 0;
    });

    if (incompleteKPIs.length > 0) {
      toast({
        title: 'ข้อมูลไม่ครบถ้วน',
        description: 'กรุณากรอกข้อมูลให้ครบถ้วนสำหรับทุก KPI',
        variant: 'destructive'
      });
      return;
    }

    setStatus('submitted');
    toast({
      title: 'ส่งการประเมินสำเร็จ',
      description: 'ส่งการประเมิน KPI Bonus เรียบร้อยแล้ว'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'ดีเยี่ยม';
    if (score >= 80) return 'ดี';
    if (score >= 70) return 'พอใช้';
    return 'ต้องปรับปรุง';
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'submitted':
        return 'default';
      case 'approved':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              ประเมิน KPI Bonus - {period === 'mid' ? 'กลางปี' : 'ปลายปี'}
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant={getBadgeVariant(status)}>
                {status === 'draft' ? 'ร่าง' : status === 'submitted' ? 'รอการอนุมัติ' : 'อนุมัติแล้ว'}
              </Badge>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(totalScore)}`}>
                  {totalScore.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-500">{getScoreGrade(totalScore)}</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={totalScore} className="h-3" />
          <div className="mt-2 text-sm text-gray-600">
            คะแนนรวม: {totalScore.toFixed(2)} / 100
          </div>
        </CardContent>
      </Card>

      {/* KPI Evaluations */}
      {approvedKPIs.map((kpi) => {
        const evaluation = evaluations[kpi.id];
        return (
          <Card key={kpi.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{kpi.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{kpi.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline">
                      น้ำหนัก: {kpi.weight}%
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {kpi.category_name}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${getScoreColor(evaluation?.calculated_score || 0)}`}>
                    {(evaluation?.calculated_score || 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">คะแนน</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Target */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium text-gray-700">เป้าหมาย:</Label>
                <p className="text-sm mt-1">{kpi.target}</p>
                <Label className="text-sm font-medium text-gray-700 mt-2 block">วิธีการวัด:</Label>
                <p className="text-sm mt-1">{kpi.measurement_method}</p>
              </div>

              {/* Actual Result */}
              <div>
                <Label htmlFor={`actual-${kpi.id}`}>ผลงานจริงที่ได้ *</Label>
                <Textarea
                  id={`actual-${kpi.id}`}
                  value={evaluation?.actual_result || ''}
                  onChange={(e) => updateEvaluation(kpi.id, 'actual_result', e.target.value)}
                  placeholder="อธิบายผลงานจริงที่ได้รับ..."
                  rows={3}
                  disabled={status !== 'draft'}
                />
              </div>

              {/* Achievement Percentage */}
              <div>
                <Label htmlFor={`achievement-${kpi.id}`}>% ความสำเร็จ (0-100%) *</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input
                    id={`achievement-${kpi.id}`}
                    type="number"
                    min="0"
                    max="100"
                    value={evaluation?.achievement_percentage || ''}
                    onChange={(e) => updateEvaluation(kpi.id, 'achievement_percentage', Number(e.target.value))}
                    className="w-32"
                    disabled={status !== 'draft'}
                  />
                  <span className="text-sm text-gray-500">%</span>
                  <div className="flex-1">
                    <Progress value={evaluation?.achievement_percentage || 0} className="h-2" />
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  คะแนนที่ได้: {((evaluation?.achievement_percentage || 0) * kpi.weight / 100).toFixed(2)} / {kpi.weight}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <Label>หลักฐานหรือเอกสารประกอบ</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(kpi.id, e.target.files)}
                    className="hidden"
                    id={`file-${kpi.id}`}
                    disabled={status !== 'draft'}
                  />
                  <label
                    htmlFor={`file-${kpi.id}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 ${
                      status !== 'draft' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    เลือกไฟล์
                  </label>
                  {evaluation?.evidence_files && evaluation.evidence_files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {evaluation.evidence_files.map((fileName, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText className="w-4 h-4" />
                          {fileName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <Label htmlFor={`info-${kpi.id}`}>ข้อมูลเพิ่มเติมหรือคำอธิบาย</Label>
                <Textarea
                  id={`info-${kpi.id}`}
                  value={evaluation?.additional_info || ''}
                  onChange={(e) => updateEvaluation(kpi.id, 'additional_info', e.target.value)}
                  placeholder="ข้อมูลเพิ่มเติม คำอธิบาย หรือปัญหาที่พบ..."
                  rows={2}
                  disabled={status !== 'draft'}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Action Buttons */}
      {status === 'draft' && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                กรุณาตรวจสอบข้อมูลให้ครบถ้วนก่อนส่งการประเมิน
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกร่าง
                </Button>
                <Button onClick={handleSubmit} disabled={totalScore === 0}>
                  <Send className="w-4 h-4 mr-2" />
                  ส่งการประเมิน
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KPIBonusEvaluation;
