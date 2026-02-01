
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DisciplineTracker: React.FC = () => {
  const data = [
    { name: 'Mon', hours: 4 },
    { name: 'Tue', hours: 7 },
    { name: 'Wed', hours: 5 },
    { name: 'Thu', hours: 9 },
    { name: 'Fri', hours: 6 },
    { name: 'Sat', hours: 8 },
    { name: 'Sun', hours: 2 },
  ];

  const colors = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#818cf8', '#6366f1', '#4f46e5'];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold">自律分析报告</h2>
        <p className="text-slate-400">基于你的 Discord 专注时间和打卡数据。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-lg">
          <h3 className="text-lg font-bold mb-6">本周学习时长 (小时)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}}
                />
                <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <h3 className="font-bold mb-4">当前勋章 (Discord Badge)</h3>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                  i < 4 ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-600 border border-dashed border-slate-700'
                }`}>
                  {i === 1 ? '🔥' : i === 2 ? '⚡' : i === 3 ? '🧠' : '?'}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">再坚持 2 天，即可解锁 “不倦者” 勋章。</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 p-6 rounded-3xl">
            <h3 className="font-bold mb-2">防沉迷状态</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-300">今日非学习应用使用时长</span>
              <span className="text-sm font-bold text-red-400">1h 12m</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full" style={{width: '60%'}}></div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">你设置了每日 2 小时的非学习限制。Discord Bot 已准备好在超时后向你发送警报。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisciplineTracker;
