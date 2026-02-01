
import React, { useState } from 'react';
import { getStudyPlan } from '../services/geminiService';

const AICoach: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      const res = await getStudyPlan(goal);
      setPlan(res || '');
    } catch (e) {
      setPlan('抱歉，生成计划时出了一点问题。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI 学习导师
        </h2>
        <p className="text-slate-400 mt-2 text-lg">输入你的学习目标，让我为你制定完美的专注计划。</p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">你的学习目标</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="例如：在三小时内复习完高等数学第一章节并完成练习题..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-600"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !goal}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : '🚀 生成专属学习计划'}
          </button>
        </div>

        {plan && (
          <div className="mt-12 p-8 bg-slate-800/30 border border-indigo-500/20 rounded-2xl animate-in zoom-in-95 duration-500">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-indigo-400">📅</span> 计划方案
            </h3>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
              {plan}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
              <span className="text-xs text-slate-500">生成的计划基于 Gemini AI 高级推理模型。</span>
              <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300">保存到 Discord</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoach;
