import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const runLlmStream = (prompt: string) =>
  openai.chat.completions.create({
    model: 'gpt-3.5-turbo-16k',
    temperature: 0,
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

export { runLlmStream };
