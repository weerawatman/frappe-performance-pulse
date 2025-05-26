
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { MainLayout } from '@/layouts/MainLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import KpiPage from '@/pages/KpiPage';
import PerformanceEvaluationPage from '@/pages/PerformanceEvaluationPage';
import AppraisalManagementPage from '@/pages/AppraisalManagementPage';
import ReportPage from '@/pages/ReportPage';
import AdminReportsDashboard from '@/components/performance/reports/AdminReportsDashboard';

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
          <Route path="/kpi" element={
            <ProtectedRoute>
              <MainLayout><KpiPage /></MainLayout>
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
              <MainLayout><AppraisalManagementPage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <MainLayout><ReportPage /></MainLayout>
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
