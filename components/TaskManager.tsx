
import React, { useState } from 'react';
import { Task } from '../types';
import { analyzeTasks } from '../services/geminiService';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: '完成数学作业', completed: false, priority: 'high', createdAt: Date.now() },
    { id: '2', title: '背诵英语单词', completed: true, priority: 'medium', createdAt: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: input,
      completed: false,
      priority: 'medium',
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const pending = tasks.filter(t => !t.completed).map(t => t.title);
      const res = await analyzeTasks(pending);
      setAnalysis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">待办事项清单</h2>
          <p className="text-slate-400">管理你的每日任务，通过 AI 优化效率。</p>
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={analyzing || tasks.filter(t => !t.completed).length === 0}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
        >
          {analyzing ? '分析中...' : '🤖 AI 智能排序'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <form onSubmit={addTask} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="添加新任务..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button type="submit" className="absolute right-3 top-2 bottom-2 bg-indigo-600 px-4 rounded-xl text-sm font-bold">
              添加
            </button>
          </form>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            {tasks.length === 0 ? (
              <div className="p-12 text-center text-slate-500">暂无任务，开启自律的一天吧！</div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
                    />
                    <span className={`${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 
                      task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-purple-400">
              <span>🧠</span> AI 建议顺序
            </h3>
            {analysis.length > 0 ? (
              <div className="space-y-4">
                {analysis.map((item, i) => (
                  <div key={i} className="text-sm p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
                    <p className="font-semibold text-slate-200">{i + 1}. {item.task}</p>
                    <p className="text-xs text-slate-500 mt-1 italic leading-relaxed">"{item.reason}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">点击“AI 智能排序”按钮，获取最佳的学习优先级建议。</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
