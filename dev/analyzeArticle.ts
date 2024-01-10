import dotenv from 'dotenv';
import { streamToString } from 'streamToString';

import { analyzeArticle } from '@/lib/backend/edge/originalArticle/originalArticle';

dotenv.config({ path: './.env.local' });

(async () => {
  // const url = "https://www.bbc.co.uk/news/entertainment-arts-66957385";
  // const url =
  //   "https://techcrunch.com/2023/09/28/eeoc-sues-tesla-for-racial-discrimination-of-black-workers/";
  const url =
    'https://www.theguardian.com/commentisfree/2023/sep/27/tories-oilfield-rosebank-oil-climate-caroline-lucas';

  const res = await analyzeArticle(url);

  console.log(await streamToString(res));
})();
