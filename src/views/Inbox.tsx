import React, { useState } from 'react';
import { ThreadCard } from '../components/feedback/ThreadCard';
import { FeedbackCard } from '../components/feedback/FeedbackCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { mockThreads, mockFeedbackItems } from '../data/mockData';
import { 
  Filter, 
  SortDesc, 
  Archive,
  ExternalLink,
  MessageSquare,
  Plus
} from 'lucide-react';

export function Inbox() {
  const [activeTab, setActiveTab] = useState<'threads' | 'items'>('threads');
  const [filterBy, setFilterBy] = useState<'all' | 'unsynced' | 'critical'>('all');
  const [sortBy, setSortBy] = useState<'impact' | 'recent' | 'items'>('impact');
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);

  const filteredThreads = mockThreads.filter(thread => {
    if (filterBy === 'unsynced') return !thread.syncedTo;
    if (filterBy === 'critical') return thread.priority === 'critical';
    return true;
  }).sort((a, b) => {
    if (sortBy === 'impact') return b.aggregateImpactScore - a.aggregateImpactScore;
    if (sortBy === 'recent') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (sortBy === 'items') return b.itemCount - a.itemCount;
    return 0;
  });

  const inboxItems = mockFeedbackItems.filter(item => item.status === 'inbox');

  const handleSyncThread = (threadId: string, platform: string) => {
    setSelectedThread(threadId);
    setSyncModalOpen(true);
    console.log(`Syncing thread ${threadId} to ${platform}`);
  };

  const handleConfirmSync = () => {
    // In a real app, this would make an API call
    setSyncModalOpen(false);
    setSelectedThread(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">Feedback Inbox</h1>
          <p className="text-textMuted mt-1">
            {activeTab === 'threads' ? filteredThreads.length : inboxItems.length} {activeTab} ready for review
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon={Archive}>
            Archive Selected
          </Button>
          <Button variant="primary" icon={Plus}>
            Manual Entry
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('threads')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'threads'
                ? 'border-primary text-primary'
                : 'border-transparent text-textMuted hover:text-text'
            }`}
          >
            Smart Threads ({mockThreads.length})
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'items'
                ? 'border-primary text-primary'
                : 'border-transparent text-textMuted hover:text-text'
            }`}
          >
            Individual Items ({inboxItems.length})
          </button>
        </nav>
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-textMuted" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="bg-surface border border-border rounded-md px-3 py-1 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All</option>
              <option value="unsynced">Unsynced</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <SortDesc className="w-4 h-4 text-textMuted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-surface border border-border rounded-md px-3 py-1 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="impact">Impact Score</option>
              <option value="recent">Recently Updated</option>
              <option value="items">Item Count</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="default">
            {filterBy === 'all' ? 'All' : filterBy === 'unsynced' ? 'Unsynced' : 'Critical'} items
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'threads' ? (
          filteredThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              onSync={(platform) => handleSyncThread(thread.id, platform)}
              onViewDetails={() => console.log('View thread details', thread.id)}
            />
          ))
        ) : (
          inboxItems.map((item) => (
            <FeedbackCard
              key={item.id}
              item={item}
              variant="inbox"
            />
          ))
        )}
      </div>

      {/* Sync Confirmation Modal */}
      <Modal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        title="Sync to Project Management"
      >
        <div className="space-y-4">
          <p className="text-textMuted">
            This will create a new issue in your connected project management tool with full customer context and feedback details.
          </p>
          <div className="bg-bg p-4 rounded-md border border-border">
            <h4 className="font-medium text-text mb-2">Issue Preview:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-textMuted">Title:</span>
                <span className="text-text">[Customer Request] Dark Mode Request</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-textMuted">Description:</span>
                <span className="text-text">Multiple customers requesting dark theme for better usability...</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-textMuted">Priority:</span>
                <Badge variant="impact" impact="high">High</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3">
            <Button variant="secondary" onClick={() => setSyncModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmSync} icon={ExternalLink}>
              Create Issue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}