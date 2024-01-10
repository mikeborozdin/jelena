// import googleResults from "../debug/google.json";
import dotenv from 'dotenv';
import { streamToString } from 'streamToString';

import { findDifferentPerspectives } from '@/lib/backend/edge/differentPerspectives/differentPerspectives';

dotenv.config({ path: './.env.local' });

(async () => {
  const res = await streamToString(
    await findDifferentPerspectives({
      sourceMarket: 'en-GB',
      sourceLanguage: 'en',
      targetMarket: 'en-GB',
      targetLanguage: 'en',
      topic: 'Hamas attack on Israel kibbutz Be’eri',
      perspective:
        "Describes the experiences of mothers in a WhatsApp group during a Hamas attack on the Be'eri kibbutz in southern Israel.",
      searchTerm: 'Hamas attack on Israel kibbutz Be’eri',
    }),
  );

  console.log(JSON.stringify(JSON.parse(res), null, 2));
})();
