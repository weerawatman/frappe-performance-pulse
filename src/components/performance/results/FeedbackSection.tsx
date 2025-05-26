
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  ThumbsUp, 
  Target, 
  Lightbulb, 
  Calendar,
  User
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'checker' | 'approver';
  author: string;
  role: string;
  date: Date;
  category: 'strength' | 'development' | 'suggestion';
  content: string;
}

interface FeedbackSectionProps {
  feedback: FeedbackItem[];
  period: 'mid-year' | 'end-year';
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedback, period }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'strength' | 'development' | 'suggestion'>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength': return <ThumbsUp className="w-4 h-4" />;
      case 'development': return <Target className="w-4 h-4" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'strength': return 'จุดแข็ง';
      case 'development': return 'จุดที่ควรพัฒนา';
      case 'suggestion': return 'ข้อเสนอแนะ';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return 'bg-green-100 text-green-800';
      case 'development': return 'bg-yellow-100 text-yellow-800';
      case 'suggestion': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (type: string) => {
    return type === 'checker' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800';
  };

  const filteredFeedback = selectedCategory === 'all' 
    ? feedback 
    : feedback.filter(item => item.category === selectedCategory);

  const feedbackByCategory = {
    strength: feedback.filter(item => item.category === 'strength'),
    development: feedback.filter(item => item.category === 'development'),
    suggestion: feedback.filter(item => item.category === 'suggestion')
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Feedback และข้อเสนอแนะ - {period === 'mid-year' ? 'กลางปี' : 'ปลายปี'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">ทั้งหมด ({feedback.length})</TabsTrigger>
            <TabsTrigger value="strength">จุดแข็ง ({feedbackByCategory.strength.length})</TabsTrigger>
            <TabsTrigger value="development">จุดพัฒนา ({feedbackByCategory.development.length})</TabsTrigger>
            <TabsTrigger value="suggestion">ข้อเสนอแนะ ({feedbackByCategory.suggestion.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            {filteredFeedback.length > 0 ? (
              <div className="space-y-4">
                {filteredFeedback.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getCategoryColor(item.category)}`}>
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(item.category)}>
                              {getCategoryLabel(item.category)}
                            </Badge>
                            <Badge variant="outline" className={getRoleColor(item.type)}>
                              {item.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {item.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date.toLocaleDateString('th-TH')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pl-12">
                      <p className="text-gray-700 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>ยังไม่มี Feedback ในหมวดหมู่นี้</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
