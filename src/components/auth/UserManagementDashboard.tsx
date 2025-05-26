import React, { useState, useEffect } from 'react';
import { Users, Shield, Clock, AlertTriangle, Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, AccessLog, TemporaryAssignment } from '@/types/auth';
import { userManagementService } from '@/services/userManagementService';

const UserManagementDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [temporaryAssignments, setTemporaryAssignments] = useState<TemporaryAssignment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setUsers(userManagementService.getUsers());
    setAccessLogs(userManagementService.getAccessLogs(undefined, 50));
    // Load temporary assignments would go here
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'checker': return 'bg-purple-500';
      case 'approver': return 'bg-blue-500';
      case 'employee': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (user: User) => {
    if (!user.isActive) return <Badge variant="destructive">ปิดใช้งาน</Badge>;
    if (!user.lastLoginAt) return <Badge variant="secondary">ยังไม่เข้าสู่ระบบ</Badge>;
    
    const daysSinceLogin = Math.floor((Date.now() - user.lastLoginAt.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceLogin > 30) return <Badge variant="outline">ไม่ได้ใช้งานนาน</Badge>;
    
    return <Badge variant="default">ใช้งานปกติ</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const departments = [...new Set(users.map(u => u.department))];
  const roles = [...new Set(users.map(u => u.role))];

  const userStats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    byRole: {
      admin: users.filter(u => u.role === 'admin').length,
      checker: users.filter(u => u.role === 'checker').length,
      approver: users.filter(u => u.role === 'approver').length,
      employee: users.filter(u => u.role === 'employee').length,
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">การจัดการผู้ใช้และสิทธิ์</h2>
          <p className="text-gray-600">จัดการผู้ใช้ สิทธิ์การเข้าถึง และโครงสร้างองค์กร</p>
        </div>
        <Button onClick={() => setIsUserDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มผู้ใช้
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ผู้ใช้ทั้งหมด</p>
                <p className="text-2xl font-bold">{userStats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ผู้ใช้ที่ใช้งาน</p>
                <p className="text-2xl font-bold">{userStats.active}</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ผู้ดูแลระบบ</p>
                <p className="text-2xl font-bold">{userStats.byRole.admin}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Checker</p>
                <p className="text-2xl font-bold">{userStats.byRole.checker}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">พนักงาน</p>
                <p className="text-2xl font-bold">{userStats.byRole.employee}</p>
              </div>
              <Users className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            จัดการผู้ใช้
          </TabsTrigger>
          <TabsTrigger value="hierarchy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            โครงสร้างองค์กร
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            การมอบหมายชั่วคราว
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            ประวัติการเข้าถึง
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>จัดการผู้ใช้</CardTitle>
              <CardDescription>จัดการข้อมูลผู้ใช้และกำหนดสิทธิ์การเข้าถึง</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="ค้นหาชื่อ อีเมล หรือแผนก..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="เลือกบทบาท" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกบทบาท</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="เลือกแผนก" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกแผนก</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อ</TableHead>
                      <TableHead>อีเมล</TableHead>
                      <TableHead>แผนก</TableHead>
                      <TableHead>ตำแหน่ง</TableHead>
                      <TableHead>บทบาท</TableHead>
                      <TableHead>ผู้บังคับบัญชา</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead>การจัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.position}</TableCell>
                        <TableCell>
                          <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.managerId && (
                            <span className="text-sm">
                              {users.find(u => u.id === user.managerId)?.name || 'ไม่พบข้อมูล'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(user)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsUserDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hierarchy">
          <Card>
            <CardHeader>
              <CardTitle>โครงสร้างองค์กร</CardTitle>
              <CardDescription>จัดการโครงสร้างองค์กรและสายการบังคับบัญชา</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">โครงสร้างองค์กรจะถูกพัฒนาในเฟสถัดไป</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>การมอบหมายชั่วคราว</CardTitle>
              <CardDescription>จัดการการมอบหมายงานชั่วคราว</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">ระบบการมอบหมายชั่วคราวจะถูกพัฒนาในเฟสถัดไป</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>ประวัติการเข้าถึง</CardTitle>
              <CardDescription>ติดตามการใช้งานและการเข้าถึงระบบ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ผู้ใช้</TableHead>
                      <TableHead>การกระทำ</TableHead>
                      <TableHead>ทรัพยากร</TableHead>
                      <TableHead>เวลา</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.userName}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.resource}</TableCell>
                        <TableCell>{log.timestamp.toLocaleString('th-TH')}</TableCell>
                        <TableCell>
                          <Badge variant={log.success ? "default" : "destructive"}>
                            {log.success ? 'สำเร็จ' : 'ล้มเหลว'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
            </DialogTitle>
            <DialogDescription>
              กำหนดข้อมูลและสิทธิ์ของผู้ใช้
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-600">ฟอร์มจัดการผู้ใช้จะถูกพัฒนาในเฟสถัดไป</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementDashboard;
