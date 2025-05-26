
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Eye
} from 'lucide-react';

const PerformanceDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [selectedCycle, setSelectedCycle] = useState('all');

  // Mock data for charts and statistics
  const departmentData = [
    { name: 'IT', completed: 45, pending: 5, total: 50, avgScore: 4.2 },
    { name: 'Sales', completed: 38, pending: 12, total: 50, avgScore: 4.1 },
    { name: 'Marketing', completed: 42, pending: 8, total: 50, avgScore: 3.9 },
    { name: 'HR', completed: 28, pending: 2, total: 30, avgScore: 4.3 },
    { name: 'Finance', completed: 25, pending: 5, total: 30, avgScore: 4.0 },
    { name: 'Operations', completed: 35, pending: 15, total: 50, avgScore: 3.8 }
  ];

  const performanceDistribution = [
    { name: 'ดีเยี่ยม (4.5-5.0)', value: 320, color: '#10b981', percentage: 19.3 },
    { name: 'ดี (3.5-4.49)', value: 890, color: '#3b82f6', percentage: 53.6 },
    { name: 'ปานกลาง (2.5-3.49)', value: 440, color: '#f59e0b', percentage: 26.5 },
    { name: 'ต้องปรับปรุง (<2.5)', value: 10, color: '#ef4444', percentage: 0.6 }
  ];

  const monthlyTrend = [
    { month: 'ม.ค.', score: 3.8, completed: 120 },
    { month: 'ก.พ.', score: 3.9, completed: 135 },
    { month: 'มี.ค.', score: 4.0, completed: 150 },
    { month: 'เม.ย.', score: 4.1, completed: 145 },
    { month: 'พ.ค.', score: 4.2, completed: 160 },
    { month: 'มิ.ย.', score: 4.0, completed: 155 }
  ];

  const recentAppraisals = [
    { 
      id: '1', 
      employee: 'สมชาย ใจดี', 
      department: 'IT', 
      status: 'Completed', 
      score: 4.2, 
      date: '2024-01-15',
      cycle: 'การประเมินประจำปี 2024'
    },
    { 
      id: '2', 
      employee: 'สมหญิง รักษ์ดี', 
      department: 'Sales', 
      status: 'Manager Review', 
      score: 0, 
      date: '2024-01-14',
      cycle: 'การประเมินประจำปี 2024'
    },
    { 
      id: '3', 
      employee: 'วิชัย เก่งมาก', 
      department: 'Marketing', 
      status: 'Self Assessment', 
      score: 0, 
      date: '2024-01-13',
      cycle: 'การประเมินประจำปี 2024'
    },
    { 
      id: '4', 
      employee: 'นิดา ขยันดี', 
      department: 'HR', 
      status: 'Completed', 
      score: 4.6, 
      date: '2024-01-12',
      cycle: 'การประเมินประจำปี 2024'
    },
    { 
      id: '5', 
      employee: 'สุรชัย มั่นคง', 
      department: 'Finance', 
      status: 'Completed', 
      score: 3.8, 
      date: '2024-01-11',
      cycle: 'การประเมินประจำปี 2024'
    }
  ];

  const topPerformers = [
    { name: 'นิดา ขยันดี', department: 'HR', score: 4.8, improvement: '+0.3' },
    { name: 'สมชาย ใจดี', department: 'IT', score: 4.6, improvement: '+0.2' },
    { name: 'สมหญิง รักษ์ดี', department: 'Sales', score: 4.5, improvement: '+0.1' },
    { name: 'วิชัย เก่งมาก', department: 'Marketing', score: 4.4, improvement: '+0.4' },
    { name: 'อนุชา ตั้งใจ', department: 'Operations', score: 4.3, improvement: '+0.2' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>;
      case 'Manager Review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">รอผู้จัดการ</Badge>;
      case 'Self Assessment':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ประเมินตนเอง</Badge>;
      case 'Feedback':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">รอ Feedback</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 4.5) return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">ดีเยี่ยม</Badge>;
    if (score >= 3.5) return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">ดี</Badge>;
    if (score >= 2.5) return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ปานกลาง</Badge>;
    if (score > 0) return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ต้องปรับปรุง</Badge>;
    return null;
  };

  const totalAppraisals = departmentData.reduce((sum, dept) => sum + dept.total, 0);
  const completedAppraisals = departmentData.reduce((sum, dept) => sum + dept.completed, 0);
  const pendingAppraisals = departmentData.reduce((sum, dept) => sum + dept.pending, 0);
  const avgScore = departmentData.reduce((sum, dept) => sum + (dept.avgScore * dept.total), 0) / totalAppraisals;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            ตัวกรองข้อมูล
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">แผนก</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกแผนก" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">แผนกทั้งหมด</SelectItem>
                  {departmentData.map(dept => (
                    <SelectItem key={dept.name} value={dept.name}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">ช่วงเวลา</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกช่วงเวลา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">เดือนนี้</SelectItem>
                  <SelectItem value="quarter">ไตรมาสนี้</SelectItem>
                  <SelectItem value="year">ปีนี้</SelectItem>
                  <SelectItem value="custom">กำหนดเอง</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">รอบการประเมิน</label>
              <Select value={selectedCycle} onValueChange={setSelectedCycle}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรอบการประเมิน" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">รอบทั้งหมด</SelectItem>
                  <SelectItem value="annual">การประเมินประจำปี 2024</SelectItem>
                  <SelectItem value="quarterly">การประเมินไตรมาส Q4/2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                ส่งออกรายงาน
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">การประเมินทั้งหมด</p>
                <p className="text-3xl font-bold">{totalAppraisals.toLocaleString()}</p>
                <p className="text-blue-200 text-xs mt-1">+12% จากเดือนที่แล้ว</p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">เสร็จสิ้นแล้ว</p>
                <p className="text-3xl font-bold">{completedAppraisals.toLocaleString()}</p>
                <p className="text-green-200 text-xs mt-1">
                  {((completedAppraisals / totalAppraisals) * 100).toFixed(1)}% ของทั้งหมด
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">รอดำเนินการ</p>
                <p className="text-3xl font-bold">{pendingAppraisals.toLocaleString()}</p>
                <p className="text-orange-200 text-xs mt-1">
                  {((pendingAppraisals / totalAppraisals) * 100).toFixed(1)}% ของทั้งหมด
                </p>
              </div>
              <Clock className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">คะแนนเฉลี่ย</p>
                <p className="text-3xl font-bold">{avgScore.toFixed(2)}</p>
                <p className="text-purple-200 text-xs mt-1">+0.2 จากเดือนที่แล้ว</p>
              </div>
              <Award className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance Chart */}
        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              ผลการประเมินตามแผนก
            </CardTitle>
            <CardDescription>
              สถานะความคืบหน้าและคะแนนเฉลี่ยของแต่ละแผนก
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'completed') return [value, 'เสร็จสิ้น'];
                    if (name === 'pending') return [value, 'รอดำเนินการ'];
                    if (name === 'avgScore') return [value, 'คะแนนเฉลี่ย'];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `แผนก: ${label}`}
                />
                <Bar yAxisId="left" dataKey="completed" fill="#10b981" name="completed" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="pending" fill="#f59e0b" name="pending" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="avgScore" fill="#8b5cf6" name="avgScore" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              ผู้ปฏิบัติงานดีเด่น
            </CardTitle>
            <CardDescription>
              พนักงานที่มีผลการประเมินสูงสุด
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                      ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-gray-600">{performer.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{performer.score}</p>
                    <p className="text-xs text-green-500">{performer.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Distribution */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              การกระจายผลคะแนน
            </CardTitle>
            <CardDescription>
              สัดส่วนผู้ปฏิบัติงานในแต่ละระดับคะแนน
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [
                  `${value} คน (${props.payload.percentage}%)`, 
                  props.payload.name
                ]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {performanceDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value} คน ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              แนวโน้มรายเดือน
            </CardTitle>
            <CardDescription>
              คะแนนเฉลี่ยและจำนวนการประเมินที่เสร็จสิ้น
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" domain={[3.5, 4.5]} />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'score' ? `${value} คะแนน` : `${value} การประเมิน`,
                    name === 'score' ? 'คะแนนเฉลี่ย' : 'การประเมินที่เสร็จสิ้น'
                  ]}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  fill="url(#colorGradient)" 
                  strokeWidth={3}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="completed" 
                  fill="#10b981" 
                  opacity={0.6}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appraisals */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                การประเมินล่าสุด
              </CardTitle>
              <CardDescription>
                รายการการประเมินที่อัปเดตล่าสุด
              </CardDescription>
            </div>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              ดูทั้งหมด
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">พนักงาน</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">แผนก</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">รอบการประเมิน</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">สถานะ</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">คะแนน</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">วันที่</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {recentAppraisals.map((appraisal) => (
                  <tr key={appraisal.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{appraisal.employee}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{appraisal.department}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{appraisal.cycle}</td>
                    <td className="py-3 px-4 text-center">
                      {getStatusBadge(appraisal.status)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {appraisal.score > 0 ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-medium">{appraisal.score.toFixed(2)}</span>
                          {getScoreBadge(appraisal.score)}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {new Date(appraisal.date).toLocaleDateString('th-TH')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        ดูรายละเอียด
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              ต้องดำเนินการด่วน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">การประเมินที่เลยกำหนด</span>
                <span className="font-bold text-red-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">รอการอนุมัติ</span>
                <span className="font-bold text-red-600">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ต้องแก้ไข</span>
                <span className="font-bold text-red-600">3</span>
              </div>
            </div>
            <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
              ดำเนินการ
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <Clock className="w-5 h-5" />
              กำลังดำเนินการ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">รอการประเมินตนเอง</span>
                <span className="font-bold text-yellow-600">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">รอผู้จัดการรีวิว</span>
                <span className="font-bold text-yellow-600">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">รอ Feedback</span>
                <span className="font-bold text-yellow-600">16</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              ติดตาม
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              เสร็จสมบูรณ์
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">เสร็จสิ้นในสัปดาห์นี้</span>
                <span className="font-bold text-green-600">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">คะแนนเฉลี่ย</span>
                <span className="font-bold text-green-600">4.15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">พนักงานดีเด่น</span>
                <span className="font-bold text-green-600">15</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              ดูรายงาน
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
