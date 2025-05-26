
import React from 'react';
import IntegrationDashboard from '@/components/integrations/IntegrationDashboard';

const IntegrationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <IntegrationDashboard />
      </div>
    </div>
  );
};

export default IntegrationsPage;
