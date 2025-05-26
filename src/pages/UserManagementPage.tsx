
import React from 'react';
import UserManagementDashboard from '@/components/auth/UserManagementDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RoleManager from '@/components/auth/RoleManager';
import SecurityDashboard from '@/components/auth/SecurityDashboard';

const UserManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">การจัดการผู้ใช้</TabsTrigger>
            <TabsTrigger value="roles">การจัดการสิทธิ์</TabsTrigger>
            <TabsTrigger value="security">ความปลอดภัย</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagementDashboard />
          </TabsContent>

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

export default UserManagementPage;
