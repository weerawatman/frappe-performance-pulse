
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Building2, Users, TrendingUp, Award } from 'lucide-react';
import { DepartmentReport } from '@/types/reports';
import { getScoreColorClass, getScoreBgColorClass } from '@/utils/reportUtils';

interface DepartmentReportProps {
  reports: DepartmentReport[];
}

const DepartmentReportComponent: React.FC<DepartmentReportProps> = ({ reports }) => {
  const chartConfig = {
    averageScore: {
      label: "คะแนนเฉลี่ย",
      color: "hsl(var(--chart-1))",
    },
    excellent: {
      label: "ยอดเยียม",
      color: "hsl(142, 76%, 36%)",
    },
    good: {
      label: "ดี",
      color: "hsl(217, 78%, 51%)",
    },
    average: {
      label: "ปานกลาง",
      color: "hsl(45, 93%, 47%)",
    },
    poor: {
      label: "ต้องปรับปรุง",
      color: "hsl(0, 84%, 60%)",
    },
  };

  const chartData = reports.map(report => ({
    name: report.department,
    averageScore: report.averageScore,
    excellent: report.excellentPerformers,
    good: report.goodPerformers,
    average: report.averagePerformers,
    poor: report.poorPerformers,
  }));

  const pieData = reports.reduce((acc, report) => {
    acc.excellent += report.excellentPerformers;
    acc.good += report.goodPerformers;
    acc.average += report.averagePerformers;
    acc.poor += report.poorPerformers;
    return acc;
  }, { excellent: 0, good: 0, average: 0, poor: 0 });

  const pieChartData = [
    { name: 'ยอดเยี่ยม', value: pieData.excellent, color: '#16a34a' },
    { name: 'ดี', value: pieData.good, color: '#2563eb' },
    { name: 'ปานกลาง', value: pieData.average, color: '#eab308' },
    { name: 'ต้องปรับปรุง', value: pieData.poor, color: '#dc2626' },
  ];

  const totalEmployees = reports.reduce((sum, report) => sum + report.totalEmployees, 0);
  const overallAverage = reports.reduce((sum, report) => sum + (report.averageScore * report.totalEmployees), 0) / totalEmployees;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">จำนวนแผนก</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">จำนวนพนักงาน</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ยรวม</p>
                <p className="text-2xl font-bold">{overallAverage.toFixed(2)}</p>
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
                <p className="text-sm font-medium text-gray-600">ผู้มีผลงานยอดเยี่ยม</p>
                <p className="text-2xl font-bold">{pieData.excellent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>คะแนนเฉลี่ยตามแผนก</CardTitle>
            <CardDescription>เปรียบเทียบคะแนนเฉลี่ยของแต่ละแผนก</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="averageScore" fill="var(--color-averageScore)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การกระจายระดับผลงาน</CardTitle>
            <CardDescription>สัดส่วนของพนักงานในแต่ละระดับผลงาน</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
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

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดตามแผนก</CardTitle>
          <CardDescription>ข้อมูลเชิงลึกของแต่ละแผนก</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>แผนก</TableHead>
                <TableHead className="text-center">จำนวนพนักงาน</TableHead>
                <TableHead className="text-center">คะแนนเฉลี่ย</TableHead>
                <TableHead className="text-center">ยอดเยี่ยม</TableHead>
                <TableHead className="text-center">ดี</TableHead>
                <TableHead className="text-center">ปานกลาง</TableHead>
                <TableHead className="text-center">ต้องปรับปรุง</TableHead>
                <TableHead className="text-center">กราฟการกระจาย</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.department}>
                  <TableCell className="font-medium">{report.department}</TableCell>
                  <TableCell className="text-center">{report.totalEmployees}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${getScoreBgColorClass(report.averageScore)} ${getScoreColorClass(report.averageScore)}`}>
                      {report.averageScore.toFixed(2)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-green-600">
                      {report.excellentPerformers}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-blue-600">
                      {report.goodPerformers}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-yellow-600">
                      {report.averagePerformers}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-red-600">
                      {report.poorPerformers}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="w-32">
                      <Progress 
                        value={(report.excellentPerformers + report.goodPerformers) / report.totalEmployees * 100} 
                        className="h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {((report.excellentPerformers + report.goodPerformers) / report.totalEmployees * 100).toFixed(0)}% ดี+
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentReportComponent;
