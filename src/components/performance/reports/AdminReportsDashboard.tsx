
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer } from '@/components/ui/chart';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  FileText,
  Download,
  RefreshCw,
  Settings
} from 'lucide-react';
import PerformanceOverviewDashboard from './PerformanceOverviewDashboard';
import DepartmentReportComponent from './DepartmentReport';
import PositionReportComponent from './PositionReport';
import ReportFiltersPanel from './ReportFiltersPanel';
import { ReportFilters } from '@/types/reports';
import { 
  generateDepartmentReports, 
  generatePositionReports,
  generateCycleReports,
  generateIndividualReports,
  generateKRAReports
} from '@/utils/reportUtils';
import usePerformanceData from '@/hooks/usePerformanceData';

// Mock data for demonstration
const mockEmployees = [
  { id: '1', name: 'สมชาย ใจดี', department: 'ฝ่ายขาย', position: 'Sales Executive', email: 'somchai@company.com', manager_id: '2', join_date: new Date('2022-01-15'), employee_id: 'EMP001' },
  { id: '2', name: 'สมหญิง ดีใจ', department: 'ฝ่ายขาย', position: 'Sales Manager', email: 'somying@company.com', manager_id: '3', join_date: new Date('2020-03-10'), employee_id: 'EMP002' },
  { id: '3', name: 'สมศักดิ์ รัก', department: 'ฝ่ายทรัพยากรบุคคล', position: 'HR Manager', email: 'somsak@company.com', manager_id: undefined, join_date: new Date('2019-06-01'), employee_id: 'EMP003' },
  { id: '4', name: 'สมใจ ดี', department: 'ฝ่ายไอที', position: 'Software Developer', email: 'somjai@company.com', manager_id: '5', join_date: new Date('2021-08-20'), employee_id: 'EMP004' },
  { id: '5', name: 'สมพร ใหม่', department: 'ฝ่ายไอที', position: 'IT Manager', email: 'somporn@company.com', manager_id: '3', join_date: new Date('2018-11-12'), employee_id: 'EMP005' },
];

const mockCycles = [
  { id: '1', name: 'การประเมินกลางปี 2024', start_date: new Date('2024-01-01'), end_date: new Date('2024-06-30') },
  { id: '2', name: 'การประเมินปลายปี 2024', start_date: new Date('2024-07-01'), end_date: new Date('2024-12-31') },
];

const AdminReportsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState<ReportFilters>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { appraisals, cycles } = usePerformanceData();

  // Generate mock appraisals for demonstration
  const mockAppraisals = useMemo(() => [
    {
      id: '1',
      employee_id: '1',
      employee_name: 'สมชาย ใจดี',
      department: 'ฝ่ายขาย',
      appraisal_cycle_id: '1',
      appraisal_template_id: '1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-06-30'),
      status: 'Completed' as const,
      rate_goals_manually: false,
      appraisal_kra: [],
      goals: [],
      self_ratings: [],
      total_score: 88.5,
      self_score: 85,
      avg_feedback_score: 87,
      final_score: 88.5,
      submitted_by_employee: true,
      submitted_date: new Date('2024-06-15'),
      reviewed_by_manager: true,
      reviewed_date: new Date('2024-06-20'),
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-06-20')
    },
    {
      id: '2',
      employee_id: '2',
      employee_name: 'สมหญิง ดีใจ',
      department: 'ฝ่ายขาย',
      appraisal_cycle_id: '1',
      appraisal_template_id: '1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-06-30'),
      status: 'Completed' as const,
      rate_goals_manually: false,
      appraisal_kra: [],
      goals: [],
      self_ratings: [],
      total_score: 92.3,
      self_score: 90,
      avg_feedback_score: 94,
      final_score: 92.3,
      submitted_by_employee: true,
      submitted_date: new Date('2024-06-10'),
      reviewed_by_manager: true,
      reviewed_date: new Date('2024-06-15'),
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-06-15')
    },
    {
      id: '3',
      employee_id: '3',
      employee_name: 'สมศักดิ์ รัก',
      department: 'ฝ่ายทรัพยากรบุคคล',
      appraisal_cycle_id: '1',
      appraisal_template_id: '1',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-06-30'),
      status: 'Completed' as const,
      rate_goals_manually: false,
      appraisal_kra: [],
      goals: [],
      self_ratings: [],
      total_score: 85.7,
      self_score: 83,
      avg_feedback_score: 88,
      final_score: 85.7,
      submitted_by_employee: true,
      submitted_date: new Date('2024-06-12'),
      reviewed_by_manager: true,
      reviewed_date: new Date('2024-06-18'),
      created_at: new Date('2024-01-01'),
      modified_at: new Date('2024-06-18')
    }
  ], []);

  // Generate reports
  const departmentReports = useMemo(() => 
    generateDepartmentReports(mockAppraisals, mockEmployees), 
    [mockAppraisals]
  );

  const positionReports = useMemo(() => 
    generatePositionReports(mockAppraisals, mockEmployees), 
    [mockAppraisals]
  );

  // Overview statistics
  const overviewStats = useMemo(() => {
    const completedAppraisals = mockAppraisals.filter(a => a.status === 'Completed');
    const totalScore = completedAppraisals.reduce((sum, a) => sum + a.final_score, 0);
    const achievedCount = completedAppraisals.filter(a => a.final_score >= 80).length;

    return {
      totalEmployees: mockEmployees.length,
      kpiAssignedEmployees: mockEmployees.length, // Assuming all have KPI
      completedEvaluations: completedAppraisals.length,
      avgKpiBonusScore: completedAppraisals.length > 0 ? totalScore / completedAppraisals.length : 0,
      avgKpiMeritScore: completedAppraisals.length > 0 ? totalScore / completedAppraisals.length : 0,
      kpiAchievementRate: completedAppraisals.length > 0 ? (achievedCount / completedAppraisals.length) * 100 : 0,
      pendingEvaluations: mockEmployees.length - completedAppraisals.length
    };
  }, [mockAppraisals]);

  // Trend data
  const trendData = [
    { period: 'Q1 2024', kpiBonus: 82.5, kpiMerit: 84.2, achievementRate: 75.3 },
    { period: 'Q2 2024', kpiBonus: 85.1, kpiMerit: 86.8, achievementRate: 78.9 },
    { period: 'Q3 2024', kpiBonus: 87.3, kpiMerit: 88.5, achievementRate: 82.1 },
    { period: 'Q4 2024', kpiBonus: overviewStats.avgKpiBonusScore, kpiMerit: overviewStats.avgKpiMeritScore, achievementRate: overviewStats.kpiAchievementRate }
  ];

  // Distribution data
  const distributionData = [
    { level: 'ดีเยี่ยม (90+)', count: 1, percentage: 33.33, color: '#16a34a' },
    { level: 'ดี (80-89)', count: 2, percentage: 66.67, color: '#2563eb' },
    { level: 'ปานกลาง (70-79)', count: 0, percentage: 0, color: '#eab308' },
    { level: 'ต้องปรับปรุง (<70)', count: 0, percentage: 0, color: '#dc2626' }
  ];

  // Available filter options
  const availableDepartments = [...new Set(mockEmployees.map(e => e.department))];
  const availablePositions = [...new Set(mockEmployees.map(e => e.position))];
  const availableCycles = mockCycles.map(c => ({ id: c.id, name: c.name }));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExportPDF = () => {
    console.log('Exporting to PDF...');
    // Implement PDF export logic
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
    // Implement Excel export logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ระบบรายงานผลการประเมิน</h1>
              <p className="text-gray-600 mt-2">ติดตามและวิเคราะห์ผลการประเมิน KPI ของพนักงานในองค์กร</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'กำลังอัปเดต...' : 'อัปเดต'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <ReportFiltersPanel
              filters={filters}
              onFiltersChange={setFilters}
              availableDepartments={availableDepartments}
              availablePositions={availablePositions}
              availableCycles={availableCycles}
              onExportPDF={handleExportPDF}
              onExportExcel={handleExportExcel}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  ภาพรวม
                </TabsTrigger>
                <TabsTrigger value="department" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  แผนก
                </TabsTrigger>
                <TabsTrigger value="position" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  ตำแหน่ง
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  วิเคราะห์
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <PerformanceOverviewDashboard
                  stats={overviewStats}
                  trendData={trendData}
                  distributionData={distributionData}
                />
              </TabsContent>

              <TabsContent value="department" className="mt-6">
                <DepartmentReportComponent reports={departmentReports} />
              </TabsContent>

              <TabsContent value="position" className="mt-6">
                <PositionReportComponent reports={positionReports} />
              </TabsContent>

              <TabsContent value="analysis" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      การวิเคราะห์เชิงลึก
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        ฟีเจอร์การวิเคราะห์เชิงลึก
                      </h3>
                      <p className="text-gray-500">
                        รายงานการวิเคราะห์ KPI, Competency และ Culture จะพร้อมใช้งานเร็วๆ นี้
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsDashboard;
