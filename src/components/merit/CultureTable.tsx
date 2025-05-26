
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, Eye, Info } from 'lucide-react';
import { CultureItem } from '@/types/merit';

interface CultureTableProps {
  cultureItems: CultureItem[];
}

const CultureTable: React.FC<CultureTableProps> = ({ cultureItems }) => {
  const [selectedCulture, setSelectedCulture] = useState<CultureItem | null>(null);
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">Culture</TableHead>
                <TableHead className="w-1/4">รายละเอียด</TableHead>
                <TableHead className="text-center w-16">น้ำหนัก (%)</TableHead>
                <TableHead className="text-center w-20">ระดับการประเมิน</TableHead>
                <TableHead className="w-1/3">
                  พฤติกรรมที่คาดหวัง (Key Behaviour) : 
                  <br />
                  <span className="text-sm text-gray-600">พนักงานกำหนดรายละเอียดพฤติกรรมที่ต้องการวัดผล</span>
                </TableHead>
                <TableHead className="text-center w-20">การดำเนินการ</TableHead>
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
                  <TableCell className="text-center align-top">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCulture(culture)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          เกณฑ์
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            {selectedCulture?.name}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedCulture && (
                          <div className="space-y-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="text-sm text-purple-700 whitespace-normal break-words leading-relaxed">
                                <strong>รายละเอียด:</strong> {selectedCulture.description}
                              </p>
                              <p className="text-sm text-purple-700 mt-2">
                                <strong>น้ำหนัก:</strong> {selectedCulture.weight}%
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">เกณฑ์การประเมิน</h4>
                              <div className="space-y-3">
                                {selectedCulture.evaluation_levels.map((level) => (
                                  <div key={level.level} className="border rounded-lg p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                      <Badge 
                                        variant="secondary"
                                        className={getLevelBadgeColor(level.level)}
                                      >
                                        Level {level.level}
                                      </Badge>
                                      <h5 className="font-medium">{level.title}</h5>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3 whitespace-normal break-words leading-relaxed">
                                      {level.description}
                                    </p>
                                    <div>
                                      <h6 className="text-sm font-medium text-gray-700 mb-2">ตัวอย่างพฤติกรรม:</h6>
                                      <ul className="text-sm text-gray-600 space-y-1">
                                        {level.behavioral_examples.map((example, index) => (
                                          <li key={index} className="flex items-start gap-2">
                                            <span className="text-purple-500 mt-1">•</span>
                                            <span className="whitespace-normal break-words leading-relaxed">
                                              {example}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
