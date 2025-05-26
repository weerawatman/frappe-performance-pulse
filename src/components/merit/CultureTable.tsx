
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Info } from 'lucide-react';
import { CultureItem } from '@/types/merit';

interface CultureTableProps {
  cultureItems: CultureItem[];
  onUpdate?: (items: CultureItem[]) => void;
  readonly?: boolean;
}

const CultureTable: React.FC<CultureTableProps> = ({ 
  cultureItems, 
  onUpdate, 
  readonly = false 
}) => {
  const [expectedBehaviors, setExpectedBehaviors] = useState<{[key: string]: string}>({});

  const handleBehaviorChange = (cultureId: string, value: string) => {
    if (readonly) return;
    
    setExpectedBehaviors(prev => ({
      ...prev,
      [cultureId]: value
    }));
  };

  const getGuidelineContent = (cultureId: string) => {
    switch (cultureId) {
      case '1':
        return (
          <div className="text-sm space-y-1">
            <div>- ปฏิบัติให้ได้ตามกฏและระเบียบที่กำหนดไว้ :</div>
            <div>- รักษาคำพูด ตามที่ได้ตกลงไว้ :</div>
            <div>- ใช้ข้อมูลและข้อเท็จจริงในการทำงาน :</div>
          </div>
        );
      case '2':
        return (
          <div className="text-sm space-y-1">
            <div>- กล้าเรียนรู้สิ่งใหม่ๆ ทั้งวิธีการ เครื่องมือ และเทคโนโลยี :</div>
            <div>- กล้าตัดสินใจ กล้าลงทุน กล้าเสี่ยง บนพื้นฐานต้นทุนและความเป็นไปได้ทางธุรกิจ :</div>
            <div>- กล้านำสิ่งที่เรียนรู้มาลงมือทำจริง กล้านำให้เกิดการเปลี่ยนแปลง และเกิดสิ่งใหม่ๆ :</div>
          </div>
        );
      case '3':
        return (
          <div className="text-sm space-y-1">
            <div>- เปลี่ยนแปลงให้ทันต่อเหตุการณ์ที่เปลี่ยนไป และปรับตัวได้รวดเร็ว :</div>
            <div>- ตื่นรู้ และคาดการณ์เพื่อตอบสนองต่อการเปลี่ยนแปลง :</div>
            <div>- ตัดสินใจและลงมือทำด้วยความรวดเร็ว ทันต่อเหตุการณ์ :</div>
          </div>
        );
      case '4':
        return (
          <div className="text-sm space-y-1">
            <div>- ยอมรับความคิดและความเห็นต่าง :</div>
            <div>- ร่วมหาแนวทางและยอมรับในข้อสรุปที่ดีที่สุด :</div>
            <div>- เปิดรับฟังความเห็นผู้อื่นก่อน</div>
          </div>
        );
      case '5':
        return (
          <div className="text-sm space-y-1">
            <div>- รับฟังข้อเสนอแนะจากลูกค้า และความต้องการของลูกค้า :</div>
            <div>- Customer Centric คิดในมุมที่เราเป็นลูกค้า และมีทางออกให้ลูกค้าเสมอ :</div>
            <div>- ส่งงานที่มีคุณภาพ และตามความต้องการของลูกค้า :</div>
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
                  <TableCell className="align-top">
                    <div className="whitespace-normal break-words leading-relaxed">
                      {getGuidelineContent(culture.id)}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <Textarea
                      placeholder={`กำหนดพฤติกรรมที่คาดหวังสำหรับ ${culture.name}...`}
                      value={expectedBehaviors[culture.id] || ''}
                      onChange={(e) => handleBehaviorChange(culture.id, e.target.value)}
                      className="min-h-[80px] text-sm"
                      rows={4}
                      disabled={readonly}
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
                {readonly && " (โหมดดูอย่างเดียว)"}
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
