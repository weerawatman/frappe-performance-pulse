
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee/kpi" element={<EmployeeKPI />} />
              <Route path="/performance" element={<PerformanceManagement />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/workflows" element={<WorkflowsPage />} />
              <Route path="/roles" element={<RoleManagementPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
