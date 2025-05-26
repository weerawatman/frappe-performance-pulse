
import React from 'react';
import PerformanceDashboard from '@/components/performance/PerformanceDashboard';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const PerformanceManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
            <p className="text-gray-600">จัดการระบบประเมินผลงานและพัฒนาพนักงาน</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter userId="1" />
          </div>
        </div>
        <PerformanceDashboard />
      </div>
    </div>
  );
};

export default PerformanceManagement;
