
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  RefreshCw, 
  Settings, 
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Plus,
  Zap
} from 'lucide-react';
import { integrationService } from '@/services/integrationService';
import { SystemIntegration, SyncLog } from '@/types/integrations';
import IntegrationCard from './IntegrationCard';
import SyncLogTable from './SyncLogTable';
import CreateIntegrationDialog from './CreateIntegrationDialog';
import { useToast } from '@/hooks/use-toast';

const IntegrationDashboard: React.FC = () => {
  const [integrations, setIntegrations] = useState<SystemIntegration[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIntegrations(integrationService.getIntegrations());
    setSyncLogs(integrationService.getSyncLogs());
  };

  const handleSync = async (integrationId: string) => {
    setLoading(true);
    try {
      const syncLog = await integrationService.syncIntegration(integrationId);
      
      toast({
        title: "การซิงค์เสร็จสิ้น",
        description: `ประมวลผล ${syncLog.recordsProcessed} รายการ สำเร็จ ${syncLog.recordsSuccessful} รายการ`,
      });
      
      loadData();
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถซิงค์ข้อมูลได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async (integrationId: string) => {
    setLoading(true);
    try {
      const success = await integrationService.testConnection(integrationId);
      
      toast({
        title: success ? "การเชื่อมต่อสำเร็จ" : "การเชื่อมต่อล้มเหลว",
        description: success ? "ระบบสามารถเชื่อมต่อได้ปกติ" : "ไม่สามารถเชื่อมต่อกับระบบได้",
        variant: success ? "default" : "destructive",
      });
      
      loadData();
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถทดสอบการเชื่อมต่อได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusStats = () => {
    const connected = integrations.filter(i => i.status === 'Connected').length;
    const disconnected = integrations.filter(i => i.status === 'Disconnected').length;
    const error = integrations.filter(i => i.status === 'Error').length;
    
    return { connected, disconnected, error };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">การเชื่อมโยงระบบ</h2>
          <p className="text-gray-600">จัดการการเชื่อมต่อกับระบบภายนอก</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มการเชื่อมโยง
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Database className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ระบบทั้งหมด</p>
                <p className="text-2xl font-bold">{integrations.length}</p>
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
                <p className="text-sm font-medium text-gray-600">เชื่อมต่อแล้ว</p>
                <p className="text-2xl font-bold">{stats.connected}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <XCircle className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ขาดการเชื่อมต่อ</p>
                <p className="text-2xl font-bold">{stats.disconnected}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">มีข้อผิดพลาด</p>
                <p className="text-2xl font-bold">{stats.error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            การเชื่อมโยง
          </TabsTrigger>
          <TabsTrigger value="sync-logs" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            ประวัติการซิงค์
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onSync={() => handleSync(integration.id)}
                onTestConnection={() => handleTestConnection(integration.id)}
                loading={loading}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sync-logs">
          <Card>
            <CardHeader>
              <CardTitle>ประวัติการซิงค์ข้อมูล</CardTitle>
            </CardHeader>
            <CardContent>
              <SyncLogTable logs={syncLogs} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateIntegrationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={loadData}
      />
    </div>
  );
};

export default IntegrationDashboard;
