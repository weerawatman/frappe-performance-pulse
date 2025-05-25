
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search,
  Filter,
  Eye,
  Edit,
  MessageSquare,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  User,
  Building,
  Calendar
} from 'lucide-react';
import { Appraisal } from '@/types/performance';

const AppraisalManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Mock data for appraisals
  const [appraisals, setAppraisals] = useState<Appraisal[]>([
    {
      id: '1',
      employee_id: '001',
      employee_name: 'สมชาย ใจดี',
      appraisal_cycle_id: '1',
      appraisal_template_id: '1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-03-31'),
      status: 'Completed',
      rate_goals_manually: false,
      appraisal_kra: [
        {
          id: '1',
          kra: 'ความสำเร็จในงาน',
          description: 'การบรรลุเป้าหมายงานที่ได้รับมอบหมาย',
          weightage: 40,
          target: 'บรรลุเป้าหมาย 100%',
          achievement: 'บรรลุเป้าหมาย 95%',
          score: 85,
          manager_score: 88,
          comments: 'ทำงานได้ดีมาก แต่ยังมีที่ปรับปรุงได้',
          manager_comments: 'ผลงานโดยรวมดีเยี่ยม'
        }
      ],
      goals: [],
      self_ratings: [
        {
          id: '1',
          criteria: 'ความรับผิดชอบ',
          description: 'ความรับผิดชอบต่องานและหน้าที่',
          weightage: 25,
          max_rating: 5,
          rating: 4,
          comments: 'รับผิดชอบงานได้ดี'
        }
      ],
      total_score: 85,
      self_score: 80,
      avg_feedback_score: 88,
      final_score: 84,
      submitted_by_employee: true,
      submitted_date: new Date('2024-02-15'),
      reviewed_by_manager: true,
      reviewed_date: new Date('2024-02-20'),
      manager_comments: 'พนักงานที่มีศักยภาพสูง ควรได้รับการพัฒนาต่อไป',
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-02-20')
    },
    {
      id: '2',
      employee_id: '002',
      employee_name: 'สมหญิง รักษ์ดี',
      appraisal_cycle_id: '1',
      appraisal_template_id: '1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-03-31'),
      status: 'Manager Review',
      rate_goals_manually: false,
      appraisal_kra: [],
      goals: [],
      self_ratings: [],
      total_score: 0,
      self_score: 78,
      avg_feedback_score: 0,
      final_score: 0,
      submitted_by_employee: true,
      submitted_date: new Date('2024-02-10'),
      reviewed_by_manager: false,
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-02-10')
    },
    {
      id: '3',
      employee_id: '003',
      employee_name: 'วิชัย เก่งมาก',
      appraisal_cycle_id: '1',
      appraisal_template_id: '1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-03-31'),
      status: 'Self Assessment',
      rate_goals_manually: false,
      appraisal_kra: [],
      goals: [],
      self_ratings: [],
      total_score: 0,
      self_score: 0,
      avg_feedback_score: 0,
      final_score: 0,
      submitted_by_employee: false,
      reviewed_by_manager: false,
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-01-05')
    }
  ]);

  // Mock department data
  const departments = ['IT', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>;
      case 'Manager Review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">รอผู้จัดการ</Badge>;
      case 'Self Assessment':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ประเมินตนเอง</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">ร่าง</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ยกเลิก</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { badge: <Badge className="bg-green-100 text-green-800 hover:bg-green-100">ดีเยี่ยม</Badge>, color: 'green' };
    if (score >= 80) return { badge: <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">ดี</Badge>, color: 'blue' };
    if (score >= 70) return { badge: <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ปานกลาง</Badge>, color: 'yellow' };
    if (score > 0) return { badge: <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ต้องปรับปรุง</Badge>, color: 'red' };
    return { badge: null, color: 'gray' };
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'Manager Review': return 'bg-blue-500';
      case 'Self Assessment': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'Completed': return 100;
      case 'Manager Review': return 75;
      case 'Self Assessment': return 25;
      default: return 0;
    }
  };

  // Filter appraisals
  const filteredAppraisals = appraisals.filter(appraisal => {
    const matchesSearch = appraisal.employee_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appraisal.status === statusFilter;
    // For department filter, we'd need department data - using employee_name for demo
    const matchesDepartment = departmentFilter === 'all' || true; // Simplified for demo
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Statistics
  const stats = {
    total: appraisals.length,
    completed: appraisals.filter(a => a.status === 'Completed').length,
    pending: appraisals.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length,
    overdue: appraisals.filter(a => a.end_date < new Date() && a.status !== 'Completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">การประเมินทั้งหมด</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Award className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">เสร็จสิ้นแล้ว</p>
                <p className="text-3xl font-bold">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">รอดำเนินการ</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">เลยกำหนด</p>
                <p className="text-3xl font-bold">{stats.overdue}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            ค้นหาและกรอง
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหาชื่อพนักงาน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="Completed">เสร็จสิ้น</SelectItem>
                <SelectItem value="Manager Review">รอผู้จัดการ</SelectItem>
                <SelectItem value="Self Assessment">ประเมินตนเอง</SelectItem>
                <SelectItem value="Draft">ร่าง</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="แผนก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">แผนกทั้งหมด</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              ส่งออกข้อมูล
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appraisals List */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            รายการการประเมิน ({filteredAppraisals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppraisals.map((appraisal) => {
              const scoreInfo = getScoreBadge(appraisal.final_score);
              const progress = getProgressPercentage(appraisal.status);
              
              return (
                <div key={appraisal.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{appraisal.employee_name}</h3>
                        {getStatusBadge(appraisal.status)}
                        {appraisal.final_score > 0 && scoreInfo.badge}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>ID: {appraisal.employee_id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {appraisal.start_date.toLocaleDateString('th-TH')} - {appraisal.end_date.toLocaleDateString('th-TH')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span>รอบการประเมิน: {appraisal.appraisal_cycle_id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">ความคืบหน้า</span>
                      <span className="text-sm text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(appraisal.status)}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Scores */}
                  {appraisal.status === 'Completed' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{appraisal.total_score}%</div>
                        <div className="text-xs text-gray-600">คะแนนเป้าหมาย</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{appraisal.self_score}%</div>
                        <div className="text-xs text-gray-600">ประเมินตนเอง</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">{appraisal.avg_feedback_score}%</div>
                        <div className="text-xs text-gray-600">ฟีดแบ็ก</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                        <div className="text-lg font-bold">{appraisal.final_score}%</div>
                        <div className="text-xs">คะแนนสุดท้าย</div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        {appraisal.submitted_by_employee && appraisal.submitted_date && (
                          <span>ส่งแล้ว: {appraisal.submitted_date.toLocaleDateString('th-TH')}</span>
                        )}
                        {appraisal.reviewed_by_manager && appraisal.reviewed_date && (
                          <span>รีวิวแล้ว: {appraisal.reviewed_date.toLocaleDateString('th-TH')}</span>
                        )}
                      </div>
                      <span>อัปเดต: {appraisal.modified_at.toLocaleDateString('th-TH')}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredAppraisals.length === 0 && (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  ไม่พบการประเมินที่ตรงกับเงื่อนไข
                </h3>
                <p className="text-gray-500">
                  ลองปรับเปลี่ยนคำค้นหาหรือตัวกรอง
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppraisalManager;
