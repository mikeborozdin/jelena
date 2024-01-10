import { OpenAIStream, StreamingTextResponse } from 'ai';

import { chat } from '@/lib/backend/chat/chat';

export const runtime = 'edge';

export async function POST(request: Request) {
  const { message, flowIndex } = await request.json();

  const result = await chat(message, flowIndex);

  return new StreamingTextResponse(OpenAIStream(result));
}
