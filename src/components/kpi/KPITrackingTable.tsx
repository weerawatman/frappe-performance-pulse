
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const KPITrackingTable = () => {
  // Simulate different statuses for demonstration
  const kpiData = [
    {
      type: 'KPI Bonus',
      definition: 'เริ่มกำหนด KPI Bonus',
      evaluation1: 'Coming Soon',
      evaluation2: 'Coming Soon',
      link: '/employee/kpi-bonus',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonText: 'เริ่มกำหนด KPI Bonus',
      available: true,
      // Status can be: 'not_started', 'evaluation_period', 'draft', 'checked', 'approved'
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

  const getEvaluationStatus = (status: string, evaluationRound: number) => {
    switch (status) {
      case 'not_started':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            Coming Soon
          </Badge>
        );
      case 'evaluation_period':
        if (evaluationRound === 1) {
          return (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto">
              ประเมินครั้งที่ 1
            </Button>
          );
        }
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
      case 'checked':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            Checked
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300">
            Approved
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
      {/* KPI Tracking Table */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">KPI Tracking System</CardTitle>
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
                {kpiData.map((item, index) => (
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
