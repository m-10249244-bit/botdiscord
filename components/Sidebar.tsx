
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { type: ViewType.DASHBOARD, icon: '📊', label: '总览 Dashboard' },
    { type: ViewType.TASKS, icon: '📋', label: '待办 To-Do List' },
    { type: ViewType.STUDY_ROOMS, icon: '🏠', label: '自习室 Study Rooms' },
    { type: ViewType.DISCIPLINE, icon: '🧘', label: '自律 Discipline' },
    { type: ViewType.AI_COACH, icon: '🤖', label: 'AI 导师 Coach' },
    { type: ViewType.SETTINGS, icon: '⚙️', label: '机器人设置 Bot Settings' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5865F2] rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2758-3.68-.2758-5.4868 0-.1636-.3906-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#5865F2] to-purple-400 bg-clip-text text-transparent">ZenStudy</h1>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Discord Control Hub</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setView(item.type)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.type
                ? 'bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30 shadow-lg shadow-[#5865F2]/10'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3">
          <div className="relative">
            <img src="https://picsum.photos/seed/user/40/40" className="w-10 h-10 rounded-full border border-slate-700" alt="Avatar" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate leading-none">StudyMaster_01</p>
            <p className="text-[10px] text-slate-500 truncate mt-1">#1337 · Silver Rank</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
