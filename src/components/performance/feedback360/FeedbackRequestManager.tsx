
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Edit, 
  Eye, 
  Search,
  Calendar,
  Users,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Feedback360Request, FeedbackSource, FeedbackSourceType } from '@/types/feedback360';

interface FeedbackRequestManagerProps {
  requests: Feedback360Request[];
}

const FeedbackRequestManager: React.FC<FeedbackRequestManagerProps> = ({ requests }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<Feedback360Request | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'view'>('list');

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (request: Feedback360Request) => {
    setSelectedRequest(request);
    setViewMode('view');
    setIsDialogOpen(true);
  };

  const handleEdit = (request: Feedback360Request) => {
    setSelectedRequest(request);
    setViewMode('form');
    setIsDialogOpen(true);
  };

  const getSourceTypeLabel = (type: FeedbackSourceType) => {
    switch (type) {
      case 'supervisor': return 'หัวหน้า';
      case 'peer': return 'เพื่อนร่วมงาน';
      case 'subordinate': return 'ผู้ใต้บังคับบัญชา';
      case 'customer': return 'ลูกค้า';
      case 'self': return 'ตนเอง';
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Badge variant="secondary">ร่าง</Badge>;
      case 'Sent':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">ส่งแล้ว</Badge>;
      case 'In Progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">กำลังดำเนินการ</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateProgress = (request: Feedback360Request) => {
    // In real app, this would be based on actual responses received
    const totalSources = request.sources.length;
    const completedResponses = Math.floor(Math.random() * totalSources); // Mock data
    return Math.round((completedResponses / totalSources) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหาชื่อพนักงาน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="Draft">ร่าง</SelectItem>
                <SelectItem value="Sent">ส่งแล้ว</SelectItem>
                <SelectItem value="In Progress">กำลังดำเนินการ</SelectItem>
                <SelectItem value="Completed">เสร็จสิ้น</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            คำขอ Feedback 360 องศา ({filteredRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>พนักงาน</TableHead>
                  <TableHead className="text-center">จำนวนผู้ให้ Feedback</TableHead>
                  <TableHead className="text-center">ความคืบหน้า</TableHead>
                  <TableHead className="text-center">สถานะ</TableHead>
                  <TableHead className="text-center">กำหนดเวลา</TableHead>
                  <TableHead className="text-center">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  const progress = calculateProgress(request);
                  const isOverdue = new Date() > request.deadline && request.status !== 'Completed';
                  
                  return (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.employeeName}</div>
                          <div className="text-sm text-gray-500">{request.employeeId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{request.sources.length}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={progress} className="h-2" />
                          <div className="text-xs text-center text-gray-500">{progress}%</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {request.status === 'Completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : isOverdue ? (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-500" />
                          )}
                          {getStatusBadge(request.status)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                          <div className="flex items-center justify-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {request.deadline.toLocaleDateString('th-TH')}
                          </div>
                          {isOverdue && (
                            <div className="text-xs text-red-500">เกินกำหนด</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(request)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(request)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for viewing/editing requests */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewMode === 'view' ? 'รายละเอียดคำขอ Feedback 360' : 'แก้ไขคำขอ Feedback 360'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && viewMode === 'view' && (
            <FeedbackRequestView request={selectedRequest} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Request View Component
interface FeedbackRequestViewProps {
  request: Feedback360Request;
}

const FeedbackRequestView: React.FC<FeedbackRequestViewProps> = ({ request }) => {
  const getSourceTypeLabel = (type: FeedbackSourceType) => {
    switch (type) {
      case 'supervisor': return 'หัวหน้า';
      case 'peer': return 'เพื่อนร่วมงาน';
      case 'subordinate': return 'ผู้ใต้บังคับบัญชา';
      case 'customer': return 'ลูกค้า';
      case 'self': return 'ตนเอง';
      default: return type;
    }
  };

  const getSourceTypeColor = (type: FeedbackSourceType) => {
    switch (type) {
      case 'supervisor': return 'bg-blue-100 text-blue-800';
      case 'peer': return 'bg-green-100 text-green-800';
      case 'subordinate': return 'bg-purple-100 text-purple-800';
      case 'customer': return 'bg-orange-100 text-orange-800';
      case 'self': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Employee Info */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลพนักงาน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">ชื่อ-นามสกุล</Label>
              <p className="font-medium">{request.employeeName}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">รหัสพนักงาน</Label>
              <p className="font-medium">{request.employeeId}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">สถานะ</Label>
              <div className="mt-1">
                {request.status === 'Completed' ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">เสร็จสิ้น</Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">กำลังดำเนินการ</Badge>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-600">กำหนดเวลา</Label>
              <p className="font-medium">{request.deadline.toLocaleDateString('th-TH')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Sources */}
      <Card>
        <CardHeader>
          <CardTitle>ผู้ให้ Feedback ({request.sources.length} คน)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {request.sources.map((source) => (
              <div key={source.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{source.name}</div>
                    <div className="text-sm text-gray-500">{source.email}</div>
                    <div className="text-sm text-gray-500">{source.relationship}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSourceTypeColor(source.type)}>
                    {getSourceTypeLabel(source.type)}
                  </Badge>
                  {source.isRequired && (
                    <Badge variant="outline" className="text-red-600 border-red-300">
                      จำเป็น
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span>ส่งแล้ว</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackRequestManager;
