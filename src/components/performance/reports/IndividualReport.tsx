
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { User, TrendingUp, TrendingDown, Minus, Search } from 'lucide-react';
import { IndividualReport } from '@/types/reports';
import { getScoreColorClass, getScoreBgColorClass, getTrendIcon, getTrendColorClass } from '@/utils/reportUtils';

interface IndividualReportProps {
  reports: IndividualReport[];
}

const IndividualReportComponent: React.FC<IndividualReportProps> = ({ reports }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const chartConfig = {
    finalScore: {
      label: "คะแนนสุดท้าย",
      color: "hsl(var(--chart-1))",
    },
    totalScore: {
      label: "คะแนน Goal",
      color: "hsl(var(--chart-2))",
    },
    selfScore: {
      label: "คะแนน Self",
      color: "hsl(var(--chart-3))",
    },
    feedbackScore: {
      label: "คะแนน Feedback",
      color: "hsl(var(--chart-4))",
    },
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || report.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const selectedEmployeeData = selectedEmployee 
    ? reports.find(r => r.employeeId === selectedEmployee)
    : null;

  const departments = [...new Set(reports.map(r => r.department))];

  const getTrendIcon = (trend: 'improving' | 'declining' | 'stable') => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendChart = (appraisals: IndividualReport['appraisals']) => {
    if (!appraisals || appraisals.length === 0) return null;

    const chartData = appraisals
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(appraisal => ({
        cycleName: appraisal.cycleName.length > 10 ? appraisal.cycleName.substring(0, 10) + '...' : appraisal.cycleName,
        fullName: appraisal.cycleName,
        finalScore: appraisal.finalScore,
        totalScore: appraisal.totalScore,
        selfScore: appraisal.selfScore,
        feedbackScore: appraisal.feedbackScore,
        date: appraisal.date.toLocaleDateString('th-TH'),
      }));

    return (
      <ChartContainer config={chartConfig} className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cycleName" />
            <YAxis domain={[0, 5]} />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value, name, props) => [
                `${value}`,
                name === 'finalScore' ? `คะแนนสุดท้าย (${props.payload.fullName})` :
                name === 'totalScore' ? 'คะแนน Goal' :
                name === 'selfScore' ? 'คะแนน Self' : 'คะแนน Feedback'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="finalScore" 
              stroke="var(--color-finalScore)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-finalScore)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="totalScore" 
              stroke="var(--color-totalScore)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-totalScore)', strokeWidth: 1, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="selfScore" 
              stroke="var(--color-selfScore)" 
              strokeWidth={2}
              strokeDasharray="2 2"
              dot={{ fill: 'var(--color-selfScore)', strokeWidth: 1, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="feedbackScore" 
              stroke="var(--color-feedbackScore)" 
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={{ fill: 'var(--color-feedbackScore)', strokeWidth: 1, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหาชื่อหรือรหัสพนักงาน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="แผนก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">แผนกทั้งหมด</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="เลือกพนักงานเพื่อดูกราฟ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">ไม่เลือก</SelectItem>
                {filteredReports.map(report => (
                  <SelectItem key={report.employeeId} value={report.employeeId}>
                    {report.employeeName} ({report.employeeId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Individual Chart */}
      {selectedEmployeeData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                แนวโน้มคะแนน - {selectedEmployeeData.employeeName}
              </CardTitle>
              <CardDescription>
                {selectedEmployeeData.department} | {selectedEmployeeData.position}
                <div className="flex items-center gap-2 mt-2">
                  <span>แนวโน้ม:</span>
                  {getTrendIcon(selectedEmployeeData.trend)}
                  <span className={getTrendColorClass(selectedEmployeeData.trend)}>
                    {selectedEmployeeData.trend === 'improving' ? 'มีการปรับปรุง' :
                     selectedEmployeeData.trend === 'declining' ? 'มีการลดลง' : 'คงที่'}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getTrendChart(selectedEmployeeData.appraisals)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>สรุปคะแนน</CardTitle>
              <CardDescription>ข้อมูลสรุปการประเมินของพนักงาน</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">คะแนนเฉลี่ย:</span>
                  <Badge className={`${getScoreBgColorClass(selectedEmployeeData.averageScore)} ${getScoreColorClass(selectedEmployeeData.averageScore)}`}>
                    {selectedEmployeeData.averageScore.toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">จำนวนรอบประเมิน:</span>
                  <span className="font-medium">{selectedEmployeeData.appraisals.length} รอบ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">แนวโน้ม:</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(selectedEmployeeData.trend)}
                    <span className={getTrendColorClass(selectedEmployeeData.trend)}>
                      {selectedEmployeeData.trend === 'improving' ? 'มีการปรับปรุง' :
                       selectedEmployeeData.trend === 'declining' ? 'มีการลดลง' : 'คงที่'}
                    </span>
                  </div>
                </div>
                
                {selectedEmployeeData.appraisals.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">ประวัติการประเมิน:</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedEmployeeData.appraisals
                        .sort((a, b) => b.date.getTime() - a.date.getTime())
                        .map((appraisal, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{appraisal.cycleName}</span>
                          <Badge variant="outline" className={getScoreColorClass(appraisal.finalScore)}>
                            {appraisal.finalScore.toFixed(2)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายงานสรุปผลการประเมินรายบุคคล</CardTitle>
          <CardDescription>ข้อมูลสรุปการประเมินของพนักงานทุกคน</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>พนักงาน</TableHead>
                <TableHead>แผนก</TableHead>
                <TableHead>ตำแหน่ง</TableHead>
                <TableHead className="text-center">จำนวนรอบ</TableHead>
                <TableHead className="text-center">คะแนนเฉลี่ย</TableHead>
                <TableHead className="text-center">คะแนนล่าสุด</TableHead>
                <TableHead className="text-center">แนวโน้ม</TableHead>
                <TableHead className="text-center">การจัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports
                .sort((a, b) => b.averageScore - a.averageScore)
                .map((report) => {
                  const latestAppraisal = report.appraisals
                    .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
                  
                  return (
                    <TableRow key={report.employeeId}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.employeeName}</div>
                          <div className="text-sm text-gray-500">{report.employeeId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{report.department}</TableCell>
                      <TableCell>{report.position}</TableCell>
                      <TableCell className="text-center">{report.appraisals.length}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`${getScoreBgColorClass(report.averageScore)} ${getScoreColorClass(report.averageScore)}`}>
                          {report.averageScore.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {latestAppraisal ? (
                          <Badge variant="outline" className={getScoreColorClass(latestAppraisal.finalScore)}>
                            {latestAppraisal.finalScore.toFixed(2)}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getTrendIcon(report.trend)}
                          <span className={`text-xs ${getTrendColorClass(report.trend)}`}>
                            {report.trend === 'improving' ? 'ปรับปรุง' :
                             report.trend === 'declining' ? 'ลดลง' : 'คงที่'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <button
                          onClick={() => setSelectedEmployee(report.employeeId)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          ดูกราฟ
                        </button>
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

export default IndividualReportComponent;
