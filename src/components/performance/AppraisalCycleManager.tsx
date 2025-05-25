
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar as CalendarIcon,
  Users,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Settings,
  UserPlus,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { AppraisalCycle, AppraisalCycleEmployee } from '@/types/performance';

const AppraisalCycleManager = () => {
  const [cycles, setCycles] = useState<AppraisalCycle[]>([
    {
      id: '1',
      name: 'การประเมินผลงานประจำปี 2024',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-03-31'),
      appraisal_template_id: '1',
      kra_evaluation_method: 'Manual',
      appraisees: [
        { id: '1', employee_id: '001', employee_name: 'สมชาย ใจดี', department: 'IT' },
        { id: '2', employee_id: '002', employee_name: 'สมหญิง รักษ์ดี', department: 'Sales' },
        { id: '3', employee_id: '003', employee_name: 'วิชัย เก่งมาก', department: 'Marketing' }
      ],
      final_score_formula: '(total_score * 0.6) + (self_score * 0.2) + (avg_feedback_score * 0.2)',
      calculate_final_score_based_on_formula: true,
      status: 'Active',
      created_by: 'admin',
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'การประเมินผู้จัดการครึ่งปีแรก 2024',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-06-30'),
      appraisal_template_id: '2',
      kra_evaluation_method: 'Automatic',
      appraisees: [
        { id: '4', employee_id: '101', employee_name: 'นิดา ขยันดี', department: 'HR' },
        { id: '5', employee_id: '102', employee_name: 'สุรชัย มั่นคง', department: 'Finance' }
      ],
      final_score_formula: '(total_score * 0.7) + (avg_feedback_score * 0.3)',
      calculate_final_score_based_on_formula: true,
      status: 'Completed',
      created_by: 'admin',
      created_at: new Date('2023-12-15'),
      modified_at: new Date('2024-01-20')
    },
    {
      id: '3',
      name: 'การประเมินพนักงานใหม่ Q1 2024',
      start_date: new Date('2024-02-01'),
      end_date: new Date('2024-04-30'),
      appraisal_template_id: '1',
      kra_evaluation_method: 'Manual',
      appraisees: [
        { id: '6', employee_id: '201', employee_name: 'อนุชา สดใส', department: 'IT' },
        { id: '7', employee_id: '202', employee_name: 'วรรณา ยิ้มแย้ม', department: 'Sales' }
      ],
      calculate_final_score_based_on_formula: false,
      status: 'Draft',
      created_by: 'admin',
      created_at: new Date('2024-01-20'),
      modified_at: new Date('2024-01-25')
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<AppraisalCycle | null>(null);
  const [newCycle, setNewCycle] = useState({
    name: '',
    start_date: undefined as Date | undefined,
    end_date: undefined as Date | undefined,
    appraisal_template_id: '',
    kra_evaluation_method: 'Manual' as 'Manual' | 'Automatic',
    appraisees: [] as AppraisalCycleEmployee[],
    final_score_formula: '(total_score * 0.6) + (self_score * 0.2) + (avg_feedback_score * 0.2)',
    calculate_final_score_based_on_formula: true
  });

  const templates = [
    { id: '1', name: 'เทมเพลตมาตรฐาน - พนักงานทั่วไป' },
    { id: '2', name: 'เทมเพลตผู้จัดการ' }
  ];

  const allEmployees = [
    { id: '001', name: 'สมชาย ใจดี', department: 'IT' },
    { id: '002', name: 'สมหญิง รักษ์ดี', department: 'Sales' },
    { id: '003', name: 'วิชัย เก่งมาก', department: 'Marketing' },
    { id: '004', name: 'นิดา ขยันดี', department: 'HR' },
    { id: '005', name: 'สุรชัย มั่นคง', department: 'Finance' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">กำลังดำเนินการ</Badge>;
      case 'Completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">เสร็จสิ้น</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">ร่าง</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ยกเลิก</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreateCycle = () => {
    if (!newCycle.name || !newCycle.start_date || !newCycle.end_date || !newCycle.appraisal_template_id) {
      return;
    }

    const cycle: AppraisalCycle = {
      id: Date.now().toString(),
      ...newCycle,
      start_date: newCycle.start_date,
      end_date: newCycle.end_date,
      status: 'Draft',
      created_by: 'current_user',
      created_at: new Date(),
      modified_at: new Date()
    };
    
    setCycles([...cycles, cycle]);
    setNewCycle({
      name: '',
      start_date: undefined,
      end_date: undefined,
      appraisal_template_id: '',
      kra_evaluation_method: 'Manual',
      appraisees: [],
      final_score_formula: '(total_score * 0.6) + (self_score * 0.2) + (avg_feedback_score * 0.2)',
      calculate_final_score_based_on_formula: true
    });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteCycle = (id: string) => {
    setCycles(cycles.filter(c => c.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setCycles(cycles.map(c => 
      c.id === id ? { ...c, status: newStatus as any, modified_at: new Date() } : c
    ));
  };

  const calculateProgress = (cycle: AppraisalCycle) => {
    // Mock calculation - in real app, this would come from actual appraisal data
    const total = cycle.appraisees.length;
    const completed = Math.floor(total * 0.7); // 70% completion for demo
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  const isDateInRange = (cycle: AppraisalCycle) => {
    const now = new Date();
    return now >= cycle.start_date && now <= cycle.end_date;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                จัดการรอบการประเมิน
              </CardTitle>
              <CardDescription>
                สร้างและจัดการรอบการประเมินผลงานพนักงาน
              </CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  สร้างรอบการประเมินใหม่
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>สร้างรอบการประเมินใหม่</DialogTitle>
                  <DialogDescription>
                    กำหนดรายละเอียดของรอบการประเมิน
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cycle-name">ชื่อรอบการประเมิน</Label>
                      <Input
                        id="cycle-name"
                        value={newCycle.name}
                        onChange={(e) => setNewCycle({...newCycle, name: e.target.value})}
                        placeholder="เช่น การประเมินผลงานประจำปี 2024"
                      />
                    </div>
                    <div>
                      <Label>วันที่เริ่มต้น</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newCycle.start_date ? format(newCycle.start_date, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={newCycle.start_date}
                            onSelect={(date) => setNewCycle({...newCycle, start_date: date})}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>วันที่สิ้นสุด</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newCycle.end_date ? format(newCycle.end_date, "dd/MM/yyyy", { locale: th }) : "เลือกวันที่"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={newCycle.end_date}
                            onSelect={(date) => setNewCycle({...newCycle, end_date: date})}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Template and Method */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>เทมเพลตการประเมิน</Label>
                      <Select value={newCycle.appraisal_template_id} onValueChange={(value) => setNewCycle({...newCycle, appraisal_template_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกเทมเพลต" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>วิธีการประเมิน KRA</Label>
                      <Select value={newCycle.kra_evaluation_method} onValueChange={(value: 'Manual' | 'Automatic') => setNewCycle({...newCycle, kra_evaluation_method: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Manual">กำหนดเอง</SelectItem>
                          <SelectItem value="Automatic">อัตโนมัติ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Score Formula */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox 
                        id="use-formula"
                        checked={newCycle.calculate_final_score_based_on_formula}
                        onCheckedChange={(checked) => setNewCycle({...newCycle, calculate_final_score_based_on_formula: !!checked})}
                      />
                      <Label htmlFor="use-formula">ใช้สูตรการคำนวณคะแนนสุดท้าย</Label>
                    </div>
                    {newCycle.calculate_final_score_based_on_formula && (
                      <div>
                        <Label htmlFor="formula">สูตรการคำนวณ</Label>
                        <Input
                          id="formula"
                          value={newCycle.final_score_formula}
                          onChange={(e) => setNewCycle({...newCycle, final_score_formula: e.target.value})}
                          placeholder="เช่น (total_score * 0.6) + (self_score * 0.2) + (avg_feedback_score * 0.2)"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          ใช้ตัวแปร: total_score, self_score, avg_feedback_score
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      ยกเลิก
                    </Button>
                    <Button onClick={handleCreateCycle}>
                      สร้างรอบการประเมิน
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Cycles List */}
      <div className="grid grid-cols-1 gap-6">
        {cycles.map((cycle) => {
          const progress = calculateProgress(cycle);
          const isActive = isDateInRange(cycle);
          
          return (
            <Card key={cycle.id} className={`shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 ${isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{cycle.name}</CardTitle>
                      {getStatusBadge(cycle.status)}
                      {isActive && (
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                          กำลังดำเนินการ
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          {format(cycle.start_date, "dd/MM/yyyy", { locale: th })} - {format(cycle.end_date, "dd/MM/yyyy", { locale: th })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{cycle.appraisees.length} คน</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span>วิธีการ: {cycle.kra_evaluation_method === 'Manual' ? 'กำหนดเอง' : 'อัตโนมัติ'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteCycle(cycle.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">ความคืบหน้า</span>
                    <span className="text-sm text-gray-600">
                      {progress.completed}/{progress.total} คน ({progress.percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={progress.percentage} className="h-2" />
                </div>

                {/* Appraisees */}
                <div>
                  <h4 className="font-medium mb-2">พนักงานที่เข้าร่วม</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {cycle.appraisees.slice(0, 6).map((appraisee) => (
                      <div key={appraisee.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">{appraisee.employee_name}</span>
                        <Badge variant="outline" className="text-xs">{appraisee.department}</Badge>
                      </div>
                    ))}
                    {cycle.appraisees.length > 6 && (
                      <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">
                          และอีก {cycle.appraisees.length - 6} คน...
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  {cycle.status === 'Draft' && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusChange(cycle.id, 'Active')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        เริ่มการประเมิน
                      </Button>
                      <Button variant="outline" size="sm">
                        <UserPlus className="w-4 h-4 mr-2" />
                        เพิ่มพนักงาน
                      </Button>
                    </>
                  )}
                  
                  {cycle.status === 'Active' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusChange(cycle.id, 'Completed')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        ปิดการประเมิน
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pause className="w-4 h-4 mr-2" />
                        หยุดชั่วคราว
                      </Button>
                    </>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    ดูรายงาน
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    ตั้งค่า
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {cycles.length === 0 && (
        <Card className="shadow-lg border-0">
          <CardContent className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              ยังไม่มีรอบการประเมิน
            </h3>
            <p className="text-gray-500 mb-6">
              เริ่มต้นด้วยการสร้างรอบการประเมินแรกของคุณ
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              สร้างรอบการประเมินแรก
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppraisalCycleManager;
