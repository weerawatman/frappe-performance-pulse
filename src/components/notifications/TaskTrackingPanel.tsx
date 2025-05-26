
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
      mockTasks.push(
        {
          id: '1',
          title: 'กำหนด KPI Bonus ไตรมาส 4',
          description: 'กำหนด KPI สำหรับการคำนวณโบนัสไตรมาส 4',
          type: 'kpi_bonus',
          priority: 'high',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          status: 'pending',
          actionUrl: '/employee/kpi-bonus'
        },
        {
          id: '2',
          title: 'ประเมิน KPI Merit ประจำปี',
          description: 'ประเมิน Competency และ Culture สำหรับการปรับเงินเดือน',
          type: 'kpi_merit',
          priority: 'medium',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          status: 'in_progress',
          actionUrl: '/employee/kpi-merit',
          progress: 65
        }
      );
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

  const urgentTasks = tasks.filter(task => getDaysUntilDue(task.dueDate) <= 3);
  const upcomingTasks = tasks.filter(task => getDaysUntilDue(task.dueDate) > 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      {/* Urgent Tasks */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <AlertTriangle className="w-5 h-5" />
            งานด่วน ({urgentTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {urgentTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>ไม่มีงานด่วนในขณะนี้</p>
            </div>
          ) : (
            <div className="space-y-4">
              {urgentTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg bg-orange-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(task.type)}
                      <h4 className="font-medium">{task.title}</h4>
                    </div>
                    <Badge className={getPriorityColor(task.priority)} variant="outline">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  
                  {task.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">ความคืบหน้า</span>
                        <span className="text-xs text-gray-600">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(task.status)} variant="secondary">
                        {task.status === 'pending' ? 'รอดำเนินการ' : 
                         task.status === 'in_progress' ? 'กำลังดำเนินการ' : 'เกินกำหนด'}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        เหลือ {getDaysUntilDue(task.dueDate)} วัน
                      </span>
                    </div>
                    <Link to={task.actionUrl}>
                      <Button size="sm" variant="outline">
                        ดำเนินการ
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
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(task.type)}
                      <h4 className="font-medium">{task.title}</h4>
                    </div>
                    <Badge className={getPriorityColor(task.priority)} variant="outline">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  
                  {task.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">ความคืบหน้า</span>
                        <span className="text-xs text-gray-600">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(task.status)} variant="secondary">
                        {task.status === 'pending' ? 'รอดำเนินการ' : 
                         task.status === 'in_progress' ? 'กำลังดำเนินการ' : 'เกินกำหนด'}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        เหลือ {getDaysUntilDue(task.dueDate)} วัน
                      </span>
                    </div>
                    <Link to={task.actionUrl}>
                      <Button size="sm" variant="outline">
                        ดูรายละเอียด
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskTrackingPanel;
