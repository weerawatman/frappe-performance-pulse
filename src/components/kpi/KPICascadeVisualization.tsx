
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Users, User, Target, ArrowDown, Eye, EyeOff } from 'lucide-react';

interface KPINode {
  id: string;
  title: string;
  target: string;
  weight: number;
  level: 'corporate' | 'department' | 'individual';
  department?: string;
  employee?: string;
  parentId?: string;
  children?: string[];
  status: 'on-track' | 'at-risk' | 'behind';
  currentValue?: number;
}

const mockKPIData: KPINode[] = [
  {
    id: 'corp-1',
    title: 'เพิ่มรายได้รวม',
    target: '15% YoY',
    weight: 40,
    level: 'corporate',
    status: 'on-track',
    currentValue: 12,
    children: ['dept-1', 'dept-2']
  },
  {
    id: 'corp-2',
    title: 'ลดต้นทุนการดำเนินงาน',
    target: '10%',
    weight: 30,
    level: 'corporate',
    status: 'at-risk',
    currentValue: 6,
    children: ['dept-3']
  },
  {
    id: 'dept-1',
    title: 'ยอดขายแผนกการตลาด',
    target: '20 ล้านบาท',
    weight: 50,
    level: 'department',
    department: 'การตลาด',
    parentId: 'corp-1',
    status: 'on-track',
    currentValue: 18,
    children: ['ind-1', 'ind-2']
  },
  {
    id: 'dept-2',
    title: 'ยอดขายแผนกขาย',
    target: '30 ล้านบาท',
    weight: 60,
    level: 'department',
    department: 'การขาย',
    parentId: 'corp-1',
    status: 'behind',
    currentValue: 22,
    children: ['ind-3']
  },
  {
    id: 'dept-3',
    title: 'ประหยัดต้นทุน IT',
    target: '15%',
    weight: 40,
    level: 'department',
    department: 'IT',
    parentId: 'corp-2',
    status: 'on-track',
    currentValue: 14,
    children: ['ind-4']
  },
  {
    id: 'ind-1',
    title: 'Lead Generation',
    target: '500 leads',
    weight: 30,
    level: 'individual',
    employee: 'สมชาย ใจดี',
    parentId: 'dept-1',
    status: 'on-track',
    currentValue: 450
  },
  {
    id: 'ind-2',
    title: 'Conversion Rate',
    target: '15%',
    weight: 40,
    level: 'individual',
    employee: 'สมหญิง ดีใจ',
    parentId: 'dept-1',
    status: 'at-risk',
    currentValue: 12
  },
  {
    id: 'ind-3',
    title: 'ปิดการขาย',
    target: '10 ลูกค้า/เดือน',
    weight: 50,
    level: 'individual',
    employee: 'วิชัย รักงาน',
    parentId: 'dept-2',
    status: 'behind',
    currentValue: 7
  },
  {
    id: 'ind-4',
    title: 'ลดค่าใช้จ่าย Cloud',
    target: '20%',
    weight: 35,
    level: 'individual',
    employee: 'อนุชา เทคโน',
    parentId: 'dept-3',
    status: 'on-track',
    currentValue: 18
  }
];

const KPICascadeVisualization: React.FC = () => {
  const [expandedLevels, setExpandedLevels] = useState({
    corporate: true,
    department: true,
    individual: false
  });

  const toggleLevel = (level: keyof typeof expandedLevels) => {
    setExpandedLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'corporate': return <Building className="w-4 h-4" />;
      case 'department': return <Users className="w-4 h-4" />;
      case 'individual': return <User className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const corporateKPIs = mockKPIData.filter(kpi => kpi.level === 'corporate');
  const departmentKPIs = mockKPIData.filter(kpi => kpi.level === 'department');
  const individualKPIs = mockKPIData.filter(kpi => kpi.level === 'individual');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">KPI Cascade Visualization</h2>
        <div className="flex gap-2">
          {Object.entries(expandedLevels).map(([level, expanded]) => (
            <Button
              key={level}
              variant="outline"
              size="sm"
              onClick={() => toggleLevel(level as keyof typeof expandedLevels)}
              className="flex items-center gap-2"
            >
              {expanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {level === 'corporate' ? 'องค์กร' : level === 'department' ? 'แผนก' : 'บุคคล'}
            </Button>
          ))}
        </div>
      </div>

      {/* Corporate Level */}
      {expandedLevels.corporate && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Building className="w-5 h-5" />
              KPI ระดับองค์กร
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {corporateKPIs.map((kpi) => (
                <div key={kpi.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{kpi.title}</h4>
                    <Badge className={getStatusColor(kpi.status)}>
                      {kpi.status === 'on-track' ? 'ตามเป้า' : 
                       kpi.status === 'at-risk' ? 'เสี่ยง' : 'ต่ำกว่าเป้า'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">เป้าหมาย: {kpi.target}</p>
                  <p className="text-sm text-gray-600 mb-2">น้ำหนัก: {kpi.weight}%</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">ความคืบหน้า:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          kpi.status === 'on-track' ? 'bg-green-500' :
                          kpi.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((kpi.currentValue || 0) / parseFloat(kpi.target), 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{kpi.currentValue}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Arrow Down */}
      {expandedLevels.corporate && expandedLevels.department && (
        <div className="flex justify-center">
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </div>
      )}

      {/* Department Level */}
      {expandedLevels.department && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Users className="w-5 h-5" />
              KPI ระดับแผนก
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentKPIs.map((kpi) => (
                <div key={kpi.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{kpi.title}</h4>
                    <Badge className={getStatusColor(kpi.status)}>
                      {kpi.status === 'on-track' ? 'ตามเป้า' : 
                       kpi.status === 'at-risk' ? 'เสี่ยง' : 'ต่ำกว่าเป้า'}
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">แผนก: {kpi.department}</p>
                  <p className="text-sm text-gray-600 mb-2">เป้าหมาย: {kpi.target}</p>
                  <p className="text-sm text-gray-600 mb-2">น้ำหนัก: {kpi.weight}%</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">ความคืบหน้า:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          kpi.status === 'on-track' ? 'bg-green-500' :
                          kpi.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((kpi.currentValue || 0) / parseFloat(kpi.target) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{kpi.currentValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Arrow Down */}
      {expandedLevels.department && expandedLevels.individual && (
        <div className="flex justify-center">
          <ArrowDown className="w-8 h-8 text-gray-400" />
        </div>
      )}

      {/* Individual Level */}
      {expandedLevels.individual && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <User className="w-5 h-5" />
              KPI ระดับบุคคล
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {individualKPIs.map((kpi) => (
                <div key={kpi.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{kpi.title}</h4>
                    <Badge className={getStatusColor(kpi.status)} variant="outline">
                      {kpi.status === 'on-track' ? 'ตามเป้า' : 
                       kpi.status === 'at-risk' ? 'เสี่ยง' : 'ต่ำกว่าเป้า'}
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-600 mb-2">พนักงาน: {kpi.employee}</p>
                  <p className="text-sm text-gray-600 mb-2">เป้าหมาย: {kpi.target}</p>
                  <p className="text-sm text-gray-600 mb-2">น้ำหนัก: {kpi.weight}%</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">ความคืบหน้า:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          kpi.status === 'on-track' ? 'bg-green-500' :
                          kpi.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((kpi.currentValue || 0) / parseFloat(kpi.target) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{kpi.currentValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KPICascadeVisualization;
