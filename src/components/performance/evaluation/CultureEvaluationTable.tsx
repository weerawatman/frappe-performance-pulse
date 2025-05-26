import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, Send, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CultureItem {
  id: string;
  name: string;
  definition: string;
  weight: number;
  guideline: string;
}

interface CultureEvaluationData {
  evidence: string;
  selfScore: number;
  checkerFeedback: string;
  checkerScore: number | null;
  approverFeedback: string;
  approverScore: number | null;
}

interface CultureEvaluationTableProps {
  period: 'mid' | 'end';
  userRole: 'employee' | 'checker' | 'approver';
}

const CultureEvaluationTable: React.FC<CultureEvaluationTableProps> = ({ period, userRole }) => {
  const { toast } = useToast();

  // Mock culture data
  const cultureItems: CultureItem[] = [
    {
      id: '1',
      name: 'สัญญา ไม่จริงใจ',
      definition: 'ความรู้สึกตาของด้วยความซื่อสัตย์และสงสัยกองสิ่งสื่อสำคัญได้ถูกกลางการไป ด้วยความใสใสใส',
      weight: 6.00,
      guideline: '- ปฏิบัติให้ได้ตามกฏและระเบียบที่กำหนดไว้ :\n- รักษาคำพูด ตามที่ได้ตกลงไว้ :\n- ใช้ข้อมูลและข้อเท็จจริงในการทำงาน :'
    }
  ];

  const [evaluations, setEvaluations] = useState<{[key: string]: CultureEvaluationData}>(() => {
    const initial: {[key: string]: CultureEvaluationData} = {};
    cultureItems.forEach(item => {
      initial[item.id] = {
        evidence: '',
        selfScore: 0,
        checkerFeedback: '',
        checkerScore: null,
        approverFeedback: '',
        approverScore: null
      };
    });
    return initial;
  });

  const updateEvaluation = (id: string, field: keyof CultureEvaluationData, value: any) => {
    setEvaluations(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const calculateTotalScore = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    cultureItems.forEach(item => {
      const evaluation = evaluations[item.id];
      // Use approver score if available, otherwise checker score, otherwise self score
      const finalScore = evaluation.approverScore || evaluation.checkerScore || evaluation.selfScore;
      const weightedScore = (finalScore / 5) * item.weight;
      totalWeightedScore += weightedScore;
      totalWeight += item.weight;
    });

    return {
      score: totalWeightedScore,
      percentage: (totalWeightedScore / totalWeight) * 100
    };
  };

  const canEdit = (field: 'evidence' | 'selfScore' | 'checkerFeedback' | 'checkerScore' | 'approverFeedback' | 'approverScore') => {
    switch (field) {
      case 'evidence':
      case 'selfScore':
        return userRole === 'employee';
      case 'checkerFeedback':
      case 'checkerScore':
        return userRole === 'checker';
      case 'approverFeedback':
      case 'approverScore':
        return userRole === 'approver';
      default:
        return false;
    }
  };

  const handleSave = () => {
    toast({
      title: 'บันทึกสำเร็จ',
      description: 'บันทึกข้อมูลการประเมิน Culture เรียบร้อยแล้ว'
    });
  };

  const handleSubmit = () => {
    toast({
      title: 'ส่งการประเมินสำเร็จ',
      description: 'ส่งการประเมิน Culture เพื่อดำเนินการในขั้นตอนถัดไป'
    });
  };

  const { score, percentage } = calculateTotalScore();

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>การประเมิน Culture ครั้งที่ {period === 'mid' ? '1' : '2'}</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">
                {percentage.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">คะแนนรวม Culture</div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Culture Items */}
      {cultureItems.map((item, index) => {
        const evaluation = evaluations[item.id];
        return (
          <Card key={item.id} className="border border-gray-300">
            <CardContent className="p-6">
              {/* Header Table */}
              <div className="grid grid-cols-12 gap-0 mb-6 border border-gray-300">
                <div className="col-span-2 border-r border-gray-300 p-3 bg-gray-50">
                  <div className="font-medium text-sm">Culture</div>
                  <div className="text-sm mt-2 font-medium">{item.name}</div>
                </div>
                <div className="col-span-5 border-r border-gray-300 p-3 bg-gray-50">
                  <div className="font-medium text-sm">นิยาม</div>
                  <div className="text-sm mt-2">{item.definition}</div>
                </div>
                <div className="col-span-1 border-r border-gray-300 p-3 bg-gray-50 text-center">
                  <div className="font-medium text-sm">Weight%</div>
                  <div className="font-medium text-sm">(น้ำหนัก)</div>
                  <div className="mt-2">
                    <Badge variant="outline">{item.weight}%</Badge>
                  </div>
                </div>
                <div className="col-span-2 border-r border-gray-300 p-3 bg-blue-50">
                  <div className="font-medium text-sm text-blue-600">
                    พฤติกรรมที่คาดหวัง (Key Behaviour) : Guideline
                  </div>
                  <div className="text-xs mt-2 leading-relaxed">
                    {item.guideline.split('\n').map((line, i) => (
                      <div key={i} className="mb-1">{line}</div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 p-3 bg-blue-50">
                  <div className="font-medium text-sm text-blue-600">
                    พฤติกรรมที่คาดหวัง (Key Behaviour) : 
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    พนักงานกำหนดรายละเอียดพฤติกรรมที่ต้องการวัดผล
                  </div>
                </div>
              </div>

              {/* Evidence Section with Self Assessment in same row */}
              <div className="border border-gray-300 p-4 mb-4">
                <div className="font-medium text-sm mb-2">หลักฐานการดำเนินการ/การแสดงออกจริง</div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Textarea
                      value={evaluation.evidence}
                      onChange={(e) => updateEvaluation(item.id, 'evidence', e.target.value)}
                      placeholder="กรอกหลักฐานการดำเนินการ..."
                      rows={4}
                      className="text-sm"
                      disabled={!canEdit('evidence')}
                    />
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Upload className="w-3 h-3 mr-1" />
                        เลือกไฟล์
                      </Button>
                    </div>
                  </div>
                  <div className="w-32 flex flex-col justify-center">
                    <div className="font-medium text-sm mb-2">% ความสำเร็จ (1-5) *</div>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      value={evaluation.selfScore}
                      onChange={(e) => updateEvaluation(item.id, 'selfScore', Number(e.target.value))}
                      className="text-center"
                      disabled={!canEdit('selfScore')}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      การคำนวณ: {evaluation.selfScore}% × {item.weight}% ÷ 5 = {((evaluation.selfScore / 5) * item.weight).toFixed(2)} คะแนน
                    </div>
                  </div>
                </div>
              </div>

              {/* Checker Feedback */}
              <div className="border border-gray-300 p-4 mb-4">
                <div className="font-medium text-sm mb-2">การ Feedback โดย Checker</div>
                <Textarea
                  value={evaluation.checkerFeedback}
                  onChange={(e) => updateEvaluation(item.id, 'checkerFeedback', e.target.value)}
                  placeholder="Feedback..."
                  rows={2}
                  className="text-sm mb-2"
                  disabled={!canEdit('checkerFeedback')}
                />
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">% ความสำเร็จ (1-5) *</div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      value={evaluation.checkerScore || ''}
                      onChange={(e) => updateEvaluation(item.id, 'checkerScore', Number(e.target.value))}
                      className="w-16 text-center"
                      disabled={!canEdit('checkerScore')}
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  การคำนวณ: {evaluation.checkerScore || 0}% × {item.weight}% ÷ 5 = {(((evaluation.checkerScore || 0) / 5) * item.weight).toFixed(2)} คะแนน
                </div>
              </div>

              {/* Approver Feedback */}
              <div className="border border-gray-300 p-4">
                <div className="font-medium text-sm mb-2">การ Feedback โดย Approver</div>
                <Textarea
                  value={evaluation.approverFeedback}
                  onChange={(e) => updateEvaluation(item.id, 'approverFeedback', e.target.value)}
                  placeholder="Feedback..."
                  rows={2}
                  className="text-sm mb-2"
                  disabled={!canEdit('approverFeedback')}
                />
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">% ความสำเร็จ (1-5) *</div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      value={evaluation.approverScore || ''}
                      onChange={(e) => updateEvaluation(item.id, 'approverScore', Number(e.target.value))}
                      className="w-16 text-center"
                      disabled={!canEdit('approverScore')}
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  การคำนวณ: {evaluation.approverScore || 0}% × {item.weight}% ÷ 5 = {(((evaluation.approverScore || 0) / 5) * item.weight).toFixed(2)} คะแนน
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Summary Card */}
      <Card className="bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-purple-900">รวมคะแนน Culture</h4>
              <p className="text-sm text-purple-700">
                สูตรการคำนวณ: Σ(คะแนน ÷ 5) × น้ำหนัก%
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">
                {percentage.toFixed(2)}%
              </div>
              <div className="text-sm text-purple-500">
                ({score.toFixed(2)} / {cultureItems.reduce((sum, item) => sum + item.weight, 0)})
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          บันทึก
        </Button>
        <Button onClick={handleSubmit}>
          <Send className="w-4 h-4 mr-2" />
          ส่งการประเมิน
        </Button>
      </div>
    </div>
  );
};

export default CultureEvaluationTable;
