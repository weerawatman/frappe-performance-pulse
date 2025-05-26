
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, AlertTriangle, CheckCircle } from 'lucide-react';
import { getScoreColor, getScoreGrade, getScoreBgColor } from '@/utils/kpiScoring';

interface ScoreItem {
  id: string;
  name: string;
  score: number;
  weight: number;
  maxScore?: number;
}

interface ScoreBreakdownCardProps {
  title: string;
  items: ScoreItem[];
  totalScore: number;
  totalWeight: number;
  isWeightValid?: boolean;
  showDetailedCalculation?: boolean;
}

const ScoreBreakdownCard: React.FC<ScoreBreakdownCardProps> = ({
  title,
  items,
  totalScore,
  totalWeight,
  isWeightValid = true,
  showDetailedCalculation = false
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {!isWeightValid && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                น้ำหนักไม่ถูกต้อง
              </Badge>
            )}
            {isWeightValid && (
              <Badge variant="outline" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                น้ำหนักถูกต้อง
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* แสดงรายการคะแนนแต่ละข้อ */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className={`p-3 rounded-lg ${getScoreBgColor(item.score)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${getScoreColor(item.score)}`}>
                    {item.score.toFixed(2)}
                  </span>
                  <Badge variant="outline">
                    น้ำหนัก: {item.weight}%
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-1">
                <Progress value={item.score} className="h-2" />
                {showDetailedCalculation && (
                  <div className="text-xs text-gray-600">
                    การคำนวณ: คะแนนที่ได้ × น้ำหนัก ÷ {item.maxScore || 100} = {item.score.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* แสดงข้อมูลสรุป */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(totalScore)}`}>
                {totalScore.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">คะแนนรวม</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalWeight}%
              </div>
              <div className="text-sm text-gray-600">น้ำหนักรวม</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${getScoreColor(totalScore)}`}>
                {getScoreGrade(totalScore)}
              </div>
              <div className="text-sm text-gray-600">เกรด</div>
            </div>
          </div>
        </div>

        {/* คำเตือนเมื่อน้ำหนักไม่ถูกต้อง */}
        {!isWeightValid && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">คำเตือน:</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              น้ำหนักรวมต้องเท่ากับ 100% เพื่อให้การคำนวณคะแนนถูกต้อง
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreBreakdownCard;
