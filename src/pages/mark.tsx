import Head from 'next/head';
import Link from 'next/link';

const MarkingPage: React.FC = () => {
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
              <Link
                href="/scheme"
                className="text-xl font-semibold text-blue-500"
              >
                Marking scheme
              </Link>
              <span className="text-xl font-semibold"> &gt; </span>
              <span className="text-xl font-semibold">
                Lukas Müller&apos;s homework
              </span>
            </div>

            <div className="flex justify-between space-x-10">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <div className="flex flex-col items-center space-y-3">
                  <p className="text-gray-500 font-bold">
                    Lukas Müller&apos;s homework
                  </p>

                  <div className="flex flex-row">
                    <p className="bg-yellow-300">
                      Franz Joseph I ruled the Austro-Hungarian Empire for
                      almost seven decades, a period marked by rapid
                      industrialization and political change. His reign saw the
                      empire become a great power in Europe. Franz Joseph&apos;s
                      leadership was characterized by his dedication to
                      traditional values and his resistance to change, which
                      eventually led to the empire&apos;s downfall after World
                      War I. Historians often debate his legacy, with some
                      praising his ability to hold the empire together for so
                      long, while others criticize his lack of vision for the
                      future.
                    </p>

                    <div className="bg-white p-6 rounded-lg shadow-lg absolute left-[55%] w-[40%]">
                      The statement that the empire became a great power in
                      Europe under his rule is vague and lacks context; the
                      Austro-Hungarian Empire was already a significant power
                      before his reign.
                    </div>
                  </div>

                  <p>
                    One factor that contributes to the varying perspectives is
                    the empire&apos;s complex ethnic composition. Franz Joseph
                    managed to keep the empire united despite the many different
                    nationalities and cultures it encompassed. However, his
                    failure to provide meaningful political reform led to
                    growing nationalist movements that undermined the
                    empire&apos;s stability. Another factor is the empire&apos;s
                    economic development; while the empire did industrialize
                    under his rule, it lagged behind other European powers.
                  </p>

                  <div className="flex flex-row">
                    <p className="bg-yellow-300">
                      Historians like John A. Doe argue that Franz Joseph&apos;s
                      insistence on centralization and his mistrust of Hungarian
                      nationalism were critical mistakes. On the other hand,
                      historians such as Jane Smith suggest that his
                      conservative policies actually provided much-needed
                      stability during times of turmoil.
                    </p>

                    <div className="bg-white p-6 rounded-lg shadow-lg absolute left-[55%] w-[40%]">
                      <ul className="list-disc">
                        <li>
                          The answer would benefit from specific examples of
                          Franz Joseph&apos;s policies and their consequences to
                          substantiate the claims.
                        </li>
                        <li>
                          There is no mention of primary or secondary sources,
                          which would add credibility to the analysis
                        </li>
                      </ul>
                    </div>
                  </div>
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
          Export
        </Link>
      </main>
    </>
  );
};

export default MarkingPage;
