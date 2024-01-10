import { bingSearch } from '@/lib/backend/differentPerspectives/search/search';

(async () => {
  const originalArticle = {
    sourceMarket: 'en-GB',
    sourceLanguage: 'en',
    targetMarket: 'en-GB',
    targetLanguage: 'en',
    topic: 'Banning smoking for younger generation',
    perspective:
      'Rishi Sunak defends the plan to ban smoking for the younger generation, stating that there is no safe level of smoking and it is the biggest public health intervention in a generation. Critics argue that it could lead to a black market and that it infringes on personal choice and responsibility. Medical professionals and health charities support the ban.',
    searchTerm: 'Plan to ban smoking for younger generation',
  };

  const candidates = await bingSearch(
    originalArticle.searchTerm,
    originalArticle.targetMarket,
    originalArticle.targetLanguage,
  );

  console.log({ candidates });
})();
