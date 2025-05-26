
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Copy, Star, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface KPITemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  department: string;
  position: string;
  target_example: string;
  measurement_method: string;
  frequency: string;
  difficulty: 'ง่าย' | 'ปานกลาง' | 'ยาก';
  popularity: number;
  tags: string[];
}

const kpiTemplates: KPITemplate[] = [
  {
    id: '1',
    name: 'อัตราการเติบโตของยอดขาย',
    description: 'วัดการเพิ่มขึ้นของรายได้จากการขายเปรียบเทียบกับช่วงเวลาก่อนหน้า',
    category: 'Financial',
    department: 'การขาย',
    position: 'Sales Manager',
    target_example: 'เพิ่มขึ้น 15% จากปีที่แล้ว',
    measurement_method: 'เปรียบเทียบรายได้ Q4 2025 กับ Q4 2024',
    frequency: 'รายไตรมาส',
    difficulty: 'ปานกลาง',
    popularity: 95,
    tags: ['ยอดขาย', 'รายได้', 'การเติบโต']
  },
  {
    id: '2',
    name: 'Customer Satisfaction Score (CSAT)',
    description: 'วัดระดับความพึงพอใจของลูกค้าต่อสินค้าและบริการ',
    category: 'Customer',
    department: 'บริการลูกค้า',
    position: 'Customer Service Manager',
    target_example: 'CSAT ≥ 4.5/5.0',
    measurement_method: 'แบบสำรวจความพึงพอใจหลังการใช้บริการ',
    frequency: 'รายเดือน',
    difficulty: 'ง่าย',
    popularity: 88,
    tags: ['ลูกค้า', 'ความพึงพอใจ', 'บริการ']
  },
  {
    id: '3',
    name: 'Employee Engagement Score',
    description: 'วัดระดับความผูกพันและความพึงพอใจของพนักงาน',
    category: 'Learning & Growth',
    department: 'HR',
    position: 'HR Manager',
    target_example: 'Engagement Score ≥ 80%',
    measurement_method: 'แบบสำรวจความผูกพันพนักงานรายปี',
    frequency: 'รายปี',
    difficulty: 'ยาก',
    popularity: 72,
    tags: ['พนักงาน', 'ความผูกพัน', 'HR']
  },
  {
    id: '4',
    name: 'Time to Market',
    description: 'วัดเวลาที่ใช้ในการพัฒนาผลิตภัณฑ์ใหม่จนถึงการออกสู่ตลาด',
    category: 'Internal Process',
    department: 'Product Development',
    position: 'Product Manager',
    target_example: 'ลดเวลาลง 20% จากเดิม',
    measurement_method: 'วัดจากวันที่เริ่มโปรเจกต์จนถึงวันเปิดตัวสินค้า',
    frequency: 'ต่อโปรเจกต์',
    difficulty: 'ยาก',
    popularity: 65,
    tags: ['ผลิตภัณฑ์', 'เวลา', 'ประสิทธิภาพ']
  },
  {
    id: '5',
    name: 'ต้นทุนต่อหน่วย',
    description: 'วัดต้นทุนในการผลิตสินค้าหรือให้บริการต่อหน่วย',
    category: 'Financial',
    department: 'การผลิต',
    position: 'Production Manager',
    target_example: 'ลดต้นทุนลง 10% ต่อหน่วย',
    measurement_method: 'ต้นทุนรวม ÷ จำนวนหน่วยที่ผลิต',
    frequency: 'รายเดือน',
    difficulty: 'ปานกลาง',
    popularity: 78,
    tags: ['ต้นทุน', 'ประสิทธิภาพ', 'การผลิต']
  },
  {
    id: '6',
    name: 'Digital Marketing ROI',
    description: 'วัดผลตอบแทนจากการลงทุนในการตลาดดิจิทัล',
    category: 'Customer',
    department: 'การตลาด',
    position: 'Digital Marketing Manager',
    target_example: 'ROI ≥ 300%',
    measurement_method: '(รายได้ - ต้นทุนการตลาด) ÷ ต้นทุนการตลาด × 100',
    frequency: 'รายเดือน',
    difficulty: 'ปานกลาง',
    popularity: 81,
    tags: ['การตลาด', 'ROI', 'ดิจิทัล']
  }
];

const departments = ['ทั้งหมด', 'การขาย', 'การตลาด', 'HR', 'การผลิต', 'IT', 'การเงิน', 'บริการลูกค้า'];
const categories = ['ทั้งหมด', 'Financial', 'Customer', 'Internal Process', 'Learning & Growth'];
const difficulties = ['ทั้งหมด', 'ง่าย', 'ปานกลาง', 'ยาก'];

const KPILibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ทั้งหมด');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ทั้งหมด');
  const [activeTab, setActiveTab] = useState('templates');

  const filteredTemplates = kpiTemplates.filter(template => {
    return (
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) &&
    (selectedDepartment === 'ทั้งหมด' || template.department === selectedDepartment) &&
    (selectedCategory === 'ทั้งหมด' || template.category === selectedCategory) &&
    (selectedDifficulty === 'ทั้งหมด' || template.difficulty === selectedDifficulty);
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'ง่าย': return 'bg-green-100 text-green-800';
      case 'ปานกลาง': return 'bg-yellow-100 text-yellow-800';
      case 'ยาก': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Financial': return 'bg-blue-100 text-blue-800';
      case 'Customer': return 'bg-green-100 text-green-800';
      case 'Internal Process': return 'bg-purple-100 text-purple-800';
      case 'Learning & Growth': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopyTemplate = (template: KPITemplate) => {
    console.log('Copying template:', template.name);
    // Implementation to copy template to user's KPI form
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ไลบรารี KPI และเทมเพลต</h2>
          <p className="text-gray-600">รวบรวม KPI ตัวอย่างและเทมเพลตสำหรับแผนกและตำแหน่งต่าง ๆ</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">เทมเพลต KPI</TabsTrigger>
          <TabsTrigger value="history">ประวัติ KPI</TabsTrigger>
          <TabsTrigger value="favorites">รายการโปรด</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                ค้นหาและกรองเทมเพลต
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Input
                    placeholder="ค้นหา KPI..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกแผนก" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="ระดับความยาก" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* KPI Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                        <Badge className={getDifficultyColor(template.difficulty)}>
                          {template.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{template.popularity}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">แผนก:</span>
                      <span className="font-medium">{template.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">ตำแหน่ง:</span>
                      <span className="font-medium">{template.position}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">ความถี่:</span>
                      <span className="font-medium">{template.frequency}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">ตัวอย่างเป้าหมาย:</p>
                    <p className="text-sm bg-gray-50 p-2 rounded">{template.target_example}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">วิธีการวัด:</p>
                    <p className="text-sm bg-gray-50 p-2 rounded">{template.measurement_method}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    onClick={() => handleCopyTemplate(template)}
                    className="w-full"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    ใช้เทมเพลตนี้
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">ไม่พบเทมเพลตที่ตรงกับเงื่อนไขการค้นหา</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">ประวัติ KPI จากรอบการประเมินก่อนหน้าจะแสดงที่นี่</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">เทมเพลต KPI ที่บันทึกไว้จะแสดงที่นี่</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KPILibrary;
