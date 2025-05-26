
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Plus, Target, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeKPI: React.FC = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState([
    { id: 1, title: '', description: '', target: '', weight: '' }
  ]);

  const addKPI = () => {
    setKpis([...kpis, { id: Date.now(), title: '', description: '', target: '', weight: '' }]);
  };

  const updateKPI = (id: number, field: string, value: string) => {
    setKpis(kpis.map(kpi => 
      kpi.id === id ? { ...kpi, [field]: value } : kpi
    ));
  };

  const removeKPI = (id: number) => {
    setKpis(kpis.filter(kpi => kpi.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/employee-dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4" />
            กลับไป Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">กำหนด KPI</h1>
          <p className="text-gray-600">ตั้งเป้าหมายและตัวชี้วัดผลงานสำหรับรอบการประเมิน</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  KPI และเป้าหมาย
                </CardTitle>
                <CardDescription>
                  กำหนด KPI ที่สำคัญและเป้าหมายที่ต้องการบรรลุ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {kpis.map((kpi, index) => (
                  <div key={kpi.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">KPI #{index + 1}</h3>
                      {kpis.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeKPI(kpi.id)}
                        >
                          ลบ
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`title-${kpi.id}`}>ชื่อ KPI</Label>
                        <Input
                          id={`title-${kpi.id}`}
                          placeholder="เช่น ยอดขายรายเดือน"
                          value={kpi.title}
                          onChange={(e) => updateKPI(kpi.id, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`weight-${kpi.id}`}>น้ำหนัก (%)</Label>
                        <Input
                          id={`weight-${kpi.id}`}
                          type="number"
                          placeholder="30"
                          value={kpi.weight}
                          onChange={(e) => updateKPI(kpi.id, 'weight', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`description-${kpi.id}`}>รายละเอียด</Label>
                      <Textarea
                        id={`description-${kpi.id}`}
                        placeholder="อธิบายรายละเอียดของ KPI และวิธีการวัดผล"
                        value={kpi.description}
                        onChange={(e) => updateKPI(kpi.id, 'description', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`target-${kpi.id}`}>เป้าหมาย</Label>
                      <Input
                        id={`target-${kpi.id}`}
                        placeholder="เช่น 1,000,000 บาท"
                        value={kpi.target}
                        onChange={(e) => updateKPI(kpi.id, 'target', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-4">
                  <Button variant="outline" onClick={addKPI} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    เพิ่ม KPI
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    บันทึก KPI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>คำแนะนำ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">การกำหนด KPI ที่ดี</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>ควรเป็น SMART (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
                    <li>มีความชัดเจนและวัดผลได้</li>
                    <li>สอดคล้องกับเป้าหมายขององค์กร</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">น้ำหนักคะแนน</h4>
                  <p>น้ำหนักรวมของ KPI ทั้งหมดควรเท่ากับ 100%</p>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800">
                    💡 หากต้องการความช่วยเหลือในการกำหนด KPI สามารถติดต่อหัวหน้างานได้
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeKPI;
