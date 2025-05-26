
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Star,
  User,
  Users,
  Building,
  Target,
  Save,
  Send,
  Eye
} from 'lucide-react';
import { Feedback360Request, FeedbackQuestion, QuestionResponse, FeedbackSourceType } from '@/types/feedback360';

interface FeedbackCollectionManagerProps {
  requests: Feedback360Request[];
}

const FeedbackCollectionManager: React.FC<FeedbackCollectionManagerProps> = ({ requests }) => {
  const [selectedRequest, setSelectedRequest] = useState<Feedback360Request | null>(null);
  const [selectedSourceType, setSelectedSourceType] = useState<FeedbackSourceType>('supervisor');

  // Mock feedback questions for different source types
  const feedbackQuestions: { [key in FeedbackSourceType]: FeedbackQuestion[] } = {
    supervisor: [
      {
        id: '1',
        question: 'พนักงานคนนี้สามารถบรรลุเป้าหมายที่กำหนดได้หรือไม่',
        category: 'ผลงาน',
        sourceTypes: ['supervisor'],
        maxRating: 5,
        isRequired: true
      },
      {
        id: '2',
        question: 'พนักงานคนนี้มีความรับผิดชอบต่อหน้าที่อย่างไร',
        category: 'ความรับผิดชอบ',
        sourceTypes: ['supervisor'],
        maxRating: 5,
        isRequired: true
      },
      {
        id: '3',
        question: 'พนักงานคนนี้มีศักยภาพในการเป็นผู้นำหรือไม่',
        category: 'ภาวะผู้นำ',
        sourceTypes: ['supervisor'],
        maxRating: 5,
        isRequired: true
      }
    ],
    peer: [
      {
        id: '4',
        question: 'พนักงานคนนี้ทำงานร่วมกับทีมได้ดีหรือไม่',
        category: 'การทำงานเป็นทีม',
        sourceTypes: ['peer'],
        maxRating: 5,
        isRequired: true
      },
      {
        id: '5',
        question: 'พนักงานคนนี้สื่อสารได้ชัดเจนและมีประสิทธิภาพหรือไม่',
        category: 'การสื่อสาร',
        sourceTypes: ['peer'],
        maxRating: 5,
        isRequired: true
      },
      {
        id: '6',
        question: 'พนักงานคนนี้ให้ความช่วยเหลือเพื่อนร่วมงานหรือไม่',
        category: 'การช่วยเหลือ',
        sourceTypes: ['peer'],
        maxRating: 5,
        isRequired: true
      }
    ],
    subordinate: [
      {
        id: '7',
        question: 'หัวหน้าคนนี้ให้คำแนะนำและพัฒนาผู้ใต้บังคับบัญชาได้ดีหรือไม่',
        category: 'การพัฒนาทีม',
        sourceTypes: ['subordinate'],
        maxRating: 5,
        isRequired: true
      },
      {
        id: '8',
        question: 'หัวหน้าคนนี้มีความยุติธรรมในการตัดสินใจหรือไม่',
        category: 'ความยุติธรรม',
        sourceTypes: ['subordinate'],
        maxRating: 5,
        isRequired: true
      }
    ],
    customer: [
      {
        id: '9',
        question: 'พนักงานคนนี้ให้บริการที่มีคุณภาพหรือไม่',
        category: 'การบริการ',
        sourceTypes: ['customer'],
        maxRating: 5,
        isRequired: true
      },
      {
        id: '10',
        question: 'พนักงานคนนี้ตอบสนองความต้องการของลูกค้าได้ดีหรือไม่',
        category: 'การตอบสนอง',
        sourceTypes: ['customer'],
        maxRating: 5,
        isRequired: true
      }
    ],
    self: [
      {
        id: '11',
        question: 'คุณคิดว่าตนเองมีจุดแข็งในด้านใดบ้าง',
        category: 'จุดแข็ง',
        sourceTypes: ['self'],
        maxRating: 5,
        isRequired: true
      },
      {
        id: '12',
        question: 'คุณคิดว่าตนเองควรพัฒนาในด้านใดบ้าง',
        category: 'จุดพัฒนา',
        sourceTypes: ['self'],
        maxRating: 5,
        isRequired: true
      }
    ]
  };

  const getSourceTypeLabel = (type: FeedbackSourceType) => {
    switch (type) {
      case 'supervisor': return 'หัวหน้าโดยตรง';
      case 'peer': return 'เพื่อนร่วมงาน';
      case 'subordinate': return 'ผู้ใต้บังคับบัญชา';
      case 'customer': return 'ลูกค้า';
      case 'self': return 'ประเมินตนเอง';
      default: return type;
    }
  };

  const getSourceTypeIcon = (type: FeedbackSourceType) => {
    switch (type) {
      case 'supervisor': return <User className="w-5 h-5" />;
      case 'peer': return <Users className="w-5 h-5" />;
      case 'subordinate': return <Building className="w-5 h-5" />;
      case 'customer': return <Target className="w-5 h-5" />;
      case 'self': return <MessageCircle className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Request Selection */}
      <Card>
        <CardHeader>
          <CardTitle>เลือกคำขอ Feedback ที่ต้องการรวบรวม</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedRequest?.id || ''} 
            onValueChange={(value) => setSelectedRequest(requests.find(r => r.id === value) || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="เลือกคำขอ Feedback" />
            </SelectTrigger>
            <SelectContent>
              {requests.filter(r => r.status !== 'Draft').map(request => (
                <SelectItem key={request.id} value={request.id}>
                  {request.employeeName} - {request.status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedRequest && (
        <>
          {/* Source Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>เลือกประเภทผู้ให้ Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedSourceType} onValueChange={(value) => setSelectedSourceType(value as FeedbackSourceType)}>
                <TabsList className="grid w-full grid-cols-5">
                  {(['supervisor', 'peer', 'subordinate', 'customer', 'self'] as FeedbackSourceType[]).map(type => (
                    <TabsTrigger key={type} value={type} className="flex items-center gap-2">
                      {getSourceTypeIcon(type)}
                      <span className="hidden sm:inline">{getSourceTypeLabel(type)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {(['supervisor', 'peer', 'subordinate', 'customer', 'self'] as FeedbackSourceType[]).map(type => (
                  <TabsContent key={type} value={type}>
                    <FeedbackForm
                      sourceType={type}
                      questions={feedbackQuestions[type]}
                      employeeName={selectedRequest.employeeName}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

// Feedback Form Component
interface FeedbackFormProps {
  sourceType: FeedbackSourceType;
  questions: FeedbackQuestion[];
  employeeName: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ sourceType, questions, employeeName }) => {
  const [responses, setResponses] = useState<QuestionResponse[]>(
    questions.map(q => ({
      questionId: q.id,
      question: q.question,
      category: q.category,
      rating: 0,
      maxRating: q.maxRating,
      comment: ''
    }))
  );
  const [overallComment, setOverallComment] = useState('');
  const [strengths, setStrengths] = useState('');
  const [developmentAreas, setDevelopmentAreas] = useState('');

  const updateResponse = (questionId: string, rating: number, comment?: string) => {
    setResponses(prev => prev.map(r => 
      r.questionId === questionId 
        ? { ...r, rating, comment: comment !== undefined ? comment : r.comment }
        : r
    ));
  };

  const calculateProgress = () => {
    const answeredQuestions = responses.filter(r => r.rating > 0).length;
    return Math.round((answeredQuestions / questions.length) * 100);
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSourceTypeLabel = (type: FeedbackSourceType) => {
    switch (type) {
      case 'supervisor': return 'หัวหน้าโดยตรง';
      case 'peer': return 'เพื่อนร่วมงาน';
      case 'subordinate': return 'ผู้ใต้บังคับบัญชา';
      case 'customer': return 'ลูกค้า';
      case 'self': return 'ประเมินตนเอง';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            แบบฟอร์ม Feedback สำหรับ {getSourceTypeLabel(sourceType)}
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">พนักงาน: {employeeName}</p>
            <div className="flex items-center gap-2">
              <Progress value={calculateProgress()} className="w-32 h-2" />
              <span className="text-sm text-gray-600">{calculateProgress()}%</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Questions */}
      <Card>
        <CardHeader>
          <CardTitle>คำถามประเมิน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, index) => {
            const response = responses.find(r => r.questionId === question.id);
            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{question.category}</Badge>
                      {question.isRequired && (
                        <Badge variant="outline" className="text-red-600 border-red-300">
                          จำเป็น
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(response?.rating || 0, question.maxRating)}`}>
                      {response?.rating || 0}/{question.maxRating}
                    </div>
                  </div>
                </div>

                {/* Rating Scale */}
                <div className="space-y-3">
                  <Label>คะแนน</Label>
                  <div className="flex gap-2">
                    {Array.from({ length: question.maxRating }, (_, i) => i + 1).map((score) => (
                      <Button
                        key={score}
                        variant={response?.rating === score ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateResponse(question.id, score)}
                        className="w-12 h-12"
                      >
                        <div className="flex flex-col items-center">
                          <Star className="w-4 h-4" />
                          <span className="text-xs">{score}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    1 = ต้องปรับปรุงมาก, {Math.ceil(question.maxRating/2)} = ปานกลาง, {question.maxRating} = ดีเยี่ยม
                  </div>
                </div>

                {/* Comment */}
                <div className="mt-4">
                  <Label htmlFor={`comment-${question.id}`}>ความคิดเห็นเพิ่มเติม</Label>
                  <Textarea
                    id={`comment-${question.id}`}
                    value={response?.comment || ''}
                    onChange={(e) => updateResponse(question.id, response?.rating || 0, e.target.value)}
                    placeholder="โปรดระบุความคิดเห็นเพิ่มเติม..."
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Additional Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อเสนอแนะเพิ่มเติม</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="strengths">จุดแข็งที่โดดเด่น</Label>
            <Textarea
              id="strengths"
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              placeholder="โปรดระบุจุดแข็งของพนักงานคนนี้..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="developmentAreas">จุดที่ควรพัฒนา</Label>
            <Textarea
              id="developmentAreas"
              value={developmentAreas}
              onChange={(e) => setDevelopmentAreas(e.target.value)}
              placeholder="โปรดระบุจุดที่พนักงานคนนี้ควรพัฒนา..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="overallComment">ความคิดเห็นโดยรวม</Label>
            <Textarea
              id="overallComment"
              value={overallComment}
              onChange={(e) => setOverallComment(e.target.value)}
              placeholder="โปรดให้ความคิดเห็นโดยรวมเกี่ยวกับพนักงานคนนี้..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          <Save className="w-4 h-4 mr-2" />
          บันทึกร่าง
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Send className="w-4 h-4 mr-2" />
          ส่ง Feedback
        </Button>
      </div>
    </div>
  );
};

export default FeedbackCollectionManager;
