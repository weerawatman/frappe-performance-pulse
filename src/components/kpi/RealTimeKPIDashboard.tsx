
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Bell,
  Eye,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface KPIData {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'on-track' | 'at-risk' | 'behind';
  lastUpdated: Date;
  forecast: number;
  riskLevel: 'low' | 'medium' | 'high';
  historicalData: { date: string; value: number }[];
}

const mockKPIData: KPIData[] = [
  {
    id: '1',
    name: 'ยอดขายรายเดือน',
    current: 2.8,
    target: 3.2,
    unit: 'ล้านบาท',
    trend: 'up',
    status: 'at-risk',
    lastUpdated: new Date(),
    forecast: 3.0,
    riskLevel: 'medium',
    historicalData: [
      { date: '01/01', value: 2.1 },
      { date: '01/07', value: 2.3 },
      { date: '01/14', value: 2.5 },
      { date: '01/21', value: 2.8 },
    ]
  },
  {
    id: '2',
    name: 'Customer Satisfaction',
    current: 4.2,
    target: 4.5,
    unit: '/5.0',
    trend: 'stable',
    status: 'at-risk',
    lastUpdated: new Date(),
    forecast: 4.3,
    riskLevel: 'medium',
    historicalData: [
      { date: '01/01', value: 4.1 },
      { date: '01/07', value: 4.0 },
      { date: '01/14', value: 4.2 },
      { date: '01/21', value: 4.2 },
    ]
  },
  {
    id: '3',
    name: 'ประสิทธิภาพการผลิต',
    current: 92,
    target: 95,
    unit: '%',
    trend: 'up',
    status: 'on-track',
    lastUpdated: new Date(),
    forecast: 94,
    riskLevel: 'low',
    historicalData: [
      { date: '01/01', value: 88 },
      { date: '01/07', value: 90 },
      { date: '01/14', value: 91 },
      { date: '01/21', value: 92 },
    ]
  },
  {
    id: '4',
    name: 'ต้นทุนต่อหน่วย',
    current: 45,
    target: 40,
    unit: 'บาท',
    trend: 'down',
    status: 'behind',
    lastUpdated: new Date(),
    forecast: 43,
    riskLevel: 'high',
    historicalData: [
      { date: '01/01', value: 48 },
      { date: '01/07', value: 47 },
      { date: '01/14', value: 46 },
      { date: '01/21', value: 45 },
    ]
  }
];

const RealTimeKPIDashboard: React.FC = () => {
  const [kpiData, setKpiData] = useState<KPIData[]>(mockKPIData);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setKpiData(prev => prev.map(kpi => ({
        ...kpi,
        current: kpi.current + (Math.random() - 0.5) * 0.1,
        lastUpdated: new Date()
      })));
      setLastRefresh(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastRefresh(new Date());
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const atRiskKPIs = kpiData.filter(kpi => kpi.status === 'at-risk' || kpi.status === 'behind');

  const pieData = [
    { name: 'ตามเป้า', value: kpiData.filter(k => k.status === 'on-track').length, color: '#10b981' },
    { name: 'เสี่ยง', value: kpiData.filter(k => k.status === 'at-risk').length, color: '#f59e0b' },
    { name: 'ต่ำกว่าเป้า', value: kpiData.filter(k => k.status === 'behind').length, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-time KPI Dashboard</h2>
          <p className="text-gray-600">ติดตามความคืบหน้า KPI แบบเรียลไทม์</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            อัปเดตล่าสุด: {lastRefresh.toLocaleTimeString('th-TH')}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            รีเฟรช
          </Button>
        </div>
      </div>

      {/* Alert for at-risk KPIs */}
      {atRiskKPIs.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span className="text-orange-800">
                มี {atRiskKPIs.length} KPI ที่มีความเสี่ยงต่อการไม่บรรลุเป้าหมาย
              </span>
              <Button size="sm" variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                ดูรายละเอียด
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
          <TabsTrigger value="trends">แนวโน้ม</TabsTrigger>
          <TabsTrigger value="forecast">การคาดการณ์</TabsTrigger>
          <TabsTrigger value="alerts">การแจ้งเตือน</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi) => (
              <Card key={kpi.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedKPI(kpi.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-700">{kpi.name}</CardTitle>
                    {getTrendIcon(kpi.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {kpi.current.toFixed(1)}{kpi.unit}
                      </span>
                      <Badge className={getStatusColor(kpi.status)}>
                        {kpi.status === 'on-track' ? 'ตามเป้า' : 
                         kpi.status === 'at-risk' ? 'เสี่ยง' : 'ต่ำกว่าเป้า'}
                      </Badge>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>เป้าหมาย: {kpi.target}{kpi.unit}</span>
                        <span>{getProgressPercentage(kpi.current, kpi.target).toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(kpi.current, kpi.target)} 
                        className="h-2"
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">ความเสี่ยง:</span>
                      <span className={`font-medium ${getRiskColor(kpi.riskLevel)}`}>
                        {kpi.riskLevel === 'low' ? 'ต่ำ' : 
                         kpi.riskLevel === 'medium' ? 'ปานกลาง' : 'สูง'}
                      </span>
                    </div>

                    <div className="text-xs text-gray-400">
                      อัปเดต: {kpi.lastUpdated.toLocaleTimeString('th-TH')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>สถานะ KPI ทั้งหมด</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPI เสี่ยงสูง</CardTitle>
              </CardHeader>
              <CardContent>
                {atRiskKPIs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                    <p>KPI ทั้งหมดอยู่ในเป้าหมาย</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {atRiskKPIs.map((kpi) => (
                      <div key={kpi.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{kpi.name}</p>
                          <p className="text-sm text-gray-600">
                            ปัจจุบัน: {kpi.current.toFixed(1)}{kpi.unit} / เป้าหมาย: {kpi.target}{kpi.unit}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>แนวโน้ม KPI</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedKPI ? (
                (() => {
                  const kpi = kpiData.find(k => k.id === selectedKPI);
                  return kpi ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{kpi.name}</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={kpi.historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#2563eb" 
                            strokeWidth={2}
                            dot={{ fill: '#2563eb' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : null;
                })()
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>เลือก KPI จากการ์ดด้านบนเพื่อดูแนวโน้ม</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">ฟีเจอร์การคาดการณ์ KPI จะพร้อมใช้งานเร็วๆ นี้</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">ระบบการแจ้งเตือนจะพร้อมใช้งานเร็วๆ นี้</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealTimeKPIDashboard;
