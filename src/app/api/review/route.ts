import { OpenAIStream, StreamingTextResponse } from 'ai';

import { reviewArticle } from '@/lib/backend/review/review';

export const runtime = 'edge';

export async function POST(request: Request) {
  const story = (await request.json()).story;

  const result = await reviewArticle(story);

  return new StreamingTextResponse(OpenAIStream(result));
}
