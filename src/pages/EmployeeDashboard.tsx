
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  TrendingUp, 
  Bell, 
  Award, 
  Calendar,
  FileText,
  BarChart3,
  History,
  LogOut,
  User
} from 'lucide-react';

const EmployeeDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock data สำหรับพนักงาน
  const employeeStats = {
    currentKPI: {
      status: 'In Progress',
      progress: 75,
      dueDate: '31 ธันวาคม 2024'
    },
    lastScore: {
      kpiBonus: 4.2,
      kpiMerit: 4.5,
      overall: 4.35
    },
    notifications: [
      { id: 1, message: 'กรุณาอัพเดตผลงาน KPI ประจำเดือน', type: 'warning' },
      { id: 2, message: 'การประเมินกลางปีครบกำหนดใน 5 วัน', type: 'info' },
      { id: 3, message: 'ผลการประเมินรอบที่แล้วพร้อมแล้ว', type: 'success' }
    ],
    upcomingEvents: [
      { date: '15 ม.ค. 2025', event: 'การประเมินกลางปี' },
      { date: '30 ม.ค. 2025', event: 'กำหนด KPI รอบใหม่' }
    ]
  };

  const quickActions = [
    {
      title: 'กำหนด KPI',
      description: 'ตั้งเป้าหมายและ KPI สำหรับรอบการประเมิน',
      icon: Target,
      color: 'bg-blue-500',
      path: '/employee/kpi'
    },
    {
      title: 'ประเมินผลงาน',
      description: 'บันทึกผลการดำเนินงานและความคืบหน้า',
      icon: TrendingUp,
      color: 'bg-green-500',
      path: '/employee/evaluation'
    },
    {
      title: 'ดูผลการประเมิน',
      description: 'ตรวจสอบผลการประเมินและคะแนนล่าสุด',
      icon: Award,
      color: 'bg-purple-500',
      path: '/employee/results'
    },
    {
      title: 'ประวัติการประเมิน',
      description: 'เรียกดูประวัติการประเมินทั้งหมด',
      icon: History,
      color: 'bg-orange-500',
      path: '/employee/history'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Employee Dashboard</h1>
                <p className="text-sm text-gray-600">ยินดีต้อนรับ, {user?.name}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* ส่วนแสดงข้อมูลสรุป */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">สถานะ KPI ปัจจุบัน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {employeeStats.currentKPI.status}
                </Badge>
                <span className="text-2xl font-bold text-blue-600">
                  {employeeStats.currentKPI.progress}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ครบกำหนด: {employeeStats.currentKPI.dueDate}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">คะแนน KPI Bonus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Award className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold text-green-600">
                  {employeeStats.lastScore.kpiBonus}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">จากคะแนนเต็ม 5.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">คะแนน KPI Merit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <BarChart3 className="w-8 h-8 text-purple-500" />
                <span className="text-2xl font-bold text-purple-600">
                  {employeeStats.lastScore.kpiMerit}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">จากคะแนนเต็ม 5.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">คะแนนรวม</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <TrendingUp className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold text-orange-600">
                  {employeeStats.lastScore.overall}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">ประเมินล่าสุด</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* เมนูหลัก */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>เมนูหลัก</CardTitle>
                <CardDescription>เลือกฟังก์ชันที่ต้องการใช้งาน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-3 hover:bg-gray-50"
                      onClick={() => navigate(action.path)}
                    >
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* การแจ้งเตือนและกิจกรรมที่จะมาถึง */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  การแจ้งเตือน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {employeeStats.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg text-sm ${
                      notification.type === 'warning' 
                        ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                        : notification.type === 'info'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-green-50 text-green-800 border border-green-200'
                    }`}
                  >
                    {notification.message}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  กิจกรรมที่จะมาถึง
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {employeeStats.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {event.date}
                    </div>
                    <span className="text-sm text-gray-700">{event.event}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
