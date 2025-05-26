
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const KpiPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">จัดการ KPI</h1>
        <p className="text-gray-600">จัดการและติดตาม KPI ขององค์กร</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            KPI Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">KPI management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KpiPage;
