import { Integration, FeedbackItem, FeedbackThread, CustomerProfile } from '../types';

export const mockIntegrations: Integration[] = [
  {
    id: '1',
    type: 'intercom',
    status: 'active',
    lastSyncAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    itemCount: 47
  },
  {
    id: '2',
    type: 'gmail',
    status: 'active',
    lastSyncAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    itemCount: 23
  },
  {
    id: '3',
    type: 'slack',
    status: 'active',
    lastSyncAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    itemCount: 12
  },
  {
    id: '4',
    type: 'twitter',
    status: 'paused',
    lastSyncAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    itemCount: 8
  },
  {
    id: '5',
    type: 'linear',
    status: 'active',
    lastSyncAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    itemCount: 0 // Output integration
  },
  {
    id: '6',
    type: 'jira',
    status: 'error',
    lastSyncAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    itemCount: 0 // Output integration
  }
];

export const mockCustomers: CustomerProfile[] = [
  {
    id: '1',
    email: 'sarah@acme.com',
    name: 'Sarah Chen',
    company: 'Acme Corp',
    mrr: 850,
    accountSize: 'enterprise',
    churnRisk: 15,
    lastActivityAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    email: 'mike@startup.io',
    name: 'Mike Johnson',
    company: 'Startup Inc',
    mrr: 199,
    accountSize: 'small',
    churnRisk: 45,
    lastActivityAt: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '3',
    email: 'alex@techco.com',
    name: 'Alex Rivera',
    company: 'TechCo',
    mrr: 499,
    accountSize: 'medium',
    churnRisk: 25,
    lastActivityAt: new Date(Date.now() - 60 * 60 * 1000)
  }
];

export const mockFeedbackItems: FeedbackItem[] = [
  {
    id: '1',
    rawContent: 'Hey team! Love the app but really need dark mode. My eyes are bleeding during late night sessions 😅',
    sanitizedContent: 'Love the app but really need dark mode. Eyes are sensitive during late night sessions.',
    sourceType: 'slack',
    sourceId: 'msg_123',
    sourceUrl: 'https://workspace.slack.com/archives/C123/p1234567890',
    authorName: 'Sarah Chen',
    authorEmail: 'sarah@acme.com',
    receivedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    processedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    impactScore: 85,
    sentiment: 'positive',
    status: 'inbox',
    threadId: 'thread_1'
  },
  {
    id: '2',
    rawContent: 'Subject: Dark Mode Request\n\nHi support,\n\nWould it be possible to add a dark theme? I use your app daily and would love this feature.\n\nBest,\nMike',
    sanitizedContent: 'Would it be possible to add a dark theme? I use your app daily and would love this feature.',
    sourceType: 'gmail',
    sourceId: 'email_456',
    sourceUrl: 'mailto:support@company.com',
    authorName: 'Mike Johnson',
    authorEmail: 'mike@startup.io',
    receivedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    processedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    impactScore: 65,
    sentiment: 'positive',
    status: 'inbox',
    threadId: 'thread_1'
  },
  {
    id: '3',
    rawContent: '@company loving the updates! Any chance for dark mode? #darkmode #feature',
    sanitizedContent: 'Loving the updates! Any chance for dark mode?',
    sourceType: 'twitter',
    sourceId: 'tweet_789',
    sourceUrl: 'https://twitter.com/user/status/123456789',
    authorName: 'Alex Rivera',
    authorEmail: 'alex@techco.com',
    receivedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    processedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    impactScore: 72,
    sentiment: 'positive',
    status: 'inbox',
    threadId: 'thread_1'
  },
  {
    id: '4',
    rawContent: 'The login page is completely broken on Safari. Cannot authenticate at all.',
    sanitizedContent: 'The login page is completely broken on Safari. Cannot authenticate at all.',
    sourceType: 'intercom',
    sourceId: 'conv_123',
    sourceUrl: 'https://app.intercom.com/conversations/123',
    authorName: 'Sarah Chen',
    authorEmail: 'sarah@acme.com',
    receivedAt: new Date(Date.now() - 30 * 60 * 1000),
    processedAt: new Date(Date.now() - 30 * 60 * 1000),
    impactScore: 95,
    sentiment: 'negative',
    status: 'inbox',
    threadId: 'thread_2'
  },
  {
    id: '5',
    rawContent: 'Would be amazing to have a mobile app! I travel a lot and mobile web is not great.',
    sanitizedContent: 'Would be amazing to have a mobile app! I travel a lot and mobile web is not great.',
    sourceType: 'intercom',
    sourceId: 'conv_456',
    sourceUrl: 'https://app.intercom.com/conversations/456',
    authorName: 'Mike Johnson',
    authorEmail: 'mike@startup.io',
    receivedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    processedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    impactScore: 68,
    sentiment: 'positive',
    status: 'inbox',
    threadId: 'thread_3'
  }
];

export const mockThreads: FeedbackThread[] = [
  {
    id: 'thread_1',
    title: 'Dark Mode Request',
    summary: 'Multiple customers requesting dark theme for better usability during extended usage sessions.',
    category: 'feature_request',
    priority: 'high',
    aggregateImpactScore: 88,
    itemCount: 3,
    items: mockFeedbackItems.filter(item => item.threadId === 'thread_1'),
    tags: ['ui', 'accessibility', 'popular'],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 'thread_2',
    title: 'Safari Login Issues',
    summary: 'Critical authentication problems on Safari browser preventing user access.',
    category: 'bug',
    priority: 'critical',
    aggregateImpactScore: 95,
    itemCount: 1,
    items: mockFeedbackItems.filter(item => item.threadId === 'thread_2'),
    tags: ['safari', 'authentication', 'critical'],
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    syncedTo: 'jira'
  },
  {
    id: 'thread_3',
    title: 'Mobile App Request',
    summary: 'Users want native mobile application for better mobile experience.',
    category: 'feature_request',
    priority: 'medium',
    aggregateImpactScore: 68,
    itemCount: 1,
    items: mockFeedbackItems.filter(item => item.threadId === 'thread_3'),
    tags: ['mobile', 'native-app'],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
  }
];

export const analyticsData = {
  feedbackVolume: [
    { date: '2024-01-01', count: 12 },
    { date: '2024-01-02', count: 19 },
    { date: '2024-01-03', count: 15 },
    { date: '2024-01-04', count: 28 },
    { date: '2024-01-05', count: 22 },
    { date: '2024-01-06', count: 35 },
    { date: '2024-01-07', count: 41 }
  ],
  topFeatures: [
    { name: 'Dark Mode', requests: 12, score: 88 },
    { name: 'Mobile App', requests: 8, score: 68 },
    { name: 'API Access', requests: 6, score: 75 },
    { name: 'Bulk Export', requests: 4, score: 52 },
    { name: 'SSO Login', requests: 3, score: 82 }
  ],
  sentimentByCategory: [
    { category: 'Feature Requests', positive: 80, neutral: 15, negative: 5 },
    { category: 'Bugs', positive: 10, neutral: 20, negative: 70 },
    { category: 'UX Issues', positive: 30, neutral: 50, negative: 20 },
    { category: 'Questions', positive: 60, neutral: 35, negative: 5 }
  ]
};