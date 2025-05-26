
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MainLayout } from '@/layouts/MainLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import PerformanceEvaluationPage from '@/pages/PerformanceEvaluationPage';
import AdminReportsDashboard from '@/components/performance/reports/AdminReportsDashboard';
import EmployeeDashboard from '@/pages/EmployeeDashboard';
import ReportsPage from '@/pages/ReportsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout><DashboardPage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/employee-dashboard" element={
            <ProtectedRoute requireEmployee>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/kpi" element={
            <ProtectedRoute>
              <MainLayout><div className="p-6"><h1 className="text-2xl font-bold">จัดการ KPI</h1><p className="text-gray-600">หน้าจัดการ KPI จะพร้อมใช้งานเร็วๆ นี้</p></div></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/employee/evaluation" element={
            <ProtectedRoute requireEmployee>
              <MainLayout><PerformanceEvaluationPage userRole="employee" /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/manager/evaluation" element={
            <ProtectedRoute requireManager>
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
