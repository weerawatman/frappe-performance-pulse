import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  CheckCircle, 
  Clock,
  Target
} from 'lucide-react';

interface DevelopmentPlan {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  status: 'planning' | 'in_progress' | 'completed';
  category: 'skill' | 'knowledge' | 'behavior';
}

interface DevelopmentPlanSectionProps {
  period: 'mid-year' | 'end-year';
}

const DevelopmentPlanSection: React.FC<DevelopmentPlanSectionProps> = ({ period }) => {
  const [plans, setPlans] = useState<DevelopmentPlan[]>([
    {
      id: '1',
      title: 'พัฒนาทักษะการขาย (Sales Excellence)',
      description: 'เข้าร่วมการฝึกอบรมหลักสูตร Sales Excellence Program เพื่อเพิ่มทักษะการขายและการหาลูกค้าใหม่',
      targetDate: new Date('2024-06-30'),
      progress: 30,
      status: 'in_progress',
      category: 'skill'
    },
    {
      id: '2',
      title: 'ศึกษาเทรนด์การตลาดดิจิทัล',
      description: 'ศึกษาและทำความเข้าใจเทรนด์การตลาดดิจิทัลเพื่อนำมาประยุกต์ใช้ในการขาย',
      targetDate: new Date('2024-05-31'),
      progress: 0,
      status: 'planning',
      category: 'knowledge'
    }
  ]);

  const [newPlanDescription, setNewPlanDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'เสร็จสิ้น';
      case 'in_progress': return 'กำลังดำเนินการ';
      case 'planning': return 'วางแผน';
      default: return status;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'skill': return 'ทักษะ';
      case 'knowledge': return 'ความรู้';
      case 'behavior': return 'พฤติกรรม';
      default: return category;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'planning': return <Target className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const addNewPlan = () => {
    if (!newPlanDescription.trim()) return;

    const newPlan: DevelopmentPlan = {
      id: Date.now().toString(),
      title: 'แผนการพัฒนาใหม่',
      description: newPlanDescription,
      targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      progress: 0,
      status: 'planning',
      category: 'skill'
    };

    setPlans([...plans, newPlan]);
    setNewPlanDescription('');
    setShowAddForm(false);
  };

  // Recommended plans based on feedback
  const recommendedPlans = [
    {
      title: 'การฝึกอบรม Sales Excellence Program',
      description: 'หลักสูตรเพิ่มทักษะการขายและการหาลูกค้าใหม่',
      category: 'skill'
    },
    {
      title: 'การพัฒนาทักษะการสื่อสารกับลูกค้า',
      description: 'เรียนรู้เทคนิคการสื่อสารที่มีประสิทธิภาพ',
      category: 'skill'
    },
    {
      title: 'การศึกษาพฤติกรรมผู้บริโภค',
      description: 'ทำความเข้าใจพฤติกรรมและความต้องการของลูกค้า',
      category: 'knowledge'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Recommended Development Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            แผนการพัฒนาที่แนะนำ - {period === 'mid-year' ? 'กลางปี' : 'ปลายปี'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            แผนการพัฒนาที่แนะนำจากผลการประเมินและ Feedback ของหัวหน้า
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedPlans.map((plan, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-2">{plan.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{getCategoryLabel(plan.category)}</Badge>
                  <Button size="sm" variant="outline">
                    <Plus className="w-3 h-3 mr-1" />
                    เพิ่มลงแผน
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personal Development Plans */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              แผนการพัฒนาส่วนตัว
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มแผนใหม่
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Plan Form */}
          {showAddForm && (
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-medium mb-3">เพิ่มแผนการพัฒนาใหม่</h4>
              <Textarea
                placeholder="อธิบายแผนการพัฒนาของคุณ..."
                value={newPlanDescription}
                onChange={(e) => setNewPlanDescription(e.target.value)}
                className="mb-3"
              />
              <div className="flex gap-2">
                <Button onClick={addNewPlan} size="sm">
                  บันทึก
                </Button>
                <Button 
                  onClick={() => {
                    setShowAddForm(false);
                    setNewPlanDescription('');
                  }}
                  variant="outline"
                  size="sm"
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          )}

          {/* Existing Plans */}
          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{plan.title}</h4>
                    <Badge className={getStatusColor(plan.status)}>
                      {getStatusIcon(plan.status)}
                      <span className="ml-1">{getStatusLabel(plan.status)}</span>
                    </Badge>
                    <Badge variant="outline">{getCategoryLabel(plan.category)}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ความคืบหน้า</span>
                      <span>{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} className="h-2" />
                    <div className="text-xs text-gray-500">
                      เป้าหมาย: {plan.targetDate.toLocaleDateString('th-TH')}
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}

          {plans.length === 0 && !showAddForm && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>ยังไม่มีแผนการพัฒนา</p>
              <p className="text-sm">คลิก "เพิ่มแผนใหม่" เพื่อเริ่มต้นสร้างแผนการพัฒนาของคุณ</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentPlanSection;
