import { OpenAIStream, StreamingTextResponse } from 'ai';

import { runLlmStream } from '@/lib/backend/llm/llm';

const streamToString = (stream: Awaited<ReturnType<typeof runLlmStream>>) =>
  new StreamingTextResponse(OpenAIStream(stream)).text();

export { streamToString };
