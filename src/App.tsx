import React, { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './views/Dashboard';
import { Inbox } from './views/Inbox';
import { Analytics } from './views/Analytics';
import { Integrations } from './views/Integrations';
import { Settings } from './views/Settings';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={setCurrentView} />;
      case 'inbox':
        return <Inbox />;
      case 'analytics':
        return <Analytics />;
      case 'integrations':
        return <Integrations />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <AppShell currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </AppShell>
  );
}

export default App;