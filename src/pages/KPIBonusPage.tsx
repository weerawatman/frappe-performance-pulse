
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Save, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getKPIItems, addKPIHistory } from '@/services/kpiService';

interface KPIItem {
  id: string;
  name: string;
  description: string;
  target: string;
  weight: number;
  category_name: string;
  measurement_method?: string;
}

interface KPIBonusItem {
  id: string;
  name: string;
  description: string;
  target: string;
  weight: number;
  actualResult: string;
  score: number;
  category_name: string;
}

const KPIBonusPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [availableKPIs, setAvailableKPIs] = useState<KPIItem[]>([]);
  const [selectedKPIs, setSelectedKPIs] = useState<KPIBonusItem[]>([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    loadKPIItems();
    getCurrentUser();
    loadExistingKPIBonus();
  }, []);

  const getCurrentUser = async () => {
    try {
      // For demo purposes, we'll get the current user from localStorage
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Found user in localStorage:', user);
        
        // Get employee from database
        const { data: employee, error } = await supabase
          .from('employees')
          .select('*')
          .eq('employee_name', user.name)
          .single();
          
        if (error) {
          console.error('Error fetching employee:', error);
        } else {
          console.log('Found employee:', employee);
          setCurrentUser(employee);
        }
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  };

  const loadExistingKPIBonus = async () => {
    try {
      const userData = localStorage.getItem('currentUser');
      if (!userData) return;
      
      const user = JSON.parse(userData);
      
      // Get employee from database
      const { data: employee, error: employeeError } = await supabase
        .from('employees')
        .select('*')
        .eq('employee_name', user.name)
        .single();
        
      if (employeeError || !employee) {
        console.log('No employee found');
        return;
      }

      // Check if there's existing KPI Bonus data
      const { data: existingBonus, error } = await supabase
        .from('kpi_bonus')
        .select(`
          *,
          kpi_bonus_items (
            *,
            kpi_items (*)
          )
        `)
        .eq('employee_id', employee.id)
        .in('status', ['draft', 'pending_checker', 'pending_approver'])
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading existing KPI Bonus:', error);
        return;
      }

      if (existingBonus && existingBonus.length > 0) {
        const bonus = existingBonus[0];
        console.log('Found existing KPI Bonus:', bonus);
        
        // Load the KPI items from the existing bonus
        if (bonus.kpi_bonus_items && bonus.kpi_bonus_items.length > 0) {
          const kpiItems = bonus.kpi_bonus_items.map((item: any) => ({
            id: item.kpi_item_id,
            name: item.kpi_items?.name || '',
            description: item.kpi_items?.description || '',
            target: item.kpi_items?.target || '',
            weight: item.kpi_items?.weight || 0,
            actualResult: item.actual_result || '',
            score: item.score || 0,
            category_name: item.kpi_items?.category_name || ''
          }));
          
          setSelectedKPIs(kpiItems);
          calculateTotalWeight(kpiItems);
        }
      }
    } catch (error) {
      console.error('Error loading existing KPI Bonus:', error);
    }
  };

  const loadKPIItems = async () => {
    try {
      const items = await getKPIItems();
      setAvailableKPIs(items);
    } catch (error) {
      console.error('Error loading KPI items:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดรายการ KPI ได้",
        variant: "destructive",
      });
    }
  };

  const calculateTotalWeight = (kpis: KPIBonusItem[]) => {
    const total = kpis.reduce((sum, kpi) => sum + kpi.weight, 0);
    setTotalWeight(total);
  };

  const addKPI = (kpiItem: KPIItem) => {
    const newKPI: KPIBonusItem = {
      id: kpiItem.id,
      name: kpiItem.name,
      description: kpiItem.description,
      target: kpiItem.target,
      weight: kpiItem.weight,
      actualResult: '',
      score: 0,
      category_name: kpiItem.category_name
    };
    
    const updatedKPIs = [...selectedKPIs, newKPI];
    setSelectedKPIs(updatedKPIs);
    calculateTotalWeight(updatedKPIs);
  };

  const removeKPI = (index: number) => {
    const updatedKPIs = selectedKPIs.filter((_, i) => i !== index);
    setSelectedKPIs(updatedKPIs);
    calculateTotalWeight(updatedKPIs);
  };

  const updateKPI = (index: number, field: keyof KPIBonusItem, value: string | number) => {
    const updatedKPIs = [...selectedKPIs];
    updatedKPIs[index] = { ...updatedKPIs[index], [field]: value };
    setSelectedKPIs(updatedKPIs);
    
    if (field === 'weight') {
      calculateTotalWeight(updatedKPIs);
    }
  };

  const saveDraft = async () => {
    if (!currentUser) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่พบข้อมูลผู้ใช้",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Saving KPI Bonus as draft for employee:', currentUser);

      // Check if there's existing draft
      const { data: existingBonus } = await supabase
        .from('kpi_bonus')
        .select('id')
        .eq('employee_id', currentUser.id)
        .eq('status', 'draft')
        .single();

      let bonusId;

      if (existingBonus) {
        // Update existing draft
        bonusId = existingBonus.id;
        
        const { error: updateError } = await supabase
          .from('kpi_bonus')
          .update({
            total_weight: totalWeight,
            updated_at: new Date().toISOString()
          })
          .eq('id', bonusId);

        if (updateError) throw updateError;

        // Delete existing items
        await supabase
          .from('kpi_bonus_items')
          .delete()
          .eq('kpi_bonus_id', bonusId);
      } else {
        // Create new draft
        const { data: newBonus, error: bonusError } = await supabase
          .from('kpi_bonus')
          .insert([{
            employee_id: currentUser.id,
            status: 'draft',
            total_weight: totalWeight
          }])
          .select()
          .single();

        if (bonusError) throw bonusError;
        bonusId = newBonus.id;
      }

      // Insert KPI items
      if (selectedKPIs.length > 0) {
        const kpiItems = selectedKPIs.map(kpi => ({
          kpi_bonus_id: bonusId,
          kpi_item_id: kpi.id,
          actual_result: kpi.actualResult,
          score: Number(kpi.score)
        }));

        const { error: itemsError } = await supabase
          .from('kpi_bonus_items')
          .insert(kpiItems);

        if (itemsError) throw itemsError;
      }

      toast({
        title: "บันทึกร่างสำเร็จ",
        description: "ข้อมูล KPI Bonus ถูกบันทึกเป็นร่างแล้ว",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกร่างได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitForApproval = async () => {
    if (!currentUser) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่พบข้อมูลผู้ใช้",
        variant: "destructive",
      });
      return;
    }

    if (selectedKPIs.length === 0) {
      toast({
        title: "กรุณาเลือก KPI",
        description: "กรุณาเลือก KPI อย่างน้อย 1 รายการ",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Submitting KPI Bonus for approval, employee:', currentUser);

      // Check if there's existing draft or pending
      const { data: existingBonus } = await supabase
        .from('kpi_bonus')
        .select('id')
        .eq('employee_id', currentUser.id)
        .in('status', ['draft', 'pending_checker'])
        .single();

      let bonusId;

      if (existingBonus) {
        // Update existing record
        bonusId = existingBonus.id;
        
        const { error: updateError } = await supabase
          .from('kpi_bonus')
          .update({
            status: 'pending_checker',
            total_weight: totalWeight,
            submitted_date: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', bonusId);

        if (updateError) throw updateError;

        // Delete existing items and insert new ones
        await supabase
          .from('kpi_bonus_items')
          .delete()
          .eq('kpi_bonus_id', bonusId);
      } else {
        // Create new record
        const { data: newBonus, error: bonusError } = await supabase
          .from('kpi_bonus')
          .insert([{
            employee_id: currentUser.id,
            status: 'pending_checker',
            total_weight: totalWeight,
            submitted_date: new Date().toISOString()
          }])
          .select()
          .single();

        if (bonusError) throw bonusError;
        bonusId = newBonus.id;
      }

      // Insert KPI items
      if (selectedKPIs.length > 0) {
        const kpiItems = selectedKPIs.map(kpi => ({
          kpi_bonus_id: bonusId,
          kpi_item_id: kpi.id,
          actual_result: kpi.actualResult,
          score: Number(kpi.score)
        }));

        const { error: itemsError } = await supabase
          .from('kpi_bonus_items')
          .insert(kpiItems);

        if (itemsError) throw itemsError;
      }

      // Add history record
      await addKPIHistory(
        bonusId,
        'bonus',
        'Submitted',
        currentUser.employee_name,
        'employee',
        'KPI Bonus submitted for review',
        'checker'
      );

      toast({
        title: "ส่งอนุมัติสำเร็จ",
        description: "KPI Bonus ถูกส่งเพื่อขออนุมัติแล้ว",
      });

      // Navigate back to employee dashboard
      navigate('/employee-dashboard');
    } catch (error) {
      console.error('Error submitting KPI Bonus:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งอนุมัติได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableKPIsToAdd = availableKPIs.filter(
    kpi => !selectedKPIs.some(selected => selected.id === kpi.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/employee-dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">KPI Bonus</h1>
              <p className="text-gray-600">กำหนดเป้าหมายและผลงานสำหรับ KPI Bonus</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={saveDraft}
              variant="outline"
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              บันทึกร่าง
            </Button>
            <Button 
              onClick={submitForApproval}
              disabled={isSubmitting || selectedKPIs.length === 0}
            >
              <Send className="w-4 h-4 mr-2" />
              ส่งอนุมัติ
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available KPIs */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>KPI ที่สามารถเลือกได้</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableKPIsToAdd.map((kpi) => (
                    <div key={kpi.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{kpi.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {kpi.category_name}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{kpi.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">น้ำหนัก: {kpi.weight}%</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => addKPI(kpi)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected KPIs */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  KPI ที่เลือก ({selectedKPIs.length})
                  <Badge variant={totalWeight === 100 ? "default" : "destructive"}>
                    รวม: {totalWeight}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedKPIs.map((kpi, index) => (
                    <div key={`${kpi.id}-${index}`} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{kpi.name}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {kpi.category_name}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeKPI(index)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-sm">เป้าหมาย</Label>
                          <p className="text-sm text-gray-600">{kpi.target}</p>
                        </div>
                        <div>
                          <Label htmlFor={`weight-${index}`} className="text-sm">น้ำหนัก (%)</Label>
                          <Input
                            id={`weight-${index}`}
                            type="number"
                            value={kpi.weight}
                            onChange={(e) => updateKPI(index, 'weight', Number(e.target.value))}
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`result-${index}`} className="text-sm">ผลงานจริง</Label>
                          <Textarea
                            id={`result-${index}`}
                            value={kpi.actualResult}
                            onChange={(e) => updateKPI(index, 'actualResult', e.target.value)}
                            placeholder="ระบุผลงานที่ทำได้จริง..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`score-${index}`} className="text-sm">คะแนน (0-100)</Label>
                          <Input
                            id={`score-${index}`}
                            type="number"
                            value={kpi.score}
                            onChange={(e) => updateKPI(index, 'score', Number(e.target.value))}
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {selectedKPIs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>ยังไม่มี KPI ที่เลือก</p>
                      <p className="text-sm">กรุณาเลือก KPI จากรายการทางซ้าย</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIBonusPage;
