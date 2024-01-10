# Prerequisites

Node 18

# Run locally

1. Install dependencies - `yarn`
1. Setup environment vairables
   1. `cp .env .env.local`
   1. Enter your values in `.env.local`
1. Run Next.js (both backend & frontend) - `yarn dev`
1. Open in the browser - [http://localhost:3000](http://localhost:3000)

# Architecture

## LLM

- We use Open AI - `gpt-35-turbo-16k` model, as it seems to be faster than Azure
- We don't use function calling. We simply put the expected JSON response in the prompt itself

## Streaming

- We use [chunked transfer encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding#chunked_encoding) for streaming data to the browser
- The API is implemented via [Next.js route handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
  - When deployed it's served by a [Vercel's Edge Function](https://vercel.com/docs/concepts/functions/edge-functions)
