
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import StudyRooms from './components/StudyRooms';
import DisciplineTracker from './components/DisciplineTracker';
import AICoach from './components/AICoach';
import BotSettings from './components/BotSettings';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case ViewType.DASHBOARD: return <Dashboard />;
      case ViewType.TASKS: return <TaskManager />;
      case ViewType.STUDY_ROOMS: return <StudyRooms />;
      case ViewType.DISCIPLINE: return <DisciplineTracker />;
      case ViewType.AI_COACH: return <AICoach />;
      case ViewType.SETTINGS: return <BotSettings />;
      default: return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#5865F2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-[#5865F2]">ZenStudy Discord...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
