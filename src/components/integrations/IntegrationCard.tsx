
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Settings, 
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap
} from 'lucide-react';
import { SystemIntegration } from '@/types/integrations';
import { format } from 'date-fns';

interface IntegrationCardProps {
  integration: SystemIntegration;
  onSync: () => void;
  onTestConnection: () => void;
  loading: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onSync,
  onTestConnection,
  loading
}) => {
  const getStatusBadge = () => {
    switch (integration.status) {
      case 'Connected':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            เชื่อมต่อแล้ว
          </Badge>
        );
      case 'Disconnected':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            ขาดการเชื่อมต่อ
          </Badge>
        );
      case 'Error':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            มีข้อผิดพลาด
          </Badge>
        );
      default:
        return <Badge variant="secondary">{integration.status}</Badge>;
    }
  };

  const getTypeLabel = () => {
    switch (integration.type) {
      case 'hrms':
        return 'ระบบทรัพยากรบุคคล';
      case 'payroll':
        return 'ระบบเงินเดือน';
      case 'training':
        return 'ระบบฝึกอบรม';
      case 'succession-planning':
        return 'ระบบวางแผนสืบทอด';
      default:
        return integration.type;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{integration.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{getTypeLabel()}</p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">การซิงค์ล่าสุด:</span>
            <span>
              {integration.lastSync 
                ? format(integration.lastSync, 'dd/MM/yyyy HH:mm')
                : 'ยังไม่เคยซิงค์'
              }
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">ช่วงการซิงค์:</span>
            <span>{integration.syncInterval} นาที</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">การซิงค์อัตโนมัติ:</span>
            <span>{integration.autoSync ? 'เปิด' : 'ปิด'}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSync}
            disabled={loading || integration.status !== 'Connected'}
            className="flex-1"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            ซิงค์
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onTestConnection}
            disabled={loading}
            className="flex-1"
          >
            <Zap className="w-4 h-4 mr-2" />
            ทดสอบ
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          ตั้งค่า
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
