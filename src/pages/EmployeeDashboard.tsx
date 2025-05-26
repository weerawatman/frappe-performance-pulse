
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, FileText, Calendar, Bell, LogOut, TrendingUp, CheckCircle, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import TaskTrackingPanel from "@/components/notifications/TaskTrackingPanel";
import KPITrackingTable from "@/components/kpi/KPITrackingTable";
import KPIApprovalTable from "@/components/kpi/KPIApprovalTable";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const isChecker = user?.role === 'checker';
  const isApprover = user?.role === 'approver';
  const isEmployee = user?.role === 'employee';

  const getDashboardTitle = () => {
    if (isChecker) return 'Checker Dashboard';
    if (isApprover) return 'Approver Dashboard';
    return 'Employee Dashboard';
  };

  const getDashboardDescription = () => {
    if (isChecker) return 'ตรวจสอบและอนุมัติ KPI ของพนักงาน';
    if (isApprover) return 'อนุมัติ KPI ที่ผ่านการตรวจสอบแล้ว';
    return 'จัดการงานและติดตามผลงานของคุณ';
  };

  const getWelcomeMessage = () => {
    if (isChecker) return 'ตรวจสอบและอนุมัติ KPI ของพนักงาน';
    if (isApprover) return 'อนุมัติ KPI ที่ผ่านการตรวจสอบแล้ว';
    return `จัดการงานและติดตามผลงานของคุณในแผนก ${user?.department}`;
  };

  const getRoleBadge = () => {
    if (isChecker) return 'Checker';
    if (isApprover) return 'Approver';
    return 'Employee';
  };

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
                <h1 className="text-xl font-bold text-gray-900">
                  {getDashboardTitle()}
                </h1>
                <p className="text-sm text-gray-600">{getDashboardDescription()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                ยินดีต้อนรับ, <span className="font-semibold">{user?.name}</span>
              </div>
              <NotificationCenter userId={user?.id || 'EMP001'} />
              <Badge variant="secondary">
                {getRoleBadge()}
              </Badge>
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
            ยินดีต้อนรับ {user?.name}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {getWelcomeMessage()}
          </p>
        </div>

        {/* KPI Tracking Table - สำหรับทุก role */}
        <KPITrackingTable />

        {/* KPI Approval Table - เฉพาะ Checker และ Approver */}
        {(isChecker || isApprover) && (
          <div className="mt-12">
            <KPIApprovalTable userRole={isChecker ? 'checker' : 'approver'} />
          </div>
        )}

        {/* Task Tracking Panel */}
        <div className="mt-12">
          <TaskTrackingPanel 
            userId={user?.id || 'EMP001'} 
            userRole={isChecker ? 'checker' : isApprover ? 'approver' : 'employee'} 
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Somboon Performance Management System - {getDashboardTitle()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;
