
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

  const getCompetencyGuideline = (competencyId: string) => {
    switch (competencyId) {
      case '1':
        return (
          <div className="text-sm space-y-1">
            <div>- สามารถแสดงภาวะผู้นำในการทำงาน :</div>
            <div>- สร้างแรงบันดาลใจให้กับทีมงาน :</div>
            <div>- วางแผนและดำเนินการได้อย่างมีประสิทธิภาพ :</div>
          </div>
        );
      case '2':
        return (
          <div className="text-sm space-y-1">
            <div>- สื่อสารได้ชัดเจนและมีประสิทธิภาพ :</div>
            <div>- ถ่ายทอดข้อมูลและความคิดได้เข้าใจง่าย :</div>
            <div>- สร้างความเข้าใจระหว่างทีมงาน :</div>
          </div>
        );
      case '3':
        return (
          <div className="text-sm space-y-1">
            <div>- วิเคราะห์ปัญหาได้อย่างเป็นระบบ :</div>
            <div>- คิดหาทางแก้ไขที่สร้างสรรค์ :</div>
            <div>- ตัดสินใจได้อย่างมีเหตุผล :</div>
          </div>
        );
      case '4':
        return (
          <div className="text-sm space-y-1">
            <div>- ทำงานร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพ :</div>
            <div>- สนับสนุนและช่วยเหลือเพื่อนร่วมงาน :</div>
            <div>- สร้างบรรยากาศการทำงานที่ดี :</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          Competency Assessment (30%)
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
                <TableHead className="w-1/6">ประเภท Competency</TableHead>
                <TableHead className="w-1/4">Item (หัวข้อ)</TableHead>
                <TableHead className="text-center w-16">Weight% (น้ำหนัก)</TableHead>
                <TableHead className="w-1/3">
                  พฤติกรรมที่คาดหวัง (Key Behaviour) : Guideline
                </TableHead>
                <TableHead className="w-1/3">
                  พฤติกรรมที่คาดหวัง (Key Behaviour) : 
                  <br />
                  <span className="text-sm text-gray-600">พนักงานกำหนดรายละเอียดพฤติกรรมที่ต้องการวัดผล</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competencyItems.map((competency) => (
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
                      {getCompetencyGuideline(competency.id)}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <Textarea
                      placeholder={`กำหนดพฤติกรรมที่คาดหวังสำหรับ ${competency.name}...`}
                      value={expectedBehaviors[competency.id] || ''}
                      onChange={(e) => handleBehaviorChange(competency.id, e.target.value)}
                      className="min-h-[80px] text-sm"
                      rows={4}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-700 whitespace-normal break-words leading-relaxed">
                <strong>หมายเหตุ:</strong> การประเมิน Competency จะดำเนินการโดยผู้บังคับบัญชาโดยตรง 
                พนักงานสามารถดูรายละเอียดเกณฑ์การประเมินเพื่อเตรียมความพร้อมได้ และกำหนดพฤติกรรมที่คาดหวังของตนเองในแต่ละ Competency
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                น้ำหนักรวม Competency: <strong>{competencyItems.reduce((sum, item) => sum + item.weight, 0)}%</strong>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetencyTable;
