import React from 'react';
import { StatsCard } from '../components/analytics/StatsCard';
import { AnalyticsChart } from '../components/analytics/AnalyticsChart';
import { analyticsData } from '../data/mockData';
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Star,
  Download,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Analytics() {
  const sentimentPieData = [
    { name: 'Positive', value: 65, color: 'hsl(142, 71%, 45%)' },
    { name: 'Neutral', value: 25, color: 'hsl(38, 92%, 50%)' },
    { name: 'Negative', value: 10, color: 'hsl(0, 72%, 51%)' }
  ];

  const categoryTrendData = [
    { name: 'Week 1', feature_requests: 12, bugs: 3, ux_issues: 5 },
    { name: 'Week 2', feature_requests: 15, bugs: 2, ux_issues: 4 },
    { name: 'Week 3', feature_requests: 18, bugs: 5, ux_issues: 6 },
    { name: 'Week 4', feature_requests: 22, bugs: 1, ux_issues: 3 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Analytics</h1>
          <p className="text-textMuted mt-1">Gain insights into your customer feedback patterns and trends.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon={Calendar}>
            Last 30 Days
          </Button>
          <Button variant="primary" icon={Download}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Feedback"
          value="284"
          change={{ value: 23, type: 'increase' }}
          icon={MessageSquare}
        />
        <StatsCard
          title="Avg Sentiment Score"
          value="7.2"
          change={{ value: 5, type: 'increase' }}
          icon={Star}
        />
        <StatsCard
          title="Active Contributors"
          value="67"
          change={{ value: 12, type: 'increase' }}
          icon={Users}
        />
        <StatsCard
          title="Feature Requests"
          value="156"
          change={{ value: 18, type: 'increase' }}
          icon={TrendingUp}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          type="line"
          data={analyticsData.feedbackVolume}
          title="Feedback Volume Over Time"
          description="Daily feedback collection trends"
        />
        <AnalyticsChart
          type="pie"
          data={sentimentPieData}
          title="Overall Sentiment Distribution"
          description="Breakdown of customer sentiment"
        />
      </div>

      {/* Feature Requests & Category Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          type="bar"
          data={analyticsData.topFeatures}
          title="Most Requested Features"
          description="Features ranked by customer demand"
        />
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text mb-4">High-Value Customer Feedback</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-bg rounded-md border border-border">
              <div>
                <p className="font-medium text-text">Dark Mode Implementation</p>
                <p className="text-sm text-textMuted">3 enterprise customers ($2,400 MRR)</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-impactHigh">Impact: 92</p>
                <p className="text-xs text-textMuted">Critical Priority</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg rounded-md border border-border">
              <div>
                <p className="font-medium text-text">API Rate Limiting</p>
                <p className="text-sm text-textMuted">2 enterprise customers ($1,800 MRR)</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-impactHigh">Impact: 85</p>
                <p className="text-xs text-textMuted">High Priority</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg rounded-md border border-border">
              <div>
                <p className="font-medium text-text">Mobile App</p>
                <p className="text-sm text-textMuted">5 customers ($1,200 MRR)</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-impactMedium">Impact: 68</p>
                <p className="text-xs text-textMuted">Medium Priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment Analysis by Category */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Sentiment by Feedback Category</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-textMuted font-medium py-3">Category</th>
                <th className="text-right text-textMuted font-medium py-3">Positive</th>
                <th className="text-right text-textMuted font-medium py-3">Neutral</th>
                <th className="text-right text-textMuted font-medium py-3">Negative</th>
                <th className="text-right text-textMuted font-medium py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.sentimentByCategory.map((category) => (
                <tr key={category.category} className="border-b border-border/50">
                  <td className="text-text py-3">{category.category}</td>
                  <td className="text-right text-success py-3">{category.positive}%</td>
                  <td className="text-right text-warning py-3">{category.neutral}%</td>
                  <td className="text-right text-error py-3">{category.negative}%</td>
                  <td className="text-right text-text py-3">
                    {category.positive + category.neutral + category.negative} items
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}