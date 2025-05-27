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
  const [status, setStatus<'draft' | 'submitted'>('draft');

  // Load status from localStorage
  React.useEffect(() => {
    const savedStatus = localStorage.getItem('kpiStatus');
    if (savedStatus) {
      const parsedStatus = JSON.parse(savedStatus);
      if (parsedStatus.merit) {
        if (parsedStatus.merit === 'pending_checker' || parsedStatus.merit === 'pending_approver' || parsedStatus.merit === 'completed') {
          setStatus('submitted');
        }
      }
    }
  }, []);

  // Mock data with proper evaluation_levels structure
  const [competencyItems, setCompetencyItems] = useState<CompetencyItem[]>([
    {
      id: "1",
      name: "การวิเคราะห์และแก้ไขปัญหา",
      description: "ความสามารถในการวิเคราะห์สถานการณ์และหาทางแก้ไขปัญหาได้อย่างมีประสิทธิภาพ",
      weight: 25,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, title: "ระดับเริ่มต้น", description: "ต้องการคำแนะนำในการแก้ไขปัญหา", behavioral_examples: ["ต้องการคำแนะนำในการระบุปัญหา", "ใช้วิธีการที่เรียนรู้มาแล้ว"] },
        { level: 2, title: "ระดับพัฒนา", description: "สามารถแก้ไขปัญหาเบื้องต้นได้", behavioral_examples: ["แก้ไขปัญหาง่ายๆ ได้เอง", "เริ่มคิดหาทางเลือก"] },
        { level: 3, title: "ระดับชำนาญ", description: "แก้ไขปัญหาได้ดีและมีประสิทธิภาพ", behavioral_examples: ["วิเคราะห์ปัญหาได้อย่างครบถ้วน", "เสนอทางเลือกหลายแนวทาง"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "แก้ไขปัญหาซับซ้อนได้และช่วยเหลือผู้อื่น", behavioral_examples: ["แก้ไขปัญหาซับซ้อน", "ช่วยเหลือเพื่อนร่วมงาน"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "เป็นผู้เชี่ยวชาญในการแก้ไขปัญหา", behavioral_examples: ["เป็นที่ปรึกษาของทีม", "สร้างระบบแก้ไขปัญหา"] }
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
        { level: 1, title: "ระดับเริ่มต้น", description: "ทำงานได้ดีเมื่ออยู่คนเดียว", behavioral_examples: ["ทำงานคนเดียวได้ดี", "ไม่ค่อยมีส่วนร่วมกับทีม"] },
        { level: 2, title: "ระดับพัฒนา", description: "ทำงานร่วมกับผู้อื่นได้", behavioral_examples: ["เริ่มทำงานร่วมกับผู้อื่น", "รับฟังความคิดเห็น"] },
        { level: 3, title: "ระดับชำนาญ", description: "ทำงานเป็นทีมได้ดี", behavioral_examples: ["ร่วมมือกับทีม", "แบ่งปันความรู้"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "เป็นแกนนำในการทำงานทีม", behavioral_examples: ["นำทีมแก้ไขปัญหา", "สร้างบรรยากาศที่ดี"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "สร้างประสิทธิภาพทีมให้สูงขึ้น", behavioral_examples: ["พัฒนาทีมให้มีประสิทธิภาพ", "เป็นที่ปรึกษาของทีม"] }
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
        { level: 1, title: "ระดับเริ่มต้น", description: "เรียนรู้เมื่อมีความจำเป็น", behavioral_examples: ["เรียนรู้เมื่อจำเป็น", "ไม่ค่อยแสวงหาความรู้ใหม่"] },
        { level: 2, title: "ระดับพัฒนา", description: "แสวงหาความรู้ใหม่เป็นครั้งคราว", behavioral_examples: ["เริ่มแสวงหาความรู้ใหม่", "เข้าร่วมอบรมบ้าง"] },
        { level: 3, title: "ระดับชำนาญ", description: "เรียนรู้อย่างต่อเนื่อง", behavioral_examples: ["เรียนรู้อย่างสม่ำเสมอ", "ติดตามข่าวสาร"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "เรียนรู้และนำไปประยุกต์ใช้ได้ดี", behavioral_examples: ["นำความรู้ไปใช้ในการทำงาน", "ปรับปรุงวิธีการทำงาน"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "เป็นผู้นำในการเรียนรู้และแบ่งปัน", behavioral_examples: ["แบ่งปันความรู้ให้ผู้อื่น", "สร้างวัฒนธรรมการเรียนรู้"] }
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
        { level: 1, title: "ระดับเริ่มต้น", description: "สื่อสารได้เมื่อจำเป็น", behavioral_examples: ["สื่อสารเมื่อจำเป็น", "ไม่ค่อยแสดงความคิดเห็น"] },
        { level: 2, title: "ระดับพัฒนา", description: "สื่อสารได้ชัดเจน", behavioral_examples: ["สื่อสารได้ชัดเจน", "ใช้ภาษาที่เข้าใจง่าย"] },
        { level: 3, title: "ระดับชำนาญ", description: "สื่อสารได้ดีและเข้าใจง่าย", behavioral_examples: ["สื่อสารได้ดี", "อธิบายได้เข้าใจง่าย"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "สื่อสารได้ดีในทุกสถานการณ์", behavioral_examples: ["สื่อสารได้ดีในทุกสถานการณ์", "ปรับวิธีการสื่อสารให้เหมาะสม"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "เป็นแบบอย่างในการสื่อสาร", behavioral_examples: ["เป็นแบบอย่างในการสื่อสาร", "สอนทักษะการสื่อสารให้ผู้อื่น"] }
      ]
    }
  ]);

  const [cultureItems, setCultureItems] = useState<CultureItem[]>([
    {
      id: "1",
      name: "สัญญา โปร่งใส",
      description: "การปฏิบัติหน้าที่ด้วยความซื่อสัตย์และส่งมอบงานตามข้อตกลงหรือสัญญาที่ได้ตกลงกันไว้ ด้วยความโปร่งใส",
      weight: 6,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, title: "ระดับเริ่มต้น", description: "ปฏิบัติตามกฎระเบียบขั้นพื้นฐาน", behavioral_examples: ["ปฏิบัติตามกฎระเบียบ", "ตรงต่อเวลา"] },
        { level: 2, title: "ระดับพัฒนา", description: "ซื่อสัตย์ในการทำงาน", behavioral_examples: ["รายงานผลงานตรงตามความเป็นจริง", "ไม่ใช้เวลาส่วนตัวในการทำงาน"] },
        { level: 3, title: "ระดับชำนาญ", description: "เป็นแบบอย่างความซื่อสัตย์", behavioral_examples: ["เป็นแบบอย่างให้เพื่อนร่วมงาน", "โปร่งใสในการทำงาน"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "ส่งเสริมความซื่อสัตย์ในทีม", behavioral_examples: ["สร้างวัฒนธรรมความซื่อสัตย์", "แก้ไขปัญหาด้วยความยุติธรรม"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "เป็นผู้นำด้านคุณธรรม", behavioral_examples: ["เป็นผู้นำด้านจริยธรรม", "สร้างมาตรฐานคุณธรรม"] }
      ]
    },
    {
      id: "2",
      name: "ใส่ใจเรียนรู้",
      description: "การตั้งใจเรียนรู้สิ่งใหม่ๆ รวมถึงเทคโนโลยี และนำมาใช้ปรับปรุง พัฒนา การทำงาน บริการ หรือผลิตภัณฑ์ ให้ดีขึ้นอย่างต่อเนื่อง",
      weight: 6,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, title: "ระดับเริ่มต้น", description: "เรียนรู้เมื่อมีความจำเป็น", behavioral_examples: ["เรียนรู้เมื่อจำเป็น", "ไม่ค่อยแสวงหาความรู้ใหม่"] },
        { level: 2, title: "ระดับพัฒนา", description: "แสวงหาความรู้ใหม่เป็นครั้งคราว", behavioral_examples: ["เริ่มแสวงหาความรู้ใหม่", "เข้าร่วมอบรมบ้าง"] },
        { level: 3, title: "ระดับชำนาญ", description: "เรียนรู้อย่างต่อเนื่อง", behavioral_examples: ["เรียนรู้อย่างสม่ำเสมอ", "ติดตามข่าวสาร"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "เรียนรู้และนำไปประยุกต์ใช้ได้ดี", behavioral_examples: ["นำความรู้ไปใช้ในการทำงาน", "ปรับปรุงวิธีการทำงาน"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "เป็นผู้นำในการเรียนรู้และแบ่งปัน", behavioral_examples: ["แบ่งปันความรู้ให้ผู้อื่น", "สร้างวัฒนธรรมการเรียนรู้"] }
      ]
    },
    {
      id: "3",
      name: "สู่การเปลี่ยนแปลง",
      description: "การเปิดรับสิ่งใหม่ วางแผนปรับตัว เตรียมความพร้อมสำหรับการเปลี่ยนแปลงอย่างรวดเร็ว",
      weight: 6,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, title: "ระดับเริ่มต้น", description: "ปรับตัวเมื่อมีการเปลี่ยนแปลง", behavioral_examples: ["ปรับตัวเมื่อมีการเปลี่ยนแปลง", "เรียนรู้สิ่งใหม่ๆ"] },
        { level: 2, title: "ระดับพัฒนา", description: "รับการเปลี่ยนแปลงได้ดี", behavioral_examples: ["ยอมรับการเปลี่ยนแปลง", "ไม่ต่อต้านการเปลี่ยนแปลง"] },
        { level: 3, title: "ระดับชำนาญ", description: "มีแนวคิดใหม่ๆ เป็นครั้งคราว", behavioral_examples: ["เสนอแนวคิดใหม่ๆ", "ปรับปรุงวิธีการทำงาน"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "สร้างนวัตกรรมในการทำงาน", behavioral_examples: ["สร้างนวัตกรรม", "พัฒนาผลิตภัณฑ์ใหม่"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "เป็นผู้นำด้านนวัตกรรม", behavioral_examples: ["เป็นผู้นำด้านนวัตกรรม", "สร้างวัฒนธรรมนวัตกรรม"] }
      ]
    },
    {
      id: "4",
      name: "แสดงการยอมรับ",
      description: "การยอมรับความแตกต่าง และเปิดใจรับฟังความคิดเห็นของทุกคนในทีมเพื่อหาแนวทางที่ดีที่สุดในการแก้ไขปัญหา",
      weight: 6,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, title: "ระดับเริ่มต้น", description: "ทำงานตามที่ได้รับมอบหมาย", behavioral_examples: ["ทำงานตามที่ได้รับมอบหมาย", "ส่งงานตรงเวลา"] },
        { level: 2, title: "ระดับพัฒนา", description: "รับผิดชอบงานของตนเอง", behavioral_examples: ["รับผิดชอบงานของตนเอง", "แก้ไขข้อผิดพลาด"] },
        { level: 3, title: "ระดับชำนาญ", description: "รับผิดชอบและช่วยเหลือผู้อื่น", behavioral_examples: ["ช่วยเหลือเพื่อนร่วมงาน", "แก้ไขปัญหาร่วมกัน"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "มีความรับผิดชอบสูง", behavioral_examples: ["รับผิดชอบงานที่ได้รับมอบหมาย", "แก้ไขปัญหาอย่างรวดเร็ว"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "เป็นแบบอย่างด้านความรับผิดชอบ", behavioral_examples: ["เป็นแบบอย่างด้านความรับผิดชอบ", "สร้างวัฒนธรรมความรับผิดชอบ"] }
      ]
    },
    {
      id: "5",
      name: "สนับสนุนลูกค้า",
      description: "การทำความเข้าใจความคาดหวังของลูกค้า (ทั้งภายในและภายนอก) อย่างถ่องแท้ และใส่ใจในคุณค่าของงานและบริการที่ส่งมอบให้ลูกค้า",
      weight: 6,
      self_score: 0,
      supervisor_score: 0,
      evaluation_levels: [
        { level: 1, title: "ระดับเริ่มต้น", description: "ให้บริการลูกค้าตามมาตรฐาน", behavioral_examples: ["ให้บริการตามมาตรฐาน", "ตอบคำถามลูกค้า"] },
        { level: 2, title: "ระดับพัฒนา", description: "ใส่ใจในความต้องการลูกค้า", behavioral_examples: ["สอบถามความต้องการลูกค้า", "ให้คำแนะนำ"] },
        { level: 3, title: "ระดับชำนาญ", description: "มุ่งมั่นสร้างความพึงพอใจ", behavioral_examples: ["แก้ไขปัญหาให้ลูกค้า", "สร้างความประทับใจ"] },
        { level: 4, title: "ระดับเชี่ยวชาญ", description: "สร้างประสบการณ์ที่ดีให้ลูกค้า", behavioral_examples: ["สร้างความสัมพันธ์ที่ดีกับลูกค้า", "นำเสนอสินค้าและบริการที่เหมาะสม"] },
        { level: 5, title: "ระดับผู้เชี่ยวชาญ", description: "เป็นผู้เชี่ยวชาญด้านการบริการ", behavioral_examples: ["พัฒนาบริการให้ดีขึ้น", "เป็นที่ปรึกษาด้านบริการ"] }
      ]
    }
  ]);

  const handleSaveDraft = () => {
    // Save draft status to localStorage
    const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
    console.log('Current status before save draft (Merit):', currentStatus);
    currentStatus.merit = 'draft';
    localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
    console.log('Updated status after save draft (Merit):', currentStatus);
    
    // Dispatch custom event to update other components
    window.dispatchEvent(new CustomEvent('kpiStatusUpdate', { detail: { type: 'merit', status: 'draft' } }));
    console.log('Dispatched kpiStatusUpdate event for Merit draft');
    
    setStatus('draft');
    console.log('บันทึกร่าง Merit KPI');
  };

  const handleSubmit = () => {
    // Save submitted status to localStorage
    const currentStatus = JSON.parse(localStorage.getItem('kpiStatus') || '{"bonus": "not_started", "merit": "not_started"}');
    console.log('Current status before submit (Merit):', currentStatus);
    currentStatus.merit = 'pending_checker';
    localStorage.setItem('kpiStatus', JSON.stringify(currentStatus));
    console.log('Updated status after submit (Merit):', currentStatus);
    
    // Dispatch custom event to update other components immediately
    window.dispatchEvent(new CustomEvent('kpiStatusUpdate', { detail: { type: 'merit', status: 'pending_checker' } }));
    console.log('Dispatched kpiStatusUpdate event for Merit submit');
    
    // Also trigger a storage event manually for same-window updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'kpiStatus',
      newValue: JSON.stringify(currentStatus),
      storageArea: localStorage
    }));
    console.log('Dispatched storage event manually for Merit');
    
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
                competencyItems={competencyItems}
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
                ประเมินการปฏิบัติตามค่านิยมและวัฒนธรรมขององค์กร (น้ำหนักรวม 30%)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CultureTable 
                cultureItems={cultureItems}
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
