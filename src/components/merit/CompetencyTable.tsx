
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Users, Eye, Info } from 'lucide-react';
import { CompetencyItem } from '@/types/merit';

interface CompetencyTableProps {
  competencyItems: CompetencyItem[];
}

const CompetencyTable: React.FC<CompetencyTableProps> = ({ competencyItems }) => {
  const [selectedCompetency, setSelectedCompetency] = useState<CompetencyItem | null>(null);
  const [expectedBehaviors, setExpectedBehaviors] = useState<{[key: string]: string}>({});

  const handleBehaviorChange = (competencyId: string, value: string) => {
    setExpectedBehaviors(prev => ({
      ...prev,
      [competencyId]: value
    }));
  };

  const getLevelBadgeColor = (level: number) => {
    switch (level) {
      case 1: return "bg-red-100 text-red-700";
      case 2: return "bg-orange-100 text-orange-700";
      case 3: return "bg-yellow-100 text-yellow-700";
      case 4: return "bg-blue-100 text-blue-700";
      case 5: return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getCompetencyDetails = (competencyId: string) => {
    switch (competencyId) {
      case '1':
        return {
          inputProcess: (
            <div className="text-sm space-y-1">
              <div>1) รวบรวมความต้องการและปัญหาการใช้งาน รวมถึงศึกษาความต้องการ Self Service ด้าน HR</div>
              <div>2) ออกแบบแนวทางโปรแกรม e-PMS และ Self Service ร่วมกับ BU, Supplier และ IT</div>
              <div>3) รวบรวมข้อมูล KPI Bonus & Merit (MGR up) เพื่อนำเข้า e-PMS และเตรียมข้อมูล Self Service</div>
              <div>4) ศึกษาระบบ e-PMS และ Self Service เพื่อให้คำแนะนำและแก้ไขปัญหา</div>
              <div>5) สนับสนุนและแก้ไขปัญหาการใช้งาน e-PMS และ Self Service</div>
            </div>
          ),
          output: (
            <div className="text-sm space-y-1">
              <div>1) e-PMS : มีการนำเอาข้อมูล Manager up เข้าระบบ e-PMS 100%</div>
              <div>2) HR E-Request และ/หรือ HR Connect Application มีผู้ใช้งาน, ลดเวลาในกระบวนการ (Man-Hour) ลงมากกว่า 10%</div>
              <div>KPI2 : New PMS System 2025 (E-PMS)</div>
              <div>KPI3 : HR One Data Center</div>
            </div>
          )
        };
      case '2':
        return {
          inputProcess: (
            <div className="text-sm space-y-1">
              <div>1) ศึกษาเครื่องมือประเมินค่างานใหม่ และกระบวนการวิเคราะห์โครงสร้างองค์กร</div>
              <div>2) วิเคราะห์ข้อมูลภายในและศึกษา Benchmark ภายนอกเพื่อประเมินค่างานและบริหาร Manpower</div>
              <div>3) ทบทวน Job Description, ประเมินค่างาน AGM up, กำหนด Strategic Position</div>
              <div>4) ทบทวนโครงสร้างค่าตอบแทน</div>
            </div>
          ),
          output: (
            <div className="text-sm space-y-1">
              <div>1) Job Evaluation (Process and Tool) ถูกกำหนดใช้เป็นมาตรฐานสำหรับ SAT และอยู่ในรูปแบบฐานข้อมูลที่สามารถนำมา Analyse ได้ 100% (AGM up)</div>
              <div>2) ปรับปรุงระเบียบและวิธีปฏิบัติตามแนวทางที่นำเสนอจาก EHM (ที่ไม่เกี่ยวกับตัวเงิน) อย่างน้อย 2 เรื่อง</div>
              <div>KPI4 : Strategic Position and Job Evaluation (MGR up)</div>
              <div>KPI5 : Organization and Manpower Planning Guideline</div>
            </div>
          )
        };
      case '3':
        return {
          inputProcess: (
            <div className="text-sm space-y-1">
              <div><strong>Input & Process - Digital and AI</strong></div>
              <div>1) เรียนรู้เพื่อนำเครื่องมือ Digital & AI มาประยุกต์ใช้ในการทำงานจริง</div>
              <div>2) วิเคราะห์ร่วมกับหน่วยงานที่เกี่ยวข้องเพื่อประเมินทักษะ Digital ของ Foreman up และความต้องการทักษะ Digital</div>
              <div>3) จัดกิจกรรมให้ Foreman up มีส่วนร่วมในการเรียนรู้และใช้เครื่องมือ Digital & AI</div>
              <div><strong>Input & Process - Monitoring Dashboard</strong></div>
              <div>1) เชื่อมโยง HR KPI ของ HR แต่ละ Function ใน Corporate ให้ Align กับ GL01</div>
              <div>2) นำเข้าสู่ระบบ Digital และ Monitoring</div>
            </div>
          ),
          output: (
            <div className="text-sm space-y-1">
              <div>1) Foreman ที่เข้าร่วมการพัฒนาทักษะ มีการนำ Digital & AI Tool ปรับใช้ในงานที่รับผิดชอบในปัจจุบันอย่างน้อยคนละ 1 เรื่อง</div>
              <div>2) กิจกรรมชมรม AI มีการจัดอย่างน้อย 4 ครั้งต่อปี, สามารถดึงพนักงานระดับ Foreman up เข้ามามีส่วนร่วมในกิจกรรมได้อย่างน้อย 50% ต่อครั้ง</div>
              <div>3) HR KPI Alignment และสามารถ Monitor Plan vs Actual บนระบบ Digital ได้</div>
              <div>KPI1 : พัฒนา Foreman up 160 คนให้เป็น Digitalization Citizen (กลุ่มเป้าหมาย Foreman up 160 คน จาก 538 คน)</div>
              <div>KPI6 : People Strategy Monitoring Dashboard</div>
            </div>
          )
        };
      case '4':
        return {
          inputProcess: (
            <div className="text-sm space-y-1">
              <div>1) วางแผนการนำเสนอวาระ EHM, รวบรวมข้อมูลและกรอบการนำเสนอ</div>
              <div>2) ประสานผู้รับผิดชอบวาระและสนับสนุนการเตรียมงานนำเสนอ</div>
              <div>3) ออกแบบ/สร้าง/ปรับปรุง Dashboard นำเสนอผู้บริหารและติดตามข้อมูล</div>
              <div>4) เรียนรู้และพัฒนาทักษะ Data Storytelling, Presentation Skill และการสื่อสาร</div>
            </div>
          ),
          output: (
            <div className="text-sm space-y-1">
              <div>1) ตารางการกำหนดวาระ EHM ในทุกเดือน, เตรียมวาระเตรียมข้อมูลและเนื้อหาในการนำเสนอที่จำเป็นต่อการนำเสนอวาระนั้นๆ รวมถึงการวาง Story นำเสนอได้</div>
              <div>2) สรุปรายงานการประชุม EHM ได้ครบถ้วนในเนื้อหา และสื่อให้ผู้รับเข้าใจในเนื้อหาเพื่อดำเนินการต่อได้</div>
              <div>KPI7 : บริหารการประชุม EHM, NC, ED & BOD</div>
            </div>
          )
        };
      default:
        return { inputProcess: null, output: null };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          Competency (30%)
        </CardTitle>
        <p className="text-sm text-gray-600">
          ความสามารถและทักษะที่จำเป็นสำหรับตำแหน่งงาน โดยจะได้รับการประเมินจากผู้บังคับบัญชา
        </p>
      </CardHeader>
      <CardContent>
        {/* Evaluation Level Reference Table */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-800">ส่วนที่ 2 : การประเมิน Competency</h4>
          <p className="text-sm text-gray-600 mb-3">
            หลักเกณฑ์การประเมิน (Evaluation Score System) โดยกำหนดจากเกณฑ์เปี้าหมายกิจกรรม (Expected Key Result) และเปรียบเทียบกับ หลักเกณฑ์การประเมินผลการปฏิบัติงาน/ความสอดคล้อง ของ Competency และ วัฒนธรรมองค์กร ลงใน ช่อง ระดับที่ 1 - 5 คะแนน
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800 text-white">
                  <TableHead className="text-white font-semibold">Level : 1</TableHead>
                  <TableHead className="text-white font-semibold">Level : 2</TableHead>
                  <TableHead className="text-white font-semibold">Level : 3</TableHead>
                  <TableHead className="text-white font-semibold">Level : 4</TableHead>
                  <TableHead className="text-white font-semibold">Level : 5</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      ความรู้/ความเข้าใจ/ใช้เครื่องมือเริ่มต้น
                      ผลงาน 60%
                    </div>
                  </TableCell>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      ความรู้/ความเข้าใจ/ใช้เครื่องมือพื้นฐาน
                      ผลงาน 60% - 69%
                    </div>
                  </TableCell>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      ความรู้/ความเข้าใจ/ใช้เครื่องมือพอใช้
                      ผลงาน 70% - 79%
                    </div>
                  </TableCell>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      ความรู้/ความเข้าใจ/ใช้เครื่องมือดี
                      ผลงาน 80% - 89%
                    </div>
                  </TableCell>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      ความรู้/ความเข้าใจ/ใช้เครื่องมือดีเยี่ยม
                      ผลงาน 90% ขึ้นไป
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Competency Items Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">ประเภท Competency (Competency Type)</TableHead>
                <TableHead className="w-1/4">Item (หัวข้อ)</TableHead>
                <TableHead className="text-center w-16">Weight% (น้ำหนัก)</TableHead>
                <TableHead className="w-1/3">Input & Process - ชี้ให้เห็นความเชื่อมโยงกับเป้าหมายขององค์กรและหน้าที่</TableHead>
                <TableHead className="w-1/3">Output - ผลลัพธ์ของงานในรูปขอบเขตชัดเจน (มีตัวเลขชี้วัดที่ใช้วัดผลสำเร็จ) ไม่ว่าจะเชิง KPI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competencyItems.map((competency) => {
                const details = getCompetencyDetails(competency.id);
                return (
                  <TableRow key={competency.id}>
                    <TableCell className="font-medium align-top">
                      <div className="whitespace-normal break-words">
                        {competency.name}
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="text-sm text-gray-600 whitespace-normal break-words leading-relaxed">
                        {competency.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-center align-top">
                      <Badge variant="outline">{competency.weight}%</Badge>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="whitespace-normal break-words leading-relaxed">
                        {details.inputProcess}
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="whitespace-normal break-words leading-relaxed">
                        {details.output}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-700 whitespace-normal break-words leading-relaxed">
                <strong>หมายเหตุ:</strong> การประเมิน Competency จะดำเนินการโดยผู้บังคับบัญชาโดยตรง 
                พนักงานสามารถดูรายละเอียดเกณฑ์การประเมินเพื่อเตรียมความพร้อมได้
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                รวมคะแนน Competency: <strong>{competencyItems.reduce((sum, item) => sum + item.weight, 0)}%</strong>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetencyTable;
