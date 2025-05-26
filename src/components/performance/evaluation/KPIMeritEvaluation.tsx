
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Save, Send, Users, Award, Brain, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KPIMeritEvaluationProps {
  period: 'mid' | 'end';
}

interface CompetencyItem {
  id: string;
  name: string;
  description: string;
  weight: number;
  criteria: string[];
}

interface CultureItem {
  id: string;
  name: string;
  description: string;
  weight: number;
  criteria: string[];
}

interface MeritEvaluation {
  id: string;
  level: number;
  supporting_info: string;
  calculated_score: number;
}

const KPIMeritEvaluation: React.FC<KPIMeritEvaluationProps> = ({ period }) => {
  const [competencyItems, setCompetencyItems] = useState<CompetencyItem[]>([]);
  const [cultureItems, setCultureItems] = useState<CultureItem[]>([]);
  const [competencyEvaluations, setCompetencyEvaluations] = useState<{[key: string]: MeritEvaluation}>({});
  const [cultureEvaluations, setCultureEvaluations] = useState<{[key: string]: MeritEvaluation}>({});
  const [competencyScore, setCompetencyScore] = useState(0);
  const [cultureScore, setCultureScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [status, setStatus] = useState<'draft' | 'submitted' | 'approved'>('draft');
  const { toast } = useToast();

  // Mock data
  useEffect(() => {
    const mockCompetencies: CompetencyItem[] = [
      {
        id: '1',
        name: 'การคิดเชิงวิเคราะห์',
        description: 'ความสามารถในการวิเคราะห์ปัญหาและหาแนวทางแก้ไข',
        weight: 25,
        criteria: [
          'Level 1: สามารถระบุปัญหาพื้นฐานได้',
          'Level 2: สามารถวิเคราะห์ปัญหาเบื้องต้นได้',
          'Level 3: สามารถวิเคราะห์ปัญหาได้ดีและหาทางแก้ไขได้',
          'Level 4: สามารถวิเคราะห์ปัญหาซับซ้อนและแก้ไขได้อย่างมีประสิทธิภาพ',
          'Level 5: เป็นแบบอย่างในการวิเคราะห์และแก้ไขปัญหาที่ซับซ้อน'
        ]
      },
      {
        id: '2',
        name: 'การทำงานเป็นทีม',
        description: 'ความสามารถในการทำงานร่วมกับผู้อื่นอย่างมีประสิทธิภาพ',
        weight: 25,
        criteria: [
          'Level 1: สามารถทำงานกับผู้อื่นได้เบื้องต้น',
          'Level 2: ทำงานกับทีมได้ดีในงานที่ได้รับมอบหมาย',
          'Level 3: มีส่วนร่วมในการทำงานทีมอย่างสร้างสรรค์',
          'Level 4: สามารถเป็นผู้นำทีมและประสานงานได้ดี',
          'Level 5: เป็นแบบอย่างในการทำงานเป็นทีมและพัฒนาทีม'
        ]
      },
      {
        id: '3',
        name: 'การสื่อสาร',
        description: 'ความสามารถในการสื่อสารที่มีประสิทธิภาพ',
        weight: 25,
        criteria: [
          'Level 1: สื่อสารพื้นฐานได้ชัดเจน',
          'Level 2: สื่อสารกับเพื่อนร่วมงานได้ดี',
          'Level 3: สื่อสารในการนำเสนองานได้อย่างมีประสิทธิภาพ',
          'Level 4: สื่อสารกับผู้บริหารและลูกค้าได้ดีเยี่ยม',
          'Level 5: เป็นแบบอย่างในการสื่อสารและสอนผู้อื่น'
        ]
      },
      {
        id: '4',
        name: 'การเรียนรู้และพัฒนา',
        description: 'ความสามารถในการเรียนรู้สิ่งใหม่และพัฒนาตนเอง',
        weight: 25,
        criteria: [
          'Level 1: เปิดรับการเรียนรู้สิ่งใหม่',
          'Level 2: เรียนรู้และปรับปรุงงานตามคำแนะนำ',
          'Level 3: แสวงหาความรู้ใหม่และนำมาใช้ในงาน',
          'Level 4: เรียนรู้อย่างต่อเนื่องและพัฒนานวัตกรรม',
          'Level 5: เป็นแบบอย่างในการเรียนรู้และถ่ายทอดความรู้'
        ]
      }
    ];

    const mockCultures: CultureItem[] = [
      {
        id: '1',
        name: 'ความซื่อสัตย์สุจริต',
        description: 'การดำรงความซื่อสัตย์และจริงใจในการทำงาน',
        weight: 25,
        criteria: [
          'Level 1: ประพฤติตนอย่างซื่อสัตย์ในงานพื้นฐาน',
          'Level 2: รักษาความซื่อสัตย์ในการทำงานประจำ',
          'Level 3: เป็นแบบอย่างความซื่อสัตย์ในทีม',
          'Level 4: ส่งเสริมและสร้างความซื่อสัตย์ในองค์กร',
          'Level 5: เป็นผู้นำในการสร้างวัฒนธรรมความซื่อสัตย์'
        ]
      },
      {
        id: '2',
        name: 'การมุ่งเน้นลูกค้า',
        description: 'การให้ความสำคัญกับลูกค้าและตอบสนองความต้องการ',
        weight: 25,
        criteria: [
          'Level 1: เข้าใจความต้องการพื้นฐานของลูกค้า',
          'Level 2: ให้บริการลูกค้าอย่างดี',
          'Level 3: เข้าใจและตอบสนองความต้องการลูกค้าอย่างดีเยี่ยม',
          'Level 4: สร้างประสบการณ์ที่ดีเยี่ยมให้กับลูกค้า',
          'Level 5: เป็นผู้นำในการสร้างวัฒนธรรมการให้บริการลูกค้า'
        ]
      },
      {
        id: '3',
        name: 'การมีส่วนร่วม',
        description: 'การมีส่วนร่วมในกิจกรรมและการพัฒนาองค์กร',
        weight: 25,
        criteria: [
          'Level 1: เข้าร่วมกิจกรรมขององค์กรเมื่อได้รับมอบหมาย',
          'Level 2: มีส่วนร่วมในกิจกรรมทีมอย่างสม่ำเสมอ',
          'Level 3: เป็นผู้ริเริ่มและจัดกิจกรรมในทีม',
          'Level 4: เป็นผู้นำในการจัดกิจกรรมระดับองค์กร',
          'Level 5: เป็นแบบอย่างในการสร้างการมีส่วนร่วม'
        ]
      },
      {
        id: '4',
        name: 'นวัตกรรมและความคิดสร้างสรรค์',
        description: 'การสร้างสรรค์ความคิดใหม่และนวัตกรรม',
        weight: 25,
        criteria: [
          'Level 1: เปิดรับแนวคิดใหม่ในการทำงาน',
          'Level 2: เสนอแนวคิดปรับปรุงงานเบื้องต้น',
          'Level 3: สร้างแนวคิดใหม่ที่เป็นประโยชน์ต่อการทำงาน',
          'Level 4: พัฒนานวัตกรรมที่สร้างผลกระทบเชิงบวก',
          'Level 5: เป็นผู้นำในการสร้างนวัตกรรมและวัฒนธรรมความคิดสร้างสรรค์'
        ]
      }
    ];

    setCompetencyItems(mockCompetencies);
    setCultureItems(mockCultures);

    // Initialize evaluations
    const initCompetencyEvals: {[key: string]: MeritEvaluation} = {};
    const initCultureEvals: {[key: string]: MeritEvaluation} = {};

    mockCompetencies.forEach(comp => {
      initCompetencyEvals[comp.id] = {
        id: comp.id,
        level: 0,
        supporting_info: '',
        calculated_score: 0
      };
    });

    mockCultures.forEach(cult => {
      initCultureEvals[cult.id] = {
        id: cult.id,
        level: 0,
        supporting_info: '',
        calculated_score: 0
      };
    });

    setCompetencyEvaluations(initCompetencyEvals);
    setCultureEvaluations(initCultureEvals);
  }, []);

  const updateEvaluation = (
    type: 'competency' | 'culture',
    id: string,
    field: keyof MeritEvaluation,
    value: any
  ) => {
    const setter = type === 'competency' ? setCompetencyEvaluations : setCultureEvaluations;
    const items = type === 'competency' ? competencyItems : cultureItems;

    setter(prev => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value
        }
      };

      // Calculate score when level changes
      if (field === 'level') {
        const item = items.find(i => i.id === id);
        if (item) {
          updated[id].calculated_score = (value * item.weight) / 5; // Max level is 5
        }
      }

      return updated;
    });
  };

  // Calculate scores
  useEffect(() => {
    const compTotal = Object.values(competencyEvaluations).reduce(
      (sum, eval) => sum + eval.calculated_score, 0
    );
    const cultTotal = Object.values(cultureEvaluations).reduce(
      (sum, eval) => sum + eval.calculated_score, 0
    );
    
    setCompetencyScore(compTotal);
    setCultureScore(cultTotal);
    setTotalScore(compTotal + cultTotal);
  }, [competencyEvaluations, cultureEvaluations]);

  const handleSaveDraft = () => {
    toast({
      title: 'บันทึกร่างสำเร็จ',
      description: 'บันทึกข้อมูลการประเมิน Merit เป็นร่างแล้ว'
    });
  };

  const handleSubmit = () => {
    // Validate
    const incompleteComp = competencyItems.filter(item => 
      competencyEvaluations[item.id].level === 0
    );
    const incompleteCult = cultureItems.filter(item => 
      cultureEvaluations[item.id].level === 0
    );

    if (incompleteComp.length > 0 || incompleteCult.length > 0) {
      toast({
        title: 'ข้อมูลไม่ครบถ้วน',
        description: 'กรุณาประเมินให้ครบทุกรายการ',
        variant: 'destructive'
      });
      return;
    }

    setStatus('submitted');
    toast({
      title: 'ส่งการประเมินสำเร็จ',
      description: 'ส่งการประเมิน KPI Merit เรียบร้อยแล้ว'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderEvaluationSection = (
    type: 'competency' | 'culture',
    items: (CompetencyItem | CultureItem)[],
    evaluations: {[key: string]: MeritEvaluation},
    icon: React.ReactNode,
    title: string
  ) => (
    <div className="space-y-6">
      {items.map((item) => {
        const evaluation = evaluations[item.id] || {};
        return (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {icon}
                    {item.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <Badge variant="outline" className="mt-2">
                    น้ำหนัก: {item.weight}%
                  </Badge>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${getScoreColor(evaluation.calculated_score || 0)}`}>
                    {(evaluation.calculated_score || 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">คะแนน</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Criteria */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium text-gray-700">เกณฑ์การประเมิน:</Label>
                <ul className="text-sm mt-2 space-y-1">
                  {item.criteria.map((criterion, index) => (
                    <li key={index} className="text-gray-600">• {criterion}</li>
                  ))}
                </ul>
              </div>

              {/* Level Selection */}
              <div>
                <Label>เลือกระดับการประเมิน *</Label>
                <RadioGroup
                  value={evaluation.level?.toString() || '0'}
                  onValueChange={(value) => updateEvaluation(type, item.id, 'level', Number(value))}
                  disabled={status !== 'draft'}
                  className="flex gap-6 mt-2"
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.toString()} id={`${item.id}-${level}`} />
                      <Label htmlFor={`${item.id}-${level}`}>Level {level}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="mt-2">
                  <Progress value={(evaluation.level || 0) * 20} className="h-2" />
                  <div className="text-sm text-gray-600 mt-1">
                    คะแนนที่ได้: {((evaluation.level || 0) * item.weight / 5).toFixed(2)} / {item.weight}
                  </div>
                </div>
              </div>

              {/* Supporting Information */}
              <div>
                <Label htmlFor={`supporting-${item.id}`}>ข้อมูลสนับสนุนการประเมิน</Label>
                <Textarea
                  id={`supporting-${item.id}`}
                  value={evaluation.supporting_info || ''}
                  onChange={(e) => updateEvaluation(type, item.id, 'supporting_info', e.target.value)}
                  placeholder="อธิบายเหตุผลในการให้คะแนนและยกตัวอย่างที่สนับสนุน..."
                  rows={3}
                  disabled={status !== 'draft'}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              ประเมิน KPI Merit - {period === 'mid' ? 'กลางปี' : 'ปลายปี'}
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant={status === 'draft' ? 'secondary' : status === 'submitted' ? 'default' : 'success'}>
                {status === 'draft' ? 'ร่าง' : status === 'submitted' ? 'รอการอนุมัติ' : 'อนุมัติแล้ว'}
              </Badge>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(totalScore)}`}>
                  {totalScore.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-500">คะแนนรวม</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className={`text-lg font-bold ${getScoreColor(competencyScore)}`}>
                {competencyScore.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">Competency</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className={`text-lg font-bold ${getScoreColor(cultureScore)}`}>
                {cultureScore.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">Culture</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className={`text-lg font-bold ${getScoreColor(totalScore)}`}>
                {totalScore.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">รวม</div>
            </div>
          </div>
          <Progress value={totalScore} className="h-3" />
        </CardContent>
      </Card>

      {/* Merit Evaluation Tabs */}
      <Tabs defaultValue="competency" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="competency" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Competency
          </TabsTrigger>
          <TabsTrigger value="culture" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Culture
          </TabsTrigger>
        </TabsList>

        <TabsContent value="competency">
          {renderEvaluationSection(
            'competency',
            competencyItems,
            competencyEvaluations,
            <Brain className="w-5 h-5" />,
            'Competency'
          )}
        </TabsContent>

        <TabsContent value="culture">
          {renderEvaluationSection(
            'culture',
            cultureItems,
            cultureEvaluations,
            <Heart className="w-5 h-5" />,
            'Culture'
          )}
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      {status === 'draft' && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                กรุณาประเมินให้ครบทุกรายการก่อนส่งการประเมิน
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

export default KPIMeritEvaluation;
