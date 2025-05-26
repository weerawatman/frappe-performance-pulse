
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Target, 
  Users, 
  FileText, 
  BarChart3,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const getDashboardData = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: 'แดshบอร์ดผู้ดูแลระบบ',
          description: 'ภาพรวมการจัดการระบบประเมินผลงาน',
          stats: [
            { title: 'KPI ทั้งหมด', value: '24', icon: Target, color: 'blue' },
            { title: 'ผู้ใช้งาน', value: '156', icon: Users, color: 'green' },
            { title: 'การประเมิน', value: '89', icon: FileText, color: 'purple' },
            { title: 'รายงาน', value: '12', icon: BarChart3, color: 'orange' },
          ]
        };
      case 'executive':
        return {
          title: 'แดshบอร์ดผู้บริหาร',
          description: 'ภาพรวมผลงานองค์กร',
          stats: [
            { title: 'ประสิทธิภาพรวม', value: '87%', icon: TrendingUp, color: 'blue' },
            { title: 'KPI สำเร็จ', value: '21/24', icon: CheckCircle, color: 'green' },
            { title: 'ทีมงาน', value: '12', icon: Users, color: 'purple' },
            { title: 'รายงาน', value: '8', icon: BarChart3, color: 'orange' },
          ]
        };
      case 'employee':
        return {
          title: 'แดshบอร์ดพนักงาน',
          description: 'ติดตามผลงานส่วนตัว',
          stats: [
            { title: 'KPI ของฉัน', value: '5', icon: Target, color: 'blue' },
            { title: 'สำเร็จแล้ว', value: '4', icon: CheckCircle, color: 'green' },
            { title: 'กำลังดำเนินการ', value: '1', icon: Clock, color: 'purple' },
            { title: 'ใกล้ครบกำหนด', value: '0', icon: AlertCircle, color: 'orange' },
          ]
        };
      default:
        return {
          title: 'แดshบอร์ด',
          description: 'ภาพรวมระบบ Performance Management',
          stats: [
            { title: 'KPI', value: '24', icon: Target, color: 'blue' },
            { title: 'ผู้ใช้งาน', value: '156', icon: Users, color: 'green' },
            { title: 'การประเมิน', value: '89', icon: FileText, color: 'purple' },
            { title: 'รายงาน', value: '12', icon: BarChart3, color: 'orange' },
          ]
        };
    }
  };

  const dashboardData = getDashboardData();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 bg-blue-100';
      case 'green':
        return 'text-green-600 bg-green-100';
      case 'purple':
        return 'text-purple-600 bg-purple-100';
      case 'orange':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{dashboardData.title}</h1>
        <p className="text-gray-600 mt-2">{dashboardData.description}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>การดำเนินการล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">อัปเดต KPI Q1</span>
                <span className="text-xs text-gray-400">2 ชั่วโมงที่แล้ว</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">การประเมินใหม่</span>
                <span className="text-xs text-gray-400">1 วันที่แล้ว</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">รายงานประจำเดือน</span>
                <span className="text-xs text-gray-400">3 วันที่แล้ว</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>งานที่ต้องทำ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">ตรวจสอบการประเมิน</span>
                <span className="text-xs text-red-500">ครบกำหนดวันนี้</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">อนุมัติ KPI ใหม่</span>
                <span className="text-xs text-yellow-500">ครบกำหนดพรุ่งนี้</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">จัดทำรายงานประจำเดือน</span>
                <span className="text-xs text-gray-400">สัปดาห์หน้า</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
