
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Target,
  Star,
  ClipboardList,
  Search
} from 'lucide-react';
import { AppraisalTemplate, KRA, RatingCriteria } from '@/types/performance';

const AppraisalTemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<AppraisalTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<AppraisalTemplate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockTemplates: AppraisalTemplate[] = [
    {
      id: '1',
      name: 'เทมเพลตการประเมินพนักงานทั่วไป',
      description: 'เทมเพลตสำหรับการประเมินพนักงานทั่วไป',
      kra_list: [
        {
          id: '1',
          kra: 'ความสำเร็จในการทำงาน',
          weightage: 40,
          achievement: '',
          score: 0
        },
        {
          id: '2',
          kra: 'คุณภาพของงาน',
          weightage: 30,
          achievement: '',
          score: 0
        },
        {
          id: '3',
          kra: 'การทำงานเป็นทีม',
          weightage: 30,
          achievement: '',
          score: 0
        }
      ],
      rating_criteria: [
        {
          id: '1',
          criteria: 'ความรับผิดชอบ',
          description: 'ความรับผิดชอบต่อหน้าที่',
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
          description: 'ความสามารถในการคิดสร้างสรรค์',
          weightage: 25,
          max_rating: 5
        },
        {
          id: '4',
          criteria: 'การเรียนรู้',
          description: 'ความสามารถในการเรียนรู้สิ่งใหม่',
          weightage: 25,
          max_rating: 5
        }
      ],
      created_at: new Date(),
      modified_at: new Date(),
      created_by: 'admin'
    },
    {
      id: '2',
      name: 'เทมเพลตการประเมินผู้จัดการ',
      description: 'เทมเพลตสำหรับการประเมินผู้จัดการ',
      kra_list: [
        {
          id: '4',
          kra: 'ภาวะผู้นำ',
          weightage: 50,
          achievement: '',
          score: 0
        },
        {
          id: '5',
          kra: 'การจัดการทีม',
          weightage: 30,
          achievement: '',
          score: 0
        },
        {
          id: '6',
          kra: 'ผลลัพธ์ธุรกิจ',
          weightage: 20,
          achievement: '',
          score: 0
        }
      ],
      rating_criteria: [
        {
          id: '5',
          criteria: 'วิสัยทัศน์',
          description: 'ความสามารถในการวางวิสัยทัศน์',
          weightage: 30,
          max_rating: 5
        },
        {
          id: '6',
          criteria: 'การตัดสินใจ',
          description: 'ความสามารถในการตัดสินใจ',
          weightage: 35,
          max_rating: 5
        },
        {
          id: '7',
          criteria: 'การพัฒนาทีม',
          description: 'ความสามารถในการพัฒนาทีมงาน',
          weightage: 35,
          max_rating: 5
        }
      ],
      created_at: new Date(),
      modified_at: new Date(),
      created_by: 'admin'
    }
  ];

  React.useEffect(() => {
    setTemplates(mockTemplates);
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (template: AppraisalTemplate) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  const handleDelete = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const handleSave = (templateData: Omit<AppraisalTemplate, 'id' | 'created_at' | 'modified_at'>) => {
    if (selectedTemplate) {
      // Update existing template
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id 
          ? { ...t, ...templateData, modified_at: new Date() }
          : t
      ));
    } else {
      // Create new template
      const newTemplate: AppraisalTemplate = {
        id: Date.now().toString(),
        ...templateData,
        created_at: new Date(),
        modified_at: new Date()
      };
      setTemplates([...templates, newTemplate]);
    }
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">จัดการเทมเพลตการประเมิน</h2>
          <p className="text-gray-600">สร้างและจัดการเทมเพลตสำหรับการประเมินผลงาน</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          สร้างเทมเพลตใหม่
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ค้นหาเทมเพลต..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Templates List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            รายการเทมเพลต ({filteredTemplates.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อเทมเพลต</TableHead>
                  <TableHead>คำอธิบาย</TableHead>
                  <TableHead className="text-center">จำนวน KRA</TableHead>
                  <TableHead className="text-center">จำนวนเกณฑ์</TableHead>
                  <TableHead className="text-center">วันที่สร้าง</TableHead>
                  <TableHead className="text-center">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell className="text-gray-600">{template.description}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{template.kra_list.length}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{template.rating_criteria.length}</Badge>
                    </TableCell>
                    <TableCell className="text-center text-gray-600">
                      {template.created_at.toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(template)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(template.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Template Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate ? 'แก้ไขเทมเพลต' : 'สร้างเทมเพลตใหม่'}
            </DialogTitle>
            <DialogDescription>
              กำหนดข้อมูลเทมเพลต KRA และเกณฑ์การให้คะแนน
            </DialogDescription>
          </DialogHeader>
          <TemplateForm
            template={selectedTemplate}
            onSave={handleSave}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Template Form Component
interface TemplateFormProps {
  template?: AppraisalTemplate | null;
  onSave: (data: Omit<AppraisalTemplate, 'id' | 'created_at' | 'modified_at'>) => void;
  onCancel: () => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ template, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    created_by: template?.created_by || 'current_user'
  });

  const [kraList, setKraList] = useState<KRA[]>(
    template?.kra_list || [
      { id: '1', kra: '', weightage: 0, achievement: '', score: 0 }
    ]
  );

  const [ratingCriteria, setRatingCriteria] = useState<RatingCriteria[]>(
    template?.rating_criteria || [
      { id: '1', criteria: '', description: '', weightage: 0, max_rating: 5 }
    ]
  );

  const addKRA = () => {
    const newKRA: KRA = {
      id: Date.now().toString(),
      kra: '',
      weightage: 0,
      achievement: '',
      score: 0
    };
    setKraList([...kraList, newKRA]);
  };

  const removeKRA = (id: string) => {
    setKraList(kraList.filter(kra => kra.id !== id));
  };

  const updateKRA = (id: string, field: keyof KRA, value: string | number) => {
    setKraList(kraList.map(kra => 
      kra.id === id ? { ...kra, [field]: value } : kra
    ));
  };

  const addRatingCriteria = () => {
    const newCriteria: RatingCriteria = {
      id: Date.now().toString(),
      criteria: '',
      description: '',
      weightage: 0,
      max_rating: 5
    };
    setRatingCriteria([...ratingCriteria, newCriteria]);
  };

  const removeRatingCriteria = (id: string) => {
    setRatingCriteria(ratingCriteria.filter(criteria => criteria.id !== id));
  };

  const updateRatingCriteria = (id: string, field: keyof RatingCriteria, value: string | number) => {
    setRatingCriteria(ratingCriteria.map(criteria => 
      criteria.id === id ? { ...criteria, [field]: value } : criteria
    ));
  };

  const totalKRAWeight = kraList.reduce((sum, kra) => sum + kra.weightage, 0);
  const totalRatingWeight = ratingCriteria.reduce((sum, criteria) => sum + criteria.weightage, 0);

  const handleSave = () => {
    const templateData: Omit<AppraisalTemplate, 'id' | 'created_at' | 'modified_at'> = {
      name: formData.name,
      description: formData.description,
      kra_list: kraList,
      rating_criteria: ratingCriteria,
      created_by: formData.created_by
    };
    onSave(templateData);
  };

  const isValid = formData.name && 
                  kraList.length > 0 && 
                  ratingCriteria.length > 0 &&
                  totalKRAWeight === 100 &&
                  totalRatingWeight === 100;

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเทมเพลต</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="templateName">ชื่อเทมเพลต</Label>
            <Input
              id="templateName"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="ชื่อเทมเพลตการประเมิน"
            />
          </div>
          <div>
            <Label htmlFor="templateDescription">คำอธิบาย</Label>
            <Textarea
              id="templateDescription"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="คำอธิบายเทมเพลต"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* KRA Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                KRA (Key Result Areas)
              </CardTitle>
              <CardDescription>
                น้ำหนักรวม: {totalKRAWeight}% 
                {totalKRAWeight !== 100 && (
                  <span className="text-red-600 ml-2">
                    (ต้องรวมเป็น 100%)
                  </span>
                )}
              </CardDescription>
            </div>
            <Button onClick={addKRA} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่ม KRA
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kraList.map((kra) => (
              <div key={kra.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label>หัวข้อ KRA</Label>
                    <Input
                      value={kra.kra}
                      onChange={(e) => updateKRA(kra.id, 'kra', e.target.value)}
                      placeholder="เช่น ความสำเร็จในการทำงาน"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>น้ำหนัก (%)</Label>
                      <Input
                        type="number"
                        value={kra.weightage}
                        onChange={(e) => updateKRA(kra.id, 'weightage', Number(e.target.value))}
                        placeholder="0-100"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeKRA(kra.id)}
                        className="text-red-600"
                        disabled={kraList.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Criteria Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                เกณฑ์การให้คะแนน
              </CardTitle>
              <CardDescription>
                น้ำหนักรวม: {totalRatingWeight}% 
                {totalRatingWeight !== 100 && (
                  <span className="text-red-600 ml-2">
                    (ต้องรวมเป็น 100%)
                  </span>
                )}
              </CardDescription>
            </div>
            <Button onClick={addRatingCriteria} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มเกณฑ์
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ratingCriteria.map((criteria) => (
              <div key={criteria.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>ชื่อเกณฑ์</Label>
                    <Input
                      value={criteria.criteria}
                      onChange={(e) => updateRatingCriteria(criteria.id, 'criteria', e.target.value)}
                      placeholder="เช่น ความรับผิดชอบ"
                    />
                  </div>
                  <div>
                    <Label>คำอธิบาย</Label>
                    <Input
                      value={criteria.description}
                      onChange={(e) => updateRatingCriteria(criteria.id, 'description', e.target.value)}
                      placeholder="คำอธิบายเกณฑ์การให้คะแนน"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>น้ำหนัก (%)</Label>
                      <Input
                        type="number"
                        value={criteria.weightage}
                        onChange={(e) => updateRatingCriteria(criteria.id, 'weightage', Number(e.target.value))}
                        placeholder="0-100"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>คะแนนสูงสุด</Label>
                      <Input
                        type="number"
                        value={criteria.max_rating}
                        onChange={(e) => updateRatingCriteria(criteria.id, 'max_rating', Number(e.target.value))}
                        placeholder="5"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRatingCriteria(criteria.id)}
                        className="text-red-600"
                        disabled={ratingCriteria.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          ยกเลิก
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          บันทึกเทมเพลต
        </Button>
      </div>
    </div>
  );
};

export default AppraisalTemplateManager;
