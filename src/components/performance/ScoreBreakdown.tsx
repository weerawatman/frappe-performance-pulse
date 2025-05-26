
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Target, User, MessageSquare, Calculator } from 'lucide-react';
import { ScoreCalculationResult, getPerformanceRating } from '@/utils/performanceScoring';

interface ScoreBreakdownProps {
  scoreResult: ScoreCalculationResult;
  showBreakdown?: boolean;
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ 
  scoreResult, 
  showBreakdown = true 
}) => {
  const performanceRating = getPerformanceRating(scoreResult.finalScore);

  return (
    <div className="space-y-6">
      {/* Overall Score Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            สรุปคะแนนการประเมิน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {scoreResult.goalScore.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">คะแนน KRA</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {scoreResult.selfScore.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">คะแนนประเมินตนเอง</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {scoreResult.feedbackScore.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">คะแนน Feedback</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {scoreResult.finalScore.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">คะแนนสุดท้าย</div>
            </div>
          </div>

          {/* Performance Rating */}
          <div className="text-center">
            <Badge className={`text-lg px-4 py-2 ${performanceRating.color}`}>
              {performanceRating.rating}
            </Badge>
            <p className="text-sm text-gray-600 mt-2">
              {performanceRating.description}
            </p>
            <Progress 
              value={(scoreResult.finalScore / 5) * 100} 
              className="mt-3 h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      {showBreakdown && (
        <>
          {/* KRA Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                รายละเอียดคะแนน KRA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreResult.breakdown.kraScores.map((kra, index) => (
                  <div key={kra.kraId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{kra.kra}</h4>
                      <div className="text-sm text-gray-600">
                        คะแนนดิบ: {kra.score.toFixed(2)} | คะแนนถ่วงน้ำหนัก: {kra.weightedScore.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-blue-600">
                        {kra.weightedScore.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>รวม KRA Score:</span>
                  <span className="text-lg text-blue-600">
                    {scoreResult.goalScore.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Self Rating Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                รายละเอียดคะแนนประเมินตนเอง
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreResult.breakdown.selfRatings.map((rating, index) => (
                  <div key={rating.criteriaId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{rating.criteria}</h4>
                      <div className="text-sm text-gray-600">
                        คะแนนปรับเป็น 5: {rating.score.toFixed(2)} | คะแนนถ่วงน้ำหนัก: {rating.weightedScore.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">
                        {rating.weightedScore.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>รวม Self Score:</span>
                  <span className="text-lg text-green-600">
                    {scoreResult.selfScore.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                รายละเอียดคะแนน Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreResult.breakdown.feedbackScores.length > 0 ? (
                  <>
                    {scoreResult.breakdown.feedbackScores.map((score, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">Feedback #{index + 1}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-purple-600">
                            {score.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-semibold">
                      <span>ค่าเฉลี่ย Feedback Score:</span>
                      <span className="text-lg text-purple-600">
                        {scoreResult.feedbackScore.toFixed(2)}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    ยังไม่มี Feedback
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ScoreBreakdown;
