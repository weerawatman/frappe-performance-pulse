
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare,
  Star,
  User,
  Calendar,
  Save,
  Send,
  Eye,
  Edit,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { EmployeePerformanceFeedback, FeedbackRating, RatingCriteria } from '@/types/performance';

interface FeedbackManagerProps {
  appraisalId: string;
  employeeName: string;
  reviewerName: string;
  ratingCriteria: RatingCriteria[];
  existingFeedback?: EmployeePerformanceFeedback;
  onSave: (feedback: Omit<EmployeePerformanceFeedback, 'id' | 'created_at' | 'modified_at'>) => void;
  onSubmit: (feedback: Omit<EmployeePerformanceFeedback, 'id' | 'created_at' | 'modified_at'>) => void;
  isReadOnly?: boolean;
}

const FeedbackManager: React.FC<FeedbackManagerProps> = ({
  appraisalId,
  employeeName,
  reviewerName,
  ratingCriteria,
  existingFeedback,
  onSave,
  onSubmit,
  isReadOnly = false
}) => {
  const [feedback, setFeedback] = useState(existingFeedback?.feedback || '');
  const [ratings, setRatings] = useState<FeedbackRating[]>(
    existingFeedback?.feedback_ratings || 
    ratingCriteria.map(criteria => ({
      id: criteria.id,
      criteria: criteria.criteria,
      description: criteria.description,
      weightage: criteria.weightage,
      max_rating: criteria.max_rating,
      rating: 0,
      comments: ''
    }))
  );

  const updateRating = (criteriaId: string, rating: number, comments?: string) => {
    setRatings(prev => prev.map(r => 
      r.id === criteriaId 
        ? { ...r, rating, comments: comments !== undefined ? comments : r.comments }
        : r
    ));
  };

  const calculateTotalScore = () => {
    const totalWeightedScore = ratings.reduce((sum, rating) => {
      const normalizedScore = (rating.rating / rating.max_rating) * 100;
      return sum + (normalizedScore * rating.weightage / 100);
    }, 0);
    return Math.round(totalWeightedScore);
  };

  const handleSave = () => {
    const feedbackData: Omit<EmployeePerformanceFeedback, 'id' | 'created_at' | 'modified_at'> = {
      appraisal_id: appraisalId,
      employee_id: 'emp_id', // This should come from props
      employee_name: employeeName,
      reviewer_id: 'reviewer_id', // This should come from current user
      reviewer_name: reviewerName,
      feedback,
      feedback_ratings: ratings,
      total_score: calculateTotalScore(),
      status: 'Draft'
    };
    onSave(feedbackData);
  };

  const handleSubmit = () => {
    const feedbackData: Omit<EmployeePerformanceFeedback, 'id' | 'created_at' | 'modified_at'> = {
      appraisal_id: appraisalId,
      employee_id: 'emp_id',
      employee_name: employeeName,
      reviewer_id: 'reviewer_id',
      reviewer_name: reviewerName,
      feedback,
      feedback_ratings: ratings,
      total_score: calculateTotalScore(),
      status: 'Submitted'
    };
    onSubmit(feedbackData);
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalScore = calculateTotalScore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            การให้ Feedback - {employeeName}
          </CardTitle>
          <CardDescription>
            ผู้ประเมิน: {reviewerName} | คะแนนรวม: {totalScore}%
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ความคิดเห็นโดยรวม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="overallFeedback">ข้อเสนอแนะและความคิดเห็น</Label>
              <Textarea
                id="overallFeedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="กรุณาให้ความคิดเห็นและข้อเสนอแนะสำหรับพนักงาน..."
                rows={4}
                readOnly={isReadOnly}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            การประเมินตามเกณฑ์
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {ratings.map((rating) => (
              <div key={rating.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium">{rating.criteria}</h4>
                    <p className="text-sm text-gray-600 mb-2">{rating.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">น้ำหนัก: {rating.weightage}%</Badge>
                      <Badge variant="outline">คะแนนสูงสุด: {rating.max_rating}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(rating.rating, rating.max_rating)}`}>
                      {rating.rating}/{rating.max_rating}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round((rating.rating / rating.max_rating) * 100)}%
                    </div>
                  </div>
                </div>

                {/* Rating Scale */}
                <div className="space-y-3">
                  <Label>คะแนน</Label>
                  <div className="flex gap-2">
                    {Array.from({ length: rating.max_rating }, (_, i) => i + 1).map((score) => (
                      <Button
                        key={score}
                        variant={rating.rating === score ? "default" : "outline"}
                        size="sm"
                        onClick={() => !isReadOnly && updateRating(rating.id, score)}
                        disabled={isReadOnly}
                        className="w-12 h-12"
                      >
                        {score}
                      </Button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    1 = ต้องปรับปรุง, {Math.ceil(rating.max_rating/2)} = ปานกลาง, {rating.max_rating} = ดีเยี่ยม
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-4">
                  <Label htmlFor={`comments-${rating.id}`}>ความคิดเห็นเพิ่มเติม</Label>
                  <Textarea
                    id={`comments-${rating.id}`}
                    value={rating.comments}
                    onChange={(e) => updateRating(rating.id, rating.rating, e.target.value)}
                    placeholder="ความคิดเห็นเพิ่มเติมสำหรับเกณฑ์นี้..."
                    readOnly={isReadOnly}
                  />
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <Progress 
                    value={(rating.rating / rating.max_rating) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Summary */}
      <Card>
        <CardHeader>
          <CardTitle>สรุปคะแนน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ratings.map((rating) => {
              const percentage = Math.round((rating.rating / rating.max_rating) * 100);
              return (
                <div key={rating.id} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`text-lg font-bold ${getScoreColor(rating.rating, rating.max_rating)}`}>
                    {percentage}%
                  </div>
                  <div className="text-xs text-gray-600">{rating.criteria}</div>
                  <div className="text-xs text-gray-500">({rating.weightage}% น้ำหนัก)</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalScore}%</div>
              <div className="text-sm text-gray-600">คะแนนรวมถ่วงน้ำหนัก</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!isReadOnly && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            บันทึกร่าง
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={ratings.some(r => r.rating === 0) || !feedback.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            ส่ง Feedback
          </Button>
        </div>
      )}

      {/* Status Info */}
      {existingFeedback && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>สถานะ: </span>
                <Badge variant={existingFeedback.status === 'Submitted' ? 'default' : 'secondary'}>
                  {existingFeedback.status === 'Submitted' ? 'ส่งแล้ว' : 'ร่าง'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>อัปเดต: {existingFeedback.modified_at.toLocaleDateString('th-TH')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeedbackManager;
