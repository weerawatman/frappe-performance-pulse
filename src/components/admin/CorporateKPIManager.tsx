
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Target, Users, ArrowDown } from 'lucide-react';

interface CorporateKPIItem {
  id: string;
  name: string;
  target: string;
  weight: number;
  cascadeTo: 'all' | 'department' | 'specific';
  departments?: string[];
  employees?: string[];
  status: 'active' | 'inactive';
}

const CorporateKPIManager: React.FC = () => {
  const { toast } = useToast();
  const [corporateKPIs, setCorporateKPIs] = useState<CorporateKPIItem[]>([
    {
      id: '1',
      name: 'เพิ่มรายได้องค์กร',
      target: '15% YoY',
      weight: 40,
      cascadeTo: 'all',
      status: 'active'
    },
    {
      id: '2',
      name: 'ลดต้นทุนการดำเนินงาน',
      target: '10%',
      weight: 30,
      cascadeTo: 'department',
      departments: ['การขาย', 'การตลาด'],
      status: 'active'
    }
  ]);

  const [newKPI, setNewKPI] = useState({
    name: '',
    target: '',
    weight: 0,
    cascadeTo: 'all' as const
  });

  const handleAddKPI = () => {
    if (!newKPI.name || !newKPI.target || newKPI.weight === 0) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    const kpi: CorporateKPIItem = {
      id: Date.now().toString(),
      ...newKPI,
      status: 'active'
    };

    setCorporateKPIs(prev => [...prev, kpi]);
    setNewKPI({ name: '', target: '', weight: 0, cascadeTo: 'all' });
    
    toast({
      title: "เพิ่ม Corporate KPI สำเร็จ",
      description: "KPI จะถูก cascade ไปยังพนักงานโดยอัตโนมัติ"
    });
  };

  const handleCascadeKPI = (kpiId: string) => {
    toast({
      title: "Cascade KPI สำเร็จ",
      description: "KPI ได้ถูกส่งไปยังพนักงานแล้ว"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            จัดการ Corporate KPI
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add New KPI Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 border rounded-lg bg-gray-50">
            <div>
              <label className="text-sm font-medium">ชื่อ KPI</label>
              <Input
                value={newKPI.name}
                onChange={(e) => setNewKPI(prev => ({ ...prev, name: e.target.value }))}
                placeholder="เช่น เพิ่มรายได้"
              />
            </div>
            <div>
              <label className="text-sm font-medium">เป้าหมาย</label>
              <Input
                value={newKPI.target}
                onChange={(e) => setNewKPI(prev => ({ ...prev, target: e.target.value }))}
                placeholder="เช่น 15% YoY"
              />
            </div>
            <div>
              <label className="text-sm font-medium">น้ำหนัก (%)</label>
              <Input
                type="number"
                value={newKPI.weight}
                onChange={(e) => setNewKPI(prev => ({ ...prev, weight: Number(e.target.value) }))}
                placeholder="0-100"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddKPI} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                เพิ่ม KPI
              </Button>
            </div>
          </div>

          {/* Corporate KPI List */}
          <div className="space-y-4">
            {corporateKPIs.map((kpi) => (
              <div key={kpi.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{kpi.name}</h4>
                      <p className="text-sm text-gray-600">เป้าหมาย: {kpi.target}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{kpi.weight}%</Badge>
                    <Badge className={kpi.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {kpi.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ArrowDown className="w-4 h-4" />
                    <span>Cascade ไปยัง: </span>
                    {kpi.cascadeTo === 'all' && <Badge variant="secondary">พนักงานทั้งหมด</Badge>}
                    {kpi.cascadeTo === 'department' && (
                      <div className="flex gap-1">
                        {kpi.departments?.map(dept => (
                          <Badge key={dept} variant="secondary">{dept}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCascadeKPI(kpi.id)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Cascade ไปยังพนักงาน
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorporateKPIManager;
