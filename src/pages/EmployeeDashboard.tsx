
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, FileText, Calendar, Bell, LogOut, TrendingUp, CheckCircle, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import TaskTrackingPanel from "@/components/notifications/TaskTrackingPanel";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();

  const employeeFeatures = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "กำหนด KPI Bonus",
      description: "จัดการและกำหนด KPI สำหรับการคำนวณโบนัส",
      link: "/employee/kpi-bonus",
      status: "Active"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "กำหนด KPI Merit",
      description: "ประเมินเพื่อปรับขึ้นเงินเดือนจาก Competency และ Culture",
      link: "/employee/kpi-merit",
      status: "Active"
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "ประเมินตนเอง",
      description: "ประเมินผลงานและความสามารถของตนเอง",
      link: "/performance",
      status: "Coming Soon"
    }
  ];

  const employeeStats = [
    { label: "KPI ที่กำหนด", value: "3", icon: <Target className="w-5 h-5" />, color: "text-blue-600" },
    { label: "ผลงานเสร็จสิ้น", value: "85%", icon: <TrendingUp className="w-5 h-5" />, color: "text-green-600" },
    { label: "งานที่เสร็จสิ้น", value: "12", icon: <CheckCircle className="w-5 h-5" />, color: "text-purple-600" },
    { label: "รอการอนุมัติ", value: "1", icon: <Clock className="w-5 h-5" />, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Employee Dashboard</h1>
                <p className="text-sm text-gray-600">จัดการงานและติดตามผลงานของคุณ</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                ยินดีต้อนรับ, <span className="font-semibold">{user?.name}</span>
              </div>
              <NotificationCenter userId={user?.id || 'EMP001'} />
              <Badge variant="secondary">Employee</Badge>
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
            จัดการงานและติดตามผลงานของคุณในแผนก {user?.department}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/employee/kpi-bonus">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                เริ่มกำหนด KPI Bonus
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/employee/kpi-merit">
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                เริ่มกำหนด KPI Merit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Employee Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {employeeStats.map((stat, index) => (
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

        {/* Task Tracking Panel */}
        <TaskTrackingPanel userId={user?.id || 'EMP001'} userRole="employee" />

        {/* Employee Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {employeeFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={feature.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
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
                  <Button variant="outline" className="w-full" disabled={feature.status !== "Active"}>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/employee/kpi-bonus" className="block">
              <div className="p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">กำหนด KPI Bonus</h4>
                    <p className="text-gray-600 text-sm">จัดการ KPI สำหรับการคำนวณโบนัส</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/employee/kpi-merit" className="block">
              <div className="p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">กำหนด KPI Merit</h4>
                    <p className="text-gray-600 text-sm">ประเมินเพื่อปรับขึ้นเงินเดือน</p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="p-6 border border-gray-200 rounded-lg opacity-50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">ประเมินตนเอง</h4>
                  <p className="text-gray-600 text-sm">เร็วๆ นี้</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 HR Management System - Employee Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;
