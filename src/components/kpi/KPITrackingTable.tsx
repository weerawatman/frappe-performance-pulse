
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const KPITrackingTable = () => {
  // Corporate KPIs that are cascaded to employees (read-only)
  const corporateKPIs = [
    {
      id: '1',
      name: 'เพิ่มรายได้องค์กร',
      target: '15% YoY',
      weight: 40,
      currentProgress: 12,
      status: 'on-track'
    },
    {
      id: '2', 
      name: 'ลดต้นทุนการดำเนินงาน',
      target: '10%',
      weight: 30,
      currentProgress: 6,
      status: 'at-risk'
    }
  ];

  // Individual KPI data
  const individualKPIs = [
    {
      type: 'KPI Bonus',
      definition: 'เริ่มกำหนด KPI Bonus',
      evaluation1: 'Coming Soon',
      evaluation2: 'Coming Soon',
      link: '/employee/kpi-bonus',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonText: 'เริ่มกำหนด KPI Bonus',
      available: true,
      status: 'not_started'
    },
    {
      type: 'KPI Merit',
      definition: 'เริ่มกำหนด KPI Merit',
      evaluation1: 'Coming Soon',
      evaluation2: 'Coming Soon',
      link: '/employee/kpi-merit',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonText: 'เริ่มกำหนด KPI Merit',
      available: true,
      status: 'not_started'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-700';
      case 'at-risk': return 'bg-yellow-100 text-yellow-700';
      case 'behind': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {corporateKPIs.map((kpi) => (
              <div key={kpi.id} className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{kpi.name}</h4>
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
                      style={{ width: `${Math.min((kpi.currentProgress / parseFloat(kpi.target)) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{kpi.currentProgress}%</span>
                </div>
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
                        <Link to={item.link}>
                          <Button 
                            className={`${item.buttonColor} text-white flex items-center gap-2 mx-auto`}
                          >
                            {item.buttonText}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
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
