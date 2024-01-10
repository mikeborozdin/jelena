import Head from 'next/head';
import Link from 'next/link';

const LEARNING_EXPECTATIONS = `Demonstrates a thorough understanding of Franz Joseph I's reign and its historical context. 
                  
Analyzes the legacy of Franz Joseph I with depth, identifying both positive and negative aspects of his rule
`;

const MarkingSchemePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Jelena</title>
      </Head>
      <main>
        <div>
          <div className="py-10 px-20 space-y-6">
            <div>
              <Link href="/" className="text-xl font-semibold text-blue-500">
                Upload
              </Link>
              <span className="text-xl font-semibold"> &gt; </span>
              <span className="text-xl font-semibold">Marking scheme</span>
            </div>

            <div className="flex justify-between space-x-10">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <div className="flex flex-col space-y-3">
                  <p className="text-gray-500 font-bold text-center">Test</p>

                  <p className="font-bold text-left">
                    Legacy and Interpretation of Franz Joseph I&apos;s rule
                  </p>

                  <p>
                    Franz Joseph I&apos;s rule lasted for nearly 68 years.
                    Reflect on his legacy and consider how different historians
                    might interpret his reign. What factors contribute to the
                    varying perspectives on his contributions to European
                    history?
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <div className="flex flex-col items-center space-y-6">
                  <p className="text-gray-500 font-bold">Learning expections</p>
                  <textarea className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full h-60 flex justify-center items-center">
                    {LEARNING_EXPECTATIONS}
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/mark"
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full shadow-lg hover:shadow transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
          type="button"
          aria-label="Add"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </main>
    </>
  );
};

export default MarkingSchemePage;
