import React from 'react';
import { Integration } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  MessageSquare, 
  Mail, 
  Twitter, 
  Slack, 
  ExternalLink,
  GitBranch,
  FileText,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onToggle?: () => void;
  onConfigure?: () => void;
}

const integrationConfig = {
  intercom: {
    name: 'Intercom',
    icon: MessageSquare,
    description: 'Import conversations and support tickets',
    color: 'bg-blue-500',
    category: 'input'
  },
  gmail: {
    name: 'Gmail',
    icon: Mail,
    description: 'Import customer emails and support messages',
    color: 'bg-red-500',
    category: 'input'
  },
  twitter: {
    name: 'Twitter/X',
    icon: Twitter,
    description: 'Monitor mentions, DMs, and replies',
    color: 'bg-black',
    category: 'input'
  },
  slack: {
    name: 'Slack',
    icon: Slack,
    description: 'Import messages from feedback channels',
    color: 'bg-purple-500',
    category: 'input'
  },
  linear: {
    name: 'Linear',
    icon: GitBranch,
    description: 'Sync issues and track development progress',
    color: 'bg-gray-500',
    category: 'output'
  },
  jira: {
    name: 'Jira',
    icon: ExternalLink,
    description: 'Create and update tickets in Jira projects',
    color: 'bg-blue-600',
    category: 'output'
  },
  notion: {
    name: 'Notion',
    icon: FileText,
    description: 'Create pages in roadmap databases',
    color: 'bg-gray-700',
    category: 'output'
  }
};

export function IntegrationCard({ integration, onConnect, onToggle, onConfigure }: IntegrationCardProps) {
  const config = integrationConfig[integration.type];
  const Icon = config.icon;
  
  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Never synced';
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const isConnected = integration.status !== 'error';

  return (
    <div className="p-6 bg-surface border border-border rounded-lg hover:shadow-cardHover transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-text">{config.name}</h3>
              <Badge variant="status" status={integration.status}>
                {integration.status}
              </Badge>
            </div>
            <p className="text-textMuted text-sm mb-2">{config.description}</p>
            {isConnected && (
              <div className="flex items-center space-x-4 text-sm text-textMuted">
                <span>Last sync: {formatLastSync(integration.lastSyncAt)}</span>
                {config.category === 'input' && (
                  <span>{integration.itemCount} items imported</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                icon={integration.status === 'active' ? Pause : Play}
                onClick={onToggle}
              >
                {integration.status === 'active' ? 'Pause' : 'Resume'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={Settings}
                onClick={onConfigure}
              >
                Configure
              </Button>
              {integration.status === 'active' && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={RefreshCw}
                  onClick={() => {}}
                >
                  Sync Now
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onConnect}
            >
              Connect
            </Button>
          )}
        </div>
        
        {integration.status === 'error' && (
          <span className="text-sm text-error">
            Authentication failed
          </span>
        )}
      </div>
    </div>
  );
}