
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UpdateKPIStatus from '@/components/kpi/UpdateKPIStatus';

const UpdateKPIStatusPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/employee-dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับ
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">อัปเดตสถานะ KPI</h1>
            <p className="text-gray-600">อัปเดตสถานะ KPI ให้เป็นปัจจุบัน</p>
          </div>
        </div>

        <UpdateKPIStatus />
      </div>
    </div>
  );
};

export default UpdateKPIStatusPage;
