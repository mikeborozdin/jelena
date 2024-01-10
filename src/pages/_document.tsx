import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✍🏻</text></svg>"
        />
        <meta property="og:title" content="Jelena" />
        <meta property="og:site_name" content="Jelena" />
      </Head>
      <body className="bg-gray-100 h-screen p-0">
        <nav className="flex justify-between border-b-2 py-2 bg-white p-4">
          <Link href="/" className="text-2xl font-semibold">
            Jelena
          </Link>
          <div className="flex flex-row space-x-3">
            <div className="text-lg font-semibold">Dashboard</div>
            <div className="text-lg font-semibold">Account</div>
          </div>
        </nav>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
