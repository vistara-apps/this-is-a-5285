import React from 'react';
import { StatsCard } from '../components/analytics/StatsCard';
import { AnalyticsChart } from '../components/analytics/AnalyticsChart';
import { ThreadCard } from '../components/feedback/ThreadCard';
import { mockThreads, analyticsData } from '../data/mockData';
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const topThreads = mockThreads
    .sort((a, b) => b.aggregateImpactScore - a.aggregateImpactScore)
    .slice(0, 3);

  const handleSyncThread = (threadId: string, platform: string) => {
    console.log(`Syncing thread ${threadId} to ${platform}`);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-textMuted mt-1">Welcome back! Here's what's happening with your feedback.</p>
        </div>
        <Button onClick={() => onViewChange('inbox')}>
          View All Feedback
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Feedback"
          value="127"
          change={{ value: 23, type: 'increase' }}
          icon={MessageSquare}
        />
        <StatsCard
          title="Avg Impact Score"
          value="76"
          change={{ value: 8, type: 'increase' }}
          icon={TrendingUp}
        />
        <StatsCard
          title="Active Customers"
          value="34"
          change={{ value: 12, type: 'increase' }}
          icon={Users}
        />
        <StatsCard
          title="Issues Synced"
          value="18"
          change={{ value: 5, type: 'decrease' }}
          icon={CheckCircle}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          type="line"
          data={analyticsData.feedbackVolume}
          title="Feedback Volume Trend"
          description="Number of feedback items received over time"
        />
        <AnalyticsChart
          type="bar"
          data={analyticsData.topFeatures}
          title="Top Feature Requests"
          description="Most requested features by number of mentions"
        />
      </div>

      {/* Top Priority Threads */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">High Priority Threads</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewChange('inbox')}
          >
            View All Threads
          </Button>
        </div>
        <div className="space-y-4">
          {topThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              onSync={(platform) => handleSyncThread(thread.id, platform)}
              onViewDetails={() => console.log('View thread details', thread.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}