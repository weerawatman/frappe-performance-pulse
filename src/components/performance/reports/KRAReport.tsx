
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Target, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { KRAReport } from '@/types/reports';
import { getScoreColorClass, getScoreBgColorClass, getTrendIcon, getTrendColorClass } from '@/utils/reportUtils';

interface KRAReportProps {
  reports: KRAReport[];
}

const KRAReportComponent: React.FC<KRAReportProps> = ({ reports }) => {
  const chartConfig = {
    averageScore: {
      label: "คะแนนเฉลี่ย",
      color: "hsl(var(--chart-1))",
    },
    totalEvaluations: {
      label: "จำนวนการประเมิน",
      color: "hsl(var(--chart-2))",
    },
  };

  const kraScoreData = reports
    .sort((a, b) => b.averageScore - a.averageScore)
    .map(report => ({
      name: report.kra.length > 25 ? report.kra.substring(0, 25) + '...' : report.kra,
      fullName: report.kra,
      averageScore: report.averageScore,
      totalEvaluations: report.totalEvaluations,
    }));

  const topKRA = reports.reduce((max, report) => 
    report.averageScore > max.averageScore ? report : max, reports[0]);
  
  const lowKRA = reports.reduce((min, report) => 
    report.averageScore < min.averageScore ? report : min, reports[0]);

  const improvingKRAs = reports.filter(r => r.trend === 'improving').length;
  const decliningKRAs = reports.filter(r => r.trend === 'declining').length;

  // Get department comparison for top KRA
  const getTopKRADepartmentChart = () => {
    if (!topKRA || !topKRA.departmentBreakdown) return null;

    const deptData = topKRA.departmentBreakdown
      .sort((a, b) => b.averageScore - a.averageScore)
      .map(dept => ({
        department: dept.department,
        averageScore: dept.averageScore,
      }));

    return (
      <ChartContainer config={chartConfig} className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={deptData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis domain={[0, 5]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="averageScore" fill="var(--color-averageScore)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  };

  // Get trend chart for top KRA
  const getTopKRATrendChart = () => {
    if (!topKRA || !topKRA.cycleTrend) return null;

    const trendData = topKRA.cycleTrend
      .sort((a, b) => a.cycleId.localeCompare(b.cycleId))
      .map(cycle => ({
        cycleName: cycle.cycleName.length > 15 ? cycle.cycleName.substring(0, 15) + '...' : cycle.cycleName,
        fullName: cycle.cycleName,
        averageScore: cycle.averageScore,
      }));

    return (
      <ChartContainer config={chartConfig} className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cycleName" />
            <YAxis domain={[0, 5]} />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value, name, props) => [
                `${value}`,
                `คะแนนเฉลี่ย (${props.payload.fullName})`
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="averageScore" 
              stroke="var(--color-averageScore)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-averageScore)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Target className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">จำนวน KRA</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">KRA ที่ปรับปรุง</p>
                <p className="text-2xl font-bold">{improvingKRAs}</p>
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
                <p className="text-sm font-medium text-gray-600">KRA คะแนนสูงสุด</p>
                <p className="text-sm font-bold text-yellow-600">
                  {topKRA?.kra.substring(0, 15) || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">KRA ที่ต้องปรับปรุง</p>
                <p className="text-2xl font-bold">{decliningKRAs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main KRA Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>คะแนนเฉลี่ยของแต่ละ KRA</CardTitle>
          <CardDescription>เรียงลำดับจากคะแนนสูงสุดไปต่ำสุด</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kraScoreData} margin={{ bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis domain={[0, 5]} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value, name, props) => [
                    `${value}`,
                    `คะแนนเฉลี่ย (${props.payload.fullName})`
                  ]}
                />
                <Bar dataKey="averageScore" fill="var(--color-averageScore)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top KRA Analysis */}
      {topKRA && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>การเปรียบเทียบตามแผนก - {topKRA.kra}</CardTitle>
              <CardDescription>คะแนนเฉลี่ยของ KRA นี้ในแต่ละแผนก</CardDescription>
            </CardHeader>
            <CardContent>
              {getTopKRADepartmentChart()}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>แนวโน้มตามรอบการประเมิน - {topKRA.kra}</CardTitle>
              <CardDescription>การเปลี่ยนแปลงคะแนนของ KRA นี้ตามเวลา</CardDescription>
            </CardHeader>
            <CardContent>
              {getTopKRATrendChart()}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายละเอียด KRA ทั้งหมด</CardTitle>
          <CardDescription>ข้อมูลเชิงลึกของแต่ละ KRA</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>KRA</TableHead>
                <TableHead className="text-center">จำนวนการประเมิน</TableHead>
                <TableHead className="text-center">คะแนนเฉลี่ย</TableHead>
                <TableHead className="text-center">แนวโน้ม</TableHead>
                <TableHead className="text-center">แผนกที่ดีที่สุด</TableHead>
                <TableHead className="text-center">แผนกที่ต้องปรับปรุง</TableHead>
                <TableHead className="text-center">อันดับ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports
                .sort((a, b) => b.averageScore - a.averageScore)
                .map((report, index) => {
                  const bestDept = report.departmentBreakdown
                    .reduce((max, dept) => dept.averageScore > max.averageScore ? dept : max, report.departmentBreakdown[0]);
                  const worstDept = report.departmentBreakdown
                    .reduce((min, dept) => dept.averageScore < min.averageScore ? dept : min, report.departmentBreakdown[0]);

                  return (
                    <TableRow key={report.kra}>
                      <TableCell className="font-medium max-w-64">
                        <div className="truncate" title={report.kra}>
                          {report.kra}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{report.totalEvaluations}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${getScoreBgColorClass(report.averageScore)} ${getScoreColorClass(report.averageScore)}`}>
                          {report.averageScore.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className={getTrendColorClass(report.trend)}>
                            {getTrendIcon(report.trend)}
                          </span>
                          <span className={`text-xs ${getTrendColorClass(report.trend)}`}>
                            {report.trend === 'improving' ? 'ปรับปรุง' :
                             report.trend === 'declining' ? 'ลดลง' : 'คงที่'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm">
                          <div className="font-medium">{bestDept?.department || 'N/A'}</div>
                          <div className="text-green-600">
                            {bestDept?.averageScore.toFixed(2) || 'N/A'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm">
                          <div className="font-medium">{worstDept?.department || 'N/A'}</div>
                          <div className="text-red-600">
                            {worstDept?.averageScore.toFixed(2) || 'N/A'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          #{index + 1}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default KRAReportComponent;
