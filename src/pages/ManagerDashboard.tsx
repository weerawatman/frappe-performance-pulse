
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Target, BarChart3, MessageCircle, Bell, LogOut, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ManagerDashboard = () => {
  const { user, logout } = useAuth();

  const managerFeatures = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Team Performance",
      description: "ดูและประเมินผลงานของทีมงาน",
      link: "/performance",
      status: "Active"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: "Reports & Analytics",
      description: "รายงานผลงานและการวิเคราะห์ข้อมูลทีม",
      link: "/reports",
      status: "Active"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
      title: "Feedback Management",
      description: "จัดการ feedback และการพัฒนาพนักงาน",
      link: "/performance",
      status: "Active"
    }
  ];

  const teamStats = [
    { label: "จำนวนสมาชิกทีม", value: "12", icon: <Users className="w-5 h-5" />, color: "text-blue-600" },
    { label: "เป้าหมายที่บรรลุ", value: "85%", icon: <TrendingUp className="w-5 h-5" />, color: "text-green-600" },
    { label: "งานที่เสร็จสิ้น", value: "24", icon: <CheckCircle className="w-5 h-5" />, color: "text-purple-600" },
    { label: "รอการอนุมัติ", value: "3", icon: <Clock className="w-5 h-5" />, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manager Dashboard</h1>
                <p className="text-sm text-gray-600">จัดการทีมและประเมินผลงาน</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                ยินดีต้อนรับ, <span className="font-semibold">{user?.name}</span>
              </div>
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge variant="secondary">Manager</Badge>
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
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ยินดีต้อนรับ, {user?.name}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            จัดการทีมงานและติดตามผลงานของพนักงานในแผนก {user?.department}
          </p>
          <Link to="/performance">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              เริ่มประเมินผลงาน
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {teamStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className={`flex items-center justify-center mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manager Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                    className="bg-green-100 text-green-700"
                  >
                    {feature.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {feature.description}
                </CardDescription>
                <Link to={feature.link}>
                  <Button variant="outline" className="w-full">
                    เข้าสู่โมดูล
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">การดำเนินการด่วน</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/performance" className="block">
              <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">ประเมินผลงานทีม</h4>
                    <p className="text-gray-600 text-sm">เริ่มการประเมินผลงานรอบใหม่</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/reports" className="block">
              <div className="p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">ดูรายงานผลงาน</h4>
                    <p className="text-gray-600 text-sm">รายงานประสิทธิภาพของทีม</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 HR Management System - Manager Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ManagerDashboard;
