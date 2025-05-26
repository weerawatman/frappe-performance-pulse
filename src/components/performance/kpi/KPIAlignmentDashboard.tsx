
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Building, 
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { mockCorporateKPIData, calculateOverallAchievement } from '@/data/mockCorporateKPI';

// Mock data for President and VP KPIs
const mockPresidentKPI = [
  {
    id: 'PRES-001',
    category: 'Overall Performance',
    name: 'Company Revenue Growth',
    description: 'เติบโตรายได้บริษัทรวม',
    target: '15% YoY Growth',
    weight: 25,
    alignment_score: 95,
    related_corporate_kpis: ['1', '2', '3'], // References to corporate KPI IDs
    current_achievement: 87.5
  },
  {
    id: 'PRES-002',
    category: 'Strategic Excellence',
    name: 'New Business Development',
    description: 'พัฒนาธุรกิจใหม่และขยายตลาด',
    target: '3 New Business Lines',
    weight: 20,
    alignment_score: 88,
    related_corporate_kpis: ['11', '12', '13', '14', '15'],
    current_achievement: 75.0
  },
  {
    id: 'PRES-003',
    category: 'Operational Excellence',
    name: 'Customer Satisfaction',
    description: 'ความพึงพอใจลูกค้าโดยรวม',
    target: '>95% Customer Satisfaction',
    weight: 15,
    alignment_score: 92,
    related_corporate_kpis: ['5', '6', '7'],
    current_achievement: 94.2
  },
  {
    id: 'PRES-004',
    category: 'People & Culture',
    name: 'Organization Transformation',
    description: 'การเปลี่ยนแปลงองค์กรและวัฒนธรรม',
    target: 'SMART Culture Implementation',
    weight: 25,
    alignment_score: 90,
    related_corporate_kpis: ['16', '17', '18', '19'],
    current_achievement: 85.8
  },
  {
    id: 'PRES-005',
    category: 'Sustainability',
    name: 'ESG Performance',
    description: 'ผลการดำเนินงานด้าน ESG',
    target: 'ESG Score >80',
    weight: 15,
    alignment_score: 85,
    related_corporate_kpis: ['8', '9', '10'],
    current_achievement: 82.0
  }
];

const mockVPKPIs = [
  {
    vp_name: 'VP Sales & Marketing',
    department: 'Sales & Marketing',
    kpis: [
      {
        id: 'VP1-001',
        name: 'Sales Revenue Achievement',
        target: '7,108 MB Net Sales',
        weight: 40,
        alignment_score: 95,
        related_president_kpis: ['PRES-001'],
        related_corporate_kpis: ['1'],
        current_achievement: 87.2
      },
      {
        id: 'VP1-002', 
        name: 'Customer Retention',
        target: 'Maintain 597MB LOI',
        weight: 30,
        alignment_score: 88,
        related_president_kpis: ['PRES-003'],
        related_corporate_kpis: ['4', '5'],
        current_achievement: 85.0
      },
      {
        id: 'VP1-003',
        name: 'Market Expansion',
        target: 'New LOI 316 MB',
        weight: 30,
        alignment_score: 82,
        related_president_kpis: ['PRES-002'],
        related_corporate_kpis: ['4'],
        current_achievement: 75.5
      }
    ]
  },
  {
    vp_name: 'VP Operations',
    department: 'Operations',
    kpis: [
      {
        id: 'VP2-001',
        name: 'Production Efficiency',
        target: 'ICR >98%',
        weight: 35,
        alignment_score: 92,
        related_president_kpis: ['PRES-003'],
        related_corporate_kpis: ['5'],
        current_achievement: 96.5
      },
      {
        id: 'VP2-002',
        name: 'Quality Performance',
        target: 'QD Score 100%',
        weight: 35,
        alignment_score: 90,
        related_president_kpis: ['PRES-003'],
        related_corporate_kpis: ['6'],
        current_achievement: 98.0
      },
      {
        id: 'VP2-003',
        name: 'Process Improvement',
        target: 'Cost Saving 8MB',
        weight: 30,
        alignment_score: 85,
        related_president_kpis: ['PRES-001'],
        related_corporate_kpis: ['20'],
        current_achievement: 87.5
      }
    ]
  },
  {
    vp_name: 'VP Finance',
    department: 'Finance',
    kpis: [
      {
        id: 'VP3-001',
        name: 'Profit Margin',
        target: '8.90% Net Profit Margin',
        weight: 50,
        alignment_score: 95,
        related_president_kpis: ['PRES-001'],
        related_corporate_kpis: ['3'],
        current_achievement: 91.0
      },
      {
        id: 'VP3-002',
        name: 'Gross Margin',
        target: '18.70% Gross Margin',
        weight: 30,
        alignment_score: 93,
        related_president_kpis: ['PRES-001'],
        related_corporate_kpis: ['2'],
        current_achievement: 93.6
      },
      {
        id: 'VP3-003',
        name: 'Financial Control',
        target: 'Budget Variance <5%',
        weight: 20,
        alignment_score: 88,
        related_president_kpis: ['PRES-001'],
        related_corporate_kpis: ['1', '2', '3'],
        current_achievement: 92.0
      }
    ]
  },
  {
    vp_name: 'VP Human Resources',
    department: 'Human Resources',
    kpis: [
      {
        id: 'VP4-001',
        name: 'People Efficiency',
        target: '0.33 MB Net Profit/Employee',
        weight: 30,
        alignment_score: 92,
        related_president_kpis: ['PRES-004'],
        related_corporate_kpis: ['16'],
        current_achievement: 90.9
      },
      {
        id: 'VP4-002',
        name: 'Employee Development',
        target: 'Level C >80%',
        weight: 25,
        alignment_score: 90,
        related_president_kpis: ['PRES-004'],
        related_corporate_kpis: ['17'],
        current_achievement: 92.0
      },
      {
        id: 'VP4-003',
        name: 'Culture Transformation',
        target: 'SMART ≥4.0, Satisfaction >80%',
        weight: 25,
        alignment_score: 88,
        related_president_kpis: ['PRES-004'],
        related_corporate_kpis: ['18'],
        current_achievement: 92.0
      },
      {
        id: 'VP4-004',
        name: 'Succession Planning',
        target: '100% Successor Plan',
        weight: 20,
        alignment_score: 85,
        related_president_kpis: ['PRES-004'],
        related_corporate_kpis: ['19'],
        current_achievement: 90.0
      }
    ]
  },
  {
    vp_name: 'VP Technology & Innovation',
    department: 'Technology',
    kpis: [
      {
        id: 'VP5-001',
        name: 'Digital Transformation',
        target: 'ERP S4/Hana Go Live',
        weight: 40,
        alignment_score: 88,
        related_president_kpis: ['PRES-002'],
        related_corporate_kpis: ['20'],
        current_achievement: 85.0
      },
      {
        id: 'VP5-002',
        name: 'Innovation Projects',
        target: 'B2 JV/MOU 1 Project',
        weight: 35,
        alignment_score: 75,
        related_president_kpis: ['PRES-002'],
        related_corporate_kpis: ['11'],
        current_achievement: 60.0
      },
      {
        id: 'VP5-003',
        name: 'System Security',
        target: 'Zero Security Incidents',
        weight: 25,
        alignment_score: 95,
        related_president_kpis: ['PRES-004'],
        related_corporate_kpis: ['10'],
        current_achievement: 100.0
      }
    ]
  }
];

const getAlignmentStatus = (score: number) => {
  if (score >= 90) return { status: 'High', color: 'bg-green-100 text-green-800', icon: CheckCircle };
  if (score >= 75) return { status: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
  return { status: 'Low', color: 'bg-red-100 text-red-800', icon: XCircle };
};

const KPIAlignmentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const overallCorporateAchievement = calculateOverallAchievement();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">KPI Alignment Dashboard</h2>
            <p className="text-gray-600 mt-2">ติดตามความสอดคล้องของ KPI ในแต่ละระดับขององค์กร</p>
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
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Corporate KPIs</p>
                <p className="text-2xl font-bold text-gray-900">{mockCorporateKPIData.length}</p>
                <p className="text-sm text-gray-500">{overallCorporateAchievement.toFixed(1)}% เฉลี่ย</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">President KPIs</p>
                <p className="text-2xl font-bold text-gray-900">{mockPresidentKPI.length}</p>
                <p className="text-sm text-gray-500">
                  {(mockPresidentKPI.reduce((sum, kpi) => sum + kpi.alignment_score, 0) / mockPresidentKPI.length).toFixed(1)}% alignment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">VP KPIs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockVPKPIs.reduce((total, vp) => total + vp.kpis.length, 0)}
                </p>
                <p className="text-sm text-gray-500">5 VPs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Alignment</p>
                <p className="text-2xl font-bold text-gray-900">89.2%</p>
                <p className="text-sm text-green-600">↑ 2.5% จากเดือนที่แล้ว</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
          <TabsTrigger value="president">President Level</TabsTrigger>
          <TabsTrigger value="vp">VP Level</TabsTrigger>
          <TabsTrigger value="matrix">Alignment Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Corporate KPI Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>KPI Name</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCorporateKPIData.slice(0, 10).map((kpi) => (
                    <TableRow key={kpi.id}>
                      <TableCell className="font-medium">{kpi.category}</TableCell>
                      <TableCell>{kpi.name}</TableCell>
                      <TableCell>{kpi.target}</TableCell>
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
        </TabsContent>

        <TabsContent value="president" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>President KPI Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>KPI Name</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Alignment Score</TableHead>
                    <TableHead>Related Corporate KPIs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPresidentKPI.map((kpi) => (
                    <TableRow key={kpi.id}>
                      <TableCell className="font-medium">{kpi.category}</TableCell>
                      <TableCell>{kpi.name}</TableCell>
                      <TableCell>{kpi.target}</TableCell>
                      <TableCell>{kpi.weight}%</TableCell>
                      <TableCell>{kpi.current_achievement.toFixed(1)}%</TableCell>
                      <TableCell>
                        <Badge className={getAlignmentStatus(kpi.alignment_score).color}>
                          {kpi.alignment_score}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {kpi.related_corporate_kpis.map((corpId) => (
                            <Badge key={corpId} variant="outline" className="text-xs">
                              Corp-{corpId}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vp" className="mt-6">
          <div className="space-y-6">
            {mockVPKPIs.map((vp) => (
              <Card key={vp.vp_name}>
                <CardHeader>
                  <CardTitle>{vp.vp_name} - {vp.department}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>KPI Name</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Achievement</TableHead>
                        <TableHead>Alignment</TableHead>
                        <TableHead>Related KPIs</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vp.kpis.map((kpi) => (
                        <TableRow key={kpi.id}>
                          <TableCell className="font-medium">{kpi.name}</TableCell>
                          <TableCell>{kpi.target}</TableCell>
                          <TableCell>{kpi.weight}%</TableCell>
                          <TableCell>{kpi.current_achievement.toFixed(1)}%</TableCell>
                          <TableCell>
                            <Badge className={getAlignmentStatus(kpi.alignment_score).color}>
                              {kpi.alignment_score}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {kpi.related_president_kpis.map((presId) => (
                                <Badge key={presId} variant="outline" className="text-xs bg-blue-50">
                                  Pres
                                </Badge>
                              ))}
                              {kpi.related_corporate_kpis.map((corpId) => (
                                <Badge key={corpId} variant="outline" className="text-xs bg-green-50">
                                  Corp-{corpId}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>KPI Alignment Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  KPI Alignment Matrix
                </h3>
                <p className="text-gray-500">
                  แสดงความเชื่อมโยงและความสอดคล้องของ KPI ในแต่ละระดับขององค์กร
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  (ฟีเจอร์นี้จะพร้อมใช้งานเร็วๆ นี้)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KPIAlignmentDashboard;
