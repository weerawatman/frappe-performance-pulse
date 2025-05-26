
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

const AppraisalManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">จัดการการประเมิน</h1>
        <p className="text-gray-600">จัดการรอบการประเมินและเทมเพลต</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Appraisal Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Appraisal management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppraisalManagementPage;
