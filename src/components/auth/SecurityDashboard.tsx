import React, { useState, useEffect } from 'react';
import { Shield, Lock, Database, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecuritySettings, AccessLog } from '@/types/auth';
import { authService } from '@/services/authService';

const SecurityDashboard: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettings | null>(null);
  const [recentLogs, setRecentLogs] = useState<AccessLog[]>([]);
  const [securityScore, setSecurityScore] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const securitySettings = authService.getSecuritySettings();
    const logs = authService.getAccessLogs(undefined, 20);
    
    setSettings(securitySettings);
    setRecentLogs(logs);
    calculateSecurityScore(securitySettings);
  };

  const calculateSecurityScore = (settings: SecuritySettings) => {
    let score = 0;
    
    // Password strength (25 points)
    if (settings.passwordMinLength >= 8) score += 10;
    if (settings.passwordRequireSpecialChar) score += 15;
    
    // Session security (25 points)
    if (settings.sessionTimeoutMinutes <= 480) score += 15;
    if (settings.maxLoginAttempts <= 5) score += 10;
    
    // Monitoring (25 points)
    if (settings.enableAuditLog) score += 15;
    if (settings.enableDataEncryption) score += 10;
    
    // Backup (25 points)
    if (settings.autoBackupEnabled) score += 15;
    if (settings.backupFrequencyHours <= 24) score += 10;
    
    setSecurityScore(score);
  };

  const handleSettingChange = (key: keyof SecuritySettings, value: any) => {
    if (!settings) return;
    
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    authService.updateSecuritySettings(updatedSettings);
    calculateSecurityScore(updatedSettings);
  };

  const getSecurityScoreColor = () => {
    if (securityScore >= 80) return 'text-green-600';
    if (securityScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSecurityScoreVariant = () => {
    if (securityScore >= 80) return 'default';
    if (securityScore >= 60) return 'secondary';
    return 'destructive';
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">ความปลอดภัยระบบ</h2>
          <p className="text-gray-600">จัดการการตั้งค่าความปลอดภัยและติดตามการเข้าถึง</p>
        </div>
      </div>

      {/* Security Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">คะแนนความปลอดภัย</p>
                <p className={`text-2xl font-bold ${getSecurityScoreColor()}`}>
                  {securityScore}/100
                </p>
              </div>
              <Shield className={`w-8 h-8 ${getSecurityScoreColor()}`} />
            </div>
            <Progress value={securityScore} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ผู้ใช้ที่ใช้งาน</p>
                <p className="text-2xl font-bold text-blue-600">
                  {authService.getUsers().filter(u => u.isActive).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">การเข้าสู่ระบบล้มเหลว</p>
                <p className="text-2xl font-bold text-red-600">
                  {recentLogs.filter(log => log.action === 'login' && !log.success).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">การสำรองข้อมูล</p>
                <p className="text-2xl font-bold text-green-600">
                  {settings.autoBackupEnabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </p>
              </div>
              <Database className={`w-8 h-8 ${settings.autoBackupEnabled ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            การตั้งค่า
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            การติดตาม
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            การสำรองข้อมูล
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                การตั้งค่ารหัสผ่าน
              </CardTitle>
              <CardDescription>
                กำหนดนโยบายรหัสผ่านและความปลอดภัย
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min-length">ความยาวรหัสผ่านขั้นต่ำ</Label>
                  <Input
                    id="min-length"
                    type="number"
                    min="6"
                    max="50"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="special-char"
                    checked={settings.passwordRequireSpecialChar}
                    onCheckedChange={(checked) => handleSettingChange('passwordRequireSpecialChar', checked)}
                  />
                  <Label htmlFor="special-char">ต้องมีอักขระพิเศษ</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-timeout">หมดเวลาเซสชัน (นาที)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    min="30"
                    max="1440"
                    value={settings.sessionTimeoutMinutes}
                    onChange={(e) => handleSettingChange('sessionTimeoutMinutes', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="max-attempts">ครั้งสูงสุดที่เข้าสู่ระบบล้มเหลว</Label>
                  <Input
                    id="max-attempts"
                    type="number"
                    min="3"
                    max="10"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lockout-duration">ระยะเวลาล็อค (นาที)</Label>
                <Input
                  id="lockout-duration"
                  type="number"
                  min="5"
                  max="120"
                  value={settings.lockoutDurationMinutes}
                  onChange={(e) => handleSettingChange('lockoutDurationMinutes', parseInt(e.target.value))}
                  className="max-w-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                การติดตามและบันทึก
              </CardTitle>
              <CardDescription>
                ตั้งค่าการติดตามการใช้งานและความปลอดภัย
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="audit-log">เปิดใช้งาน Audit Log</Label>
                  <p className="text-sm text-gray-600">บันทึกการเข้าถึงและการเปลี่ยนแปลงข้อมูล</p>
                </div>
                <Switch
                  id="audit-log"
                  checked={settings.enableAuditLog}
                  onCheckedChange={(checked) => handleSettingChange('enableAuditLog', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-encryption">เข้ารหัสข้อมูลที่สำคัญ</Label>
                  <p className="text-sm text-gray-600">เข้ารหัสข้อมูลที่ละเอียดอ่อน</p>
                </div>
                <Switch
                  id="data-encryption"
                  checked={settings.enableDataEncryption}
                  onCheckedChange={(checked) => handleSettingChange('enableDataEncryption', checked)}
                />
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">กิจกรรมล่าสุด</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">{log.userName} - {log.action}</p>
                        <p className="text-xs text-gray-600">{log.timestamp.toLocaleString('th-TH')}</p>
                      </div>
                      <Badge variant={log.success ? "default" : "destructive"}>
                        {log.success ? 'สำเร็จ' : 'ล้มเหลว'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                การสำรองข้อมูล
              </CardTitle>
              <CardDescription>
                ตั้งค่าการสำรองข้อมูลอัตโนมัติ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">การสำรองข้อมูลอัตโนมัติ</Label>
                  <p className="text-sm text-gray-600">สำรองข้อมูลตามระยะเวลาที่กำหนด</p>
                </div>
                <Switch
                  id="auto-backup"
                  checked={settings.autoBackupEnabled}
                  onCheckedChange={(checked) => handleSettingChange('autoBackupEnabled', checked)}
                />
              </div>

              <div>
                <Label htmlFor="backup-frequency">ความถี่การสำรองข้อมูล (ชั่วโมง)</Label>
                <Input
                  id="backup-frequency"
                  type="number"
                  min="1"
                  max="168"
                  value={settings.backupFrequencyHours}
                  onChange={(e) => handleSettingChange('backupFrequencyHours', parseInt(e.target.value))}
                  className="max-w-sm"
                  disabled={!settings.autoBackupEnabled}
                />
              </div>

              <div className="mt-6 p-4 border rounded bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">สถานะการสำรองข้อมูล</span>
                </div>
                <p className="text-sm text-blue-700">
                  การสำรองข้อมูลล่าสุด: {new Date().toLocaleString('th-TH')}
                </p>
                <p className="text-sm text-blue-700">
                  การสำรองข้อมูลถัดไป: {new Date(Date.now() + settings.backupFrequencyHours * 60 * 60 * 1000).toLocaleString('th-TH')}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  สำรองข้อมูลทันที
                </Button>
                <Button variant="outline">
                  ดาวน์โหลดข้อมูลสำรอง
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
