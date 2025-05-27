
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BALANCE_SCORECARD_CATEGORIES } from '@/types/kpi';
import { DollarSign, Users, Cog, BookOpen } from 'lucide-react';

const iconMap = {
  DollarSign,
  Users,
  Cog,
  BookOpen
};

const BalanceScoreCardInfo: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Cog className="w-5 h-5 text-white" />
          </div>
          Balance Score Card Framework
        </CardTitle>
        <p className="text-sm text-gray-600">
          กรอบการวัดผลงานองค์กรแบบ Balance Score Card ที่ครอบคลุม 4 มิติหลัก
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {BALANCE_SCORECARD_CATEGORIES.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <div key={category.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{category.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>หมายเหตุ:</strong> การกำหนด KPI ควรกระจายอย่างสมดุลใน 4 มิติ และน้ำหนักรวมต้องเท่ากับ 100%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceScoreCardInfo;
