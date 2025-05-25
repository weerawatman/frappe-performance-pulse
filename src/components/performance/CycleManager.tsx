
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Users,
  Settings,
  Plus,
  Trash2,
  Save,
  X,
  Search,
  Filter
} from 'lucide-react';
import { AppraisalCycle, AppraisalCycleEmployee, Employee } from '@/types/performance';

interface CycleManagerProps {
  cycle?: AppraisalCycle;
  templates: Array<{id: string, name: string}>;
  employees: Employee[];
  onSave: (cycle: Omit<AppraisalCycle, 'id' | 'created_at' | 'modified_at'>) => void;
  onCancel: () => void;
}

const CycleManager: React.FC<CycleManagerProps> = ({
  cycle,
  templates,
  employees,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: cycle?.name || '',
    start_date: cycle?.start_date ? cycle.start_date.toISOString().split('T')[0] : '',
    end_date: cycle?.end_date ? cycle.end_date.toISOString().split('T')[0] : '',
    appraisal_template_id: cycle?.appraisal_template_id || '',
    kra_evaluation_method: cycle?.kra_evaluation_method || 'Manual' as 'Manual' | 'Automatic',
    final_score_formula: cycle?.final_score_formula || '',
    calculate_final_score_based_on_formula: cycle?.calculate_final_score_based_on_formula || false,
    status: cycle?.status || 'Draft' as 'Draft' | 'Active' | 'Completed' | 'Cancelled'
  });

  const [selectedEmployees, setSelectedEmployees] = useState<AppraisalCycleEmployee[]>(
    cycle?.appraisees || []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const departments = [...new Set(employees.map(emp => emp.department))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const handleEmployeeToggle = (employee: Employee, checked: boolean) => {
    if (checked) {
      const cycleEmployee: AppraisalCycleEmployee = {
        id: employee.id,
        employee_id: employee.id,
        employee_name: employee.name,
        department: employee.department,
        appraisal_template_id: formData.appraisal_template_id
      };
      setSelectedEmployees([...selectedEmployees, cycleEmployee]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(emp => emp.employee_id !== employee.id));
    }
  };

  const isEmployeeSelected = (employeeId: string) => {
    return selectedEmployees.some(emp => emp.employee_id === employeeId);
  };

  const handleSave = () => {
    const cycleData: Omit<AppraisalCycle, 'id' | 'created_at' | 'modified_at'> = {
      name: formData.name,
      start_date: new Date(formData.start_date),
      end_date: new Date(formData.end_date),
      appraisal_template_id: formData.appraisal_template_id,
      kra_evaluation_method: formData.kra_evaluation_method,
      appraisees: selectedEmployees,
      final_score_formula: formData.final_score_formula,
      calculate_final_score_based_on_formula: formData.calculate_final_score_based_on_formula,
      status: formData.status,
      created_by: 'current_user'
    };
    onSave(cycleData);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            ข้อมูลรอบการประเมิน
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="cycleName">ชื่อรอบการประเมิน</Label>
              <Input
                id="cycleName"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="เช่น การประเมินผลงานประจำปี 2024"
              />
            </div>
            <div>
              <Label htmlFor="startDate">วันที่เริ่มต้น</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="endDate">วันที่สิ้นสุด</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
              />
            </div>
            <div>
              <Label>เทมเพลตการประเมิน</Label>
              <Select 
                value={formData.appraisal_template_id} 
                onValueChange={(value) => setFormData({...formData, appraisal_template_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกเทมเพลต" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>วิธีการประเมิน KRA</Label>
              <Select 
                value={formData.kra_evaluation_method} 
                onValueChange={(value: 'Manual' | 'Automatic') => setFormData({...formData, kra_evaluation_method: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manual">กำหนดเอง</SelectItem>
                  <SelectItem value="Automatic">อัตโนมัติ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>สถานะ</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'Draft' | 'Active' | 'Completed' | 'Cancelled') => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">ร่าง</SelectItem>
                  <SelectItem value="Active">เปิดใช้งาน</SelectItem>
                  <SelectItem value="Completed">เสร็จสิ้น</SelectItem>
                  <SelectItem value="Cancelled">ยกเลิก</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Calculation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            การคำนวณคะแนน
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="useFormula"
              checked={formData.calculate_final_score_based_on_formula}
              onCheckedChange={(checked) => 
                setFormData({...formData, calculate_final_score_based_on_formula: !!checked})
              }
            />
            <Label htmlFor="useFormula">ใช้สูตรคำนวณคะแนนสุดท้าย</Label>
          </div>
          {formData.calculate_final_score_based_on_formula && (
            <div>
              <Label htmlFor="formula">สูตรคำนวณ</Label>
              <Textarea
                id="formula"
                value={formData.final_score_formula}
                onChange={(e) => setFormData({...formData, final_score_formula: e.target.value})}
                placeholder="เช่น (goal_score * 0.6) + (self_score * 0.2) + (feedback_score * 0.2)"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Employee Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                เลือกพนักงานที่จะประเมิน
              </CardTitle>
              <CardDescription>
                เลือกพนักงานที่จะเข้าร่วมรอบการประเมินนี้
              </CardDescription>
            </div>
            <Badge variant="outline">
              เลือกแล้ว: {selectedEmployees.length} คน
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="ค้นหาชื่อหรือรหัสพนักงาน..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="แผนก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">แผนกทั้งหมด</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Employee List */}
            <div className="border rounded-lg max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">เลือก</TableHead>
                    <TableHead>รหัสพนักงาน</TableHead>
                    <TableHead>ชื่อ-นามสกุล</TableHead>
                    <TableHead>แผนก</TableHead>
                    <TableHead>ตำแหน่ง</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Checkbox
                          checked={isEmployeeSelected(employee.id)}
                          onCheckedChange={(checked) => handleEmployeeToggle(employee, !!checked)}
                        />
                      </TableCell>
                      <TableCell>{employee.employee_id}</TableCell>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
          disabled={!formData.name || !formData.start_date || !formData.end_date || !formData.appraisal_template_id}
        >
          <Save className="w-4 h-4 mr-2" />
          บันทึกรอบการประเมิน
        </Button>
      </div>
    </div>
  );
};

export default CycleManager;
