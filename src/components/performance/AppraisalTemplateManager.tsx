
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Settings,
  FileText,
  Target,
  Star
} from 'lucide-react';
import { AppraisalTemplate, AppraisalGoal, RatingCriteria } from '@/types/performance';
import TemplateBuilder from './TemplateBuilder';

const AppraisalTemplateManager = () => {
  const [templates, setTemplates] = useState<AppraisalTemplate[]>([
    {
      id: '1',
      name: 'เทมเพลตมาตรฐาน - พนักงานทั่วไป',
      description: 'เทมเพลตสำหรับการประเมินพนักงานทั่วไป',
      goals: [
        {
          id: '1',
          kra: 'ความสำเร็จในงาน',
          description: 'การบรรลุเป้าหมายงานที่ได้รับมอบหมาย',
          weightage: 40,
          target: 'บรรลุเป้าหมาย 100%',
          measurement_criteria: 'วัดจากผลงานที่ส่งมอบ'
        },
        {
          id: '2',
          kra: 'คุณภาพงาน',
          description: 'ความถูกต้องและคุณภาพของงาน',
          weightage: 30,
          target: 'ความถูกต้อง 95%',
          measurement_criteria: 'วัดจากข้อผิดพลาดและการแก้ไข'
        },
        {
          id: '3',
          kra: 'การทำงานเป็นทีม',
          description: 'ความสามารถในการทำงานร่วมกับผู้อื่น',
          weightage: 20,
          target: 'รีวิวจากทีมงาน',
          measurement_criteria: 'ประเมินจากเพื่อนร่วมงาน'
        },
        {
          id: '4',
          kra: 'การพัฒนาตนเอง',
          description: 'การเรียนรู้และพัฒนาทักษะใหม่',
          weightage: 10,
          target: 'อบรม 2 คอร์สต่อปี',
          measurement_criteria: 'จำนวนคอร์สและการนำไปใช้'
        }
      ],
      rating_criteria: [
        {
          id: '1',
          criteria: 'ความรับผิดชอบ',
          description: 'ความรับผิดชอบต่องานและหน้าที่',
          weightage: 25,
          max_rating: 5
        },
        {
          id: '2',
          criteria: 'การสื่อสาร',
          description: 'ทักษะการสื่อสารและการนำเสนอ',
          weightage: 25,
          max_rating: 5
        },
        {
          id: '3',
          criteria: 'ความคิดสร้างสรรค์',
          description: 'ความสามารถในการคิดและแก้ปัญหา',
          weightage: 25,
          max_rating: 5
        },
        {
          id: '4',
          criteria: 'การบริหารเวลา',
          description: 'ความสามารถในการจัดการเวลา',
          weightage: 25,
          max_rating: 5
        }
      ],
      is_active: true,
      created_by: 'admin',
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'เทมเพลตผู้จัดการ',
      description: 'เทมเพลตสำหรับการประเมินผู้จัดการและหัวหน้างาน',
      goals: [
        {
          id: '1',
          kra: 'ผลการดำเนินงานทีม',
          description: 'ผลงานของทีมที่รับผิดชอบ',
          weightage: 35,
          target: 'ทีมบรรลุเป้าหมาย 90%',
          measurement_criteria: 'วัดจากผลงานรวมของทีม'
        },
        {
          id: '2',
          kra: 'การพัฒนาทีมงาน',
          description: 'การฝึกอบรมและพัฒนาสมาชิกในทีม',
          weightage: 25,
          target: 'พัฒนาทีมงาน 100%',
          measurement_criteria: 'จำนวนการอบรมและผลลัพธ์'
        },
        {
          id: '3',
          kra: 'ภาวะผู้นำ',
          description: 'ความสามารถในการนำทีม',
          weightage: 25,
          target: 'ประเมินจากทีมงาน',
          measurement_criteria: 'แบบประเมิน 360 องศา'
        },
        {
          id: '4',
          kra: 'นวัตกรรมและการปรับปรุง',
          description: 'การนำเสนอและปรับปรุงกระบวนการ',
          weightage: 15,
          target: 'โครงการปรับปรุง 2 โครงการ',
          measurement_criteria: 'ผลของโครงการที่นำเสนอ'
        }
      ],
      rating_criteria: [
        {
          id: '1',
          criteria: 'วิสัยทัศน์และกลยุทธ์',
          description: 'ความสามารถในการวางแผนกลยุทธ์',
          weightage: 30,
          max_rating: 5
        },
        {
          id: '2',
          criteria: 'การตัดสินใจ',
          description: 'ความสามารถในการตัดสินใจอย่างมีประสิทธิภาพ',
          weightage: 25,
          max_rating: 5
        },
        {
          id: '3',
          criteria: 'การสื่อสารและการมอบหมายงาน',
          description: 'ทักษะการสื่อสารและการมอบหมายงาน',
          weightage: 25,
          max_rating: 5
        },
        {
          id: '4',
          criteria: 'การให้คำปรึกษาและการสนับสนุน',
          description: 'การให้คำปรึกษาและสนับสนุนทีมงาน',
          weightage: 20,
          max_rating: 5
        }
      ],
      is_active: true,
      created_by: 'admin',
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-01-10')
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<AppraisalTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    goals: [] as AppraisalGoal[],
    rating_criteria: [] as RatingCriteria[]
  });

  const handleCreateTemplate = () => {
    const template: AppraisalTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
      is_active: true,
      created_by: 'current_user',
      created_at: new Date(),
      modified_at: new Date()
    };
    
    setTemplates([...templates, template]);
    setNewTemplate({
      name: '',
      description: '',
      goals: [],
      rating_criteria: []
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditTemplate = (template: AppraisalTemplate) => {
    setEditingTemplate(template);
    setNewTemplate({
      name: template.name,
      description: template.description || '',
      goals: [...template.goals],
      rating_criteria: [...template.rating_criteria]
    });
  };

  const handleUpdateTemplate = () => {
    if (editingTemplate) {
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { 
              ...t, 
              ...newTemplate, 
              modified_at: new Date() 
            }
          : t
      ));
      setEditingTemplate(null);
      setNewTemplate({
        name: '',
        description: '',
        goals: [],
        rating_criteria: []
      });
    }
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, is_active: !t.is_active, modified_at: new Date() } : t
    ));
  };

  const calculateTotalWeightage = (items: { weightage: number }[]) => {
    return items.reduce((sum, item) => sum + item.weightage, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                จัดการเทมเพลตการประเมิน
              </CardTitle>
              <CardDescription>
                สร้างและจัดการเทมเพลตสำหรับการประเมินผลงานพนักงาน
              </CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  สร้างเทมเพลตใหม่
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>สร้างเทมเพลตการประเมินใหม่</DialogTitle>
                  <DialogDescription>
                    สร้างเทมเพลตการประเมินพร้อมกำหนด KRA และเกณฑ์การประเมิน
                  </DialogDescription>
                </DialogHeader>
                <TemplateBuilder
                  templateName={newTemplate.name}
                  description={newTemplate.description}
                  goals={newTemplate.goals}
                  ratingCriteria={newTemplate.rating_criteria}
                  onTemplateNameChange={(name) => setNewTemplate({...newTemplate, name})}
                  onDescriptionChange={(description) => setNewTemplate({...newTemplate, description})}
                  onGoalsChange={(goals) => setNewTemplate({...newTemplate, goals})}
                  onRatingCriteriaChange={(rating_criteria) => setNewTemplate({...newTemplate, rating_criteria})}
                  onSave={handleCreateTemplate}
                  onCancel={() => setIsCreateDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Template Dialog */}
      <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>แก้ไขเทมเพลตการประเมิน</DialogTitle>
            <DialogDescription>
              แก้ไขข้อมูลเทมเพลตการประเมิน KRA และเกณฑ์การประเมิน
            </DialogDescription>
          </DialogHeader>
          <TemplateBuilder
            templateName={newTemplate.name}
            description={newTemplate.description}
            goals={newTemplate.goals}
            ratingCriteria={newTemplate.rating_criteria}
            onTemplateNameChange={(name) => setNewTemplate({...newTemplate, name})}
            onDescriptionChange={(description) => setNewTemplate({...newTemplate, description})}
            onGoalsChange={(goals) => setNewTemplate({...newTemplate, goals})}
            onRatingCriteriaChange={(rating_criteria) => setNewTemplate({...newTemplate, rating_criteria})}
            onSave={handleUpdateTemplate}
            onCancel={() => setEditingTemplate(null)}
          />
        </DialogContent>
      </Dialog>

      {/* Templates List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                  <CardDescription className="mb-3">
                    {template.description}
                  </CardDescription>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={template.is_active ? "default" : "secondary"}
                      className={template.is_active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {template.is_active ? 'ใช้งานอยู่' : 'ไม่ใช้งาน'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      อัปเดต: {template.modified_at.toLocaleDateString('th-TH')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Goals Summary */}
              <div>
                <h4 className="flex items-center gap-2 font-medium mb-3">
                  <Target className="w-4 h-4" />
                  เป้าหมาย KRA ({template.goals.length} รายการ)
                </h4>
                <div className="space-y-2">
                  {template.goals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{goal.kra}</span>
                      <Badge variant="outline">{goal.weightage}%</Badge>
                    </div>
                  ))}
                  {template.goals.length > 3 && (
                    <div className="text-sm text-gray-500 text-center py-2">
                      และอีก {template.goals.length - 3} รายการ...
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">น้ำหนักรวม:</span>
                    <Badge 
                      variant={calculateTotalWeightage(template.goals) === 100 ? "default" : "destructive"}
                    >
                      {calculateTotalWeightage(template.goals)}%
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Rating Criteria Summary */}
              <div>
                <h4 className="flex items-center gap-2 font-medium mb-3">
                  <Star className="w-4 h-4" />
                  เกณฑ์การประเมิน ({template.rating_criteria.length} รายการ)
                </h4>
                <div className="space-y-2">
                  {template.rating_criteria.slice(0, 2).map((criteria) => (
                    <div key={criteria.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">{criteria.criteria}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">{criteria.weightage}%</Badge>
                        <Badge variant="outline">{criteria.max_rating} คะแนน</Badge>
                      </div>
                    </div>
                  ))}
                  {template.rating_criteria.length > 2 && (
                    <div className="text-sm text-gray-500 text-center py-2">
                      และอีก {template.rating_criteria.length - 2} รายการ...
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm font-medium">น้ำหนักรวม:</span>
                    <Badge 
                      variant={calculateTotalWeightage(template.rating_criteria) === 100 ? "default" : "destructive"}
                    >
                      {calculateTotalWeightage(template.rating_criteria)}%
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleToggleActive(template.id)}
                >
                  {template.is_active ? 'ปิดการใช้งาน' : 'เปิดการใช้งาน'}
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditTemplate(template)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  จัดการรายละเอียด
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {templates.length === 0 && (
        <Card className="shadow-lg border-0">
          <CardContent className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              ยังไม่มีเทมเพลตการประเมิน
            </h3>
            <p className="text-gray-500 mb-6">
              เริ่มต้นด้วยการสร้างเทมเพลตการประเมินแรกของคุณ
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              สร้างเทมเพลตแรก
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppraisalTemplateManager;
