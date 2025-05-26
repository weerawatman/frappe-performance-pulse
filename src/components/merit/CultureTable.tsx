
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Info } from 'lucide-react';
import { CultureItem } from '@/types/merit';

interface CultureTableProps {
  cultureItems: CultureItem[];
}

const CultureTable: React.FC<CultureTableProps> = ({ cultureItems }) => {
  const [expectedBehaviors, setExpectedBehaviors] = useState<{[key: string]: string}>({});

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

  const handleBehaviorChange = (cultureId: string, value: string) => {
    setExpectedBehaviors(prev => ({
      ...prev,
      [cultureId]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          Culture Assessment (30%)
        </CardTitle>
        <p className="text-sm text-gray-600">
          การปฏิบัติตามค่านิยมและวัฒนธรรมองค์กร โดยจะได้รับการประเมินจากผู้บังคับบัญชา
        </p>
      </CardHeader>
      <CardContent>
        {/* Evaluation Level Reference Table */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-800">ส่วนที่ 3 : การประเมิน Culture</h4>
          <p className="text-sm text-gray-600 mb-3">
            หลักเกณฑ์การประเมิน (Evaluation Score System) โดยกำหนดจากเกณฑ์เปี้าหมายกิจกรรม (Expected Key Result) และเปรียบเทียบกับ หลักเกณฑ์การประเมินผลการปฏิบัติงาน/ความสอดคล้อง ของ Competency และ วัฒนธรรมองค์กร ลงใน ช่อง ระดับที่ 1 - 5 คะแนน 2
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
                      เข้าใจความหมายและสอดคล้อง Culture ข้อนั้นๆ ได้
                    </div>
                  </TableCell>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      เข้าใจ/ทดลองปฏิบัติได้ และสอดคล้องตามกิจกรรมที่ 
                      กำหนดของ Culture ข้อนั้นๆ
                    </div>
                  </TableCell>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      ปฏิบัติตาม/และสอดคล้องกิจกรรมที่กำหนดของ 
                      Culture ข้อนั้นๆ ได้เป็นอย่างดี
                    </div>
                  </TableCell>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      มีความเป็นไปตามกิจกรรมอันเป็นปฏิบัติตามกิจกรรมที่
                      กำหนดของ Culture ข้อนั้นๆ
                    </div>
                  </TableCell>
                  <TableCell className="align-top p-3">
                    <div className="text-sm whitespace-normal break-words leading-relaxed">
                      เป็นแบบอย่างในตามกิจกรรมอันเป็นปฏิบัติตาม
                      กิจกรรมที่กำหนดของ Culture ข้อนั้นๆ
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Culture Items Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">Culture</TableHead>
                <TableHead className="w-1/4">นิยาม</TableHead>
                <TableHead className="text-center w-16">น้ำหนัก (%)</TableHead>
                <TableHead className="text-center w-20">ระดับการประเมิน</TableHead>
                <TableHead className="w-1/3">
                  พฤติกรรมที่คาดหวัง (Key Behaviour) : 
                  <br />
                  <span className="text-sm text-gray-600">พนักงานกำหนดรายละเอียดพฤติกรรมที่ต้องการวัดผล</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cultureItems.map((culture) => (
                <TableRow key={culture.id}>
                  <TableCell className="font-medium align-top">
                    <div className="whitespace-normal break-words">
                      {culture.name}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="text-sm text-gray-600 whitespace-normal break-words leading-relaxed">
                      {culture.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-center align-top">
                    <Badge variant="outline">{culture.weight}%</Badge>
                  </TableCell>
                  <TableCell className="text-center align-top">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {culture.evaluation_levels.map((level) => (
                        <Badge
                          key={level.level}
                          variant="secondary"
                          className={`${getLevelBadgeColor(level.level)} text-xs`}
                        >
                          L{level.level}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <Textarea
                      placeholder={`กำหนดพฤติกรรมที่คาดหวังสำหรับ ${culture.name}...`}
                      value={expectedBehaviors[culture.id] || ''}
                      onChange={(e) => handleBehaviorChange(culture.id, e.target.value)}
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
                <strong>หมายเหตุ:</strong> การประเมิน Culture จะดำเนินการโดยผู้บังคับบัญชาโดยตรง 
                พนักงานสามารถดูรายละเอียดเกณฑ์การประเมินเพื่อเตรียมความพร้อมได้ และกำหนดพฤติกรรมที่คาดหวังของตนเองในแต่ละ Culture
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                น้ำหนักรวม Culture: <strong>{cultureItems.reduce((sum, item) => sum + item.weight, 0)}%</strong>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CultureTable;
