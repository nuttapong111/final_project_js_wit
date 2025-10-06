import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Search from './components/Search';
import Quotes from './components/Quotes';
import Profile from './components/Profile';

function AppContent() {
  const { currentView } = useApp();

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return (
          <div className="space-y-6">
            <AddTask />
            <Search />
            <TaskList />
          </div>
        );
      case 'quotes':
        return <Quotes />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="hidden lg:block">
            <Navigation />
          </div>
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <NextUIProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </NextUIProvider>
  );
}

export default App;
