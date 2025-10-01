import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Zap,
  Settings as SettingsIcon,
  Save,
  Download
} from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'ai', name: 'AI Settings', icon: Zap },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@company.com"
                  className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Company</label>
                <input
                  type="text"
                  defaultValue="Acme Corp"
                  className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Role</label>
                <select className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Product Manager</option>
                  <option>Engineering Lead</option>
                  <option>CEO/Founder</option>
                  <option>Customer Success</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-bg rounded-md border border-border">
                <div>
                  <h4 className="font-medium text-text">High-Impact Feedback</h4>
                  <p className="text-sm text-textMuted">Get notified when feedback scores above 80</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
              </div>
              <div className="flex items-center justify-between p-4 bg-bg rounded-md border border-border">
                <div>
                  <h4 className="font-medium text-text">Daily Summary</h4>
                  <p className="text-sm text-textMuted">Receive daily feedback digest at 9 AM</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
              </div>
              <div className="flex items-center justify-between p-4 bg-bg rounded-md border border-border">
                <div>
                  <h4 className="font-medium text-text">Integration Errors</h4>
                  <p className="text-sm text-textMuted">Alert when integrations fail or need attention</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary" />
              </div>
              <div className="flex items-center justify-between p-4 bg-bg rounded-md border border-border">
                <div>
                  <h4 className="font-medium text-text">Weekly Reports</h4>
                  <p className="text-sm text-textMuted">Get weekly analytics summary every Monday</p>
                </div>
                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Security Settings</h3>
            <div className="space-y-4">
              <div className="p-4 bg-bg rounded-md border border-border">
                <h4 className="font-medium text-text mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-textMuted mb-3">Add an extra layer of security to your account</p>
                <Badge variant="status" status="error">Not Enabled</Badge>
                <Button variant="primary" size="sm" className="ml-3">
                  Enable 2FA
                </Button>
              </div>
              <div className="p-4 bg-bg rounded-md border border-border">
                <h4 className="font-medium text-text mb-2">API Keys</h4>
                <p className="text-sm text-textMuted mb-3">Manage API keys for custom integrations</p>
                <Button variant="secondary" size="sm">
                  Manage API Keys
                </Button>
              </div>
              <div className="p-4 bg-bg rounded-md border border-border">
                <h4 className="font-medium text-text mb-2">Data Export</h4>
                <p className="text-sm text-textMuted mb-3">Download all your feedback data</p>
                <Button variant="secondary" size="sm" icon={Download}>
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">Billing & Subscription</h3>
            <div className="bg-bg rounded-md border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-text">Starter Plan</h4>
                  <p className="text-textMuted">$29/month • 1,000 feedback items</p>
                </div>
                <Badge variant="status" status="active">Active</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text">847</p>
                  <p className="text-sm text-textMuted">Items Used</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-text">153</p>
                  <p className="text-sm text-textMuted">Remaining</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-text">6</p>
                  <p className="text-sm text-textMuted">Integrations</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="primary">Upgrade to Pro</Button>
                <Button variant="secondary">Change Plan</Button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-text">Recent Invoices</h4>
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-text">January 2024</p>
                    <p className="text-sm text-textMuted">Starter Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-text">$29.00</p>
                    <button className="text-sm text-primary hover:text-primaryHover">Download</button>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-text">December 2023</p>
                    <p className="text-sm text-textMuted">Starter Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-text">$29.00</p>
                    <button className="text-sm text-primary hover:text-primaryHover">Download</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text">AI Configuration</h3>
            <div className="space-y-4">
              <div className="p-4 bg-bg rounded-md border border-border">
                <h4 className="font-medium text-text mb-2">Auto-Tagging Sensitivity</h4>
                <p className="text-sm text-textMuted mb-3">How aggressive should AI tagging be?</p>
                <select className="w-full bg-surface border border-border rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Conservative (High confidence only)</option>
                  <option>Balanced (Default)</option>
                  <option>Aggressive (Tag everything possible)</option>
                </select>
              </div>
              <div className="p-4 bg-bg rounded-md border border-border">
                <h4 className="font-medium text-text mb-2">Threading Algorithm</h4>
                <p className="text-sm text-textMuted mb-3">How should similar feedback be grouped?</p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="threading" defaultChecked className="text-primary focus:ring-primary" />
                    <span className="text-text">Semantic similarity (recommended)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="threading" className="text-primary focus:ring-primary" />
                    <span className="text-text">Keyword matching</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="threading" className="text-primary focus:ring-primary" />
                    <span className="text-text">Manual grouping only</span>
                  </label>
                </div>
              </div>
              <div className="p-4 bg-bg rounded-md border border-border">
                <h4 className="font-medium text-text mb-2">Impact Scoring Weights</h4>
                <p className="text-sm text-textMuted mb-3">Customize how impact scores are calculated</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Customer MRR</label>
                    <input type="range" min="0" max="100" defaultValue="40" className="w-full" />
                    <span className="text-xs text-textMuted">40%</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Request Frequency</label>
                    <input type="range" min="0" max="100" defaultValue="30" className="w-full" />
                    <span className="text-xs text-textMuted">30%</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Churn Risk</label>
                    <input type="range" min="0" max="100" defaultValue="20" className="w-full" />
                    <span className="text-xs text-textMuted">20%</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Sentiment Score</label>
                    <input type="range" min="0" max="100" defaultValue="10" className="w-full" />
                    <span className="text-xs text-textMuted">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text">Settings</h1>
        <p className="text-textMuted mt-1">Manage your account preferences and integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-textMuted hover:text-text hover:bg-surfaceHover'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-surface border border-border rounded-lg p-6">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="flex items-center justify-end pt-6 mt-6 border-t border-border">
              <Button variant="primary" icon={Save}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}