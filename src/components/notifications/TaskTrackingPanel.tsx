
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, AlertTriangle, Calendar, Target, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  type: 'kpi_bonus' | 'kpi_merit' | 'evaluation' | 'feedback';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'overdue';
  actionUrl: string;
  progress?: number;
  isOverdue?: boolean;
}

interface TaskTrackingPanelProps {
  userId: string;
  userRole: 'employee' | 'manager' | 'checker' | 'approver';
}

const TaskTrackingPanel: React.FC<TaskTrackingPanelProps> = ({ userId, userRole }) => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    // Mock task data based on user role
    const mockTasks: TaskItem[] = [];

    if (userRole === 'employee') {
      // Check if we're in Q1 (Jan-Mar) for KPI setup period
      const currentDate = new Date();
      const isQ1 = currentDate.getMonth() < 3; // 0-2 = Jan-Mar
      
      if (isQ1) {
        // During Q1 - KPI setup period
        mockTasks.push(
          {
            id: '1',
            title: 'กำหนด KPI Bonus',
            description: 'กำหนด KPI สำหรับการคำนวณโบนัสประจำปี',
            type: 'kpi_bonus',
            priority: 'high',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            status: 'pending',
            actionUrl: '/employee/kpi-bonus'
          }
        );
      } else {
        // Past Q1 - KPI setup is overdue
        mockTasks.push(
          {
            id: '1',
            title: 'กำหนด KPI Bonus',
            description: 'กำหนด KPI สำหรับการคำนวณโบนัสประจำปี (เกินกำหนด)',
            type: 'kpi_bonus',
            priority: 'high',
            dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            status: 'overdue',
            actionUrl: '/employee/kpi-bonus',
            isOverdue: true
          }
        );
      }

      // Add upcoming evaluation periods - only show when it's time for evaluation
      const currentMonth = currentDate.getMonth();
      const isEvaluationPeriod1 = currentMonth >= 5 && currentMonth <= 6; // June-July
      const isEvaluationPeriod2 = currentMonth >= 11 || currentMonth <= 0; // Dec-Jan

      if (isEvaluationPeriod1) {
        mockTasks.push(
          {
            id: '3',
            title: 'การประเมินผลงานครั้งที่ 1',
            description: 'ช่วงการประเมินผลงานครึ่งปีแรก',
            type: 'evaluation',
            priority: 'medium',
            dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
            status: 'pending',
            actionUrl: '/employee/evaluation'
          }
        );
      }

      if (isEvaluationPeriod2) {
        mockTasks.push(
          {
            id: '4',
            title: 'การประเมินผลงานครั้งที่ 2',
            description: 'ช่วงการประเมินผลงานครึ่งปีหลัง',
            type: 'evaluation',
            priority: 'medium',
            dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
            status: 'pending',
            actionUrl: '/employee/evaluation'
          }
        );
      }
    } else if (userRole === 'manager') {
      mockTasks.push(
        {
          id: '3',
          title: 'ตรวจสอบ KPI ของทีม',
          description: 'ตรวจสอบและให้ความเห็นต่อ KPI ที่พนักงานส่งมา (3 รายการ)',
          type: 'kpi_bonus',
          priority: 'high',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          status: 'pending',
          actionUrl: '/kpi-checker'
        },
        {
          id: '4',
          title: 'อนุมัติการประเมินผลงาน',
          description: 'อนุมัติการประเมินผลงานของพนักงาน (2 รายการ)',
          type: 'evaluation',
          priority: 'medium',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
          status: 'pending',
          actionUrl: '/kpi-approver'
        }
      );
    }

    setTasks(mockTasks);
  }, [userId, userRole]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'kpi_bonus': return <Target className="w-4 h-4" />;
      case 'kpi_merit': return <FileText className="w-4 h-4" />;
      case 'evaluation': return <CheckCircle className="w-4 h-4" />;
      case 'feedback': return <FileText className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const getOverdueDays = (dueDate: Date) => {
    const now = new Date();
    const timeDiff = now.getTime() - dueDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  // Filter tasks for overdue and upcoming sections
  const overdueTasks = tasks.filter(task => task.isOverdue || task.status === 'overdue');
  const upcomingTasks = tasks.filter(task => !task.isOverdue && task.status !== 'overdue');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      {/* Overdue Tasks */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            งานที่เกินกำหนด ({overdueTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {overdueTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>ไม่มีงานที่เกินกำหนด</p>
            </div>
          ) : (
            <div className="space-y-4">
              {overdueTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg bg-red-50 border-red-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(task.type)}
                      <h4 className="font-medium text-red-800">{task.title}</h4>
                    </div>
                    <Badge className={getPriorityColor(task.priority)} variant="outline">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-red-700 mb-3">{task.description}</p>
                  
                  {task.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-red-600">ความคืบหน้า</span>
                        <span className="text-xs text-red-600">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-red-100 text-red-700" variant="secondary">
                        เกินกำหนด
                      </Badge>
                      <span className="text-xs text-red-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        เกิน {getOverdueDays(task.dueDate)} วัน
                      </span>
                    </div>
                    <Link to={task.actionUrl}>
                      <Button size="sm" variant="destructive">
                        ดำเนินการด่วน
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            งานที่กำลังจะมาถึง ({upcomingTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>ไม่มีงานที่กำลังจะมาถึง</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingTasks.map((task) => {
                const daysLeft = getDaysUntilDue(task.dueDate);
                const isKPISetup = task.type === 'kpi_bonus' || task.type === 'kpi_merit';
                
                return (
                  <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(task.type)}
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              เหลือ {daysLeft} วัน
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Link to={isKPISetup ? task.actionUrl : '/employee/evaluation'}>
                        <Button size="sm" variant="outline">
                          {isKPISetup ? 'กำหนด KPI' : 'ดูรายละเอียด'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskTrackingPanel;
