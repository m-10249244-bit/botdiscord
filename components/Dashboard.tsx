
import React, { useEffect, useState, useRef } from 'react';
import { getMotivationalAdvice, processBotCommand } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: number;
}

const Dashboard: React.FC = () => {
  const [motivation, setMotivation] = useState('思考中...');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '你好！这里是 ZenStudy Web 控制面板。由于这是浏览器端，你的机器人目前在 Discord 官方服务器中显示为“离线”。', timestamp: Date.now() },
    { role: 'bot', text: '要让它变绿并真正上线，请前往“机器人设置”并运行生成的 Node.js 脚本。你可以在此模拟测试 `cre` 指令。', timestamp: Date.now() + 100 }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const stats = { studyHours: 24, tasksCompleted: 15, currentStreak: 5 };

  useEffect(() => {
    getMotivationalAdvice(stats).then(setMotivation);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput.trim();
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg, timestamp: Date.now() }];
    setMessages(newMessages);
    setUserInput('');

    if (userMsg.toLowerCase().startsWith('cre')) {
      setIsTyping(true);
      const botResponse = await processBotCommand(userMsg);
      setIsTyping(false);
      
      if (botResponse) {
        setMessages([...newMessages, { role: 'bot', text: botResponse, timestamp: Date.now() }]);
      }
    } else {
      setTimeout(() => {
        setMessages([...newMessages, { role: 'bot', text: '💡 提示：目前的机器人只响应以 `cre` 开头的指令，例如：`cre hi`。', timestamp: Date.now() }]);
      }, 500);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-3xl font-bold italic">ZenStudy HUB</h2>
            <span className="bg-[#5865F2] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Verified App</span>
          </div>
          <p className="text-slate-400 font-medium font-mono text-xs">ID: 1467402495574937620</p>
        </div>
        
        <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/5 p-3 px-5 rounded-2xl">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="flex flex-col">
            <span className="text-sm font-bold uppercase tracking-widest text-red-400">Discord Gateway: Offline</span>
            <span className="text-[10px] text-red-300 opacity-70">需要运行后端脚本以建立连接</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
            <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#5865F2] rounded-lg flex items-center justify-center text-sm">#</div>
                <span className="font-bold text-sm">本地模拟测试 (Preview Mode)</span>
              </div>
              <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold italic">WEB_SIMULATOR</span>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[#313338]">
              {messages.map((msg, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg shadow-inner ${
                    msg.role === 'bot' ? 'bg-[#5865F2]' : 'bg-slate-700'
                  }`}>
                    {msg.role === 'bot' ? '🤖' : '👤'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-bold ${msg.role === 'bot' ? 'text-[#5865F2]' : 'text-slate-200'}`}>
                        {msg.role === 'bot' ? 'ZenStudy BOT' : 'You'}
                      </span>
                      {msg.role === 'bot' && <span className="bg-[#5865F2] text-[9px] px-1 rounded-sm font-bold">APP</span>}
                      <span className="text-[10px] text-slate-500">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap text-slate-300`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-[#5865F2]/30 flex-shrink-0"></div>
                  <div className="space-y-2 py-2">
                    <div className="h-2 w-24 bg-slate-700 rounded"></div>
                    <div className="h-2 w-48 bg-slate-800 rounded"></div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="在此模拟 Discord 输入 (例如: cre hi)"
                className="w-full bg-[#383a40] border-none rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-500"
              />
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 shadow-xl">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-300">
              <span>🧠</span> 为什么我是离线的？
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Discord 官方规定，机器人必须通过 **WebSocket** 维持心跳。浏览器网页由于 CORS 限制无法直接维持这种连接。
            </p>
            <div className="mt-4 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <p className="text-xs text-indigo-200">
                <strong>解决方案：</strong> 复制“设置”页面中的后端代码，并在 Node.js 服务器（如 Replit 或自己的电脑）上运行它。
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">连接诊断</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Web 界面:</span>
                <span className="text-green-500">连接正常</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Gemini AI:</span>
                <span className="text-green-500">已就绪</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Discord API:</span>
                <span className="text-red-500 italic">缺少 Token</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
