
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Target, 
  Plus,
  Edit,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  TrendingUp,
  Users
} from 'lucide-react';
import { DevelopmentPlan, DevelopmentGoal } from '@/types/feedback360';

const DevelopmentPlanManager: React.FC = () => {
  const [plans, setPlans] = useState<DevelopmentPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<DevelopmentPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'view'>('list');

  // Mock development plans
  const mockPlans: DevelopmentPlan[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'สมชาย ใจดี',
      basedOnFeedback360Id: 'FB360_001',
      goals: [
        {
          id: '1',
          area: 'ภาวะผู้นำ',
          description: 'พัฒนาทักษะการเป็นผู้นำและการจูงใจทีม',
          actions: [
            'เข้าร่วมโปรแกรมพัฒนาภาวะผู้นำ',
            'เป็น Team Leader ในโครงการพิเศษ',
            'ศึกษาหนังสือและบทความเกี่ยวกับภาวะผู้นำ'
          ],
          timeline: '6 เดือน',
          resources: [
            'งบประมาณสำหรับการฝึกอบรม 20,000 บาท',
            'หนังสือและสื่อการเรียนรู้',
            'Mentor จากผู้บริหารระดับสูง'
          ],
          measurableOutcomes: [
            'ได้รับใบประกาศนียบัตรการฝึกอบรมภาวะผู้นำ',
            'นำทีมในโครงการสำเร็จอย่างน้อย 1 โครงการ',
            'ได้คะแนนประเมินภาวะผู้นำเพิ่มขึ้น 20%'
          ],
          progress: 45,
          status: 'In Progress'
        },
        {
          id: '2',
          area: 'การให้คำแนะนำ',
          description: 'เสริมสร้างทักษะการเป็น Mentor และการให้คำแนะนำ',
          actions: [
            'เข้าร่วมการฝึกอบรม Coaching & Mentoring',
            'เป็น Mentor ให้กับพนักงานใหม่',
            'เข้าร่วม Mentoring Circle'
          ],
          timeline: '4 เดือน',
          resources: [
            'งบประมาณการฝึกอบรม 15,000 บาท',
            'เวลาสำหรับการ Mentoring 2 ชั่วโมง/สัปดาห์',
            'คู่มือ Mentoring'
          ],
          measurableOutcomes: [
            'Mentor พนักงานใหม่อย่างน้อย 2 คน',
            'ได้คะแนนประเมินการให้คำแนะนำเพิ่มขึ้น 25%',
            'พนักงานที่ได้รับการ Mentor ผ่านการประเมินในระดับดี'
          ],
          progress: 20,
          status: 'In Progress'
        },
        {
          id: '3',
          area: 'ความมั่นใจ',
          description: 'เสริมสร้างความมั่นใจในการนำเสนอและการตัดสินใจ',
          actions: [
            'เข้าร่วมการฝึกอบรม Public Speaking',
            'นำเสนองานในที่ประชุมใหญ่อย่างน้อย 3 ครั้ง',
            'เข้าร่วมกิจกรรม Toastmasters'
          ],
          timeline: '3 เดือน',
          resources: [
            'งบประมาณการฝึกอบรม 10,000 บาท',
            'ค่าสมาชิก Toastmasters 3,000 บาท',
            'เวลาฝึกซ้อมการนำเสนอ'
          ],
          measurableOutcomes: [
            'นำเสนองานได้อย่างมั่นใจและชัดเจน',
            'ได้คะแนนประเมินความมั่นใจเพิ่มขึ้น 30%',
            'ได้รับ feedback เชิงบวกจากการนำเสนอ'
          ],
          progress: 75,
          status: 'In Progress'
        }
      ],
      status: 'Active',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-15')
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'สมหญิง รักษ์ดี',
      basedOnFeedback360Id: 'FB360_002',
      goals: [
        {
          id: '4',
          area: 'การมอบหมายงาน',
          description: 'พัฒนาทักษะการมอบหมายงานและการให้อำนาจ',
          actions: [
            'เข้าร่วมการฝึกอบรม Delegation Skills',
            'ฝึกมอบหมายงานสำคัญให้ทีม',
            'สร้างระบบติดตามงานที่มอบหมาย'
          ],
          timeline: '3 เดือน',
          resources: [
            'งบประมาณการฝึกอบรม 12,000 บาท',
            'เครื่องมือการจัดการงาน',
            'เวลาสำหรับการติดตาม'
          ],
          measurableOutcomes: [
            'ลดเวลาทำงานล่วงเวลาลง 30%',
            'ทีมมีความพึงพอใจในการรับมอบหมายงานเพิ่มขึ้น',
            'มีระบบติดตามงานที่ชัดเจน'
          ],
          progress: 60,
          status: 'In Progress'
        },
        {
          id: '5',
          area: 'การจัดการเวลา',
          description: 'เพิ่มประสิทธิภาพการจัดการเวลาและงาน',
          actions: [
            'เข้าร่วมการฝึกอบรม Time Management',
            'ใช้เครื่องมือจัดการเวลาใหม่',
            'วางแผนงานประจำสัปดาห์และเดือน'
          ],
          timeline: '2 เดือน',
          resources: [
            'งบประมาณการฝึกอบรม 8,000 บาท',
            'Software จัดการงาน',
            'Planner และ Tools'
          ],
          measurableOutcomes: [
            'ส่งงานตรงเวลา 100%',
            'ลดความเครียดจากการจัดการเวลา',
            'มีเวลาสำหรับการพัฒนาตนเองเพิ่มขึ้น'
          ],
          progress: 90,
          status: 'In Progress'
        }
      ],
      status: 'Active',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-20')
    }
  ];

  React.useEffect(() => {
    setPlans(mockPlans);
  }, []);

  const handleView = (plan: DevelopmentPlan) => {
    setSelectedPlan(plan);
    setViewMode('view');
    setIsDialogOpen(true);
  };

  const handleEdit = (plan: DevelopmentPlan) => {
    setSelectedPlan(plan);
    setViewMode('form');
    setIsDialogOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedPlan(null);
    setViewMode('form');
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Badge variant="secondary">ร่าง</Badge>;
      case 'Active':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">กำลังดำเนินการ</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getGoalStatusBadge = (status: string) => {
    switch (status) {
      case 'Not Started':
        return <Badge variant="secondary">ยังไม่เริ่ม</Badge>;
      case 'In Progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">กำลังดำเนินการ</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateOverallProgress = (plan: DevelopmentPlan) => {
    if (plan.goals.length === 0) return 0;
    const totalProgress = plan.goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / plan.goals.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">แผนพัฒนารายบุคคล</h3>
          <p className="text-gray-600">จัดการและติดตามแผนพัฒนาจาก Feedback 360</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          สร้างแผนพัฒนาใหม่
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Target className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">แผนทั้งหมด</p>
                <p className="text-2xl font-bold">{plans.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">กำลังดำเนินการ</p>
                <p className="text-2xl font-bold">
                  {plans.filter(p => p.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">เสร็จสิ้นแล้ว</p>
                <p className="text-2xl font-bold">
                  {plans.filter(p => p.status === 'Completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ความคืบหน้าเฉลี่ย</p>
                <p className="text-2xl font-bold">
                  {plans.length > 0 
                    ? Math.round(plans.reduce((sum, p) => sum + calculateOverallProgress(p), 0) / plans.length)
                    : 0
                  }%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            แผนพัฒนารายบุคคล ({plans.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plans.map((plan) => {
              const overallProgress = calculateOverallProgress(plan);
              return (
                <div key={plan.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold">{plan.employeeName}</h4>
                        {getStatusBadge(plan.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        จำนวนเป้าหมาย: {plan.goals.length} เป้าหมาย
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>สร้างเมื่อ: {plan.createdAt.toLocaleDateString('th-TH')}</span>
                        <span>•</span>
                        <span>อัปเดต: {plan.updatedAt.toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{overallProgress}%</div>
                      <div className="text-sm text-gray-500">ความคืบหน้า</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <Progress value={overallProgress} className="h-2" />
                  </div>

                  {/* Goals Summary */}
                  <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plan.goals.slice(0, 3).map((goal) => (
                        <div key={goal.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">{goal.area}</h5>
                            {getGoalStatusBadge(goal.status)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={goal.progress} className="flex-1 h-1" />
                            <span className="text-xs text-gray-600">{goal.progress}%</span>
                          </div>
                        </div>
                      ))}
                      {plan.goals.length > 3 && (
                        <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-center">
                          <span className="text-sm text-gray-600">
                            และอีก {plan.goals.length - 3} เป้าหมาย
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleView(plan)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      ดูรายละเอียด
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      แก้ไข
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialog for viewing/editing plans */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'view' ? 'รายละเอียดแผนพัฒนา' : 
               selectedPlan ? 'แก้ไขแผนพัฒนา' : 'สร้างแผนพัฒนาใหม่'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPlan && viewMode === 'view' && (
            <DevelopmentPlanView plan={selectedPlan} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Development Plan View Component
interface DevelopmentPlanViewProps {
  plan: DevelopmentPlan;
}

const DevelopmentPlanView: React.FC<DevelopmentPlanViewProps> = ({ plan }) => {
  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'In Progress': return 'text-yellow-600';
      case 'Not Started': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Plan Info */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลแผนพัฒนา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">พนักงาน</Label>
              <p className="font-medium">{plan.employeeName}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">สถานะ</Label>
              <div className="mt-1">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {plan.status}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-600">จำนวนเป้าหมาย</Label>
              <p className="font-medium">{plan.goals.length} เป้าหมาย</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">ความคืบหน้าโดยรวม</Label>
              <p className="font-medium">
                {Math.round(plan.goals.reduce((sum, goal) => sum + goal.progress, 0) / plan.goals.length)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Detail */}
      <Card>
        <CardHeader>
          <CardTitle>เป้าหมายการพัฒนา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {plan.goals.map((goal, index) => (
              <div key={goal.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-semibold">{goal.area}</h4>
                      <Badge className={
                        goal.status === 'Completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                        goal.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                        'bg-gray-100 text-gray-800 hover:bg-gray-100'
                      }>
                        {goal.status === 'Completed' ? 'เสร็จสิ้น' :
                         goal.status === 'In Progress' ? 'กำลังดำเนินการ' : 'ยังไม่เริ่ม'}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{goal.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>ระยะเวลา: {goal.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>ความคืบหน้า: {goal.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {/* Actions */}
                <div className="mb-4">
                  <h5 className="font-medium mb-2">กิจกรรมที่ต้องทำ</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {goal.actions.map((action, actionIndex) => (
                      <li key={actionIndex}>{action}</li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div className="mb-4">
                  <h5 className="font-medium mb-2">ทรัพยากรที่ต้องการ</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {goal.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex}>{resource}</li>
                    ))}
                  </ul>
                </div>

                {/* Measurable Outcomes */}
                <div>
                  <h5 className="font-medium mb-2">ผลลัพธ์ที่วัดได้</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {goal.measurableOutcomes.map((outcome, outcomeIndex) => (
                      <li key={outcomeIndex}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentPlanManager;
