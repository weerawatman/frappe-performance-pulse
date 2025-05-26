
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Target, Users, Award, Building, TrendingUp, FileText, BarChart, ArrowLeft, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PerformanceDashboard from '@/components/performance/PerformanceDashboard';
import CorporateKPIManager from '@/components/admin/CorporateKPIManager';
import { mockCorporateKPIData, calculateOverallAchievement } from '@/data/mockCorporateKPI';

const getAlignmentStatus = (score: number) => {
  if (score >= 90) return { status: 'High', color: 'bg-green-100 text-green-800', icon: CheckCircle };
  if (score >= 75) return { status: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
  return { status: 'Low', color: 'bg-red-100 text-red-800', icon: XCircle };
};

const DashboardPage = () => {
  const overallCorporateAchievement = calculateOverallAchievement();
  const totalCorporateWeight = mockCorporateKPIData.reduce((sum, kpi) => sum + kpi.weight, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">ภาพรวมการจัดการประสิทธิภาพองค์กร ปี 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <Calendar className="w-4 h-4 mr-2" />
              ปี 2025
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              <Building className="w-4 h-4 mr-1" /> Admin
            </Badge>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">พนักงานทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+12% จากปีที่แล้ว</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Corporate KPIs</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCorporateKPIData.length}</div>
              <p className="text-xs text-muted-foreground">{overallCorporateAchievement.toFixed(1)}% เฉลี่ย</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">การประเมิน</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">เสร็จสิ้นแล้ว</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">คะแนนเฉลี่ย</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-xs text-muted-foreground">จาก 5.0</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="corporate-kpi" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="corporate-kpi" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Corporate KPI
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Performance Overview
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="corporate-kpi">
            <div className="space-y-6">
              {/* Corporate KPI Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Corporate KPI Overview</CardTitle>
                    <Badge variant="outline" className="text-sm">
                      Total Weight: {totalCorporateWeight}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>KPI Name</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Weight (%)</TableHead>
                        <TableHead>Achievement (%)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCorporateKPIData.map((kpi) => (
                        <TableRow key={kpi.id}>
                          <TableCell className="font-medium">{kpi.category}</TableCell>
                          <TableCell>{kpi.name}</TableCell>
                          <TableCell className="text-sm">{kpi.target}</TableCell>
                          <TableCell>{kpi.weight}%</TableCell>
                          <TableCell>{kpi.achievement_percentage?.toFixed(1)}%</TableCell>
                          <TableCell>
                            <Badge 
                              className={getAlignmentStatus(kpi.achievement_percentage || 0).color}
                            >
                              {getAlignmentStatus(kpi.achievement_percentage || 0).status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Corporate KPI Manager */}
              <CorporateKPIManager />
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceDashboard />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>รายงานการประเมินผลงาน</CardTitle>
                <CardDescription>รายงานสรุปผลการประเมินประสิทธิภาพ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link to="/admin/reports">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <FileText className="w-6 h-6 mb-2" />
                      รายงานผู้บริหาร
                    </Button>
                  </Link>
                  <Link to="/reports">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <BarChart className="w-6 h-6 mb-2" />
                      รายงานทั่วไป
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-20 flex-col">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    แดชบอร์ด KPI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
