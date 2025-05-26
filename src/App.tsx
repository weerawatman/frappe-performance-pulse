
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import KPIBonusPage from "./pages/KPIBonusPage";
import KPIMeritPage from "./pages/KPIMeritPage";
import KPICheckerPage from "./pages/KPICheckerPage";
import KPIApproverPage from "./pages/KPIApproverPage";
import PerformanceEvaluationPage from "./pages/PerformanceEvaluationPage";
import EmployeePerformanceResultsPage from "./pages/EmployeePerformanceResultsPage";
import AdminReportsPage from "./pages/AdminReportsPage";
import UserManagementPage from "./pages/UserManagementPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PerformanceManagement from './pages/PerformanceManagement';
import ReportsPage from './pages/ReportsPage';
import WorkflowsPage from './pages/WorkflowsPage';
import RoleManagementPage from './pages/RoleManagementPage';
import IntegrationsPage from './pages/IntegrationsPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Toaster />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute requireAdmin={true}>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/manager-dashboard" element={
                <ProtectedRoute requireManager={true}>
                  <ManagerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/employee-dashboard" element={
                <ProtectedRoute requireEmployee={true}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/employee/kpi-bonus" element={
                <ProtectedRoute requireEmployee={true}>
                  <KPIBonusPage />
                </ProtectedRoute>
              } />
              <Route path="/employee/kpi-merit" element={
                <ProtectedRoute requireEmployee={true}>
                  <KPIMeritPage />
                </ProtectedRoute>
              } />
              <Route path="/employee/evaluation" element={
                <ProtectedRoute requireEmployee={true}>
                  <PerformanceEvaluationPage />
                </ProtectedRoute>
              } />
              <Route path="/employee/results" element={
                <ProtectedRoute requireEmployee={true}>
                  <EmployeePerformanceResultsPage />
                </ProtectedRoute>
              } />
              <Route path="/kpi-bonus" element={
                <ProtectedRoute requireManagerOrAdmin={true}>
                  <KPIBonusPage />
                </ProtectedRoute>
              } />
              <Route path="/kpi-checker" element={
                <ProtectedRoute requireManagerOrAdmin={true}>
                  <KPICheckerPage />
                </ProtectedRoute>
              } />
              <Route path="/kpi-approver" element={
                <ProtectedRoute requireManagerOrAdmin={true}>
                  <KPIApproverPage />
                </ProtectedRoute>
              } />
              <Route path="/performance" element={
                <ProtectedRoute requireManagerOrAdmin={true}>
                  <PerformanceManagement />
                </ProtectedRoute>
              } />
              <Route path="/evaluation" element={
                <ProtectedRoute requireManagerOrAdmin={true}>
                  <PerformanceEvaluationPage />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute requireManagerOrAdmin={true}>
                  <ReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/workflows" element={
                <ProtectedRoute requireManagerOrAdmin={true}>
                  <WorkflowsPage />
                </ProtectedRoute>
              } />
              <Route path="/roles" element={
                <ProtectedRoute requireAdmin={true}>
                  <RoleManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/integrations" element={
                <ProtectedRoute requireAdmin={true}>
                  <IntegrationsPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
