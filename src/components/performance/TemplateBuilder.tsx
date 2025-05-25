
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Target,
  Star,
  Save,
  X
} from 'lucide-react';
import { AppraisalGoal, RatingCriteria } from '@/types/performance';

interface TemplateBuilderProps {
  templateName: string;
  description: string;
  goals: AppraisalGoal[];
  ratingCriteria: RatingCriteria[];
  onTemplateNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onGoalsChange: (goals: AppraisalGoal[]) => void;
  onRatingCriteriaChange: (criteria: RatingCriteria[]) => void;
  onSave: () => void;
  onCancel: () => void;
}

const TemplateBuilder: React.FC<TemplateBuilderProps> = ({
  templateName,
  description,
  goals,
  ratingCriteria,
  onTemplateNameChange,
  onDescriptionChange,
  onGoalsChange,
  onRatingCriteriaChange,
  onSave,
  onCancel
}) => {
  const [newGoal, setNewGoal] = useState<Partial<AppraisalGoal>>({
    kra: '',
    description: '',
    weightage: 0,
    target: '',
    measurement_criteria: ''
  });

  const [newCriteria, setNewCriteria] = useState<Partial<RatingCriteria>>({
    criteria: '',
    description: '',
    weightage: 0,
    max_rating: 5
  });

  const addGoal = () => {
    if (newGoal.kra && newGoal.description && newGoal.weightage) {
      const goal: AppraisalGoal = {
        id: Date.now().toString(),
        kra: newGoal.kra,
        description: newGoal.description,
        weightage: newGoal.weightage,
        target: newGoal.target || '',
        measurement_criteria: newGoal.measurement_criteria || ''
      };
      onGoalsChange([...goals, goal]);
      setNewGoal({
        kra: '',
        description: '',
        weightage: 0,
        target: '',
        measurement_criteria: ''
      });
    }
  };

  const removeGoal = (id: string) => {
    onGoalsChange(goals.filter(g => g.id !== id));
  };

  const addCriteria = () => {
    if (newCriteria.criteria && newCriteria.description && newCriteria.weightage) {
      const criteria: RatingCriteria = {
        id: Date.now().toString(),
        criteria: newCriteria.criteria,
        description: newCriteria.description,
        weightage: newCriteria.weightage,
        max_rating: newCriteria.max_rating || 5
      };
      onRatingCriteriaChange([...ratingCriteria, criteria]);
      setNewCriteria({
        criteria: '',
        description: '',
        weightage: 0,
        max_rating: 5
      });
    }
  };

  const removeCriteria = (id: string) => {
    onRatingCriteriaChange(ratingCriteria.filter(c => c.id !== id));
  };

  const goalsWeightageTotal = goals.reduce((sum, goal) => sum + goal.weightage, 0);
  const criteriaWeightageTotal = ratingCriteria.reduce((sum, criteria) => sum + criteria.weightage, 0);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลพื้นฐาน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="templateName">ชื่อเทมเพลต</Label>
            <Input
              id="templateName"
              value={templateName}
              onChange={(e) => onTemplateNameChange(e.target.value)}
              placeholder="เช่น เทมเพลตพนักงานใหม่"
            />
          </div>
          <div>
            <Label htmlFor="description">คำอธิบาย</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="อธิบายการใช้งานของเทมเพลตนี้"
            />
          </div>
        </CardContent>
      </Card>

      {/* KRA Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                เป้าหมาย KRA
              </CardTitle>
              <CardDescription>
                กำหนดพื้นที่ผลงานหลัก (Key Result Areas) และน้ำหนักของแต่ละเป้าหมาย
              </CardDescription>
            </div>
            <Badge 
              variant={goalsWeightageTotal === 100 ? "default" : "destructive"}
            >
              น้ำหนักรวม: {goalsWeightageTotal}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Goal Form */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium mb-3">เพิ่มเป้าหมายใหม่</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>KRA</Label>
                  <Input
                    value={newGoal.kra}
                    onChange={(e) => setNewGoal({...newGoal, kra: e.target.value})}
                    placeholder="เช่น ความสำเร็จในงาน"
                  />
                </div>
                <div>
                  <Label>น้ำหนัก (%)</Label>
                  <Input
                    type="number"
                    value={newGoal.weightage}
                    onChange={(e) => setNewGoal({...newGoal, weightage: Number(e.target.value)})}
                    placeholder="0-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>คำอธิบาย</Label>
                  <Textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    placeholder="อธิบายรายละเอียดของ KRA"
                  />
                </div>
                <div>
                  <Label>เป้าหมาย</Label>
                  <Input
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    placeholder="เป้าหมายที่ต้องบรรลุ"
                  />
                </div>
                <div>
                  <Label>วิธีการวัด</Label>
                  <Input
                    value={newGoal.measurement_criteria}
                    onChange={(e) => setNewGoal({...newGoal, measurement_criteria: e.target.value})}
                    placeholder="เกณฑ์การวัดผล"
                  />
                </div>
              </div>
              <Button onClick={addGoal} className="mt-3">
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มเป้าหมาย
              </Button>
            </div>

            {/* Goals Table */}
            {goals.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>KRA</TableHead>
                    <TableHead>คำอธิบาย</TableHead>
                    <TableHead>น้ำหนัก</TableHead>
                    <TableHead>เป้าหมาย</TableHead>
                    <TableHead>การดำเนินการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {goals.map((goal) => (
                    <TableRow key={goal.id}>
                      <TableCell className="font-medium">{goal.kra}</TableCell>
                      <TableCell>{goal.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{goal.weightage}%</Badge>
                      </TableCell>
                      <TableCell>{goal.target}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGoal(goal.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rating Criteria */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                เกณฑ์การประเมิน
              </CardTitle>
              <CardDescription>
                กำหนดเกณฑ์การให้คะแนนพฤติกรรมและทักษะ
              </CardDescription>
            </div>
            <Badge 
              variant={criteriaWeightageTotal === 100 ? "default" : "destructive"}
            >
              น้ำหนักรวม: {criteriaWeightageTotal}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Criteria Form */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium mb-3">เพิ่มเกณฑ์ใหม่</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>เกณฑ์การประเมิน</Label>
                  <Input
                    value={newCriteria.criteria}
                    onChange={(e) => setNewCriteria({...newCriteria, criteria: e.target.value})}
                    placeholder="เช่น ความรับผิดชอบ"
                  />
                </div>
                <div>
                  <Label>น้ำหนัก (%)</Label>
                  <Input
                    type="number"
                    value={newCriteria.weightage}
                    onChange={(e) => setNewCriteria({...newCriteria, weightage: Number(e.target.value)})}
                    placeholder="0-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>คำอธิบาย</Label>
                  <Textarea
                    value={newCriteria.description}
                    onChange={(e) => setNewCriteria({...newCriteria, description: e.target.value})}
                    placeholder="อธิบายรายละเอียดของเกณฑ์การประเมิน"
                  />
                </div>
                <div>
                  <Label>คะแนนสูงสุด</Label>
                  <Input
                    type="number"
                    value={newCriteria.max_rating}
                    onChange={(e) => setNewCriteria({...newCriteria, max_rating: Number(e.target.value)})}
                    placeholder="5"
                  />
                </div>
              </div>
              <Button onClick={addCriteria} className="mt-3">
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มเกณฑ์
              </Button>
            </div>

            {/* Criteria Table */}
            {ratingCriteria.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>เกณฑ์การประเมิน</TableHead>
                    <TableHead>คำอธิบาย</TableHead>
                    <TableHead>น้ำหนัก</TableHead>
                    <TableHead>คะแนนสูงสุด</TableHead>
                    <TableHead>การดำเนินการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratingCriteria.map((criteria) => (
                    <TableRow key={criteria.id}>
                      <TableCell className="font-medium">{criteria.criteria}</TableCell>
                      <TableCell>{criteria.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{criteria.weightage}%</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{criteria.max_rating}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCriteria(criteria.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
          onClick={onSave}
          disabled={!templateName || goalsWeightageTotal !== 100 || criteriaWeightageTotal !== 100}
        >
          <Save className="w-4 h-4 mr-2" />
          บันทึกเทมเพลต
        </Button>
      </div>
    </div>
  );
};

export default TemplateBuilder;
