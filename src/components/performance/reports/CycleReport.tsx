
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Calendar, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { CycleReport } from '@/types/reports';
import { getScoreColorClass, getScoreBgColorClass } from '@/utils/reportUtils';

interface CycleReportProps {
  reports: CycleReport[];
}

const CycleReportComponent: React.FC<CycleReportProps> = ({ reports }) => {
  const chartConfig = {
    averageScore: {
      label: "คะแนนเฉลี่ย",
      color: "hsl(var(--chart-3))",
    },
    completionRate: {
      label: "อัตราการเสร็จสิ้น",
      color: "hsl(var(--chart-4))",
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

  const trendData = reports
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .map(report => ({
      cycleName: report.cycleName.length > 15 ? report.cycleName.substring(0, 15) + '...' : report.cycleName,
      fullName: report.cycleName,
      averageScore: report.averageScore,
      completionRate: (report.completedAppraisals / report.totalAppraisals) * 100,
      startDate: report.startDate.toLocaleDateString('th-TH', { month: 'short', year: 'numeric' }),
    }));

  const performanceData = reports.map(report => ({
    name: report.cycleName.length > 20 ? report.cycleName.substring(0, 20) + '...' : report.cycleName,
    fullName: report.cycleName,
    excellent: report.excellentPerformers,
    good: report.goodPerformers,
    average: report.averagePerformers,
    poor: report.poorPerformers,
  }));

  const totalAppraisals = reports.reduce((sum, report) => sum + report.totalAppraisals, 0);
  const completedAppraisals = reports.reduce((sum, report) => sum + report.completedAppraisals, 0);
  const overallCompletionRate = totalAppraisals > 0 ? (completedAppraisals / totalAppraisals) * 100 : 0;
  
  const latestCycle = reports.reduce((latest, report) => 
    report.startDate > latest.startDate ? report : latest, reports[0]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">รอบการประเมิน</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">อัตราการเสร็จสิ้น</p>
                <p className="text-2xl font-bold">{overallCompletionRate.toFixed(1)}%</p>
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
                <p className="text-sm font-medium text-gray-600">รอบล่าสุด</p>
                <p className="text-sm font-bold text-purple-600">
                  {latestCycle?.cycleName.substring(0, 15) || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">การประเมินทั้งหมด</p>
                <p className="text-2xl font-bold">{totalAppraisals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มคะแนนตามรอบการประเมิน</CardTitle>
            <CardDescription>การเปลี่ยนแปลงของคะแนนเฉลี่ยในแต่ละรอบ</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cycleName" />
                  <YAxis yAxisId="score" domain={[0, 5]} />
                  <YAxis yAxisId="completion" orientation="right" domain={[0, 100]} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name, props) => [
                      name === 'averageScore' ? `${value}` : `${value}%`,
                      name === 'averageScore' ? `คะแนนเฉลี่ย (${props.payload.fullName})` : 'อัตราการเสร็จสิ้น'
                    ]}
                  />
                  <Line 
                    yAxisId="score"
                    type="monotone" 
                    dataKey="averageScore" 
                    stroke="var(--color-averageScore)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-averageScore)' }}
                  />
                  <Line 
                    yAxisId="completion"
                    type="monotone" 
                    dataKey="completionRate" 
                    stroke="var(--color-completionRate)" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: 'var(--color-completionRate)' }}
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การกระจายผลงานตามรอบ</CardTitle>
            <CardDescription>จำนวนพนักงานในแต่ละระดับผลงาน</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name, props) => [
                      `${value} คน`,
                      `${name} (${props.payload.fullName})`
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="excellent" stackId="a" fill="var(--color-excellent)" />
                  <Bar dataKey="good" stackId="a" fill="var(--color-good)" />
                  <Bar dataKey="average" stackId="a" fill="var(--color-average)" />
                  <Bar dataKey="poor" stackId="a" fill="var(--color-poor)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดรอบการประเมิน</CardTitle>
          <CardDescription>ข้อมูลเชิงลึกของแต่ละรอบการประเมิน</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>รอบการประเมิน</TableHead>
                <TableHead className="text-center">ระยะเวลา</TableHead>
                <TableHead className="text-center">จำนวนประเมิน</TableHead>
                <TableHead className="text-center">เสร็จสิ้น</TableHead>
                <TableHead className="text-center">คะแนนเฉลี่ย</TableHead>
                <TableHead className="text-center">ยอดเยี่ยม</TableHead>
                <TableHead className="text-center">ดี</TableHead>
                <TableHead className="text-center">ปานกลาง</TableHead>
                <TableHead className="text-center">ต้องปรับปรุง</TableHead>
                <TableHead className="text-center">ความคืบหน้า</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports
                .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
                .map((report) => (
                <TableRow key={report.cycleId}>
                  <TableCell className="font-medium max-w-48">
                    <div className="truncate" title={report.cycleName}>
                      {report.cycleName}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-xs">
                      <div>{report.startDate.toLocaleDateString('th-TH')}</div>
                      <div className="text-gray-500">ถึง</div>
                      <div>{report.endDate.toLocaleDateString('th-TH')}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{report.totalAppraisals}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-green-600">
                      {report.completedAppraisals}
                    </Badge>
                  </TableCell>
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
                        value={(report.completedAppraisals / report.totalAppraisals) * 100} 
                        className="h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {((report.completedAppraisals / report.totalAppraisals) * 100).toFixed(0)}%
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

export default CycleReportComponent;
