import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, Send, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CultureItem {
  id: string;
  type: string;
  item: string;
  weight: number;
  inputProcess: string;
  output: string;
}

interface EvaluationData {
  evidence: string;
  selfScore: number;
  checkerFeedback: string;
  checkerScore: number | null;
  approverFeedback: string;
  approverScore: number | null;
  feedback: string;
}

interface CultureEvaluationTableProps {
  period: 'mid' | 'end';
  userRole: 'employee' | 'checker' | 'approver' | 'admin';
}

const CultureEvaluationTable: React.FC<CultureEvaluationTableProps> = ({ period, userRole }) => {
  const { toast } = useToast();

  // Updated culture evaluation data to match the requirements
  const cultureItems: CultureItem[] = [
    {
      id: 'C1',
      type: 'Core Values',
      item: 'สัญญา โปร่งใส (Spirit of Commitment, Intergrity, & Ethic)',
      weight: 20,
      inputProcess: 'การปฏิบัติหน้าที่ด้วยความซื่อสัตย์และส่งมอบงานตามข้อตกลงหรือสัญญาที่ได้ตกลงกันไว้ ด้วยความโปร่งใส',
      output: 'ได้รับความไว้วางใจจากเพื่อนร่วมงานและผู้บังคับบัญชา'
    },
    {
      id: 'C2', 
      type: 'Learning & Development',
      item: 'ใส่ใจเรียนรู้ (Mastery of Learning & Applying Technology)',
      weight: 20,
      inputProcess: 'การตั้งใจเรียนรู้สิ่งใหม่ๆ รวมถึงเทคโนโลยี และนำมาใช้ปรับปรุง พัฒนา การทำงาน บริการ หรือผลิตภัณฑ์ ให้ดีขึ้นอย่างต่อเนื่อง',
      output: 'มีการปรับปรุงกระบวนการทำงานหรือสร้างสรรค์สิ่งใหม่'
    },
    {
      id: 'C3',
      type: 'Adaptability',
      item: 'สู่การเปลี่ยนแปลง (Agility)',
      weight: 20,
      inputProcess: 'การเปิดรับสิ่งใหม่ วางแผนปรับตัว เตรียมความพร้อมสำหรับการเปลี่ยนแปลงอย่างรวดเร็ว',
      output: 'สามารถปรับตัวและรับมือกับการเปลี่ยนแปลงได้ดี'
    },
    {
      id: 'C4',
      type: 'Teamwork',
      item: 'แสดงการยอมรับ (Respect Others & Value Diversity)',
      weight: 20,
      inputProcess: 'การยอมรับความแตกต่าง และเปิดใจรับฟังความคิดเห็นของทุกคนในทีมเพื่อหาแนวทางที่ดีที่สุดในการแก้ไขปัญหา',
      output: 'ทีมงานมีประสิทธิภาพและบรรยากาศการทำงานที่ดี'
    },
    {
      id: 'C5',
      type: 'Customer Focus',
      item: 'สนับสนุนลูกค้า (Think Customers & Think Value)',
      weight: 20,
      inputProcess: 'การทำความเข้าใจความคาดหวังของลูกค้า (ทั้งภายในและภายนอก) อย่างถ่องแท้ และใส่ใจในคุณค่าของงานและบริการที่ส่งมอบให้ลูกค้า',
      output: 'ลูกค้ามีความพึงพอใจและกลับมาใช้บริการอีก'
    }
  ];

  const [evaluations, setEvaluations] = useState<{[key: string]: EvaluationData}>(() => {
    const initial: {[key: string]: EvaluationData} = {};
    cultureItems.forEach(item => {
      initial[item.id] = {
        evidence: '',
        selfScore: 0,
        checkerFeedback: '',
        checkerScore: null,
        approverFeedback: '',
        approverScore: null,
        feedback: ''
      };
    });
    return initial;
  });

  const updateEvaluation = (id: string, field: keyof EvaluationData, value: any) => {
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

  const canEdit = (field: 'evidence' | 'selfScore' | 'checkerFeedback' | 'checkerScore' | 'approverFeedback' | 'approverScore' | 'feedback') => {
    switch (field) {
      case 'evidence':
      case 'selfScore':
      case 'feedback':
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
      description: 'บันทึกข้อมูลการประเมินวัฒนธรรมเรียบร้อยแล้ว'
    });
  };

  const handleSubmit = () => {
    toast({
      title: 'ส่งการประเมินสำเร็จ',
      description: 'ส่งการประเมินวัฒนธรรมเพื่อดำเนินการในขั้นตอนถัดไป'
    });
  };

  const { score, percentage } = calculateTotalScore();

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>การประเมินวัฒนธรรมองค์กร ครั้งที่ {period === 'mid' ? '1' : '2'}</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">
                {percentage.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">คะแนนรวมวัฒนธรรม</div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Culture Items */}
      {cultureItems.map((item) => {
        const evaluation = evaluations[item.id];
        return (
          <Card key={item.id} className="border border-gray-300">
            <CardContent className="p-6">
              {/* Header */}
              <div className="grid grid-cols-12 gap-0 mb-6 border border-gray-300">
                <div className="col-span-3 border-r border-gray-300 p-3 bg-purple-50">
                  <div className="font-medium text-sm">ประเภทวัฒนธรรม</div>
                  <div className="text-sm mt-2">{item.type}</div>
                </div>
                <div className="col-span-7 border-r border-gray-300 p-3 bg-purple-50">
                  <div className="font-medium text-sm">หัวข้อการประเมิน</div>
                  <div className="text-sm mt-2">
                    <div className="font-medium text-purple-600 mb-1">{item.id}</div>
                    {item.item}
                  </div>
                </div>
                <div className="col-span-2 p-3 bg-purple-50 text-center">
                  <div className="font-medium text-sm">น้ำหนัก%</div>
                  <div className="mt-2">
                    <Badge variant="outline">{item.weight}%</Badge>
                  </div>
                </div>
              </div>

              {/* Input & Output */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-300 p-3">
                  <div className="font-medium text-sm mb-2 text-purple-600">พฤติกรรมที่คาดหวัง</div>
                  <div className="text-xs leading-relaxed">{item.inputProcess}</div>
                </div>
                <div className="border border-gray-300 p-3">
                  <div className="font-medium text-sm mb-2 text-purple-600">ผลลัพธ์ที่คาดหวัง</div>
                  <div className="text-xs leading-relaxed">{item.output}</div>
                </div>
              </div>

              {/* Evidence and Self Assessment */}
              <div className="border border-gray-300 p-4 mb-4">
                <div className="font-medium text-sm mb-2">หลักฐานการแสดงออกตามวัฒนธรรม</div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Textarea
                      value={evaluation.evidence}
                      onChange={(e) => updateEvaluation(item.id, 'evidence', e.target.value)}
                      placeholder="กรอกหลักฐานการแสดงออกตามวัฒนธรรม..."
                      rows={4}
                      className="text-sm"
                      disabled={!canEdit('evidence')}
                    />
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Upload className="w-3 h-3 mr-1" />
                        เลือกไฟล์
                      </Button>
                    </div>
                  </div>
                  <div className="w-32 flex flex-col justify-center">
                    <div className="font-medium text-sm mb-2">คะแนนประเมินตนเอง (1-5)</div>
                    <Select
                      value={evaluation.selfScore.toString()}
                      onValueChange={(value) => updateEvaluation(item.id, 'selfScore', Number(value))}
                      disabled={!canEdit('selfScore')}
                    >
                      <SelectTrigger className="w-16">
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">-</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Checker and Approver Feedback */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-300 p-4">
                  <div className="font-medium text-sm mb-2">Feedback โดย Checker</div>
                  <Textarea
                    value={evaluation.checkerFeedback}
                    onChange={(e) => updateEvaluation(item.id, 'checkerFeedback', e.target.value)}
                    placeholder="Feedback..."
                    rows={2}
                    className="text-sm mb-2"
                    disabled={!canEdit('checkerFeedback')}
                  />
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">คะแนน (1-5)</div>
                    <Select
                      value={evaluation.checkerScore?.toString() || '0'}
                      onValueChange={(value) => updateEvaluation(item.id, 'checkerScore', Number(value))}
                      disabled={!canEdit('checkerScore')}
                    >
                      <SelectTrigger className="w-16">
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">-</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border border-gray-300 p-4">
                  <div className="font-medium text-sm mb-2">Feedback โดย Approver</div>
                  <Textarea
                    value={evaluation.approverFeedback}
                    onChange={(e) => updateEvaluation(item.id, 'approverFeedback', e.target.value)}
                    placeholder="Feedback..."
                    rows={2}
                    className="text-sm mb-2"
                    disabled={!canEdit('approverFeedback')}
                  />
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">คะแนน (1-5)</div>
                    <Select
                      value={evaluation.approverScore?.toString() || '0'}
                      onValueChange={(value) => updateEvaluation(item.id, 'approverScore', Number(value))}
                      disabled={!canEdit('approverScore')}
                    >
                      <SelectTrigger className="w-16">
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">-</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Summary */}
      <Card className="bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-purple-900">รวมคะแนนวัฒนธรรม</h4>
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
