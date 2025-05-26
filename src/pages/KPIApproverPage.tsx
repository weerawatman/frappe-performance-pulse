
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Eye, Send, MessageSquare, CheckCircle, XCircle, ArrowLeft, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import KPIStatusTracker from '@/components/kpi/KPIStatusTracker';
import { KPIBonus } from '@/types/kpi';

const KPIApproverPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedKPI, setSelectedKPI] = useState<KPIBonus | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rejectTarget, setRejectTarget] = useState<'checker' | 'employee'>('checker');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in real app, fetch from API based on user role
  const pendingKPIs: KPIBonus[] = [
    {
      id: '1',
      employee_id: 'EMP001',
      employee_name: 'สมชาย ใจดี',
      department: 'การขาย',
      kpi_items: [
        {
          id: '1',
          category_id: '1',
          category_name: 'Financial Perspective',
          name: 'เพิ่มยอดขาย',
          description: 'เพิ่มยอดขายรายเดือนจากปีที่แล้ว',
          weight: 50,
          target: '10% เพิ่มขึ้นจากปีที่แล้ว',
          measurement_method: 'เปรียบเทียบยอดขายรายเดือน',
          created_at: new Date()
        },
        {
          id: '2',
          category_id: '2',
          category_name: 'Customer Perspective',
          name: 'ความพึงพอใจลูกค้า',
          description: 'รักษาระดับความพึงพอใจลูกค้า',
          weight: 30,
          target: 'คะแนนความพึงพอใจ >= 4.5/5',
          measurement_method: 'สำรวจความพึงพอใจลูกค้า',
          created_at: new Date()
        },
        {
          id: '3',
          category_id: '4',
          category_name: 'Learning & Growth',
          name: 'การพัฒนาทักษะ',
          description: 'เข้าร่วมการอบรมและพัฒนาทักษะ',
          weight: 20,
          target: 'อบรมอย่างน้อย 40 ชั่วโมงต่อปี',
          measurement_method: 'นับชั่วโมงการอบรม',
          created_at: new Date()
        }
      ],
      total_weight: 100,
      status: 'Pending_Approval',
      workflow_step: 'Approver',
      submitted_date: new Date(),
      comments: 'ผ่านการตรวจสอบจาก Checker แล้ว',
      history: [
        {
          id: '1',
          action: 'Created',
          actor_name: 'สมชาย ใจดี',
          actor_role: 'พนักงาน',
          timestamp: new Date(),
        },
        {
          id: '2',
          action: 'Submitted',
          actor_name: 'สมชาย ใจดี',
          actor_role: 'พนักงาน',
          timestamp: new Date(),
        },
        {
          id: '3',
          action: 'Approved',
          actor_name: 'วิชัย สุขใส',
          actor_role: 'Checker',
          comments: 'KPI ที่กำหนดมีความเหมาะสมและชัดเจน',
          timestamp: new Date(),
        }
      ],
      created_at: new Date(),
      modified_at: new Date()
    }
  ];

  const handleFinalApprove = async () => {
    if (!selectedKPI) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call to final approve
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "อนุมัติสำเร็จ",
        description: `KPI ของ ${selectedKPI.employee_name} ได้รับการอนุมัติแล้ว`,
      });
      
      setSelectedKPI(null);
      setFeedback('');
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอนุมัติได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedKPI || !feedback.trim()) {
      toast({
        title: "กรุณาให้ Feedback",
        description: "กรุณาระบุเหตุผลในการส่งกลับแก้ไข",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Simulate API call to reject
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const targetText = rejectTarget === 'checker' ? 'ผู้ตรวจสอบ' : 'พนักงาน';
      toast({
        title: "ส่งกลับแก้ไขสำเร็จ",
        description: `KPI ของ ${selectedKPI.employee_name} ถูกส่งกลับให้${targetText}แก้ไขแล้ว`,
      });
      
      setSelectedKPI(null);
      setFeedback('');
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งกลับได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/manager-dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับ
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">อนุมัติ KPI</h1>
              <p className="text-gray-600">อนุมัติ KPI ที่ผ่านการตรวจสอบแล้ว</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <UserCheck className="w-4 h-4 mr-1" />
            Approver
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* KPI List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>รายการ KPI ที่รอการอนุมัติ ({pendingKPIs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingKPIs.map((kpi) => (
                    <div
                      key={kpi.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedKPI?.id === kpi.id 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedKPI(kpi)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{kpi.employee_name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {kpi.department}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {kpi.kpi_items.length} KPI รายการ
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          ผ่าน Checker แล้ว
                        </span>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* KPI Details */}
          <div className="lg:col-span-2">
            {selectedKPI ? (
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="details">รายละเอียด KPI</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback จาก Checker</TabsTrigger>
                  <TabsTrigger value="status">สถานะและประวัติ</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  {/* Employee Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>ข้อมูลพนักงาน</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">ชื่อพนักงาน</p>
                          <p className="font-semibold">{selectedKPI.employee_name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">แผนก</p>
                          <p className="font-semibold">{selectedKPI.department}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">รหัสพนักงาน</p>
                          <p className="font-semibold">{selectedKPI.employee_id}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* KPI Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle>รายการ KPI ที่กำหนด</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedKPI.kpi_items.map((item, index) => (
                          <div key={item.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{index + 1}. {item.name}</h4>
                              <Badge variant="outline">{item.weight}%</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">หมวดหมู่:</p>
                                <p>{item.category_name}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">เป้าหมาย:</p>
                                <p>{item.target}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-gray-600">รายละเอียด:</p>
                                <p>{item.description}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-gray-600">วิธีการวัดผล:</p>
                                <p>{item.measurement_method}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">น้ำหนักรวม:</span>
                          <Badge variant={selectedKPI.total_weight === 100 ? "default" : "destructive"}>
                            {selectedKPI.total_weight}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="feedback">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feedback จาก Checker</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedKPI.history
                          .filter(h => h.actor_role === 'Checker')
                          .map(h => (
                            <div key={h.id} className="p-4 bg-blue-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{h.actor_name}</span>
                                <span className="text-sm text-gray-600">
                                  {h.timestamp.toLocaleDateString('th-TH')}
                                </span>
                              </div>
                              <p className="text-sm">{h.comments || 'ไม่มีความเห็นเพิ่มเติม'}</p>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="status">
                  <KPIStatusTracker kpiBonus={selectedKPI} />
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    เลือก KPI เพื่อดูรายละเอียด
                  </h3>
                  <p className="text-gray-600">
                    กรุณาเลือก KPI จากรายการทางซ้ายเพื่อดูรายละเอียดและดำเนินการอนุมัติ
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Approval Actions */}
        {selectedKPI && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>การดำเนินการอนุมัติ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="approval-feedback">ความเห็นเพิ่มเติม (ถ้ามี)</Label>
                  <Textarea
                    id="approval-feedback"
                    placeholder="ระบุความเห็นเพิ่มเติมสำหรับการอนุมัติหรือการส่งกลับแก้ไข..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Button 
                      onClick={handleFinalApprove}
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      อนุมัติ KPI
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <Select value={rejectTarget} onValueChange={(value: 'checker' | 'employee') => setRejectTarget(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checker">ส่งกลับให้ Checker</SelectItem>
                        <SelectItem value="employee">ส่งกลับให้พนักงาน</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="destructive"
                      onClick={handleReject}
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      ส่งกลับแก้ไข
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default KPIApproverPage;
