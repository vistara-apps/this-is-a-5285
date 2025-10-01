import React from 'react';
import { FeedbackItem } from '../../types';
import { Badge } from '../ui/Badge';
import { 
  ExternalLink, 
  MessageSquare, 
  Mail, 
  Twitter, 
  Slack,
  Clock
} from 'lucide-react';

interface FeedbackCardProps {
  item: FeedbackItem;
  variant?: 'inbox' | 'thread' | 'preview';
  onClick?: () => void;
}

const sourceIcons = {
  intercom: MessageSquare,
  gmail: Mail,
  twitter: Twitter,
  slack: Slack
};

export function FeedbackCard({ item, variant = 'inbox', onClick }: FeedbackCardProps) {
  const SourceIcon = sourceIcons[item.sourceType];
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getImpactLevel = (score: number): 'low' | 'medium' | 'high' | 'critical' => {
    if (score >= 90) return 'critical';
    if (score >= 70) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  if (variant === 'preview') {
    return (
      <div 
        className="p-4 bg-surface border border-border rounded-md hover:bg-surfaceHover transition-colors cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start space-x-3">
          <SourceIcon className="w-4 h-4 text-textMuted mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-text line-clamp-2">{item.sanitizedContent}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-textMuted">{item.authorName}</span>
              <Badge variant="impact" impact={getImpactLevel(item.impactScore)}>
                {item.impactScore}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-surface border border-border rounded-lg hover:shadow-cardHover transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex-shrink-0">
            <SourceIcon className="w-5 h-5 text-textMuted" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium text-text">{item.authorName}</h4>
              <span className="text-sm text-textMuted">•</span>
              <span className="text-sm text-textMuted">{item.authorEmail}</span>
              <span className="text-sm text-textMuted">•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-textMuted" />
                <span className="text-sm text-textMuted">{formatTimeAgo(item.receivedAt)}</span>
              </div>
            </div>
            <p className="text-text mb-4 leading-relaxed">{item.sanitizedContent}</p>
            <div className="flex items-center space-x-3">
              <Badge variant="impact" impact={getImpactLevel(item.impactScore)}>
                Impact: {item.impactScore}
              </Badge>
              <Badge variant="default">
                {item.sentiment}
              </Badge>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm text-primary hover:text-primaryHover"
              >
                <span>View source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}