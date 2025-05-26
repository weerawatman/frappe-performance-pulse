
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Target, CheckCircle, XCircle } from 'lucide-react';

interface KPIBonusItem {
  id: string;
  name: string;
  target: string;
  actual: string;
  achievement: number;
  weight: number;
  score: number;
  status: 'achieved' | 'not_achieved';
}

interface KPIBonusData {
  totalScore: number;
  maxScore: number;
  items: KPIBonusItem[];
  trend: 'up' | 'down' | 'stable';
  previousScore: number;
}

interface KPIBonusResultsCardProps {
  data: KPIBonusData;
  period: 'mid-year' | 'end-year';
}

const KPIBonusResultsCard: React.FC<KPIBonusResultsCardProps> = ({ data, period }) => {
  const getStatusColor = (status: string) => {
    return status === 'achieved' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    return status === 'achieved' ? 'success' : 'destructive';
  };

  const chartData = data.items.map(item => ({
    name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
    fullName: item.name,
    achievement: item.achievement,
    target: 100,
    score: item.score,
    weight: item.weight
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          ผลการประเมิน KPI Bonus - {period === 'mid-year' ? 'กลางปี' : 'ปลายปี'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">
            {data.totalScore.toFixed(1)}/{data.maxScore}
          </div>
          <p className="text-gray-600">คะแนนรวม</p>
          <Progress value={data.totalScore} className="mt-2" />
        </div>

        {/* Individual KPI Results */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">รายละเอียดแต่ละ KPI</h4>
          {data.items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium">{item.name}</h5>
                <div className="flex items-center gap-2">
                  {item.status === 'achieved' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <Badge variant={getStatusBadge(item.status)}>
                    {item.status === 'achieved' ? 'บรรลุ' : 'ไม่บรรลุ'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">เป้าหมาย:</span>
                  <span className="ml-2 font-medium">{item.target}</span>
                </div>
                <div>
                  <span className="text-gray-600">ผลงานจริง:</span>
                  <span className="ml-2 font-medium">{item.actual}</span>
                </div>
                <div>
                  <span className="text-gray-600">% ความสำเร็จ:</span>
                  <span className={`ml-2 font-medium ${getStatusColor(item.status)}`}>
                    {item.achievement.toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">คะแนน:</span>
                  <span className="ml-2 font-medium">{item.score.toFixed(1)}/{item.weight}</span>
                </div>
              </div>
              
              <Progress value={item.achievement > 100 ? 100 : item.achievement} className="mt-3" />
            </div>
          ))}
        </div>

        {/* Achievement Chart */}
        {data.items.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">กราฟเปรียบเทียบผลงาน</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}${name === 'achievement' ? '%' : ' คะแนน'}`,
                    name === 'achievement' ? 'ความสำเร็จ' : name === 'target' ? 'เป้าหมาย' : 'คะแนน'
                  ]}
                  labelFormatter={(label) => chartData.find(d => d.name === label)?.fullName || label}
                />
                <Legend />
                <Bar dataKey="achievement" fill="#3B82F6" name="ความสำเร็จ (%)" />
                <Bar dataKey="target" fill="#94A3B8" name="เป้าหมาย (100%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIBonusResultsCard;
