
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, Send } from 'lucide-react';
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
  checkerScore: number | null;
  approverScore: number | null;
  feedback: string;
}

interface MeritEvaluationTableProps {
  period: 'mid' | 'end';
  userRole: 'employee' | 'checker' | 'approver';
}

const MeritEvaluationTable: React.FC<MeritEvaluationTableProps> = ({ period, userRole }) => {
  const { toast } = useToast();

  // Mock competency data based on the image
  const competencyItems: CompetencyItem[] = [
    {
      id: 'PC43',
      type: 'Strategic Driven Functional Competency',
      item: 'การบริหาร HR ศูนย์รวมข้อมูลสำหรับหน้าที่งาน (HRDP (HR Business Partnership))',
      weight: 7.50,
      inputProcess: '1) รวบรวมความต้องการและปัญหาการใช้งาน รวมถึงศึกษาความต้องการ Self Service ด้าน HR\n2) ออกแบบแนวทางโปรแกรม e-PMS และ Self Service ร่วมกับ BU, Supplier และ IT\n3) รวบรวมข้อมูล KPI Bonus & Merit (MGR up) เพื่อนำเข้า e-PMS และเตรียมข้อมูล Self Service\n4) ศึกษาระบบ e-PMS และ Self Service เพื่อให้คำแนะนำและแก้ไขปัญหา\n5) สนับสนุนและแก้ไขปัญหาการใช้งาน e-PMS และ Self Service',
      output: '1) e-PMS : มีการนำเอาข้อมูล Manager up เข้าระบบ e-PMS 100%\n2) HR E-Request และ/หรือ HR Connect Application มีผู้ใช้งาน, ลดเวลาในกระบวนการ (Man-Hour) ลงมากกว่า 10%\nKPI2 : New PMS System 2025 (E-PMS)\nKPI3 : HR One Data Center'
    },
    {
      id: 'PC50',
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
        checkerScore: null,
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

  const canEdit = (field: 'evidence' | 'selfScore' | 'checkerScore' | 'approverScore' | 'feedback') => {
    switch (field) {
      case 'evidence':
      case 'selfScore':
      case 'feedback':
        return userRole === 'employee';
      case 'checkerScore':
        return userRole === 'checker';
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>การประเมิน Merit ครั้งที่ 1</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {percentage.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">คะแนนรวม Competency</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="border w-32">ประเภท Competency (Competency Type)</TableHead>
                  <TableHead className="border w-48">Item (หัวข้อ)</TableHead>
                  <TableHead className="border w-20 text-center">Weight% (น้ำหนัก)</TableHead>
                  <TableHead className="border w-64">Input & Process - ชี้ให้เห็นความเชื่อมโยงกับเป้าหมายขององค์กรและหน้าที่</TableHead>
                  <TableHead className="border w-64">Output - ผลลัพธ์ของงานในรูปขอบเขตชัดเจน (มีตัวเลขชี้วัดที่ใช้วัดผลสำเร็จ) ไม่ว่าจะเชิง KPI</TableHead>
                  <TableHead className="border w-64">หลักฐานการดำเนินการ/การแสดงออกจริง</TableHead>
                  <TableHead className="border w-24 text-center">ประเมินผลสำเร็จของตนเอง</TableHead>
                  <TableHead className="border w-24 text-center">ประเมินผลสำเร็จโดย Checker</TableHead>
                  <TableHead className="border w-24 text-center">ประเมินผลสำเร็จโดย Approver</TableHead>
                  <TableHead className="border w-64">Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competencyItems.map((item, index) => {
                  const evaluation = evaluations[item.id];
                  return (
                    <TableRow key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <TableCell className="border align-top">
                        <div className="text-sm font-medium whitespace-normal break-words">
                          {item.type}
                        </div>
                      </TableCell>
                      <TableCell className="border align-top">
                        <div className="text-sm whitespace-normal break-words">
                          <div className="font-medium mb-1">{item.id}</div>
                          {item.item}
                        </div>
                      </TableCell>
                      <TableCell className="border text-center align-top">
                        <Badge variant="outline">{item.weight}%</Badge>
                      </TableCell>
                      <TableCell className="border align-top">
                        <div className="text-xs whitespace-normal break-words leading-relaxed">
                          {item.inputProcess.split('\n').map((line, i) => (
                            <div key={i} className="mb-1">{line}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="border align-top">
                        <div className="text-xs whitespace-normal break-words leading-relaxed">
                          {item.output.split('\n').map((line, i) => (
                            <div key={i} className="mb-1">{line}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="border align-top">
                        <Textarea
                          value={evaluation.evidence}
                          onChange={(e) => updateEvaluation(item.id, 'evidence', e.target.value)}
                          placeholder="กรอกหลักฐานการดำเนินการ..."
                          rows={4}
                          className="text-sm"
                          disabled={!canEdit('evidence')}
                        />
                      </TableCell>
                      <TableCell className="border text-center align-top">
                        <Select
                          value={evaluation.selfScore.toString()}
                          onValueChange={(value) => updateEvaluation(item.id, 'selfScore', Number(value))}
                          disabled={!canEdit('selfScore')}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือก" />
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
                      </TableCell>
                      <TableCell className="border text-center align-top">
                        <Select
                          value={evaluation.checkerScore?.toString() || '0'}
                          onValueChange={(value) => updateEvaluation(item.id, 'checkerScore', Number(value))}
                          disabled={!canEdit('checkerScore')}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือก" />
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
                      </TableCell>
                      <TableCell className="border text-center align-top">
                        <Select
                          value={evaluation.approverScore?.toString() || '0'}
                          onValueChange={(value) => updateEvaluation(item.id, 'approverScore', Number(value))}
                          disabled={!canEdit('approverScore')}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือก" />
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
                      </TableCell>
                      <TableCell className="border align-top">
                        <Textarea
                          value={evaluation.feedback}
                          onChange={(e) => updateEvaluation(item.id, 'feedback', e.target.value)}
                          placeholder="กรอก Feedback..."
                          rows={4}
                          className="text-sm"
                          disabled={!canEdit('feedback')}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Summary Row */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
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
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              บันทึก
            </Button>
            <Button onClick={handleSubmit}>
              <Send className="w-4 h-4 mr-2" />
              ส่งการประเมิน
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeritEvaluationTable;
