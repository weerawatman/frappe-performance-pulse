import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { mockCorporateKPIData } from '@/data/mockCorporateKPI';

interface KPIStatus {
  bonus: string;
  merit: string;
}

const KPITrackingTable = () => {
  const { user } = useAuth();
  const [kpiStatus, setKpiStatus] = useState<KPIStatus>({
    bonus: 'not_started',
    merit: 'not_started'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('KPITrackingTable mounted, fetching initial status');
    
    const loadKPIStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        // Get employee data first
        const { data: employee, error: empError } = await supabase
          .from('employees')
          .select('id')
          .eq('employee_name', user.name)
          .single();
          
        if (empError || !employee) {
          console.log('Employee not found in database, using localStorage fallback');
          // Fallback to localStorage
          const savedStatus = localStorage.getItem('kpiStatus');
          if (savedStatus) {
            try {
              const parsedStatus = JSON.parse(savedStatus);
              setKpiStatus(parsedStatus);
            } catch (error) {
              console.log('Error parsing localStorage, using defaults');
            }
          }
          setLoading(false);
          return;
        }
        
        console.log('Found employee:', employee);
        
        // Check KPI Bonus status
        const { data: bonusData, error: bonusError } = await supabase
          .from('kpi_bonus')
          .select('status')
          .eq('employee_id', employee.id)
          .single();
          
        // Check KPI Merit status  
        const { data: meritData, error: meritError } = await supabase
          .from('kpi_merit')
          .select('status')
          .eq('employee_id', employee.id)
          .single();
          
        const newStatus = {
          bonus: bonusData?.status || 'not_started',
          merit: meritData?.status || 'not_started'
        };
        
        console.log('Current KPI status for', user.name + ':', newStatus);
        setKpiStatus(newStatus);
        
        // Also update localStorage for consistency
        localStorage.setItem('kpiStatus', JSON.stringify(newStatus));
        
      } catch (error) {
        console.error('Error fetching KPI status:', error);
        // Fallback to localStorage
        const savedStatus = localStorage.getItem('kpiStatus');
        if (savedStatus) {
          try {
            const parsedStatus = JSON.parse(savedStatus);
            setKpiStatus(parsedStatus);
          } catch (parseError) {
            console.log('Error parsing localStorage, using defaults');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadKPIStatus();
    
    // Add event listeners for status changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kpiStatus' && e.newValue) {
        try {
          const newStatus = JSON.parse(e.newValue);
          console.log('Updating status from storage event:', newStatus);
          setKpiStatus(newStatus);
        } catch (error) {
          console.error('Error parsing storage data:', error);
        }
      }
    };
    
    const handleKPIStatusUpdate = (event: CustomEvent) => {
      console.log('KPI status update event received:', event.detail);
      loadKPIStatus();
    };
    
    const handleFocus = () => {
      console.log('Window focused, checking database status');
      loadKPIStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('kpiStatusUpdate', handleKPIStatusUpdate as EventListener);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('kpiStatusUpdate', handleKPIStatusUpdate as EventListener);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);

  // Select 3 Corporate KPIs from different Balance Score Card categories
  const selectedCorporateKPIs = [
    // Financial Perspective
    {
      id: '1',
      name: 'เพิ่มรายได้องค์กร',
      target: '15% YoY',
      weight: 40,
      category: 'Financial Perspective'
    },
    // Customer Excellence  
    {
      id: '4',
      name: 'ลดต้นทุนการดำเนินงาน',
      target: '10%',
      weight: 30,
      category: 'Internal Process'
    },
    // People & Culture
    {
      id: '16',
      name: 'ประสิทธิภาพของบุคลากร',
      target: '0.33 MB Net Profit/Employee',
      weight: 30,
      category: 'Learning & Growth'
    }
  ];

  // Individual KPI data with dynamic status
  const individualKPIs = [
    {
      type: 'KPI Bonus',
      definition: getKPIButtonText('bonus', kpiStatus.bonus),
      evaluation1: getEvaluationText('bonus', kpiStatus.bonus, 1),
      evaluation2: getEvaluationText('bonus', kpiStatus.bonus, 2),
      link: '/employee/kpi-bonus',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonText: getKPIButtonText('bonus', kpiStatus.bonus),
      available: true,
      status: kpiStatus.bonus
    },
    {
      type: 'KPI Merit',
      definition: getKPIButtonText('merit', kpiStatus.merit),
      evaluation1: getEvaluationText('merit', kpiStatus.merit, 1),
      evaluation2: getEvaluationText('merit', kpiStatus.merit, 2),
      link: '/employee/kpi-merit',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonText: getKPIButtonText('merit', kpiStatus.merit),
      available: true,
      status: kpiStatus.merit
    }
  ];

  function getKPIButtonText(type: 'bonus' | 'merit', status: string): string {
    console.log(`Getting button text for ${type} with status: ${status}`);
    switch (status) {
      case 'not_started':
        return `เริ่มกำหนด KPI ${type === 'bonus' ? 'Bonus' : 'Merit'}`;
      case 'draft':
        return 'แก้ไขร่าง';
      case 'pending_checker':
        return 'รอ Checker';
      case 'pending_approver':
        return 'รอ Approve';
      case 'completed':
        return 'เสร็จสิ้น';
      default:
        return `เริ่มกำหนด KPI ${type === 'bonus' ? 'Bonus' : 'Merit'}`;
    }
  }

  function getEvaluationText(type: 'bonus' | 'merit', status: string, round: number): string {
    // หากยังไม่เสร็จสิ้นการกำหนด KPI ให้แสดง Coming Soon
    if (status !== 'completed') {
      return 'Coming Soon';
    }
    
    // หากเสร็จสิ้นแล้วให้แสดงสถานะการประเมิน
    return `ประเมินตนเอง`;
  }

  const getEvaluationStatus = (status: string, evaluationRound: number) => {
    // หากยังไม่เสร็จสิ้นการกำหนด KPI
    if (status !== 'completed') {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
          Coming Soon
        </Badge>
      );
    }

    // หากเสร็จสิ้นการกำหนด KPI แล้ว ให้แสดงสถานะการประเมิน
    return (
      <Link to={`/employee/evaluation/${status === 'completed' ? 'bonus' : 'merit'}`}>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          ประเมินตนเอง
        </Button>
      </Link>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardContent className="py-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล KPI...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Corporate KPI Section */}
      <Card className="shadow-lg border-0 border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold flex items-center justify-center gap-2">
            <Building className="w-5 h-5" />
            Corporate KPI (อ่านอย่างเดียว)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedCorporateKPIs.map((kpi) => (
              <div key={kpi.id} className="border rounded-lg p-4 bg-blue-50">
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-900">{kpi.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">เป้าหมาย: {kpi.target}</p>
                <p className="text-sm text-gray-600">น้ำหนัก: {kpi.weight}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual KPI Tracking Table */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold flex items-center justify-center gap-2">
            <Target className="w-5 h-5" />
            Individual KPI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-3 text-center font-medium">KPI</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-medium">กำหนด KPI</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-medium">ประเมินครั้งที่ 1</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-medium">ประเมินครั้งที่ 2</th>
                </tr>
              </thead>
              <tbody>
                {individualKPIs.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="border border-gray-300 px-4 py-4 text-center font-medium">
                      {item.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 text-center">
                      {item.available ? (
                        item.status === 'pending_checker' || item.status === 'pending_approver' || item.status === 'completed' ? (
                          <div className="flex flex-col items-center gap-2">
                            <Badge 
                              className={
                                item.status === 'pending_checker' ? 'bg-blue-100 text-blue-700' :
                                item.status === 'pending_approver' ? 'bg-purple-100 text-purple-700' :
                                'bg-green-100 text-green-700'
                              }
                            >
                              {item.buttonText}
                            </Badge>
                            {item.status !== 'completed' && (
                              <Link to={item.link}>
                                <Button size="sm" variant="outline">
                                  <ArrowRight className="w-4 h-4 mr-2" />
                                  ดูรายละเอียด
                                </Button>
                              </Link>
                            )}
                          </div>
                        ) : (
                          <Link to={item.link}>
                            <Button 
                              className={`${item.buttonColor} text-white flex items-center gap-2 mx-auto`}
                            >
                              {item.buttonText}
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        )
                      ) : (
                        <span className="text-gray-500">ไม่พร้อมใช้งาน</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 text-center">
                      {getEvaluationStatus(item.status, 1)}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 text-center">
                      {getEvaluationStatus(item.status, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPITrackingTable;
