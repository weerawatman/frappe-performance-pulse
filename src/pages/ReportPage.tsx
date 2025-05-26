
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const ReportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">รายงาน</h1>
        <p className="text-gray-600">รายงานและสถิติการประเมินผลงาน</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Performance Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Performance reports functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPage;
