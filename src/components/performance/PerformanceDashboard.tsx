
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const PerformanceDashboard = () => {
  // Mock data for charts
  const departmentData = [
    { name: 'IT', completed: 45, pending: 5, total: 50 },
    { name: 'Sales', completed: 38, pending: 12, total: 50 },
    { name: 'Marketing', completed: 42, pending: 8, total: 50 },
    { name: 'HR', completed: 28, pending: 2, total: 30 },
    { name: 'Finance', completed: 25, pending: 5, total: 30 },
    { name: 'Operations', completed: 35, pending: 15, total: 50 }
  ];

  const performanceDistribution = [
    { name: 'ดีเยี่ยม (90-100%)', value: 320, color: '#10b981' },
    { name: 'ดี (80-89%)', value: 890, color: '#3b82f6' },
    { name: 'ปานกลาง (70-79%)', value: 440, color: '#f59e0b' },
    { name: 'ต้องปรับปรุง (<70%)', value: 0, color: '#ef4444' }
  ];

  const monthlyTrend = [
    { month: 'ม.ค.', score: 75 },
    { month: 'ก.พ.', score: 78 },
    { month: 'มี.ค.', score: 76 },
    { month: 'เม.ย.', score: 79 },
    { month: 'พ.ค.', score: 82 },
    { month: 'มิ.ย.', score: 78 }
  ];

  const recentAppraisals = [
    { 
      id: '1', 
      employee: 'สมชาย ใจดี', 
      department: 'IT', 
      status: 'Completed', 
      score: 85, 
      date: '2024-01-15' 
    },
    { 
      id: '2', 
      employee: 'สมหญิง รักษ์ดี', 
      department: 'Sales', 
      status: 'Manager Review', 
      score: 0, 
      date: '2024-01-14' 
    },
    { 
      id: '3', 
      employee: 'วิชัย เก่งมาก', 
      department: 'Marketing', 
      status: 'Self Assessment', 
      score: 0, 
      date: '2024-01-13' 
    },
    { 
      id: '4', 
      employee: 'นิดา ขยันดี', 
      department: 'HR', 
      status: 'Completed', 
      score: 92, 
      date: '2024-01-12' 
    },
    { 
      id: '5', 
      employee: 'สุรชัย มั่นคง', 
      department: 'Finance', 
      status: 'Completed', 
      score: 78, 
      date: '2024-01-11' 
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>;
      case 'Manager Review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">รอผู้จัดการ</Badge>;
      case 'Self Assessment':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ประเมินตนเอง</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">ดีเยี่ยม</Badge>;
    if (score >= 80) return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">ดี</Badge>;
    if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">ปานกลาง</Badge>;
    if (score > 0) return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ต้องปรับปรุง</Badge>;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Department Performance Chart */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            ผลการประเมินตามแผนก
          </CardTitle>
          <CardDescription>
            สถานะความคืบหน้าการประเมินของแต่ละแผนก
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, name === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ']}
                labelFormatter={(label) => `แผนก: ${label}`}
              />
              <Bar dataKey="completed" fill="#10b981" name="completed" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" name="pending" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'คน']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {performanceDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
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
              แนวโน้มคะแนนเฉลี่ย
            </CardTitle>
            <CardDescription>
              คะแนนเฉลี่ยการประเมินในแต่ละเดือน
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'คะแนนเฉลี่ย']} />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  fill="url(#colorGradient)" 
                  strokeWidth={3}
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
                <Clock className="w-5 h-5" />
                การประเมินล่าสุด
              </CardTitle>
              <CardDescription>
                รายการการประเมินที่อัปเดตล่าสุด
              </CardDescription>
            </div>
            <Button variant="outline">
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
                    <td className="py-3 px-4 text-center">
                      {getStatusBadge(appraisal.status)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {appraisal.score > 0 ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-medium">{appraisal.score}%</span>
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
                <span className="font-bold text-green-600">82.5%</span>
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
