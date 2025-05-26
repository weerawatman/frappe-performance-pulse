
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Info, Target, Calendar, Ruler } from 'lucide-react';

interface SMARTCriteria {
  specific: boolean;
  measurable: boolean;
  achievable: boolean;
  relevant: boolean;
  timeBound: boolean;
}

interface GoalAnalysis {
  score: number;
  criteria: SMARTCriteria;
  suggestions: string[];
  examples: string[];
}

const SMARTGoalHelper: React.FC = () => {
  const [goalText, setGoalText] = useState('');
  const [analysis, setAnalysis] = useState<GoalAnalysis | null>(null);

  const analyzeGoal = (goal: string): GoalAnalysis => {
    const criteria: SMARTCriteria = {
      specific: checkSpecific(goal),
      measurable: checkMeasurable(goal),
      achievable: checkAchievable(goal),
      relevant: checkRelevant(goal),
      timeBound: checkTimeBound(goal)
    };

    const score = Object.values(criteria).filter(Boolean).length;
    const suggestions = generateSuggestions(criteria, goal);
    const examples = generateExamples(goal);

    return { score, criteria, suggestions, examples };
  };

  const checkSpecific = (goal: string): boolean => {
    const specificKeywords = ['เพิ่ม', 'ลด', 'ปรับปรุง', 'พัฒนา', 'สร้าง', 'ได้', 'ทำ', 'บรรลุ'];
    return specificKeywords.some(keyword => goal.includes(keyword));
  };

  const checkMeasurable = (goal: string): boolean => {
    const numberPattern = /\d+/;
    const measureKeywords = ['%', 'เปอร์เซ็นต์', 'บาท', 'คน', 'ครั้ง', 'ชิ้น', 'หน่วย'];
    return numberPattern.test(goal) || measureKeywords.some(keyword => goal.includes(keyword));
  };

  const checkAchievable = (goal: string): boolean => {
    // Simple heuristic - very high numbers might be unrealistic
    const numbers = goal.match(/\d+/g);
    if (numbers) {
      const largeNumbers = numbers.filter(num => parseInt(num) > 1000);
      return largeNumbers.length === 0; // Assuming goals with very large numbers might be unrealistic
    }
    return true;
  };

  const checkRelevant = (goal: string): boolean => {
    const businessKeywords = ['ยอดขาย', 'รายได้', 'ลูกค้า', 'ความพึงพอใจ', 'ประสิทธิภาพ', 'คุณภาพ', 'ต้นทุน'];
    return businessKeywords.some(keyword => goal.includes(keyword));
  };

  const checkTimeBound = (goal: string): boolean => {
    const timeKeywords = ['วัน', 'สัปดาห์', 'เดือน', 'ไตรมาส', 'ปี', 'ภายใน', 'ก่อน', 'ระหว่าง'];
    return timeKeywords.some(keyword => goal.includes(keyword));
  };

  const generateSuggestions = (criteria: SMARTCriteria, goal: string): string[] => {
    const suggestions: string[] = [];

    if (!criteria.specific) {
      suggestions.push('ระบุให้ชัดเจนว่าต้องการทำอะไรและอย่างไร');
    }
    if (!criteria.measurable) {
      suggestions.push('เพิ่มตัวเลขหรือหน่วยวัดที่ชัดเจน เช่น เปอร์เซ็นต์ จำนวน หรือมูลค่า');
    }
    if (!criteria.achievable) {
      suggestions.push('ตรวจสอบความเป็นไปได้ของเป้าหมายให้สอดคล้องกับทรัพยากรที่มี');
    }
    if (!criteria.relevant) {
      suggestions.push('เชื่อมโยงกับเป้าหมายทางธุรกิจที่สำคัญ');
    }
    if (!criteria.timeBound) {
      suggestions.push('กำหนดกรอบเวลาที่ชัดเจน เช่น ภายในไตรมาสนี้ หรือก่อนสิ้นปี');
    }

    return suggestions;
  };

  const generateExamples = (goal: string): string[] => {
    return [
      'เพิ่มยอดขายสินค้า A ให้ได้ 20% เทียบกับไตรมาสที่แล้วภายในไตรมาส 1/2025',
      'ลดเวลาการตอบสนองลูกค้าลงเหลือไม่เกิน 2 ชั่วโมงภายในเดือนมีนาคม 2025',
      'เพิ่มคะแนนความพึงพอใจของลูกค้าให้ได้ 4.5/5.0 ในแบบสำรวจไตรมาส 2/2025'
    ];
  };

  const handleAnalyze = () => {
    if (goalText.trim()) {
      const result = analyzeGoal(goalText);
      setAnalysis(result);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreText = (score: number) => {
    if (score === 5) return 'ยอดเยี่ยม! เป้าหมายนี้ผ่านเกณฑ์ SMART ครบถ้วน';
    if (score >= 4) return 'ดีมาก! เป้าหมายนี้ใกล้เคียงกับเกณฑ์ SMART แล้ว';
    if (score >= 3) return 'ปานกลาง ควรปรับปรุงเพิ่มเติม';
    if (score >= 2) return 'ต้องปรับปรุง เป้าหมายยังไม่ชัดเจนพอ';
    return 'ควรเขียนใหม่ เป้าหมายไม่ตรงตามเกณฑ์ SMART';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">เครื่องมือช่วยกำหนดเป้าหมายแบบ SMART</h2>
        <p className="text-gray-600">วิเคราะห์และปรับปรุงเป้าหมาย KPI ให้ตรงตามหลัก SMART Goals</p>
      </div>

      {/* SMART Criteria Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            หลักการ SMART Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-blue-900">Specific</h4>
              <p className="text-sm text-gray-600">ชัดเจน เฉพาะเจาะจง</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Ruler className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-green-900">Measurable</h4>
              <p className="text-sm text-gray-600">วัดผลได้</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-yellow-900">Achievable</h4>
              <p className="text-sm text-gray-600">บรรลุได้</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-purple-900">Relevant</h4>
              <p className="text-sm text-gray-600">เกี่ยวข้อง สำคัญ</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 text-red-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-red-900">Time-bound</h4>
              <p className="text-sm text-gray-600">มีกรอบเวลา</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goal Input */}
      <Card>
        <CardHeader>
          <CardTitle>วิเคราะห์เป้าหมาย KPI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goal">เป้าหมาย KPI ของคุณ</Label>
            <Textarea
              id="goal"
              placeholder="เช่น เพิ่มยอดขายให้ได้ 15% ภายในไตรมาสนี้"
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              rows={3}
            />
          </div>
          <Button onClick={handleAnalyze} disabled={!goalText.trim()}>
            วิเคราะห์เป้าหมาย
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>ผลการวิเคราะห์</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score */}
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}/5
              </div>
              <p className={`text-lg ${getScoreColor(analysis.score)}`}>
                {getScoreText(analysis.score)}
              </p>
            </div>

            {/* SMART Criteria Check */}
            <div>
              <h4 className="font-semibold mb-3">การตรวจสอบตามหลัก SMART</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    analysis.criteria.specific ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {analysis.criteria.specific ? 
                      <CheckCircle className="w-6 h-6 text-green-600" /> : 
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    }
                  </div>
                  <p className="text-sm font-medium">Specific</p>
                  <p className={`text-xs ${analysis.criteria.specific ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.criteria.specific ? 'ผ่าน' : 'ไม่ผ่าน'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    analysis.criteria.measurable ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {analysis.criteria.measurable ? 
                      <CheckCircle className="w-6 h-6 text-green-600" /> : 
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    }
                  </div>
                  <p className="text-sm font-medium">Measurable</p>
                  <p className={`text-xs ${analysis.criteria.measurable ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.criteria.measurable ? 'ผ่าน' : 'ไม่ผ่าน'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    analysis.criteria.achievable ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {analysis.criteria.achievable ? 
                      <CheckCircle className="w-6 h-6 text-green-600" /> : 
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    }
                  </div>
                  <p className="text-sm font-medium">Achievable</p>
                  <p className={`text-xs ${analysis.criteria.achievable ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.criteria.achievable ? 'ผ่าน' : 'ไม่ผ่าน'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    analysis.criteria.relevant ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {analysis.criteria.relevant ? 
                      <CheckCircle className="w-6 h-6 text-green-600" /> : 
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    }
                  </div>
                  <p className="text-sm font-medium">Relevant</p>
                  <p className={`text-xs ${analysis.criteria.relevant ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.criteria.relevant ? 'ผ่าน' : 'ไม่ผ่าน'}
                  </p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    analysis.criteria.timeBound ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {analysis.criteria.timeBound ? 
                      <CheckCircle className="w-6 h-6 text-green-600" /> : 
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    }
                  </div>
                  <p className="text-sm font-medium">Time-bound</p>
                  <p className={`text-xs ${analysis.criteria.timeBound ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.criteria.timeBound ? 'ผ่าน' : 'ไม่ผ่าน'}
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-medium">คำแนะนำในการปรับปรุง:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm">{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Examples */}
            <div>
              <h4 className="font-semibold mb-3">ตัวอย่างเป้าหมายที่ดี</h4>
              <div className="space-y-2">
                {analysis.examples.map((example, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                    <p className="text-sm text-green-800">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SMARTGoalHelper;
