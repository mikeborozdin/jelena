import { makeStreamingJsonRequest } from 'http-streaming-request';
import Head from 'next/head';
import Image from 'next/image';
import { SyntheticEvent, useState } from 'react';
import { BounceLoader } from 'react-spinners';

import {
  AnalyticsEvent,
  logAnalyticsEvent,
} from '@/lib/frontend/analytics/analytics';
import { ChatResponse } from '@/lib/shared/types/types';

const TAGLINE = 'Practise a dialogue';

interface Message {
  from: 'user' | 'silvio';
  message: string | ChatResponse;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [flowIndex, setFlowIndex] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);

  const reviewStory = async (message: string) => {
    const generator = makeStreamingJsonRequest<Partial<ChatResponse>>({
      url: '/api/chat',
      method: 'POST',
      payload: { message, flowIndex },
    });

    const numberOfMessages = messages.length;

    let currentResponse: Partial<ChatResponse> = {};

    for await (const buffer of generator) {
      currentResponse = { ...currentResponse, ...buffer };
      setMessages(m => [
        ...m.slice(0, numberOfMessages + 1),
        { from: 'silvio', message: buffer },
      ]);

      window.scrollTo(0, document.body.scrollHeight);
    }

    console.log({ currentResponse });

    if (currentResponse.isCorrect) {
      setFlowIndex(flowIndex + 1);
    }

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  };

  const run = async (story: string) => {
    setIsError(false);
    setIsLoading(true);

    setMessages([...messages, { from: 'user', message: story }]);

    try {
      await reviewStory(story);
    } catch (_) {
      setIsError(true);
      logAnalyticsEvent(AnalyticsEvent.ERROR, {});
    }

    setMessage('');

    setIsLoading(false);
  };

  const onMessageFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    run(message);
  };

  return (
    <>
      <Head>
        <title>Silvio.ai</title>
      </Head>
      <main className="flex flex-col items-center justify-between p-6">
        <div className="space-y-10 w-full md:w-[95%]">
          <div className="flex flex-row space-x-6">
            <Image
              src="/silvio.png"
              alt="logo"
              width={125}
              height={125}
              className="w-[125px] h-[125px] sm:block rounded-full"
            />
            <div className="flex flex-col space-y-3">
              <h1 className="text-4xl font-bold">Silvio.ai</h1>
              <h2 className="hidden sm:block text-2xl">{TAGLINE}</h2>
            </div>
          </div>
          <h2 className="sm:hidden text-2xl">{TAGLINE}</h2>
          <div className="flex flex-col md:flex-row space-between space-y-10 md:space-x-10 md:space-y-0">
            <form
              onSubmit={onMessageFormSubmit}
              className="md:w-1/2 md:space-y-6"
            >
              {isError && (
                <p className="text-red-500">
                  Something went wrong. Please, check the link is correct and
                  try again.
                </p>
              )}

              <div>
                <label>
                  <strong>Context: </strong>
                  <span>
                    You&apos; a woman who is going to a party. You&apos; looking
                    for a pair of shoes and a dress.
                  </span>
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={10}
                  placeholder="Mi chiamo Mike... Adeso imparlo l'italiano..."
                  className="border border-blue-400 rounded-md px-4 py-2 w-full"
                />
              </div>

              <div className="flex flex-col space-y-3 md:flex-row md:space-y-0  md:space-x-3 justify-center items-center font-bold">
                <input
                  type="submit"
                  value="Review"
                  disabled={isLoading || message.length === 0}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300 hover:cursor-pointer disabled:opacity-25 w-full"
                />
              </div>

              <div className="flex flex-row justify-center">
                {isLoading && <BounceLoader color="#60A5FA" />}
              </div>
            </form>

            {messages.length > 0 && (
              <div className="md:w-1/2 space-y-6">
                <div>
                  <strong>Chat</strong>
                </div>

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 ${
                      message.from === 'silvio'
                        ? 'border-black'
                        : 'bg-green-300 self-end'
                    }`}
                  >
                    {typeof message.message === 'string' && (
                      <>{message.message}</>
                    )}

                    {typeof message.message !== 'string' && (
                      <>
                        {message.message.response && (
                          <p>{message.message.response}</p>
                        )}

                        {!message.message.isCorrect &&
                          message.message.reviewedSentences &&
                          message.message.reviewedSentences.length > 0 &&
                          message.message.reviewedSentences.map(
                            (sentence, index) => (
                              <span key={index}>
                                <span
                                  className={
                                    sentence.isCorrect === false
                                      ? 'line-through text-red-500'
                                      : 'text-green-600'
                                  }
                                >
                                  {sentence.original}
                                </span>
                                {!sentence.isCorrect && (
                                  <span>
                                    &nbsp;{sentence.corrected} (
                                    {sentence.explanation})
                                  </span>
                                )}
                                &nbsp;
                              </span>
                            ),
                          )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <a
              href="mailto:mike.borozdin@gmail.com"
              className="text-blue-500 underline"
            >
              Any feedback?
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Chat;
