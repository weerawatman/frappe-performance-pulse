
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  BarChart3, 
  FileText, 
  TrendingUp,
  Award,
  Bell,
  LogOut,
  Eye,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const ManagerDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const managerStats = {
    totalEmployees: 25,
    pendingApprovals: 8,
    completedAppraisals: 18,
    averageScore: 4.2
  };

  const managerFeatures = [
    {
      icon: <Eye className="w-8 h-8 text-blue-600" />,
      title: "ดูการประเมินทีม",
      description: "ตรวจสอบผลการประเมินของพนักงานในทีม",
      link: "/performance",
      status: "Active"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "อนุมัติการประเมิน",
      description: "อนุมัติผลการประเมินและ KPI ของพนักงาน",
      link: "/performance",
      status: "Active"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "รายงานทีม",
      description: "ดูรายงานประสิทธิภาพของทีมงาน",
      link: "/reports",
      status: "Active"
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-600" />,
      title: "จัดการขั้นตอนงาน",
      description: "ควบคุมขั้นตอนการทำงานและการอนุมัติ",
      link: "/workflows",
      status: "Active"
    }
  ];

  const pendingApprovals = [
    { employee: "นายสมชาย ใจดี", type: "KPI Setting", dueDate: "15 ม.ค. 2025" },
    { employee: "นางสาวสมหญิง รักงาน", type: "Mid-Year Review", dueDate: "16 ม.ค. 2025" },
    { employee: "นายสมศักดิ์ ขยันทำงาน", type: "KPI Achievement", dueDate: "18 ม.ค. 2025" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manager Dashboard</h1>
                <p className="text-sm text-gray-600">ระบบจัดการทีมและอนุมัติการประเมิน</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                ยินดีต้อนรับ, <span className="font-semibold">{user?.name}</span>
              </div>
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge variant="outline">Manager</Badge>
              <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            แดชบอร์ดผู้จัดการ
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            จัดการทีมงาน อนุมัติการประเมิน และติดตามผลงานของพนักงาน
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{managerStats.totalEmployees}</div>
                  <div className="text-gray-600">พนักงานในทีม</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{managerStats.pendingApprovals}</div>
                  <div className="text-gray-600">รออนุมัติ</div>
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
                  <div className="text-3xl font-bold text-green-600 mb-2">{managerStats.completedAppraisals}</div>
                  <div className="text-gray-600">เสร็จสิ้นแล้ว</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Award className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{managerStats.averageScore}</div>
                  <div className="text-gray-600">คะแนนเฉลี่ย</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Manager Features */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>ฟีเจอร์สำหรับผู้จัดการ</CardTitle>
                <CardDescription>เครื่องมือจัดการทีมและอนุมัติการประเมิน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {managerFeatures.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {feature.icon}
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                          </div>
                          <Badge 
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {feature.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm mb-4">
                          {feature.description}
                        </CardDescription>
                        <Link to={feature.link}>
                          <Button variant="outline" className="w-full">
                            เข้าสู่โมดูล
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  รอการอนุมัติ
                </CardTitle>
                <CardDescription>รายการที่ต้องดำเนินการอนุมัติ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingApprovals.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{item.employee}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">กำหนด: {item.dueDate}</p>
                    <Button size="sm" className="w-full">
                      ดำเนินการ
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>การดำเนินการด่วน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link to="/performance">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Target className="w-4 h-4 mr-2" />
                    จัดการการประเมิน
                  </Button>
                </Link>
                <Link to="/reports">
                  <Button variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    ดูรายงานทีม
                  </Button>
                </Link>
                <Link to="/workflows">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    จัดการขั้นตอนงาน
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 HR Management System - Manager Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ManagerDashboard;
