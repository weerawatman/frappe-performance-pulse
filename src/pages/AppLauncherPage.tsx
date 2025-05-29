
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, LogOut, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AppLauncherPage = () => {
  const { user, logout } = useAuth();

  const apps = [
    {
      id: 'performance',
      title: 'Performance',
      description: 'Performance Management System',
      icon: Target,
      link: '/employee-dashboard',
      color: 'bg-purple-500',
      available: true
    },
    {
      id: 'requests',
      title: 'Requests & Tasks',
      description: 'Task Management',
      icon: Target,
      link: '#',
      color: 'bg-red-500',
      available: false
    },
    {
      id: 'employees',
      title: 'Employees',
      description: 'Employee Directory',
      icon: Target,
      link: '#',
      color: 'bg-blue-500',
      available: false
    },
    {
      id: 'vibe',
      title: 'Vibe',
      description: 'Employee Engagement',
      icon: Target,
      link: '#',
      color: 'bg-purple-400',
      available: false
    },
    {
      id: 'reimbursement',
      title: 'Reimbursement',
      description: 'Expense Claims',
      icon: Target,
      link: '#',
      color: 'bg-green-500',
      available: false
    },
    {
      id: 'compensation',
      title: 'Compensation',
      description: 'Salary & Benefits',
      icon: Target,
      link: '#',
      color: 'bg-green-600',
      available: false
    },
    {
      id: 'attendance',
      title: 'Attendance',
      description: 'Time Tracking',
      icon: Target,
      link: '#',
      color: 'bg-orange-500',
      available: false
    },
    {
      id: 'leave',
      title: 'Leave',
      description: 'Leave Management',
      icon: Target,
      link: '#',
      color: 'bg-red-400',
      available: false
    },
    {
      id: 'hr-documents',
      title: 'HR Documents',
      description: 'Document Repository',
      icon: Target,
      link: '#',
      color: 'bg-blue-400',
      available: false
    },
    {
      id: 'recruitment',
      title: 'Recruitment',
      description: 'Hiring Process',
      icon: Target,
      link: '#',
      color: 'bg-pink-500',
      available: false
    },
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'Schedule Management',
      icon: Target,
      link: '#',
      color: 'bg-red-300',
      available: false
    },
    {
      id: 'project',
      title: 'Project',
      description: 'Project Management',
      icon: Target,
      link: '#',
      color: 'bg-cyan-500',
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/3ee75ef7-d7d2-4357-8492-aeded3669568.png" 
                  alt="Somboon Logo" 
                  className="w-6 h-6" 
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">All Apps</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                ยินดีต้อนรับ, <span className="font-semibold">{user?.name}</span>
              </div>
              <Bell className="w-5 h-5" />
              <Badge variant="secondary" className="bg-white text-blue-600">
                {user?.role === 'employee' ? 'Employee' : 
                 user?.role === 'checker' ? 'Checker' : 
                 user?.role === 'approver' ? 'Approver' : 'Admin'}
              </Badge>
              <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50">
                <LogOut className="w-4 h-4" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-blue-600 text-sm mb-2">Employee Daily Health Check | Kindly Sign Off the COVID-19 Guideline Policies Click here</p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {apps.map((app) => (
            <Card key={app.id} className={`hover:shadow-lg transition-all duration-300 ${!app.available ? 'opacity-50' : 'hover:scale-105'}`}>
              <CardContent className="p-6 text-center">
                {app.available ? (
                  <Link to={app.link} className="block">
                    <div className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <app.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{app.title}</h3>
                    <p className="text-xs text-gray-600">{app.description}</p>
                  </Link>
                ) : (
                  <div className="cursor-not-allowed">
                    <div className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <app.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{app.title}</h3>
                    <p className="text-xs text-gray-600">{app.description}</p>
                    <p className="text-xs text-red-500 mt-1">Coming Soon</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Somboon Performance Management System</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLauncherPage;
