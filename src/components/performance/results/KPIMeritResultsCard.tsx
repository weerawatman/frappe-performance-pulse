
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Star } from 'lucide-react';

interface MeritComponent {
  score: number;
  weight: number;
  maxScore: number;
}

interface KPIMeritData {
  totalScore: number;
  components: {
    kpiAchievement: MeritComponent;
    competency: MeritComponent;
    culture: MeritComponent;
  };
  trend: 'up' | 'down' | 'stable';
  previousScore: number;
}

interface KPIMeritResultsCardProps {
  data: KPIMeritData;
  period: 'mid-year' | 'end-year';
}

const KPIMeritResultsCard: React.FC<KPIMeritResultsCardProps> = ({ data, period }) => {
  const componentData = [
    {
      name: 'KPI Achievement',
      score: data.components.kpiAchievement.score,
      maxScore: data.components.kpiAchievement.maxScore,
      weight: data.components.kpiAchievement.weight,
      percentage: (data.components.kpiAchievement.score / data.components.kpiAchievement.maxScore) * 100
    },
    {
      name: 'Competency',
      score: data.components.competency.score,
      maxScore: data.components.competency.maxScore,
      weight: data.components.competency.weight,
      percentage: (data.components.competency.score / data.components.competency.maxScore) * 100
    },
    {
      name: 'Culture',
      score: data.components.culture.score,
      maxScore: data.components.culture.maxScore,
      weight: data.components.culture.weight,
      percentage: (data.components.culture.score / data.components.culture.maxScore) * 100
    }
  ];

  const pieData = componentData.map(item => ({
    name: item.name,
    value: item.score,
    percentage: item.percentage
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

  const getComponentLabel = (name: string) => {
    switch (name) {
      case 'KPI Achievement': return 'ผลงาน KPI';
      case 'Competency': return 'สมรรถนะ';
      case 'Culture': return 'วัฒนธรรม';
      default: return name;
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-green-600" />
          ผลการประเมิน KPI Merit - {period === 'mid-year' ? 'กลางปี' : 'ปลายปี'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">
            {data.totalScore.toFixed(1)}/100
          </div>
          <p className="text-gray-600">คะแนนรวม</p>
          <Progress value={data.totalScore} className="mt-2" />
        </div>

        {/* Component Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">รายละเอียดตามองค์ประกอบ</h4>
          {componentData.map((component, index) => (
            <div key={component.name} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium">{getComponentLabel(component.name)}</h5>
                <div className="text-right">
                  <span className={`text-lg font-bold ${getScoreColor(component.percentage)}`}>
                    {component.score.toFixed(1)}/{component.maxScore}
                  </span>
                  <p className="text-sm text-gray-600">น้ำหนัก {component.weight}%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>เปอร์เซ็นต์ความสำเร็จ</span>
                  <span className={getScoreColor(component.percentage)}>
                    {component.percentage.toFixed(1)}%
                  </span>
                </div>
                <Progress value={component.percentage} className="h-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pie Chart */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">สัดส่วนคะแนน</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${getComponentLabel(name)}: ${percentage.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} คะแนน`, 'คะแนน']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">เปรียบเทียบคะแนน</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={componentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} คะแนน`,
                    name === 'score' ? 'คะแนนที่ได้' : 'คะแนนเต็ม'
                  ]}
                  labelFormatter={(label) => getComponentLabel(label)}
                />
                <Legend />
                <Bar dataKey="score" fill="#10B981" name="คะแนนที่ได้" />
                <Bar dataKey="maxScore" fill="#94A3B8" name="คะแนนเต็ม" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPIMeritResultsCard;
