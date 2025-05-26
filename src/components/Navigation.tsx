import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Target, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut,
  Building,
  UserCheck,
  ClipboardCheck
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // For employees, we use a simpler navigation in the EmployeeDashboard
  if (user?.role === 'employee') {
    return null;
  }

  const navigationItems = [
    { path: '/', label: 'แดชบอร์ด', icon: Home, roles: ['admin', 'executive', 'approver', 'checker'] },
    { path: '/kpi', label: 'จัดการ KPI', icon: Target, roles: ['admin', 'approver', 'checker'] },
    { path: '/manager/evaluation', label: 'ตรวจสอบการประเมิน', icon: UserCheck, roles: ['checker'] },
    { path: '/admin/evaluation', label: 'อนุมัติการประเมิน', icon: UserCheck, roles: ['admin', 'approver'] },
    { path: '/appraisal-management', label: 'จัดการการประเมิน', icon: FileText, roles: ['admin', 'approver'] },
    { path: '/reports', label: 'รายงาน', icon: BarChart3, roles: ['admin', 'executive', 'approver'] },
    { path: '/admin/reports', label: 'รายงานผู้ดูแล', icon: BarChart3, roles: ['admin'] },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Building className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Somboon Performance Management System</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-600">สวัสดี,</span>
              <span className="font-medium text-gray-900 ml-1">{user?.name}</span>
              <span className="text-xs text-gray-500 ml-2">({user?.role})</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="w-4 h-4 mr-1" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
