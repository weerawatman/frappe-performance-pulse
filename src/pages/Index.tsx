
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Target, 
  Award,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  ArrowRight,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "การจัดการ KPI/KRA",
      description: "ติดตามและประเมินผลงานตามเป้าหมายที่กำหนด",
      status: "ใช้งานได้"
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "ระบบประเมินผลงาน",
      description: "ประเมินผลการปฏิบัติงานแบบครอบคลุม",
      status: "ใช้งานได้"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
      title: "Feedback 360 องศา",
      description: "รับฟีดแบ็กจากผู้บังคับบัญชาและเพื่อนร่วมงาน",
      status: "เร็วๆ นี้"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "รายงานและวิเคราะห์",
      description: "รายงานสถิติและแนวโน้มการประเมิน",
      status: "ใช้งานได้"
    },
    {
      icon: <Calendar className="w-8 h-8 text-red-600" />,
      title: "จัดการรอบการประเมิน",
      description: "กำหนดและควบคุมรอบการประเมินต่างๆ",
      status: "ใช้งานได้"
    },
    {
      icon: <Settings className="w-8 h-8 text-gray-600" />,
      title: "เทมเพลตการประเมิน",
      description: "สร้างและจัดการเทมเพลตสำหรับแต่ละตำแหน่ง",
      status: "ใช้งานได้"
    }
  ];

  const stats = [
    { label: "พนักงานในระบบ", value: "2,000+", icon: <Users className="w-6 h-6" /> },
    { label: "การประเมินเสร็จสิ้น", value: "1,650", icon: <Award className="w-6 h-6" /> },
    { label: "คะแนนเฉลี่ย", value: "78.5%", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "ความพึงพอใจ", value: "94%", icon: <Target className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 text-sm px-4 py-2">
              Performance Management System v2.0
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              ระบบจัดการ
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}ประเมินผลงาน{" "}
              </span>
              ที่ครอบคลุม
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ระบบจัดการการประเมินผลงานพนักงานแบบครอบคลุม รองรับ KPI/KRA, การประเมินตนเอง, 
              และ Feedback 360 องศา สำหรับองค์กรขนาดใหญ่ที่มีพนักงานหลายพันคน
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                onClick={() => navigate('/performance')}
              >
                เริ่มใช้งานระบบ
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 hover:bg-gray-50"
              >
                ดูตัวอย่างระบบ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ฟีเจอร์หลักของระบบ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ระบบที่ออกแบบมาเพื่อตอบสนองความต้องการการจัดการประเมินผลงานอย่างครอบคลุมและมีประสิทธิภาพ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon}
                  <Badge 
                    variant={feature.status === "ใช้งานได้" ? "default" : "secondary"}
                    className={feature.status === "ใช้งานได้" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ทำไมต้องเลือกระบบของเรา
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ระบบที่พัฒนาตามมาตรฐาน Frappe HR พร้อมความสามารถรองรับองค์กรขนาดใหญ่
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg border-0">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full">
                    <Zap className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">ประสิทธิภาพสูง</h3>
                <p className="text-gray-600">
                  รองรับการใช้งานจากพนักงานหลายพันคนพร้อมกัน ด้วยระบบที่เสถียรและรวดเร็ว
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full">
                    <Shield className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">ความปลอดภัย</h3>
                <p className="text-gray-600">
                  ระบบรักษาความปลอดภัยข้อมูลระดับองค์กร พร้อมการควบคุมสิทธิการเข้าถึงที่ละเอียด
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full">
                    <Globe className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">ปรับแต่งได้</h3>
                <p className="text-gray-600">
                  สามารถปรับแต่งให้เข้ากับโครงสร้างและกระบวนการของแต่ละองค์กรได้อย่างยืดหยุ่น
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl border-0">
          <CardContent className="text-center py-16 px-8">
            <h2 className="text-4xl font-bold mb-6">
              พร้อมที่จะเริ่มต้นแล้วหรือยัง?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              เริ่มใช้งานระบบ Performance Management ที่จะช่วยยกระดับการจัดการประเมินผลงานในองค์กรของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4"
                onClick={() => navigate('/performance')}
              >
                เข้าสู่ระบบ
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
              >
                ดูคู่มือการใช้งาน
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
