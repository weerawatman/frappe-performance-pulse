import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import DashboardPage from '@/pages/DashboardPage';
import KpiPage from '@/pages/KpiPage';
import PerformanceEvaluationPage from '@/pages/PerformanceEvaluationPage';
import AppraisalManagementPage from '@/pages/AppraisalManagementPage';
import ReportPage from '@/pages/ReportPage';
import AdminReportsDashboard from '@/components/performance/reports/AdminReportsDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/kpi" element={<MainLayout><KpiPage /></MainLayout>} />
        <Route path="/employee/evaluation" element={<MainLayout><PerformanceEvaluationPage userRole="employee" /></MainLayout>} />
        <Route path="/manager/evaluation" element={<MainLayout><PerformanceEvaluationPage userRole="checker" /></MainLayout>} />
        <Route path="/admin/evaluation" element={<MainLayout><PerformanceEvaluationPage userRole="admin" /></MainLayout>} />
        <Route path="/appraisal-management" element={<MainLayout><AppraisalManagementPage /></MainLayout>} />
        <Route path="/reports" element={<MainLayout><ReportPage /></MainLayout>} />
        <Route path="/admin/reports" element={<MainLayout><AdminReportsDashboard /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
