
import React from 'react';

const StudyRooms: React.FC = () => {
  const rooms = [
    { id: 1, name: '深度思考 01', members: 8, status: '工作中', tags: ['禁言', '专注'] },
    { id: 2, name: '考研突击班', members: 15, status: '休息中', tags: ['交流', '打卡'] },
    { id: 3, name: '代码冥想室', members: 4, status: '工作中', tags: ['技术', '安静'] },
    { id: 4, name: '深夜食堂 (自习版)', members: 22, status: '活跃', tags: ['陪伴'] },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Discord 虚拟自习室</h2>
          <p className="text-slate-400">选择一个房间，与成千上万的学习者一起努力。</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-xl font-bold text-sm">
          创建新房间
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/40 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🏠
                </div>
                <div>
                  <h3 className="font-bold text-lg">{room.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-slate-500">{room.members} 人在线 · {room.status}</span>
                  </div>
                </div>
              </div>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                进入
              </button>
            </div>
            
            <div className="flex gap-2">
              {room.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex items-center gap-8">
        <div className="hidden md:block w-32 h-32 bg-indigo-500/10 rounded-full flex items-center justify-center text-5xl">
          🎧
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">学习白噪音</h3>
          <p className="text-slate-400 text-sm mb-4">开启沉浸式学习体验，支持 Lofi、雨声、咖啡馆等多种场景环境音。</p>
          <div className="flex flex-wrap gap-2">
            {['Lofi Hip Hop', 'Forest Rain', 'Library Ambience', 'White Noise'].map(sound => (
              <button key={sound} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-xs font-medium transition-colors">
                {sound}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyRooms;
