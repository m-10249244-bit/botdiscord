
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMotivationalAdvice = async (stats: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on these study stats: ${JSON.stringify(stats)}, provide a short, powerful motivational message in Chinese (Simplified). Keep it under 50 words.`,
    config: {
      temperature: 0.8,
    }
  });
  return response.text;
};

export const analyzeTasks = async (tasks: string[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze these tasks and suggest a prioritized order with a reason for each: ${tasks.join(', ')}. Return in Chinese (Simplified).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            task: { type: Type.STRING },
            priority: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["task", "priority", "reason"]
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const getStudyPlan = async (goal: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Create a detailed focus plan for this goal: "${goal}". Include Pomodoro intervals. Format in Chinese (Simplified).`,
    config: {
      thinkingConfig: { thinkingBudget: 5000 }
    }
  });
  return response.text;
};

/**
 * 处理 Discord 指令
 * 格式: cre [内容]
 */
export const processBotCommand = async (input: string, prefix: string = 'cre') => {
  const trimmedInput = input.trim();
  if (!trimmedInput.toLowerCase().startsWith(prefix.toLowerCase())) {
    return null; // 非指令不回复
  }

  const prompt = trimmedInput.slice(prefix.length).trim();
  if (!prompt) return "你好！请在 `cre` 后面输入你想说的话，例如：`cre 你是谁？`";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `你是一个在 Discord 频道里的自律自习室助手机器人，你的名字叫 ZenStudy。
    用户对你说：${prompt}
    请给出一个简短、友好、有活力的回复。可以使用 Emoji。
    如果用户说 hi，你可以打招呼并介绍你能帮他管理待办事项、监督自律和开启自习室。`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 200,
    }
  });

  return response.text;
};
