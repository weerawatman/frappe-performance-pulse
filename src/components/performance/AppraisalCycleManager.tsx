
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Users,
  Search,
  Filter,
  Play,
  Pause,
  CheckCircle
} from 'lucide-react';
import { AppraisalCycle } from '@/types/performance';
import CycleManager from './CycleManager';

const AppraisalCycleManager: React.FC = () => {
  const [cycles, setCycles] = useState<AppraisalCycle[]>([]);
  const [selectedCycle, setSelectedCycle] = useState<AppraisalCycle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for demonstration
  const mockCycles: AppraisalCycle[] = [
    {
      id: '1',
      name: 'การประเมินผลงานประจำปี 2024',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-12-31'),
      appraisal_template_id: '1',
      kra_evaluation_method: 'Manual',
      appraisees: [
        {
          id: '1',
          employee_id: 'EMP001',
          employee_name: 'สมชาย ใจดี',
          department: 'IT',
          appraisal_template_id: '1'
        },
        {
          id: '2',
          employee_id: 'EMP002',
          employee_name: 'สมหญิง รักษ์ดี',
          department: 'Sales',
          appraisal_template_id: '1'
        }
      ],
      final_score_formula: '',
      calculate_final_score_based_on_formula: false,
      status: 'Active',
      created_at: new Date(),
      modified_at: new Date(),
      created_by: 'admin'
    },
    {
      id: '2',
      name: 'การประเมินผลงานไตรมาส Q4/2023',
      start_date: new Date('2023-10-01'),
      end_date: new Date('2023-12-31'),
      appraisal_template_id: '2',
      kra_evaluation_method: 'Automatic',
      appraisees: [
        {
          id: '3',
          employee_id: 'EMP003',
          employee_name: 'วิชัย เก่งมาก',
          department: 'Marketing',
          appraisal_template_id: '2'
        }
      ],
      final_score_formula: '(goal_score * 0.6) + (self_score * 0.2) + (feedback_score * 0.2)',
      calculate_final_score_based_on_formula: true,
      status: 'Completed',
      created_at: new Date(),
      modified_at: new Date(),
      created_by: 'admin'
    }
  ];

  // Mock templates
  const mockTemplates = [
    { id: '1', name: 'เทมเพลตการประเมินพนักงานทั่วไป' },
    { id: '2', name: 'เทมเพลตการประเมินผู้จัดการ' }
  ];

  // Mock employees
  const mockEmployees = [
    {
      id: 'EMP001',
      employee_id: 'EMP001',
      name: 'สมชาย ใจดี',
      department: 'IT',
      position: 'Senior Developer'
    },
    {
      id: 'EMP002',
      employee_id: 'EMP002',
      name: 'สมหญิง รักษ์ดี',
      department: 'Sales',
      position: 'Sales Manager'
    },
    {
      id: 'EMP003',
      employee_id: 'EMP003',
      name: 'วิชัย เก่งมาก',
      department: 'Marketing',
      position: 'Marketing Specialist'
    }
  ];

  React.useEffect(() => {
    setCycles(mockCycles);
  }, []);

  const filteredCycles = cycles.filter(cycle => {
    const matchesSearch = cycle.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cycle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateNew = () => {
    setSelectedCycle(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (cycle: AppraisalCycle) => {
    setSelectedCycle(cycle);
    setIsDialogOpen(true);
  };

  const handleDelete = (cycleId: string) => {
    setCycles(cycles.filter(c => c.id !== cycleId));
  };

  const handleSave = (cycleData: Omit<AppraisalCycle, 'id' | 'created_at' | 'modified_at'>) => {
    if (selectedCycle) {
      // Update existing cycle
      setCycles(cycles.map(c => 
        c.id === selectedCycle.id 
          ? { ...c, ...cycleData, modified_at: new Date() }
          : c
      ));
    } else {
      // Create new cycle
      const newCycle: AppraisalCycle = {
        id: Date.now().toString(),
        ...cycleData,
        created_at: new Date(),
        modified_at: new Date()
      };
      setCycles([...cycles, newCycle]);
    }
    setIsDialogOpen(false);
    setSelectedCycle(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เปิดใช้งาน</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">ร่าง</Badge>;
      case 'Completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">เสร็จสิ้น</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ยกเลิก</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getProgressPercentage = (cycle: AppraisalCycle) => {
    const total = cycle.appraisees.length;
    const completed = Math.floor(total * Math.random()); // Mock completion
    return total > 0 ? (completed / total) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">จัดการรอบการประเมิน</h2>
          <p className="text-gray-600">สร้างและจัดการรอบการประเมินผลงานพนักงาน</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          สร้างรอบการประเมินใหม่
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหารอบการประเมิน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="Draft">ร่าง</SelectItem>
                <SelectItem value="Active">เปิดใช้งาน</SelectItem>
                <SelectItem value="Completed">เสร็จสิ้น</SelectItem>
                <SelectItem value="Cancelled">ยกเลิก</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cycles List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCycles.map((cycle) => {
          const progress = getProgressPercentage(cycle);
          const daysLeft = Math.ceil((cycle.end_date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <Card key={cycle.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{cycle.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {cycle.start_date.toLocaleDateString('th-TH')} - {cycle.end_date.toLocaleDateString('th-TH')}
                    </CardDescription>
                  </div>
                  {getStatusBadge(cycle.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">วิธีการประเมิน:</span>
                    <div className="font-medium">
                      {cycle.kra_evaluation_method === 'Manual' ? 'กำหนดเอง' : 'อัตโนมัติ'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">จำนวนพนักงาน:</span>
                    <div className="font-medium">{cycle.appraisees.length} คน</div>
                  </div>
                  <div>
                    <span className="text-gray-600">ใช้สูตรคำนวณ:</span>
                    <div className="font-medium">
                      {cycle.calculate_final_score_based_on_formula ? 'ใช่' : 'ไม่ใช้'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">วันที่เหลือ:</span>
                    <div className={`font-medium ${daysLeft < 30 ? 'text-red-600' : 'text-green-600'}`}>
                      {daysLeft > 0 ? `${daysLeft} วัน` : 'หมดเวลาแล้ว'}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">ความคืบหน้า</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-2">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(cycle)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      แก้ไข
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(cycle.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      ลบ
                    </Button>
                  </div>
                  <Button size="sm" variant="outline">
                    <Users className="w-4 h-4 mr-1" />
                    ดูพนักงาน
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCycles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              ไม่พบรอบการประเมิน
            </h3>
            <p className="text-gray-500 mb-4">
              ยังไม่มีรอบการประเมินที่ตรงกับเงื่อนไขการค้นหา
            </p>
            <Button onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              สร้างรอบการประเมินใหม่
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Cycle Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCycle ? 'แก้ไขรอบการประเมิน' : 'สร้างรอบการประเมินใหม่'}
            </DialogTitle>
            <DialogDescription>
              กำหนดข้อมูลรอบการประเมินและเลือกพนักงานที่จะเข้าร่วม
            </DialogDescription>
          </DialogHeader>
          <CycleManager
            cycle={selectedCycle}
            templates={mockTemplates}
            employees={mockEmployees}
            onSave={handleSave}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppraisalCycleManager;
