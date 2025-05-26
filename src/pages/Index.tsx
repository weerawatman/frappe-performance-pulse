
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Target, BarChart3, Workflow, Shield, Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, logout } = useAuth();

  const features = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Performance Management",
      description: "ระบบประเมินผลงานและพัฒนาพนักงานแบบครบวงจร",
      link: "/performance",
      status: "Active"
    },
    {
      icon: <Workflow className="w-8 h-8 text-green-600" />,
      title: "Workflows",
      description: "จัดการขั้นตอนการทำงานและการอนุมัติ",
      link: "/workflows",
      status: "Active"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Reports & Analytics",
      description: "รายงานและการวิเคราะห์ข้อมูลประสิทธิภาพ",
      link: "/reports",
      status: "Active"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Role Management",
      description: "จัดการสิทธิ์ผู้ใช้และความปลอดภัยระบบ",
      link: "/roles",
      status: "New"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HR Management System</h1>
                <p className="text-sm text-gray-600">ระบบจัดการทรัพยากรบุคคลครบวงจร</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                ยินดีต้อนรับ, <span className="font-semibold">{user?.name}</span>
              </div>
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge variant="secondary">v2.0</Badge>
              <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ยินดีต้อนรับสู่ระบบ HR Management
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            เพิ่มประสิทธิภาพการจัดการทรัพยากรบุคคลด้วยเครื่องมือที่ทันสมัย
            พร้อมระบบแจ้งเตือนและการกำหนดสิทธิ์ที่ปลอดภัย
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/performance">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                เริ่มต้นใช้งาน
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/roles">
              <Button size="lg" variant="outline">
                จัดการสิทธิ์
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <Badge 
                    variant={feature.status === "New" ? "default" : "secondary"}
                    className={feature.status === "New" ? "bg-green-500" : ""}
                  >
                    {feature.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {feature.description}
                </CardDescription>
                <Link to={feature.link}>
                  <Button variant="outline" className="w-full">
                    เข้าสู่โมดูล
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">พนักงานในระบบ</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">ความพึงพอใจ</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">การแจ้งเตือน</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">ความปลอดภัย</div>
            </CardContent>
          </Card>
        </div>

        {/* New Features Highlight */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">ฟีเจอร์ใหม่ในเวอร์ชัน 2.0</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">ระบบแจ้งเตือนอัจฉริยะ</h4>
                <p className="text-gray-600">แจ้งเตือนแบบ Real-time สำหรับการประเมิน, กำหนดส่งงาน, และ feedback</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">การจัดการสิทธิ์ขั้นสูง</h4>
                <p className="text-gray-600">ระบบสิทธิ์แบบหลายระดับ พร้อม Audit Log และการเข้ารหัสข้อมูล</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 HR Management System. All rights reserved.</p>
            <p className="mt-2">พัฒนาด้วยเทคโนโลยีที่ทันสมัยเพื่อความปลอดภัยสูงสุด</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
