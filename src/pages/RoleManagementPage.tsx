
import React from 'react';
import RoleManager from '@/components/auth/RoleManager';
import SecurityDashboard from '@/components/auth/SecurityDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RoleManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="roles">การจัดการสิทธิ์</TabsTrigger>
            <TabsTrigger value="security">ความปลอดภัย</TabsTrigger>
          </TabsList>

          <TabsContent value="roles">
            <RoleManager />
          </TabsContent>

          <TabsContent value="security">
            <SecurityDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoleManagementPage;
