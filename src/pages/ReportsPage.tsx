
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReportsDashboard from '@/components/performance/reports/ReportsDashboard';

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับ
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">รายงานการประเมินผลงาน</h1>
            <p className="text-gray-600">รายงานสรุปผลการประเมินประสิทธิภาพและการวิเคราะห์ข้อมูล</p>
          </div>
        </div>
        
        <ReportsDashboard />
      </div>
    </div>
  );
};

export default ReportsPage;
