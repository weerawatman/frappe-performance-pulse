
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, Send, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompetencyItem {
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

interface MeritEvaluationTableProps {
  period: 'mid' | 'end';
  userRole: 'employee' | 'checker' | 'approver' | 'admin';
}

const MeritEvaluationTable: React.FC<MeritEvaluationTableProps> = ({ period, userRole }) => {
  const { toast } = useToast();

  // Mock competency data based on the image
  const competencyItems: CompetencyItem[] = [
    {
      id: 'FC43',
      type: 'Strategic Driven Functional Competency',
      item: 'การบริหาร HR ศูนย์รวมข้อมูลสำหรับหน้าที่งาน (HRDP (HR Business Partnership))',
      weight: 7.50,
      inputProcess: '1) รวบรวมความต้องการและปัญหาการใช้งาน รวมถึงศึกษาความต้องการ Self Service ด้าน HR\n2) ออกแบบแนวทางโปรแกรม e-PMS และ Self Service ร่วมกับ BU, Supplier และ IT\n3) รวบรวมข้อมูล KPI Bonus & Merit (MGR up) เพื่อนำเข้า e-PMS และเตรียมข้อมูล Self Service\n4) ศึกษาระบบ e-PMS และ Self Service เพื่อให้คำแนะนำและแก้ไขปัญหา\n5) สนับสนุนและแก้ไขปัญหาการใช้งาน e-PMS และ Self Service',
      output: '1) e-PMS : มีการนำเอาข้อมูล Manager up เข้าระบบ e-PMS 100%\n2) HR E-Request และ/หรือ HR Connect Application มีผู้ใช้งาน, ลดเวลาในกระบวนการ (Man-Hour) ลงมากกว่า 10%\nKPI2 : New PMS System 2025 (E-PMS)\nKPI3 : HR One Data Center'
    },
    {
      id: 'FC50',
      type: 'Strategic Driven Functional Competency',
      item: 'การจัดองค์การองการและบริหารจัดการ HR - สำนักงานวิสาหกิจเพื่อการพึ่งตนเอง (OD) (COE - Organization (Center of Excellence))',
      weight: 7.50,
      inputProcess: '1) Job Evaluation (Process and Tool) ถูกกำหนดใช้เป็นมาตรฐานสำหรับ SAT และอยู่ในรูปแบบฐานข้อมูลที่สามารถนำมา Analyse ได้ 100% (AGM up)\n2) ปรับปรุงระเบียบและวิธีปฏิบัติตามแนวทางที่นำเสนอจาก EHM (ที่ไม่เกี่ยวกับตัวเงิน) อย่างน้อย 2 เรื่อง\nKPI4 : Strategic Position and Job Evaluation (MGR up)\nKPI5 : Organization and Manpower Planning Guideline',
      output: 'ศึกษาเครื่องมือประเมินค่างานใหม่ และกระบวนการวิเคราะห์โครงสร้างองค์กร วิเคราะห์ข้อมูลภายในและศึกษา Benchmark ภายนอกเพื่อประเมินค่างานและบริหาร Manpower ทบทวน Job Description, ประเมินค่างาน AGM up, กำหนด Strategic Position ทบทวนโครงสร้างค่าตอบแทน'
    },
    {
      id: 'MC6',
      type: 'Managerial Competency',
      item: 'การความเขอใจและกฏหมายแออหลักฎหมายในการค้าขายและก้าน - การบริหารความเสี่ยงการค้าขายอย่างยุติธรรมและยั่งยืน',
      weight: 7.50,
      inputProcess: '1) ศึกษาเครื่องมือประเมิน Digital & AI มาประยุกต์ใช้ในการทำงานจริง\n2) วิเคราะห์ร่วมกับหน่วยงานที่เกี่ยวข้องเพื่อประเมินทักษะ Digital ของ Foreman up และความต้องการทักษะ Digital\n3) จัดกิจกรรมให้ Foreman up มีส่วนร่วมในการเรียนรู้และใช้เครื่องมือ Digital & AI',
      output: '1) Foreman ที่เข้าร่วมการพัฒนาทักษะ มีการนำ Digital & AI Tool ปรับใช้ในงานที่รับผิดชอบในปัจจุบันอย่างน้อยคนละ 1 เรื่อง\n2) กิจกรรมชมรม AI มีการจัดอย่างน้อย 4 ครั้งต่อปี, สามารถดึงพนักงานระดับ Foreman up เข้ามามีส่วนร่วมในกิจกรรมได้อย่างน้อย 50% ต่อครั้ง\n3) HR KPI Alignment และสามารถ Monitor Plan vs Actual บนระบบ Digital ได้\nKPI1 : พัฒนา Foreman up 160 คนให้เป็น Digitalization Citizen (กลุ่มเป้าหมาย Foreman up 160 คน จาก 538 คน)'
    },
    {
      id: 'MC4',
      type: 'Managerial Competency',
      item: 'การสร้างความสามารถองค์กรเพื่อมีการพัฒนา (Effective Communication & Presentation)',
      weight: 7.50,
      inputProcess: '1) วางแผนการนำเสนอวาระ EHM, รวบรวมข้อมูลและกรอบการนำเสนอ\n2) ประสานผู้รับผิดชอบวาระและสนับสนุนการเตรียมงานนำเสนอ\n3) ออกแบบ/สร้าง/ปรับปรุง Dashboard นำเสนอผู้บริหารและติดตามข้อมูล\n4) เรียนรู้และพัฒนาทักษะ Data Storytelling, Presentation Skill และการสื่อสาร',
      output: '1) ตารางการกำหนดวาระ EHM ในทุกเดือน, เตรียมวาระเตรียมข้อมูลและเนื้อหาในการนำเสนอที่จำเป็นต่อการนำเสนอวาระนั้นๆ รวมถึงการวาง Story นำเสนอได้\n2) สรุปรายงานการประชุม EHM ได้ครบถ้วนในเนื้อหา และสื่อให้ผู้รับเข้าใจในเนื้อหาเพื่อดำเนินการต่อได้\nKPI7 : บริหารการประชุม EHM, NC, ED & BOD'
    }
  ];

  const [evaluations, setEvaluations] = useState<{[key: string]: EvaluationData}>(() => {
    const initial: {[key: string]: EvaluationData} = {};
    competencyItems.forEach(item => {
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

    competencyItems.forEach(item => {
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
      description: 'บันทึกข้อมูลการประเมิน Merit เรียบร้อยแล้ว'
    });
  };

  const handleSubmit = () => {
    toast({
      title: 'ส่งการประเมินสำเร็จ',
      description: 'ส่งการประเมิน Merit เพื่อดำเนินการในขั้นตอนถัดไป'
    });
  };

  const { score, percentage } = calculateTotalScore();

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>การประเมิน Competency ครั้งที่ {period === 'mid' ? '1' : '2'}</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {percentage.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">คะแนนรวม Competency</div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Competency Items */}
      {competencyItems.map((item, index) => {
        const evaluation = evaluations[item.id];
        return (
          <Card key={item.id} className="border border-gray-300">
            <CardContent className="p-6">
              {/* Header Table - Updated Layout */}
              <div className="grid grid-cols-5 gap-0 mb-6 border border-gray-300">
                <div className="border-r border-gray-300 p-3 bg-gray-50">
                  <div className="font-medium text-sm">ประเภท Competency (Competency Type)</div>
                  <div className="text-sm mt-2">{item.type}</div>
                </div>
                <div className="border-r border-gray-300 p-3 bg-gray-50">
                  <div className="font-medium text-sm">Item (หัวข้อ)</div>
                  <div className="text-sm mt-2">
                    <div className="font-medium text-blue-600 mb-1">{item.id}</div>
                    {item.item}
                  </div>
                </div>
                <div className="border-r border-gray-300 p-3 bg-gray-50 text-center">
                  <div className="font-medium text-sm">Weight% (น้ำหนัก)</div>
                  <div className="mt-2">
                    <Badge variant="outline">{item.weight}%</Badge>
                  </div>
                </div>
                <div className="border-r border-gray-300 p-3 bg-gray-50">
                  <div className="font-medium text-sm mb-2 text-blue-600">
                    Input & Process - ชี้ให้เห็นความเชื่อมโยงกับเป้าหมายขององค์กรและหน้าที่
                  </div>
                  <div className="text-xs leading-relaxed">
                    {item.inputProcess.split('\n').map((line, i) => (
                      <div key={i} className="mb-1">{line}</div>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-gray-50">
                  <div className="font-medium text-sm mb-2 text-blue-600">
                    Output - ผลลัพธ์ของงานในรูปขอบเขตชัดเจน (มีตัวเลขชี้วัดที่ใช้วัดผลสำเร็จ) ไม่ว่าจะเชิง KPI
                  </div>
                  <div className="text-xs leading-relaxed">
                    {item.output.split('\n').map((line, i) => (
                      <div key={i} className="mb-1">{line}</div>
                    ))}
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
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Upload className="w-3 h-3 mr-1" />
                        เลือกไฟล์
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ข้อมูลเพิ่มเติม ระบุ อีเมล หรือ เอกสารอ้างอิง...
                    </div>
                  </div>
                  <div className="w-32 flex flex-col justify-center">
                    <div className="font-medium text-sm mb-2">% ความสำเร็จ (1-5) *</div>
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
                    <div className="text-xs text-gray-500 mt-1">การคำนวณ: {evaluation.selfScore}% × {item.weight}% ÷ 5 = {((evaluation.selfScore / 5) * item.weight).toFixed(2)} คะแนน</div>
                  </div>
                </div>
              </div>

              {/* Checker and Approver Feedback in same row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Checker Feedback */}
                <div className="border border-gray-300 p-4">
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
                    <div className="text-right">
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
                      <div className="text-xs text-gray-500 mt-1">การคำนวณ: {evaluation.checkerScore || 0}% × {item.weight}% ÷ 5 = {(((evaluation.checkerScore || 0) / 5) * item.weight).toFixed(2)} คะแนน</div>
                    </div>
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
                    <div className="text-right">
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
                      <div className="text-xs text-gray-500 mt-1">การคำนวณ: {evaluation.approverScore || 0}% × {item.weight}% ÷ 5 = {(((evaluation.approverScore || 0) / 5) * item.weight).toFixed(2)} คะแนน</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Summary Card */}
      <Card className="bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">รวมคะแนน Competency</h4>
              <p className="text-sm text-blue-700">
                สูตรการคำนวณ: Σ(คะแนน ÷ 5) × น้ำหนัก%
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {percentage.toFixed(2)}%
              </div>
              <div className="text-sm text-blue-500">
                ({score.toFixed(2)} / {competencyItems.reduce((sum, item) => sum + item.weight, 0)})
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

export default MeritEvaluationTable;
