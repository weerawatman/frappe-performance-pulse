
import React from 'react';
import ReportsDashboard from '@/components/performance/reports/ReportsDashboard';

const ReportsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ReportsDashboard />
      </div>
    </div>
  );
};

export default ReportsPage;
