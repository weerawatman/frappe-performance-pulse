
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Users, 
  Target, 
  ClipboardCheck, 
  TrendingUp, 
  Award,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface OverviewStats {
  totalEmployees: number;
  kpiAssignedEmployees: number;
  completedEvaluations: number;
  avgKpiBonusScore: number;
  avgKpiMeritScore: number;
  kpiAchievementRate: number;
  pendingEvaluations: number;
}

interface TrendData {
  period: string;
  kpiBonus: number;
  kpiMerit: number;
  achievementRate: number;
}

interface PerformanceDistribution {
  level: string;
  count: number;
  percentage: number;
  color: string;
}

interface PerformanceOverviewDashboardProps {
  stats: OverviewStats;
  trendData: TrendData[];
  distributionData: PerformanceDistribution[];
}

const PerformanceOverviewDashboard: React.FC<PerformanceOverviewDashboardProps> = ({
  stats,
  trendData,
  distributionData
}) => {
  const chartConfig = {
    kpiBonus: {
      label: "KPI Bonus",
      color: "hsl(var(--chart-1))",
    },
    kpiMerit: {
      label: "KPI Merit",
      color: "hsl(var(--chart-2))",
    },
    achievementRate: {
      label: "อัตราการบรรลุเป้าหมาย",
      color: "hsl(var(--chart-3))",
    },
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 80) return 'secondary';
    if (score >= 70) return 'outline';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">พนักงานทั้งหมด</p>
                <p className="text-2xl font-bold">{stats.totalEmployees}</p>
                <p className="text-xs text-gray-500">
                  {stats.kpiAssignedEmployees} คนมี KPI
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ประเมินเสร็จสิ้น</p>
                <p className="text-2xl font-bold">{stats.completedEvaluations}</p>
                <p className="text-xs text-gray-500">
                  {stats.pendingEvaluations} คนรอประเมิน
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Target className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย KPI Bonus</p>
                <p className={`text-2xl font-bold ${getScoreColor(stats.avgKpiBonusScore)}`}>
                  {stats.avgKpiBonusScore.toFixed(1)}
                </p>
                <Badge variant={getScoreBadgeVariant(stats.avgKpiBonusScore)} className="mt-1">
                  {stats.avgKpiBonusScore >= 90 ? 'ดีเยี่ยม' : 
                   stats.avgKpiBonusScore >= 80 ? 'ดี' : 
                   stats.avgKpiBonusScore >= 70 ? 'ปานกลาง' : 'ต้องปรับปรุง'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Award className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย KPI Merit</p>
                <p className={`text-2xl font-bold ${getScoreColor(stats.avgKpiMeritScore)}`}>
                  {stats.avgKpiMeritScore.toFixed(1)}
                </p>
                <Badge variant={getScoreBadgeVariant(stats.avgKpiMeritScore)} className="mt-1">
                  {stats.avgKpiMeritScore >= 90 ? 'ดีเยี่ยม' : 
                   stats.avgKpiMeritScore >= 80 ? 'ดี' : 
                   stats.avgKpiMeritScore >= 70 ? 'ปานกลาง' : 'ต้องปรับปรุง'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Rate and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              อัตราการบรรลุเป้าหมาย KPI
            </CardTitle>
            <CardDescription>
              เปอร์เซ็นต์พนักงานที่บรรลุเป้าหมาย KPI ที่กำหนด
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-green-600">
                {stats.kpiAchievementRate.toFixed(1)}%
              </div>
              <p className="text-gray-600">จาก {stats.completedEvaluations} การประเมิน</p>
            </div>
            <Progress value={stats.kpiAchievementRate} className="h-3" />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การกระจายระดับผลงาน</CardTitle>
            <CardDescription>สัดส่วนพนักงานในแต่ละระดับผลงาน</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ level, percentage }) => `${level} ${percentage.toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>แนวโน้มคะแนนตามรอบการประเมิน</CardTitle>
          <CardDescription>
            เปรียบเทียบแนวโน้มคะแนน KPI Bonus และ KPI Merit ตามรอบเวลา
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="kpiBonus" 
                  stroke="var(--color-kpiBonus)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-kpiBonus)" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="kpiMerit" 
                  stroke="var(--color-kpiMerit)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-kpiMerit)" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="achievementRate" 
                  stroke="var(--color-achievementRate)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "var(--color-achievementRate)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ผู้ทำคะแนนสูงสุด</p>
                <p className="text-lg font-bold text-green-600">
                  {Math.round((stats.avgKpiBonusScore / 100) * stats.completedEvaluations)} คน
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <Award className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ผู้ต้องปรับปรุง</p>
                <p className="text-lg font-bold text-red-600">
                  {Math.round(((100 - stats.kpiAchievementRate) / 100) * stats.completedEvaluations)} คน
                </p>
              </div>
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">รอการประเมิน</p>
                <p className="text-lg font-bold text-yellow-600">{stats.pendingEvaluations} คน</p>
              </div>
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceOverviewDashboard;
