
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeKPI from "./pages/EmployeeKPI";
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
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute requireAdmin={true}>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/employee-dashboard" element={
                <ProtectedRoute>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/employee/kpi" element={
                <ProtectedRoute>
                  <EmployeeKPI />
                </ProtectedRoute>
              } />
              <Route path="/performance" element={
                <ProtectedRoute requireAdmin={true}>
                  <PerformanceManagement />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute requireAdmin={true}>
                  <ReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/workflows" element={
                <ProtectedRoute requireAdmin={true}>
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
          </BrowserRouter>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
