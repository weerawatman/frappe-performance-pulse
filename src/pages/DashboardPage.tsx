
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Target, Award } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ด</h1>
        <p className="text-gray-600">ภาพรวมระบบประเมินผลงาน</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">KPI ทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold">24</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">ผู้ใช้งาน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold">156</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">การประเมิน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold">89</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">รายงาน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-2xl font-bold">12</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
