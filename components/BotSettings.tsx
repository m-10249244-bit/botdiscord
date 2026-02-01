
import React, { useState, useEffect } from 'react';

const BotSettings: React.FC = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [botToken, setBotToken] = useState('');
  const [prefix, setPrefix] = useState('cre');
  
  const config = {
    applicationId: '1467402495574937620',
    publicKey: '5a5a09c7723c7ca131341c5500eb24d21953a53fd97d7b4ff52281ec8c54e545',
    clientId: '1467402495574937620',
    clientSecret: 'vMq6I6QjqeKmj_xCouNrJ-MCNL-pKObV'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板！');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="border-b border-slate-800 pb-6">
        <h2 className="text-3xl font-bold mb-2">部署与配置中心</h2>
        <p className="text-slate-400">目前你的机器人处于“未激活”状态。请按照以下步骤让它在 Discord 真正上线。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 第一步：核心凭据 */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center text-sm">1</span>
              核心配置 (Credentials)
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Application ID</label>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-slate-300">{config.applicationId}</div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Client ID</label>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-slate-300">{config.clientId}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-400 uppercase">Bot Token (极其重要)</label>
                <div className="relative">
                  <input 
                    type={showToken ? "text" : "password"}
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    placeholder="在此粘贴你的 Bot Token (从 Discord Developer Portal 获取)"
                    className="w-full bg-slate-950 border border-indigo-500/30 rounded-xl px-4 py-3 text-sm font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <button onClick={() => setShowToken(!showToken)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    {showToken ? '🔒' : '👁️'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 italic">没有 Token 机器人将永远显示为离线。Token 就像机器人的登录密码。</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Client Secret</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-slate-300 relative">
                    {showSecret ? config.clientSecret : '•'.repeat(32)}
                  </div>
                  <button onClick={() => copyToClipboard(config.clientSecret)} className="bg-slate-800 px-4 rounded-xl text-xs hover:bg-slate-700 transition-colors">复制</button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center text-sm">2</span>
              上线代码 (运行这个让它变绿)
            </h3>
            <p className="text-sm text-slate-400 mb-4">你需要在一个安装了 Node.js 的环境（如 Replit 或本地电脑）中运行以下代码：</p>
            <div className="relative group">
              <div className="bg-slate-950 p-6 rounded-2xl font-mono text-xs text-indigo-300 leading-relaxed overflow-x-auto border border-slate-800">
                <pre>{`// 1. 安装依赖: npm install discord.js @google/genai
const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenAI } = require('@google/genai');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith('${prefix} ')) {
    const input = msg.content.slice(${prefix.length + 1});
    // 在这里调用 Gemini API...
    msg.reply('收到指令: ' + input);
  }
});

client.login('${botToken || "YOUR_TOKEN_HERE"}');`}</pre>
              </div>
              <button 
                onClick={() => copyToClipboard(`const { Client, GatewayIntentBits } = require('discord.js'); ...`)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[#5865F2] text-white px-3 py-1 rounded text-[10px] font-bold"
              >
                复制代码
              </button>
            </div>
          </section>
        </div>

        {/* 侧边栏：上线清单 */}
        <div className="space-y-6">
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6">
            <h3 className="font-bold text-indigo-300 mb-4 flex items-center gap-2">
              <span>✅</span> 上线必做清单
            </h3>
            <ul className="space-y-4">
              {[
                { text: "在开发者后台生成 Bot Token", done: !!botToken },
                { text: "开启 MESSAGE CONTENT INTENT", done: false },
                { text: "开启 SERVER MEMBERS INTENT", done: false },
                { text: "使用生成的邀请链接加入服务器", done: true },
                { text: "运行 Node.js 核心脚本", done: false },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`mt-1 w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                    item.done ? 'bg-green-500 border-green-500' : 'border-slate-700'
                  }`}>
                    {item.done && '✓'}
                  </div>
                  <span className={`text-xs ${item.done ? 'text-slate-300' : 'text-slate-500'}`}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold mb-4">指令响应配置</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">响应前缀</label>
                <input 
                  type="text" 
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-indigo-400 focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-500 italic">只有消息以 "{prefix} " 开头时，机器人才会响应。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSettings;
