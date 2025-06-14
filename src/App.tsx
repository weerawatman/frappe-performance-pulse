
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MainLayout } from '@/layouts/MainLayout';
import LoginPage from '@/pages/LoginPage';
import AppLauncherPage from '@/pages/AppLauncherPage';
import DashboardPage from '@/pages/DashboardPage';
import PerformanceEvaluationPage from '@/pages/PerformanceEvaluationPage';
import AdminReportsDashboard from '@/components/performance/reports/AdminReportsDashboard';
import EmployeeDashboard from '@/pages/EmployeeDashboard';
import ReportsPage from '@/pages/ReportsPage';
import KPIManagementPage from '@/pages/KPIManagementPage';
import KPIBonusPage from '@/pages/KPIBonusPage';
import KPIMeritPage from '@/pages/KPIMeritPage';
import KPICheckerPage from '@/pages/KPICheckerPage';
import KPIApproverPage from '@/pages/KPIApproverPage';
import KPIAlignmentPage from '@/pages/KPIAlignmentPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <AppLauncherPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout><DashboardPage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/employee-dashboard" element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/checker-dashboard" element={
            <ProtectedRoute requireChecker>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/approver-dashboard" element={
            <ProtectedRoute requireApprover>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/kpi" element={
            <ProtectedRoute>
              <MainLayout><KPIManagementPage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/kpi-alignment" element={
            <ProtectedRoute requireAdmin>
              <MainLayout><KPIAlignmentPage /></MainLayout>
            </ProtectedRoute>
          } />
          {/* Employee KPI Routes - accessible by employees, checkers, and approvers */}
          <Route path="/employee/kpi-bonus" element={
            <ProtectedRoute>
              <KPIBonusPage />
            </ProtectedRoute>
          } />
          <Route path="/employee/kpi-merit" element={
            <ProtectedRoute>
              <KPIMeritPage />
            </ProtectedRoute>
          } />
          {/* Manager KPI Routes */}
          <Route path="/manager/kpi-checker" element={
            <ProtectedRoute requireChecker>
              <KPICheckerPage />
            </ProtectedRoute>
          } />
          <Route path="/manager/kpi-approver" element={
            <ProtectedRoute requireApprover>
              <KPIApproverPage />
            </ProtectedRoute>
          } />
          {/* Evaluation Routes - updated to allow proper access */}
          <Route path="/employee/evaluation" element={
            <ProtectedRoute>
              <MainLayout><PerformanceEvaluationPage userRole="employee" /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/employee/evaluation/bonus" element={
            <ProtectedRoute>
              <MainLayout><PerformanceEvaluationPage userRole="employee" /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/employee/evaluation/merit" element={
            <ProtectedRoute>
              <MainLayout><PerformanceEvaluationPage userRole="employee" /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/manager/evaluation" element={
            <ProtectedRoute requireManagerOrAdmin>
              <MainLayout><PerformanceEvaluationPage userRole="checker" /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/evaluation" element={
            <ProtectedRoute requireAdmin>
              <MainLayout><PerformanceEvaluationPage userRole="admin" /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/appraisal-management" element={
            <ProtectedRoute>
              <MainLayout><div className="p-6"><h1 className="text-2xl font-bold">จัดการการประเมิน</h1><p className="text-gray-600">หน้าจัดการการประเมินจะพร้อมใช้งานเร็วๆ นี้</p></div></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <MainLayout><ReportsPage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute requireAdmin>
              <MainLayout><AdminReportsDashboard /></MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
