
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEmployeeKPIStatus } from '@/services/kpiService';

interface KPIStatus {
  bonus: string;
  merit: string;
}

const KPITrackingTable = () => {
  const [kpiStatus, setKpiStatus] = useState<KPIStatus>({
    bonus: 'not_started',
    merit: 'not_started'
  });
  const [loading, setLoading] = useState(true);

  // Mock employee ID - in real app, this would come from auth context
  const currentEmployeeId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'; // This should match one of the UUIDs from the database

  useEffect(() => {
    fetchKPIStatus();
  }, []);

  const fetchKPIStatus = async () => {
    try {
      setLoading(true);
      const status = await getEmployeeKPIStatus(currentEmployeeId);
      setKpiStatus(status);
    } catch (error) {
      console.error('Error fetching KPI status:', error);
      // Fallback to localStorage if API fails
      const savedStatus = localStorage.getItem('kpiStatus');
      if (savedStatus) {
        setKpiStatus(JSON.parse(savedStatus));
      }
    } finally {
      setLoading(false);
    }
  };

  // Corporate KPIs - แสดงเฉพาะหัวข้อและเป้าหมาย
  const corporateKPIs = [
    {
      id: '1',
      name: 'เพิ่มรายได้องค์กร',
      target: '15% YoY',
      weight: 40
    },
    {
      id: '2', 
      name: 'ลดต้นทุนการดำเนินงาน',
      target: '10%',
      weight: 30
    }
  ];

  // Individual KPI data with dynamic status
  const individualKPIs = [
    {
      type: 'KPI Bonus',
      definition: getKPIButtonText('bonus', kpiStatus.bonus),
      evaluation1: 'Coming Soon',
      evaluation2: 'Coming Soon',
      link: '/employee/kpi-bonus',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonText: getKPIButtonText('bonus', kpiStatus.bonus),
      available: true,
      status: kpiStatus.bonus
    },
    {
      type: 'KPI Merit',
      definition: getKPIButtonText('merit', kpiStatus.merit),
      evaluation1: 'Coming Soon',
      evaluation2: 'Coming Soon',
      link: '/employee/kpi-merit',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonText: getKPIButtonText('merit', kpiStatus.merit),
      available: true,
      status: kpiStatus.merit
    }
  ];

  function getKPIButtonText(type: 'bonus' | 'merit', status: string): string {
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
        return 'Completed';
      default:
        return `เริ่มกำหนด KPI ${type === 'bonus' ? 'Bonus' : 'Merit'}`;
    }
  }

  const getEvaluationStatus = (status: string, evaluationRound: number) => {
    switch (status) {
      case 'not_started':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            Coming Soon
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-300">
            ร่าง
          </Badge>
        );
      case 'pending_checker':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            รอ Checker
          </Badge>
        );
      case 'pending_approver':
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            รอ Approve
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300">
            Completed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            Coming Soon
          </Badge>
        );
    }
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
      {/* Corporate KPI Section - แสดงเฉพาะหัวข้อและเป้าหมาย */}
      <Card className="shadow-lg border-0 border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold flex items-center justify-center gap-2">
            <Building className="w-5 h-5" />
            Corporate KPI (อ่านอย่างเดียว)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {corporateKPIs.map((kpi) => (
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
