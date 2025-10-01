export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  role: 'admin' | 'member';
  createdAt: Date;
  tier: 'free' | 'starter' | 'pro';
}

export interface Workspace {
  id: string;
  name: string;
  plan: 'free' | 'starter' | 'pro';
  monthlyItemLimit: number;
  usedItems: number;
  billingEmail: string;
  createdAt: Date;
}

export interface Integration {
  id: string;
  type: 'intercom' | 'gmail' | 'twitter' | 'slack' | 'linear' | 'jira' | 'notion';
  status: 'active' | 'paused' | 'error';
  lastSyncAt: Date | null;
  itemCount: number;
}

export interface FeedbackItem {
  id: string;
  rawContent: string;
  sanitizedContent: string;
  sourceType: 'intercom' | 'gmail' | 'twitter' | 'slack';
  sourceId: string;
  sourceUrl: string;
  authorName: string;
  authorEmail: string;
  receivedAt: Date;
  processedAt: Date;
  impactScore: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  status: 'inbox' | 'archived' | 'synced';
  threadId?: string;
}

export interface FeedbackThread {
  id: string;
  title: string;
  summary: string;
  category: 'feature_request' | 'bug' | 'ux_issue' | 'question' | 'praise';
  priority: 'critical' | 'high' | 'medium' | 'low';
  aggregateImpactScore: number;
  itemCount: number;
  items: FeedbackItem[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  syncedTo?: string;
}

export interface CustomerProfile {
  id: string;
  email: string;
  name: string;
  company: string;
  mrr: number;
  accountSize: 'free' | 'small' | 'medium' | 'enterprise';
  churnRisk: number;
  lastActivityAt: Date;
}