
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart,
  BarChart3, 
  PieChart, 
  TrendingUp,
  LineChart,
  CircleDollarSign,
  Users,
  Building,
  Award,
  BriefcaseBusiness
} from 'lucide-react';
import { 
  mockCorporateKPIData, 
  getKPICategories, 
  getCorporateKPIByCategory,
  calculateOverallAchievement
} from '@/data/mockCorporateKPI';
import { ChartContainer } from '@/components/ui/chart';
import { 
  Bar, 
  BarChart as RechartsBarChart,
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const CorporateKPIDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const categories = getKPICategories();
  const overallAchievement = calculateOverallAchievement();

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Finance':
        return <CircleDollarSign className="w-5 h-5" />;
      case 'Customer':
        return <Users className="w-5 h-5" />;
      case 'Strategic Execution & Internal Process Improvement':
        return <TrendingUp className="w-5 h-5" />;
      case 'Organization & People Mgmt':
        return <BriefcaseBusiness className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getStatusColor = (percentage?: number) => {
    if (!percentage) return 'text-gray-500';
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 85) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage?: number) => {
    if (!percentage) return 'bg-gray-200';
    if (percentage >= 95) return 'bg-green-500';
    if (percentage >= 85) return 'bg-blue-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Prepare data for the achievement by category chart
  const categoryAchievementData = categories.map(category => {
    const items = getCorporateKPIByCategory(category);
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const weightedAchievement = items.reduce(
      (sum, item) => sum + (item.weight * (item.achievement_percentage || 0)), 
      0
    );
    
    return {
      name: category === 'Strategic Execution & Internal Process Improvement' ? 'Strategic & Process' : 
            category === 'Organization & People Mgmt' ? 'Organization & People' : category,
      achievement: +(weightedAchievement / totalWeight).toFixed(2)
    };
  });

  // Data for pie chart
  const pieData = [
    { name: 'Finance', value: 45, fill: '#8884d8' },
    { name: 'Customer', value: 30, fill: '#82ca9d' },
    { name: 'Strategic & Process', value: 43, fill: '#ffc658' },
    { name: 'Organization & People', value: 42, fill: '#ff7300' }
  ];

  // COLORS for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">ความสำเร็จโดยรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold text-gray-900">{overallAchievement.toFixed(2)}%</div>
              <Badge className={`${overallAchievement >= 85 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {overallAchievement >= 95 ? 'ดีเยี่ยม' : 
                 overallAchievement >= 85 ? 'ดีมาก' : 
                 overallAchievement >= 70 ? 'ดี' : 'ต้องปรับปรุง'}
              </Badge>
            </div>
            <Progress 
              value={overallAchievement} 
              className="h-2 mt-2"
              indicatorClassName={getProgressColor(overallAchievement)}
            />
            <div className="text-xs text-gray-500 mt-2">
              คำนวณจากค่าเฉลี่ยถ่วงน้ำหนักของ KPI ทั้งหมด
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">ด้านการเงิน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CircleDollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">
                {getCorporateKPIByCategory('Finance').length}
              </span>
              <span className="text-sm text-gray-500">KPIs</span>
            </div>
            <div className="mt-2 text-sm">
              สำเร็จแล้ว{' '}
              <span className="font-medium text-blue-600">
                {getCorporateKPIByCategory('Finance').filter(k => (k.achievement_percentage || 0) >= 80).length}
              </span>
              {' '}รายการ
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">ด้านลูกค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">
                {getCorporateKPIByCategory('Customer').length}
              </span>
              <span className="text-sm text-gray-500">KPIs</span>
            </div>
            <div className="mt-2 text-sm">
              สำเร็จแล้ว{' '}
              <span className="font-medium text-green-600">
                {getCorporateKPIByCategory('Customer').filter(k => (k.achievement_percentage || 0) >= 80).length}
              </span>
              {' '}รายการ
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">ด้านกระบวนการ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
              <span className="text-3xl font-bold text-gray-900">
                {getCorporateKPIByCategory('Strategic Execution & Internal Process Improvement').length}
              </span>
              <span className="text-sm text-gray-500">KPIs</span>
            </div>
            <div className="mt-2 text-sm">
              สำเร็จแล้ว{' '}
              <span className="font-medium text-yellow-600">
                {getCorporateKPIByCategory('Strategic Execution & Internal Process Improvement')
                  .filter(k => (k.achievement_percentage || 0) >= 80).length}
              </span>
              {' '}รายการ
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Corporate KPI Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="overall" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> ภาพรวม
              </TabsTrigger>
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className="flex items-center gap-2"
                >
                  {getCategoryIcon(category)}
                  {category === 'Strategic Execution & Internal Process Improvement' ? 'กระบวนการ' :
                   category === 'Organization & People Mgmt' ? 'องค์กร' : category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overall Tab */}
            <TabsContent value="overall">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Achievement By Category Chart */}
                <ChartContainer title="ผลการดำเนินงานตามหมวดหมู่" description="แสดงเปอร์เซ็นต์ความสำเร็จโดยเฉลี่ยในแต่ละหมวดหมู่">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart
                      data={categoryAchievementData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="achievement" name="ความสำเร็จ (%)" fill="#8884d8" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                {/* KPI Weight Distribution */}
                <ChartContainer title="การกระจายน้ำหนัก KPI" description="การกระจายน้ำหนักตามหมวดหมู่">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Summary Table */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">สรุป KPI ทั้งหมด</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>หมวดหมู่</TableHead>
                        <TableHead>จำนวน KPI</TableHead>
                        <TableHead className="text-center">สำเร็จ (≥80%)</TableHead>
                        <TableHead className="text-center">ปานกลาง (50-79%)</TableHead>
                        <TableHead className="text-center">ต้องปรับปรุง (<50%)</TableHead>
                        <TableHead className="text-center">ความสำเร็จเฉลี่ย</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map(category => {
                        const items = getCorporateKPIByCategory(category);
                        const excellentCount = items.filter(k => (k.achievement_percentage || 0) >= 80).length;
                        const mediumCount = items.filter(k => (k.achievement_percentage || 0) >= 50 && (k.achievement_percentage || 0) < 80).length;
                        const poorCount = items.filter(k => (k.achievement_percentage || 0) < 50).length;
                        const avgAchievement = items.reduce((sum, item) => sum + (item.achievement_percentage || 0), 0) / items.length;
                        
                        return (
                          <TableRow key={category}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {getCategoryIcon(category)}
                                <span className="ml-2">
                                  {category === 'Strategic Execution & Internal Process Improvement' ? 'กระบวนการภายใน' :
                                   category === 'Organization & People Mgmt' ? 'องค์กรและบุคลากร' :
                                   category === 'Finance' ? 'การเงิน' :
                                   category === 'Customer' ? 'ลูกค้า' : category}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{items.length}</TableCell>
                            <TableCell className="text-center">
                              <span className="font-medium text-green-600">{excellentCount}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="font-medium text-yellow-600">{mediumCount}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="font-medium text-red-600">{poorCount}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge className={getStatusColor(avgAchievement)}>
                                {avgAchievement.toFixed(2)}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Category Tabs */}
            {categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium flex items-center">
                    {getCategoryIcon(category)}
                    <span className="ml-2">
                      {category === 'Strategic Execution & Internal Process Improvement' ? 'กระบวนการภายในและการพัฒนากลยุทธ์' :
                       category === 'Organization & People Mgmt' ? 'การจัดการองค์กรและบุคลากร' : category}
                    </span>
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>KPI</TableHead>
                          <TableHead>เป้าหมาย</TableHead>
                          <TableHead>ผลปัจจุบัน</TableHead>
                          <TableHead className="text-center">น้ำหนัก</TableHead>
                          <TableHead className="text-center">ความสำเร็จ</TableHead>
                          <TableHead className="text-center">สถานะ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getCorporateKPIByCategory(category).map(item => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div>{item.name}</div>
                                <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                              </div>
                            </TableCell>
                            <TableCell>{item.target}</TableCell>
                            <TableCell>{item.current_value || 'N/A'}</TableCell>
                            <TableCell className="text-center">{item.weight}%</TableCell>
                            <TableCell className="text-center">
                              <div className="flex flex-col items-center">
                                <span className={`font-medium ${getStatusColor(item.achievement_percentage)}`}>
                                  {item.achievement_percentage?.toFixed(2)}%
                                </span>
                                <Progress 
                                  value={item.achievement_percentage} 
                                  className="h-1.5 mt-1 w-16"
                                  indicatorClassName={getProgressColor(item.achievement_percentage)}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              {(item.achievement_percentage || 0) >= 80 ? (
                                <Badge className="bg-green-100 text-green-800">สำเร็จ</Badge>
                              ) : (item.achievement_percentage || 0) >= 50 ? (
                                <Badge className="bg-yellow-100 text-yellow-800">ปานกลาง</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800">ต่ำ</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorporateKPIDashboard;
