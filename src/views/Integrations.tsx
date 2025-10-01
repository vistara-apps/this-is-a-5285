import React, { useState } from 'react';
import { IntegrationCard } from '../components/integrations/IntegrationCard';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { mockIntegrations } from '../data/mockData';
import { Integration } from '../types';
import { 
  Plus, 
  RefreshCw, 
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const inputIntegrations = integrations.filter(i => 
    ['intercom', 'gmail', 'twitter', 'slack'].includes(i.type)
  );
  
  const outputIntegrations = integrations.filter(i => 
    ['linear', 'jira', 'notion'].includes(i.type)
  );

  const availableIntegrations = [
    { type: 'notion', name: 'Notion', description: 'Create pages in roadmap databases' }
  ];

  const handleConnect = (type: string) => {
    console.log(`Connecting to ${type}...`);
    // In a real app, this would initiate OAuth flow
  };

  const handleToggle = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: integration.status === 'active' ? 'paused' : 'active' as const
          }
        : integration
    ));
  };

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConfigModalOpen(true);
  };

  const activeCount = integrations.filter(i => i.status === 'active').length;
  const totalImported = integrations
    .filter(i => ['intercom', 'gmail', 'twitter', 'slack'].includes(i.type))
    .reduce((sum, i) => sum + i.itemCount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Integrations</h1>
          <p className="text-textMuted mt-1">
            Connect your tools to automatically import feedback and sync roadmap updates.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon={RefreshCw}>
            Sync All
          </Button>
          <Button variant="primary" icon={Plus}>
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-textMuted text-sm">Active Integrations</p>
              <p className="text-text text-2xl font-bold">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-textMuted text-sm">Items Imported</p>
              <p className="text-text text-2xl font-bold">{totalImported}</p>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-textMuted text-sm">Issues to Resolve</p>
              <p className="text-text text-2xl font-bold">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Integrations */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-text">Feedback Sources</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {inputIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConnect={() => handleConnect(integration.type)}
              onToggle={() => handleToggle(integration.id)}
              onConfigure={() => handleConfigure(integration)}
            />
          ))}
        </div>
      </div>

      {/* Output Integrations */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-text">Project Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {outputIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConnect={() => handleConnect(integration.type)}
              onToggle={() => handleToggle(integration.id)}
              onConfigure={() => handleConfigure(integration)}
            />
          ))}
        </div>
      </div>

      {/* Available Integrations */}
      {availableIntegrations.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-text">Available Integrations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableIntegrations.map((integration) => (
              <div key={integration.type} className="p-6 bg-surface border border-border rounded-lg border-dashed">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-text mb-2">{integration.name}</h3>
                  <p className="text-textMuted text-sm mb-4">{integration.description}</p>
                  <Button onClick={() => handleConnect(integration.type)}>
                    Connect {integration.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      <Modal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        title={`Configure ${selectedIntegration?.type}`}
      >
        {selectedIntegration && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Sync Frequency
                </label>
                <select className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Every 15 minutes</option>
                  <option>Every 30 minutes</option>
                  <option>Every hour</option>
                  <option>Every 4 hours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Import Filter
                </label>
                <input
                  type="text"
                  placeholder="e.g., support@company.com"
                  className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-textMuted mt-1">
                  Only import messages matching this criteria
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoTag"
                  className="rounded border-border text-primary focus:ring-primary"
                  defaultChecked
                />
                <label htmlFor="autoTag" className="text-sm text-text">
                  Enable AI auto-tagging
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button className="text-error hover:text-red-400 text-sm">
                Disconnect Integration
              </button>
              <div className="flex items-center space-x-3">
                <Button variant="secondary" onClick={() => setConfigModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setConfigModalOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}