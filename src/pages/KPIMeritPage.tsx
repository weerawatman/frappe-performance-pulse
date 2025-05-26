
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Send, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CompetencyItem, CultureItem } from "@/types/merit";
import CompetencyTable from "@/components/merit/CompetencyTable";
import CultureTable from "@/components/merit/CultureTable";

const KPIMeritPage = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<'draft' | 'submitted'>('draft');

  // Mock data with evaluation_levels property
  const [competencyItems, setCompetencyItems] = useState<CompetencyItem[]>([
    {
      id: "1",
      name: "การวิเคราะห์และแก้ไขปัญหา",
      description: "ความสามารถในการวิเคราะห์สถานการณ์และหาทางแก้ไขปัญหาได้อย่างมีประสิทธิภาพ",
      weight: 25,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, description: "ต้องการคำแนะนำในการแก้ไขปัญหา" },
        { level: 2, description: "สามารถแก้ไขปัญหาเบื้องต้นได้" },
        { level: 3, description: "แก้ไขปัญหาได้ดีและมีประสิทธิภาพ" },
        { level: 4, description: "แก้ไขปัญหาซับซ้อนได้และช่วยเหลือผู้อื่น" },
        { level: 5, description: "เป็นผู้เชี่ยวชาญในการแก้ไขปัญหา" }
      ]
    },
    {
      id: "2",
      name: "การทำงานเป็นทีม",
      description: "ความสามารถในการทำงานร่วมกับผู้อื่นอย่างมีประสิทธิภาพ",
      weight: 20,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, description: "ทำงานได้ดีเมื่ออยู่คนเดียว" },
        { level: 2, description: "ทำงานร่วมกับผู้อื่นได้" },
        { level: 3, description: "ทำงานเป็นทีมได้ดี" },
        { level: 4, description: "เป็นแกนนำในการทำงานทีม" },
        { level: 5, description: "สร้างประสิทธิภาพทีมให้สูงขึ้น" }
      ]
    },
    {
      id: "3",
      name: "การเรียนรู้และพัฒนา",
      description: "ความตั้งใจและความสามารถในการเรียนรู้สิ่งใหม่",
      weight: 25,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, description: "เรียนรู้เมื่อมีความจำเป็น" },
        { level: 2, description: "แสวงหาความรู้ใหม่เป็นครั้งคราว" },
        { level: 3, description: "เรียนรู้อย่างต่อเนื่อง" },
        { level: 4, description: "เรียนรู้และนำไปประยุกต์ใช้ได้ดี" },
        { level: 5, description: "เป็นผู้นำในการเรียนรู้และแบ่งปัน" }
      ]
    },
    {
      id: "4",
      name: "การสื่อสาร",
      description: "ความสามารถในการสื่อสารอย่างชัดเจนและมีประสิทธิภาพ",
      weight: 30,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, description: "สื่อสารได้เมื่อจำเป็น" },
        { level: 2, description: "สื่อสารได้ชัดเจน" },
        { level: 3, description: "สื่อสารได้ดีและเข้าใจง่าย" },
        { level: 4, description: "สื่อสารได้ดีในทุกสถานการณ์" },
        { level: 5, description: "เป็นแบบอย่างในการสื่อสาร" }
      ]
    }
  ]);

  const [cultureItems, setCultureItems] = useState<CultureItem[]>([
    {
      id: "1",
      name: "ความซื่อสัตย์สุจริต",
      description: "การปฏิบัติตนด้วยความซื่อสัตย์และโปร่งใส",
      weight: 30,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, description: "ปฏิบัติตามกฎระเบียบขั้นพื้นฐาน" },
        { level: 2, description: "ซื่อสัตย์ในการทำงาน" },
        { level: 3, description: "เป็นแบบอย่างความซื่อสัตย์" },
        { level: 4, description: "ส่งเสริมความซื่อสัตย์ในทีม" },
        { level: 5, description: "เป็นผู้นำด้านคุณธรรม" }
      ]
    },
    {
      id: "2",
      name: "การมุ่งเน้นลูกค้า",
      description: "การให้ความสำคัญกับความพึงพอใจของลูกค้า",
      weight: 25,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, description: "ให้บริการลูกค้าตามมาตรฐาน" },
        { level: 2, description: "ใส่ใจในความต้องการลูกค้า" },
        { level: 3, description: "มุ่งมั่นสร้างความพึงพอใจ" },
        { level: 4, description: "สร้างประสบการณ์ที่ดีให้ลูกค้า" },
        { level: 5, description: "เป็นผู้เชี่ยวชาญด้านการบริการ" }
      ]
    },
    {
      id: "3",
      name: "นวัตกรรมและการปรับตัว",
      description: "ความสามารถในการปรับตัวและสร้างสิ่งใหม่",
      weight: 25,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, description: "ปรับตัวเมื่อมีการเปลี่ยนแปลง" },
        { level: 2, description: "รับการเปลี่ยนแปลงได้ดี" },
        { level: 3, description: "มีแนวคิดใหม่ๆ เป็นครั้งคราว" },
        { level: 4, description: "สร้างนวัตกรรมในการทำงาน" },
        { level: 5, description: "เป็นผู้นำด้านนวัตกรรม" }
      ]
    },
    {
      id: "4",
      name: "ความรับผิดชอบ",
      description: "การรับผิดชอบต่อหน้าที่และผลงาน",
      weight: 20,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, description: "ทำงานตามที่ได้รับมอบหมาย" },
        { level: 2, description: "รับผิดชอบงานของตนเอง" },
        { level: 3, description: "รับผิดชอบและช่วยเหลือผู้อื่น" },
        { level: 4, description: "มีความรับผิดชอบสูง" },
        { level: 5, description: "เป็นแบบอย่างด้านความรับผิดชอบ" }
      ]
    }
  ]);

  const handleSaveDraft = () => {
    setStatus('draft');
    console.log('บันทึกร่าง Merit KPI');
  };

  const handleSubmit = () => {
    setStatus('submitted');
    console.log('ส่งอนุมัติ Merit KPI');
  };

  const handleCompetencyUpdate = (items: CompetencyItem[]) => {
    setCompetencyItems(items);
  };

  const handleCultureUpdate = (items: CultureItem[]) => {
    setCultureItems(items);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/employee-dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  กลับ
                </Button>
              </Link>
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">กำหนด KPI Merit</h1>
                <p className="text-sm text-gray-600">ประเมินสมรรถนะและวัฒนธรรมองค์กร</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={status === 'submitted' ? 'default' : 'secondary'}>
                {status === 'submitted' ? 'ส่งอนุมัติแล้ว' : 'ร่าง'}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Introduction Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                การประเมิน Merit (สมรรถนะและวัฒนธรรม)
              </CardTitle>
              <CardDescription>
                ประเมินผลงานตามสมรรถนะหลักและค่านิยมขององค์กร โดยแบ่งเป็น 2 ส่วนหลัก
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Competency Section */}
          <Card>
            <CardHeader>
              <CardTitle>สมรรถนะหลัก (Core Competency)</CardTitle>
              <CardDescription>
                ประเมินทักษะและความสามารถที่จำเป็นสำหรับตำแหน่งงาน
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompetencyTable 
                items={competencyItems} 
                onUpdate={handleCompetencyUpdate}
                readonly={status === 'submitted'}
              />
            </CardContent>
          </Card>

          {/* Culture Section */}
          <Card>
            <CardHeader>
              <CardTitle>วัฒนธรรมองค์กร (Corporate Culture)</CardTitle>
              <CardDescription>
                ประเมินการปฏิบัติตามค่านิยมและวัฒนธรรมขององค์กร
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CultureTable 
                items={cultureItems} 
                onUpdate={handleCultureUpdate}
                readonly={status === 'submitted'}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {status !== 'submitted' && (
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                บันทึกร่าง
              </Button>
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4 mr-2" />
                ส่งอนุมัติ
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default KPIMeritPage;
