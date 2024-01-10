import Head from 'next/head';
import Link from 'next/link';

const UploadPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Jelena</title>
      </Head>
      <main>
        <div>
          <div className="flex justify-between py-10 px-20 space-x-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <div className="flex flex-col items-center space-y-6">
                <p className="text-gray-500 font-bold">Upload homework</p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-80 h-40 flex justify-center items-center">
                  <p className="text-gray-500">Drag & Drop files to upload</p>
                </div>
                <p className="text-gray-500 my-2">OR</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                  Browse
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <div className="flex flex-col items-center space-y-6">
                <p className="text-gray-500 font-bold">Uploaded homework</p>

                <div className="space-y-3 w-full">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td>Lukas Müller</td>
                        <td>✍🏻 needs marking</td>
                      </tr>
                      <tr>
                        <td>Anna Schneider</td>
                        <td>✍🏻 needs marking</td>
                      </tr>
                      <tr>
                        <td>Markus Wagner</td>
                        <td>✍🏻 needs marking</td>
                      </tr>
                      <tr>
                        <td>Julia Hofmann</td>
                        <td>✍🏻 needs marking</td>
                      </tr>
                      <tr>
                        <td>Thomas Bauer</td>
                        <td>✍🏻 needs marking</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/scheme"
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

export default UploadPage;
