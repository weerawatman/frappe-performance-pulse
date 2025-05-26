
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { SyncLog } from '@/types/integrations';
import { format } from 'date-fns';

interface SyncLogTableProps {
  logs: SyncLog[];
}

const SyncLogTable: React.FC<SyncLogTableProps> = ({ logs }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            สำเร็จ
          </Badge>
        );
      case 'Failed':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            ล้มเหลว
          </Badge>
        );
      case 'Partial':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            บางส่วน
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>วันที่และเวลา</TableHead>
            <TableHead>ระบบ</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead>รายการทั้งหมด</TableHead>
            <TableHead>สำเร็จ</TableHead>
            <TableHead>ล้มเหลว</TableHead>
            <TableHead>ข้อความ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                {format(log.timestamp, 'dd/MM/yyyy HH:mm:ss')}
              </TableCell>
              <TableCell className="font-medium">
                {log.integrationName}
              </TableCell>
              <TableCell>
                {getStatusBadge(log.status)}
              </TableCell>
              <TableCell>
                {log.recordsProcessed}
              </TableCell>
              <TableCell className="text-green-600">
                {log.recordsSuccessful}
              </TableCell>
              <TableCell className="text-red-600">
                {log.recordsFailed}
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {log.errorMessage || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {logs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">ยังไม่มีประวัติการซิงค์</p>
        </div>
      )}
    </div>
  );
};

export default SyncLogTable;
