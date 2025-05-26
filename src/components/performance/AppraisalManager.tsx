import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Edit, 
  Eye, 
  Search,
  Filter,
  Award,
  Target,
  User,
  Star,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Appraisal, AppraisalKRA, SelfRating, EmployeePerformanceFeedback } from '@/types/performance';
import ScoreBreakdown from './ScoreBreakdown';
import { calculateAllScores } from '@/utils/performanceScoring';

const AppraisalManager: React.FC = () => {
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [selectedAppraisal, setSelectedAppraisal] = useState<Appraisal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'view'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Mock data for demonstration with corrected types
  const mockAppraisals: Appraisal[] = [
    {
      id: '1',
      employee_id: 'EMP001',
      employee_name: 'สมชาย ใจดี',
      department: 'IT',
      appraisal_cycle_id: '1',
      appraisal_template_id: '1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-12-31'),
      status: 'Self Assessment',
      rate_goals_manually: false,
      appraisal_kra: [
        {
          id: '1',
          kra: 'ความสำเร็จในการทำงาน',
          description: 'การบรรลุเป้าหมายการทำงาน',
          weightage: 40,
          achievement: 'ทำงานได้เกินเป้าหมาย 20%',
          score: 4.5
        },
        {
          id: '2',
          kra: 'คุณภาพของงาน',
          description: 'คุณภาพและความถูกต้องของงาน',
          weightage: 30,
          achievement: 'งานมีคุณภาพสูง ผิดพลาดน้อย',
          score: 4.0
        },
        {
          id: '3',
          kra: 'การทำงานเป็นทีม',
          description: 'ความสามารถในการทำงานร่วมกับทีม',
          weightage: 30,
          achievement: 'ทำงานร่วมกับทีมได้ดี',
          score: 4.2
        }
      ],
      goals: [],
      self_ratings: [
        {
          id: '1',
          criteria: 'ความรับผิดชอบ',
          description: 'ความรับผิดชอบต่อหน้าที่',
          weightage: 25,
          max_rating: 5,
          rating: 4,
          comments: 'รับผิดชอบงานได้ดี'
        },
        {
          id: '2',
          criteria: 'การสื่อสาร',
          description: 'ทักษะการสื่อสารและการนำเสนอ',
          weightage: 25,
          max_rating: 5,
          rating: 3,
          comments: 'สื่อสารได้ดี แต่ควรพัฒนาการนำเสนอ'
        },
        {
          id: '3',
          criteria: 'ความคิดสร้างสรรค์',
          description: 'ความสามารถในการคิดสร้างสรรค์',
          weightage: 25,
          max_rating: 5,
          rating: 4,
          comments: 'มีไอเดียใหม่ๆ'
        },
        {
          id: '4',
          criteria: 'การเรียนรู้',
          description: 'ความสามารถในการเรียนรู้สิ่งใหม่',
          weightage: 25,
          max_rating: 5,
          rating: 5,
          comments: 'เรียนรู้เร็วมาก'
        }
      ],
      total_score: 4.26,
      self_score: 4.0,
      avg_feedback_score: 4.1,
      final_score: 4.12,
      submitted_by_employee: false,
      reviewed_by_manager: false,
      created_at: new Date(),
      modified_at: new Date()
    },
    {
      id: '2',
      employee_id: 'EMP002',
      employee_name: 'สมหญิง รักษ์ดี',
      department: 'Sales',
      appraisal_cycle_id: '1',
      appraisal_template_id: '1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-12-31'),
      status: 'Completed',
      rate_goals_manually: false,
      appraisal_kra: [
        {
          id: '4',
          kra: 'ยอดขาย',
          description: 'การบรรลุเป้าหมายยอดขาย',
          weightage: 50,
          achievement: 'ทำยอดขายได้ 110% ของเป้าหมาย',
          score: 4.8
        },
        {
          id: '5',
          kra: 'ความสัมพันธ์กับลูกค้า',
          description: 'การดูแลและรักษาความสัมพันธ์กับลูกค้า',
          weightage: 30,
          achievement: 'รักษาลูกค้าเก่าได้ 95%',
          score: 4.5
        },
        {
          id: '6',
          kra: 'การพัฒนาตลาด',
          description: 'การขยายตลาดและหาลูกค้าใหม่',
          weightage: 20,
          achievement: 'หาลูกค้าใหม่ได้ 15 ราย',
          score: 4.0
        }
      ],
      goals: [],
      self_ratings: [
        {
          id: '5',
          criteria: 'ทักษะการขาย',
          description: 'ความสามารถในการขายและปิดดีล',
          weightage: 40,
          max_rating: 5,
          rating: 5,
          comments: 'ขายได้ดีมาก'
        },
        {
          id: '6',
          criteria: 'การบริการลูกค้า',
          description: 'ความสามารถในการดูแลลูกค้า',
          weightage: 35,
          max_rating: 5,
          rating: 4,
          comments: 'ลูกค้าพอใจ'
        },
        {
          id: '7',
          criteria: 'การวางแผน',
          description: 'ความสามารถในการวางแผนงาน',
          weightage: 25,
          max_rating: 5,
          rating: 3,
          comments: 'ต้องปรับปรุงการวางแผน'
        }
      ],
      total_score: 4.55,
      self_score: 4.15,
      avg_feedback_score: 4.3,
      final_score: 4.33,
      submitted_by_employee: true,
      reviewed_by_manager: true,
      created_at: new Date(),
      modified_at: new Date()
    }
  ];

  // Mock cycles and templates
  const mockCycles = [
    { id: '1', name: 'การประเมินผลงานประจำปี 2024' },
    { id: '2', name: 'การประเมินผลงานไตรมาส Q4/2023' }
  ];

  const mockTemplates = [
    { id: '1', name: 'เทมเพลตการประเมินพนักงานทั่วไป' },
    { id: '2', name: 'เทมเพลตการประเมินผู้จัดการ' }
  ];

  const mockEmployees = [
    { id: 'EMP001', name: 'สมชาย ใจดี', department: 'IT' },
    { id: 'EMP002', name: 'สมหญิง รักษ์ดี', department: 'Sales' },
    { id: 'EMP003', name: 'วิชัย เก่งมาก', department: 'Marketing' }
  ];

  React.useEffect(() => {
    setAppraisals(mockAppraisals);
  }, []);

  const departments = [...new Set(mockAppraisals.map(a => a.department))];

  const filteredAppraisals = appraisals.filter(appraisal => {
    const matchesSearch = appraisal.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appraisal.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appraisal.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || appraisal.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleCreateNew = () => {
    setSelectedAppraisal(null);
    setViewMode('form');
    setIsDialogOpen(true);
  };

  const handleView = (appraisal: Appraisal) => {
    setSelectedAppraisal(appraisal);
    setViewMode('view');
    setIsDialogOpen(true);
  };

  const handleEdit = (appraisal: Appraisal) => {
    setSelectedAppraisal(appraisal);
    setViewMode('form');
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Self Assessment':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ประเมินตนเอง</Badge>;
      case 'Manager Review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">ผู้จัดการรีวิว</Badge>;
      case 'Feedback':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">รอ Feedback</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">ร่าง</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-blue-600';
    if (score >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Self Assessment':
        return <User className="w-4 h-4" />;
      case 'Manager Review':
        return <Eye className="w-4 h-4" />;
      case 'Feedback':
        return <Star className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Draft':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">จัดการการประเมิน</h2>
          <p className="text-gray-600">สร้างและจัดการการประเมินผลงานพนักงาน</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          สร้างการประเมินใหม่
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Award className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">การประเมินทั้งหมด</p>
                <p className="text-2xl font-bold">{appraisals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">เสร็จสิ้นแล้ว</p>
                <p className="text-2xl font-bold">
                  {appraisals.filter(a => a.status === 'Completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">อยู่ระหว่างดำเนินการ</p>
                <p className="text-2xl font-bold">
                  {appraisals.filter(a => a.status !== 'Completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Target className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold">
                  {appraisals.length > 0 
                    ? (appraisals.reduce((sum, a) => sum + a.final_score, 0) / appraisals.length).toFixed(2)
                    : '0.00'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="Draft">ร่าง</SelectItem>
                <SelectItem value="Self Assessment">ประเมินตนเอง</SelectItem>
                <SelectItem value="Manager Review">ผู้จัดการรีวิว</SelectItem>
                <SelectItem value="Feedback">รอ Feedback</SelectItem>
                <SelectItem value="Completed">เสร็จสิ้น</SelectItem>
              </SelectContent>
            </Select>
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
        </CardContent>
      </Card>

      {/* Appraisals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            รายการการประเมิน ({filteredAppraisals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>พนักงาน</TableHead>
                  <TableHead>แผนก</TableHead>
                  <TableHead className="text-center">สถานะ</TableHead>
                  <TableHead className="text-center">คะแนน Goal</TableHead>
                  <TableHead className="text-center">คะแนน Self</TableHead>
                  <TableHead className="text-center">คะแนน Feedback</TableHead>
                  <TableHead className="text-center">คะแนนสุดท้าย</TableHead>
                  <TableHead className="text-center">อัปเดตล่าสุด</TableHead>
                  <TableHead className="text-center">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppraisals.map((appraisal) => (
                  <TableRow key={appraisal.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{appraisal.employee_name}</div>
                        <div className="text-sm text-gray-500">{appraisal.employee_id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{appraisal.department}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {getStatusIcon(appraisal.status)}
                        {getStatusBadge(appraisal.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-medium ${getScoreColor(appraisal.total_score)}`}>
                        {appraisal.total_score.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-medium ${getScoreColor(appraisal.self_score)}`}>
                        {appraisal.self_score.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-medium ${getScoreColor(appraisal.avg_feedback_score)}`}>
                        {appraisal.avg_feedback_score.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-lg font-bold ${getScoreColor(appraisal.final_score)}`}>
                        {appraisal.final_score.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-gray-600">
                      {appraisal.modified_at.toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(appraisal)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(appraisal)}
                        >
                          <Edit className="w-4 h-4" />
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

      {/* Appraisal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'view' ? 'ดูรายละเอียดการประเมิน' : 
               selectedAppraisal ? 'แก้ไขการประเมิน' : 'สร้างการประเมินใหม่'}
            </DialogTitle>
            <DialogDescription>
              {viewMode === 'view' ? 'ผลการประเมินและคะแนนต่างๆ' : 
               'กำหนดข้อมูลการประเมินและคะแนน'}
            </DialogDescription>
          </DialogHeader>
          
          {viewMode === 'view' && selectedAppraisal && (
            <AppraisalView appraisal={selectedAppraisal} />
          )}
          
          {viewMode === 'form' && (
            <AppraisalForm
              appraisal={selectedAppraisal}
              cycles={mockCycles}
              templates={mockTemplates}
              employees={mockEmployees}
              onSave={() => setIsDialogOpen(false)}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Appraisal View Component
interface AppraisalViewProps {
  appraisal: Appraisal;
}

const AppraisalView: React.FC<AppraisalViewProps> = ({ appraisal }) => {
  // Mock cycle data for score calculation
  const mockCycle = {
    id: '1',
    name: 'การประเมินผลงานประจำปี 2024',
    start_date: new Date('2024-01-01'),
    end_date: new Date('2024-12-31'),
    appraisal_template_id: '1',
    kra_evaluation_method: 'Manual' as const,
    appraisees: [],
    calculate_final_score_based_on_formula: false,
    final_score_formula: '',
    status: 'Active' as const,
    created_by: 'admin',
    created_at: new Date(),
    modified_at: new Date()
  };

  const mockFeedbacks: EmployeePerformanceFeedback[] = [
    {
      id: '1',
      appraisal_id: appraisal.id,
      employee_id: appraisal.employee_id,
      employee_name: appraisal.employee_name,
      reviewer_id: 'REV001',
      reviewer_name: 'ผู้จัดการ A',
      feedback: 'พนักงานทำงานได้ดีมาก',
      feedback_ratings: [],
      total_score: 4.2,
      status: 'Submitted' as const,
      created_at: new Date(),
      modified_at: new Date()
    },
    {
      id: '2',
      appraisal_id: appraisal.id,
      employee_id: appraisal.employee_id,
      employee_name: appraisal.employee_name,
      reviewer_id: 'REV002',
      reviewer_name: 'เพื่อนร่วมงาน B',
      feedback: 'ทำงานร่วมกันได้ดี',
      feedback_ratings: [],
      total_score: 4.0,
      status: 'Submitted' as const,
      created_at: new Date(),
      modified_at: new Date()
    }
  ];

  const scoreResult = calculateAllScores(appraisal, mockCycle, mockFeedbacks);

  return (
    <div className="space-y-6">
      {/* Employee Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            ข้อมูลพนักงาน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm text-gray-600">ชื่อ-นามสกุล</Label>
              <p className="font-medium">{appraisal.employee_name}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">รหัสพนักงาน</Label>
              <p className="font-medium">{appraisal.employee_id}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">แผนก</Label>
              <p className="font-medium">{appraisal.department}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">สถานะ</Label>
              <div className="mt-1">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {appraisal.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <ScoreBreakdown scoreResult={scoreResult} />
    </div>
  );
};

// Appraisal Form Component
interface AppraisalFormProps {
  appraisal?: Appraisal | null;
  cycles: Array<{id: string, name: string}>;
  templates: Array<{id: string, name: string}>;
  employees: Array<{id: string, name: string, department: string}>;
  onSave: () => void;
  onCancel: () => void;
}

const AppraisalForm: React.FC<AppraisalFormProps> = ({ 
  appraisal, 
  cycles, 
  templates, 
  employees, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    employee_id: appraisal?.employee_id || '',
    appraisal_cycle_id: appraisal?.appraisal_cycle_id || '',
    appraisal_template_id: appraisal?.appraisal_template_id || '',
    status: appraisal?.status || 'Draft'
  });

  const selectedEmployee = employees.find(emp => emp.id === formData.employee_id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลการประเมิน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>พนักงาน</Label>
              <Select 
                value={formData.employee_id} 
                onValueChange={(value) => setFormData({...formData, employee_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกพนักงาน" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} ({employee.department})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>รอบการประเมิน</Label>
              <Select 
                value={formData.appraisal_cycle_id} 
                onValueChange={(value) => setFormData({...formData, appraisal_cycle_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรอบการประเมิน" />
                </SelectTrigger>
                <SelectContent>
                  {cycles.map(cycle => (
                    <SelectItem key={cycle.id} value={cycle.id}>
                      {cycle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {selectedEmployee && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>พนักงานที่เลือก:</strong> {selectedEmployee.name} - {selectedEmployee.department}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
          บันทึกการประเมิน
        </Button>
      </div>
    </div>
  );
};

export default AppraisalManager;
