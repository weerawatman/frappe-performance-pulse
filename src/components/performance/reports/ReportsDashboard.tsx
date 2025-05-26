
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Building2, Users, Target, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { performanceService } from '@/services/performanceService';
import { 
  generateDepartmentReports,
  generatePositionReports,
  generateCycleReports,
  generateIndividualReports,
  generateKRAReports
} from '@/utils/reportUtils';
import DepartmentReportComponent from './DepartmentReport';
import PositionReportComponent from './PositionReport';
import CycleReportComponent from './CycleReport';
import IndividualReportComponent from './IndividualReport';
import KRAReportComponent from './KRAReport';

const ReportsDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Get data from service
  const appraisals = performanceService.getAppraisals();
  const employees = performanceService.getEmployees();
  const cycles = performanceService.getCycles();
  const templates = performanceService.getTemplates();

  // Generate reports
  const departmentReports = generateDepartmentReports(appraisals, employees);
  const positionReports = generatePositionReports(appraisals, employees);
  const cycleReports = generateCycleReports(appraisals, cycles);
  const individualReports = generateIndividualReports(appraisals, employees, cycles);
  const kraReports = generateKRAReports(appraisals, cycles);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Simulate refresh delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    // This would implement actual export functionality
    console.log('Exporting reports...');
  };

  const totalAppraisals = appraisals.length;
  const completedAppraisals = appraisals.filter(a => a.status === 'Completed').length;
  const activeCycles = cycles.filter(c => c.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายงานและการวิเคราะห์</h1>
          <p className="text-gray-600">ระบบรายงานการประเมินผลงานและการวิเคราะห์ข้อมูลเชิงลึก</p>
          <p className="text-sm text-gray-500 mt-1">
            อัปเดตล่าสุด: {lastUpdated.toLocaleString('th-TH')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            รีเฟรช
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">การประเมินทั้งหมด</p>
                <p className="text-2xl font-bold">{totalAppraisals}</p>
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
                <p className="text-sm font-medium text-gray-600">เสร็จสิ้นแล้ว</p>
                <p className="text-2xl font-bold">{completedAppraisals}</p>
                <p className="text-xs text-green-600">
                  {totalAppraisals > 0 ? ((completedAppraisals / totalAppraisals) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">แผนกทั้งหมด</p>
                <p className="text-2xl font-bold">{departmentReports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">รอบที่ดำเนินการ</p>
                <p className="text-2xl font-bold">{activeCycles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            สถิติด่วน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{departmentReports.reduce((sum, r) => sum + r.excellentPerformers, 0)}</p>
              <p className="text-sm text-gray-600">ผู้มีผลงานยอดเยี่ยม</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{departmentReports.reduce((sum, r) => sum + r.goodPerformers, 0)}</p>
              <p className="text-sm text-gray-600">ผู้มีผลงานดี</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{departmentReports.reduce((sum, r) => sum + r.averagePerformers, 0)}</p>
              <p className="text-sm text-gray-600">ผลงานปานกลาง</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{departmentReports.reduce((sum, r) => sum + r.poorPerformers, 0)}</p>
              <p className="text-sm text-gray-600">ต้องปรับปรุง</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{kraReports.length}</p>
              <p className="text-sm text-gray-600">KRA ทั้งหมด</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Tabs */}
      <Tabs defaultValue="department" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="department" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            ตามแผนก
          </TabsTrigger>
          <TabsTrigger value="position" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            ตามตำแหน่ง
          </TabsTrigger>
          <TabsTrigger value="cycle" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            ตามรอบ
          </TabsTrigger>
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            รายบุคคล
          </TabsTrigger>
          <TabsTrigger value="kra" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            วิเคราะห์ KRA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="department" className="space-y-4">
          <DepartmentReportComponent reports={departmentReports} />
        </TabsContent>

        <TabsContent value="position" className="space-y-4">
          <PositionReportComponent reports={positionReports} />
        </TabsContent>

        <TabsContent value="cycle" className="space-y-4">
          <CycleReportComponent reports={cycleReports} />
        </TabsContent>

        <TabsContent value="individual" className="space-y-4">
          <IndividualReportComponent reports={individualReports} />
        </TabsContent>

        <TabsContent value="kra" className="space-y-4">
          <KRAReportComponent reports={kraReports} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsDashboard;
