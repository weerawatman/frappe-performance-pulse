
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const KPITrackingTable = () => {
  const kpiData = [
    {
      type: 'KPI Bonus',
      definition: 'เริ่มกำหนด KPI Bonus',
      evaluation1: 'Coming Soon',
      evaluation2: 'Coming Soon',
      link: '/employee/kpi-bonus',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonText: 'เริ่มกำหนด KPI Bonus',
      available: true
    },
    {
      type: 'KPI Merit',
      definition: 'เริ่มกำหนด KPI Merit',
      evaluation1: 'Coming Soon',
      evaluation2: 'Coming Soon',
      link: '/employee/kpi-merit',
      buttonColor: 'border-purple-600 text-purple-600 hover:bg-purple-50',
      buttonText: 'เริ่มกำหนด KPI Merit',
      available: true
    }
  ];

  const statusFlow = [
    { step: 1, text: 'ถ้ายังไม่เริ่มกำหนดให้แสดงตามรูป' },
    { step: 2, text: 'หากมีการจัดทำแล้ว แต่ยังไม่ส่งอนุมัติให้แสดงสถานะ "ร่าง"' },
    { step: 3, text: 'หากส่งอนุมัติแล้ว หลังจาก Checker ตรวจสอบแล้ว ให้แสดงสถานะ "Checked" และส่งไปยัง Approver เพื่อพิจารณา' },
    { step: 4, text: 'หา Approver อนุมัติแล้ว ให้แสดงสถานะ "Approved" และไม่สามารถกดต่อได้อีก' }
  ];

  return (
    <div className="space-y-6">
      {/* Status Flow Information */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="space-y-2">
            {statusFlow.map((item, index) => (
              <p key={index} className="text-sm text-gray-700">
                {item.step}) {item.text}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

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
                            variant={item.type === 'KPI Merit' ? 'outline' : 'default'}
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
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                        {item.evaluation1}
                      </Badge>
                    </td>
                    <td className="border border-gray-300 px-4 py-4 text-center">
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                        {item.evaluation2}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Status Flow Explanation */}
      <Card className="border-gray-200">
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm text-gray-600">
            <p>1) ถ้ายังไม่เริ่มกำหนดให้แสดงตามรูป</p>
            <p>2) หากมีการจัดทำแล้ว แต่ยังไม่ส่งอนุมัติให้แสดงสถานะ "ร่าง"</p>
            <p>3) หากส่งอนุมัติแล้ว หลังจาก Checker ตรวจสอบแล้ว ให้แสดงสถานะ "Checked" และส่งไปยัง Approver เพื่อพิจารณา</p>
            <p>4) หา Approver อนุมัติแล้ว ให้แสดงสถานะ "Approved" และไม่สามารถกดต่อได้อีก</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPITrackingTable;
