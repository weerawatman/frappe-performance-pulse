
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { integrationService } from '@/services/integrationService';
import { IntegrationType } from '@/types/integrations';
import { useToast } from '@/hooks/use-toast';

interface CreateIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CreateIntegrationDialog: React.FC<CreateIntegrationDialogProps> = ({
  open,
  onOpenChange,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'hrms' as IntegrationType,
    apiEndpoint: '',
    syncInterval: 60,
    autoSync: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const typeOptions = [
    { value: 'hrms', label: 'ระบบทรัพยากรบุคคล (HRMS)' },
    { value: 'payroll', label: 'ระบบเงินเดือนและค่าตอบแทน' },
    { value: 'training', label: 'ระบบการฝึกอบรมและพัฒนา' },
    { value: 'succession-planning', label: 'ระบบการวางแผนสืบทอดตำแหน่ง' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newIntegration = integrationService.createIntegration({
        ...formData,
        status: 'Disconnected',
        config: {
          dataMapping: {},
          syncFields: []
        }
      });

      toast({
        title: "สร้างการเชื่อมโยงสำเร็จ",
        description: `ระบบ ${newIntegration.name} ถูกเพิ่มเรียบร้อยแล้ว`,
      });

      onSuccess();
      onOpenChange(false);
      
      // Reset form
      setFormData({
        name: '',
        type: 'hrms',
        apiEndpoint: '',
        syncInterval: 60,
        autoSync: true
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถสร้างการเชื่อมโยงได้",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>เพิ่มการเชื่อมโยงระบบใหม่</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อระบบ</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="เช่น SAP SuccessFactors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">ประเภทระบบ</Label>
            <Select
              value={formData.type}
              onValueChange={(value: IntegrationType) => 
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiEndpoint">API Endpoint</Label>
            <Input
              id="apiEndpoint"
              value={formData.apiEndpoint}
              onChange={(e) => setFormData({ ...formData, apiEndpoint: e.target.value })}
              placeholder="https://api.example.com/v1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="syncInterval">ช่วงการซิงค์ (นาที)</Label>
            <Input
              id="syncInterval"
              type="number"
              value={formData.syncInterval}
              onChange={(e) => setFormData({ ...formData, syncInterval: parseInt(e.target.value) })}
              min="5"
              max="10080"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="autoSync"
              checked={formData.autoSync}
              onCheckedChange={(checked) => setFormData({ ...formData, autoSync: checked })}
            />
            <Label htmlFor="autoSync">เปิดการซิงค์อัตโนมัติ</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              ยกเลิก
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'กำลังสร้าง...' : 'สร้างการเชื่อมโยง'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIntegrationDialog;
