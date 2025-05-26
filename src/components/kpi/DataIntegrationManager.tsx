import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Link, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Play,
  Pause,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: 'CRM' | 'ERP' | 'Database' | 'API' | 'Excel';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  recordCount: number;
  kpiMappings: string[];
}

interface KPIMapping {
  id: string;
  kpiName: string;
  dataSource: string;
  field: string;
  formula: string;
  isActive: boolean;
  lastCalculated: Date;
}

const mockDataSources: DataSource[] = [
  {
    id: '1',
    name: 'Salesforce CRM',
    type: 'CRM',
    status: 'connected',
    lastSync: new Date('2025-01-15T10:30:00'),
    recordCount: 1250,
    kpiMappings: ['ยอดขาย', 'จำนวนลูกค้าใหม่']
  },
  {
    id: '2',
    name: 'SAP ERP',
    type: 'ERP',
    status: 'connected',
    lastSync: new Date('2025-01-15T09:15:00'),
    recordCount: 5430,
    kpiMappings: ['ต้นทุนการผลิต', 'ประสิทธิภาพการผลิต']
  },
  {
    id: '3',
    name: 'Google Analytics',
    type: 'API',
    status: 'error',
    lastSync: new Date('2025-01-14T16:45:00'),
    recordCount: 0,
    kpiMappings: ['การเข้าชมเว็บไซต์']
  }
];

const mockKPIMappings: KPIMapping[] = [
  {
    id: '1',
    kpiName: 'ยอดขายรายเดือน',
    dataSource: 'Salesforce CRM',
    field: 'opportunity.amount',
    formula: 'SUM(amount) WHERE stage = "Closed Won" AND close_date >= THIS_MONTH',
    isActive: true,
    lastCalculated: new Date('2025-01-15T10:30:00')
  },
  {
    id: '2',
    kpiName: 'ต้นทุนต่อหน่วย',
    dataSource: 'SAP ERP',
    field: 'production.cost',
    formula: 'SUM(material_cost + labor_cost) / SUM(quantity_produced)',
    isActive: true,
    lastCalculated: new Date('2025-01-15T09:15:00')
  },
  {
    id: '3',
    kpiName: 'การเข้าชมเว็บไซต์',
    dataSource: 'Google Analytics',
    field: 'sessions',
    formula: 'SUM(sessions) WHERE date >= THIS_MONTH',
    isActive: false,
    lastCalculated: new Date('2025-01-14T16:45:00')
  }
];

const DataIntegrationManager: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>(mockDataSources);
  const [kpiMappings, setKPIMappings] = useState<KPIMapping[]>(mockKPIMappings);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const handleConnect = async (sourceId: string) => {
    setIsConnecting(true);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDataSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, status: 'connected' as const, lastSync: new Date() }
        : source
    ));
    setIsConnecting(false);
  };

  const handleSync = async (sourceId: string) => {
    setDataSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, lastSync: new Date() }
        : source
    ));
  };

  const toggleKPIMapping = (mappingId: string) => {
    setKPIMappings(prev => prev.map(mapping => 
      mapping.id === mappingId 
        ? { ...mapping, isActive: !mapping.isActive }
        : mapping
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">การเชื่อมโยงแหล่งข้อมูล</h2>
        <p className="text-gray-600">เชื่อมต่อและซิงก์ข้อมูลจากระบบภายนอกเพื่อคำนวณ KPI อัตโนมัติ</p>
      </div>

      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sources">แหล่งข้อมูล</TabsTrigger>
          <TabsTrigger value="mappings">การเชื่อมโยง KPI</TabsTrigger>
          <TabsTrigger value="sync">การซิงก์ข้อมูล</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-6">
          {/* Add New Data Source */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                เพิ่มแหล่งข้อมูลใหม่
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <Database className="w-8 h-8 mb-2" />
                  <span>CRM</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <Database className="w-8 h-8 mb-2" />
                  <span>ERP</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 mb-2" />
                  <span>Excel/CSV</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <Link className="w-8 h-8 mb-2" />
                  <span>API</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Data Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataSources.map((source) => (
              <Card key={source.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <Badge className={getStatusColor(source.status)}>
                      {getStatusIcon(source.status)}
                      <span className="ml-1">
                        {source.status === 'connected' ? 'เชื่อมต่อแล้ว' : 
                         source.status === 'error' ? 'ข้อผิดพลาด' : 'ไม่ได้เชื่อมต่อ'}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">ประเภท:</span>
                      <span className="font-medium">{source.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">จำนวนข้อมูล:</span>
                      <span className="font-medium">{source.recordCount.toLocaleString()} รายการ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">ซิงก์ล่าสุด:</span>
                      <span className="font-medium">{source.lastSync.toLocaleDateString('th-TH')}</span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">KPI ที่เชื่อมโยง:</p>
                      <div className="flex flex-wrap gap-1">
                        {source.kpiMappings.map((kpi, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {kpi}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {source.status === 'connected' ? (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSync(source.id)}
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            ซิงก์
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4 mr-1" />
                            ตั้งค่า
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnect(source.id)}
                          disabled={isConnecting}
                        >
                          <Link className="w-4 h-4 mr-1" />
                          เชื่อมต่อ
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mappings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>การเชื่อมโยง KPI กับข้อมูล</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpiMappings.map((mapping) => (
                  <Card key={mapping.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{mapping.kpiName}</h4>
                        <p className="text-sm text-gray-600">จาก: {mapping.dataSource}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={mapping.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {mapping.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleKPIMapping(mapping.id)}
                        >
                          {mapping.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">ฟิลด์ข้อมูล:</span>
                        <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">{mapping.field}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">สูตรคำนวณ:</span>
                        <div className="ml-2 mt-1 font-mono bg-gray-100 p-2 rounded text-xs">
                          {mapping.formula}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">คำนวณล่าสุด:</span>
                        <span className="ml-2">{mapping.lastCalculated.toLocaleString('th-TH')}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>การซิงก์ข้อมูล</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  ฟีเจอร์การซิงก์ข้อมูลอัตโนมัติและการตั้งค่าตารางเวลาจะพร้อมใช้งานเร็วๆ นี้
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataIntegrationManager;
