import React from 'react';
import { FeedbackThread } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Users, 
  ArrowRight, 
  ExternalLink,
  Clock,
  MessageSquare,
  Mail,
  Twitter,
  Slack
} from 'lucide-react';

interface ThreadCardProps {
  thread: FeedbackThread;
  onSync?: (platform: string) => void;
  onViewDetails?: () => void;
}

const sourceIcons = {
  intercom: MessageSquare,
  gmail: Mail,
  twitter: Twitter,
  slack: Slack
};

export function ThreadCard({ thread, onSync, onViewDetails }: ThreadCardProps) {
  const getImpactLevel = (score: number): 'low' | 'medium' | 'high' | 'critical' => {
    if (score >= 90) return 'critical';
    if (score >= 70) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const sourceCounts = thread.items.reduce((acc, item) => {
    acc[item.sourceType] = (acc[item.sourceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 bg-surface border border-border rounded-lg hover:shadow-cardHover transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-text">{thread.title}</h3>
            <Badge variant="category" category={thread.category}>
              {thread.category.replace('_', ' ')}
            </Badge>
            <Badge variant="impact" impact={getImpactLevel(thread.aggregateImpactScore)}>
              {thread.aggregateImpactScore}
            </Badge>
          </div>
          <p className="text-textMuted mb-3 leading-relaxed">{thread.summary}</p>
          
          {/* Source breakdown */}
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-textMuted" />
              <span className="text-sm text-textMuted">{thread.itemCount} feedback items</span>
            </div>
            <div className="flex items-center space-x-2">
              {Object.entries(sourceCounts).map(([source, count]) => {
                const Icon = sourceIcons[source as keyof typeof sourceIcons];
                return (
                  <div key={source} className="flex items-center space-x-1">
                    <Icon className="w-3 h-3 text-textMuted" />
                    <span className="text-xs text-textMuted">{count}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-textMuted" />
              <span className="text-sm text-textMuted">Updated {formatTimeAgo(thread.updatedAt)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center space-x-2 mb-4">
            {thread.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-sm border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {thread.syncedTo ? (
            <div className="flex items-center space-x-2">
              <Badge variant="status" status="active">
                Synced to {thread.syncedTo}
              </Badge>
              <button className="text-primary hover:text-primaryHover text-sm inline-flex items-center space-x-1">
                <span>View issue</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSync?.('linear')}
              >
                Sync to Linear
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSync?.('jira')}
              >
                Sync to Jira
              </Button>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowRight}
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}