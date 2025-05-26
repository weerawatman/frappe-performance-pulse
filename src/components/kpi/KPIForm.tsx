
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import { KPIItem, BALANCE_SCORECARD_CATEGORIES } from '@/types/kpi';

interface KPIFormProps {
  kpiItems: KPIItem[];
  onKPIItemsChange: (items: KPIItem[]) => void;
}

const KPIForm: React.FC<KPIFormProps> = ({ kpiItems, onKPIItemsChange }) => {
  const [currentKPI, setCurrentKPI] = useState<Partial<KPIItem>>({
    category_id: '',
    name: '',
    description: '',
    weight: 0,
    target: '',
    measurement_method: ''
  });

  const totalWeight = kpiItems.reduce((sum, item) => sum + item.weight, 0);
  const isWeightValid = totalWeight === 100;

  const addKPI = () => {
    if (!currentKPI.category_id || !currentKPI.name || !currentKPI.weight) {
      return;
    }

    const category = BALANCE_SCORECARD_CATEGORIES.find(c => c.id === currentKPI.category_id);
    const newKPI: KPIItem = {
      id: Date.now().toString(),
      category_id: currentKPI.category_id,
      category_name: category?.name || '',
      name: currentKPI.name,
      description: currentKPI.description || '',
      weight: currentKPI.weight,
      target: currentKPI.target || '',
      measurement_method: currentKPI.measurement_method || '',
      created_at: new Date()
    };

    onKPIItemsChange([...kpiItems, newKPI]);
    setCurrentKPI({
      category_id: '',
      name: '',
      description: '',
      weight: 0,
      target: '',
      measurement_method: ''
    });
  };

  const removeKPI = (id: string) => {
    onKPIItemsChange(kpiItems.filter(item => item.id !== id));
  };

  const updateKPIWeight = (id: string, weight: number) => {
    onKPIItemsChange(
      kpiItems.map(item => 
        item.id === id ? { ...item, weight } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Add KPI Form */}
      <Card>
        <CardHeader>
          <CardTitle>เพิ่ม KPI ใหม่</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">หมวดหมู่ KPI</Label>
              <Select 
                value={currentKPI.category_id} 
                onValueChange={(value) => setCurrentKPI({...currentKPI, category_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหมวดหมู่" />
                </SelectTrigger>
                <SelectContent>
                  {BALANCE_SCORECARD_CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="weight">น้ำหนัก (%)</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                max="100"
                value={currentKPI.weight || ''}
                onChange={(e) => setCurrentKPI({...currentKPI, weight: Number(e.target.value)})}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name">ชื่อ KPI</Label>
            <Input
              id="name"
              value={currentKPI.name || ''}
              onChange={(e) => setCurrentKPI({...currentKPI, name: e.target.value})}
              placeholder="เช่น อัตราการเติบโตของรายได้"
            />
          </div>

          <div>
            <Label htmlFor="description">รายละเอียด KPI</Label>
            <Textarea
              id="description"
              value={currentKPI.description || ''}
              onChange={(e) => setCurrentKPI({...currentKPI, description: e.target.value})}
              placeholder="อธิบายรายละเอียดของ KPI นี้"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target">เป้าหมาย</Label>
              <Input
                id="target"
                value={currentKPI.target || ''}
                onChange={(e) => setCurrentKPI({...currentKPI, target: e.target.value})}
                placeholder="เช่น เพิ่มขึ้น 15% จากปีที่แล้ว"
              />
            </div>
            
            <div>
              <Label htmlFor="measurement">วิธีการวัดผล</Label>
              <Input
                id="measurement"
                value={currentKPI.measurement_method || ''}
                onChange={(e) => setCurrentKPI({...currentKPI, measurement_method: e.target.value})}
                placeholder="เช่น เปรียบเทียบรายได้ Q4 กับ Q4 ปีที่แล้ว"
              />
            </div>
          </div>

          <Button 
            onClick={addKPI}
            disabled={!currentKPI.category_id || !currentKPI.name || !currentKPI.weight}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            เพิ่ม KPI
          </Button>
        </CardContent>
      </Card>

      {/* KPI List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>รายการ KPI ที่กำหนด</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">น้ำหนักรวม:</span>
              <Badge variant={isWeightValid ? "default" : "destructive"}>
                {totalWeight}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isWeightValid && totalWeight > 0 && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                น้ำหนักรวมต้องเท่ากับ 100% (ปัจจุบัน: {totalWeight}%)
              </AlertDescription>
            </Alert>
          )}

          {kpiItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              ยังไม่มี KPI ที่กำหนด กรุณาเพิ่ม KPI ใหม่
            </div>
          ) : (
            <div className="space-y-4">
              {kpiItems.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{item.category_name}</Badge>
                        <Input
                          type="number"
                          value={item.weight}
                          onChange={(e) => updateKPIWeight(item.id, Number(e.target.value))}
                          className="w-20"
                          min="0"
                          max="100"
                        />
                        <span className="text-sm text-gray-600">%</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                        {item.target && (
                          <div>
                            <span className="font-medium">เป้าหมาย:</span> {item.target}
                          </div>
                        )}
                        {item.measurement_method && (
                          <div>
                            <span className="font-medium">วิธีวัด:</span> {item.measurement_method}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeKPI(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KPIForm;
