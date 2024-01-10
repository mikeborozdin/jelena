import { runLlmStream } from '@/lib/backend/llm/llm';

const promptTemplate = (story: string) => `
I'm studying a foreign language and I've written a short story. 
Detect a language and correct each sentence of the story. When correcting a sentence focus on grammar, spelling, and vocabulary.

Do not change the meaning of the sentence. If the sentence is correct, do not change it.
Do not correct the punctuation of the sentence.
Do not correct the capitalization of the sentence.
Do not correct the style of the sentece.
Make sure that the corrected sentence is not the same as the original sentence.
Make sure to set the 'isCorrect' to 'false' only when the sentence is incorrect. 
If the sentence is correct, set 'isCorrect' to 'true'. If the sentence is correct, set 'corrected' to null and 'explanation' to null.
If 'corrected' has 'The sentence is correct', then 'isCorrect' must be 'true'.

Return the results as a JSON object with the following structure:

{
  "reviewedSentences": [
    {
      "original": "original sentence",
      "isCorrect: "boolean value indicating whether the sentence is correct or not. True if the sentence is correct, false if the sentence is not correct."
      "corrected": "corrected sentence. Can be null if isCorrect is true",
      "explanation": "explanation in English of why the sentence is incorrect. Can be null if isCorrect is true"
    }
  ],
  "topicsToReview": [
    "a list of topics to review based on the correction. Each topic is a string. Can be an empty array if every sentence is correct."
  ]
}

Example #1, if the story is: "Ciao! Mi chiama Mike." then the result should be:
  
  {
    "reviewedSentences": [
      {
        "original": "Ciao!",
        "isCorrect: true,
        "corrected": null,
        "explanation": null
      },
      {
        "original": "Mi chiama Mike.",
        "isCorrect: false,
        "corrected": "Mi chiamo Mike.",
        "explanation": "The verb 'chiamare' is conjugated as 'chiamo' in the first person singular."
      }
    ],
    "topicsToReview": [
      "Conjugations of -are verbs"
    ]
  }

But the following output for a different story is wrong because 'isCorrect' is set to 'false' even though the sentence is correct.

{
  "reviewedSentences": [
    {
      "original": "Моя Миша.",
      "isCorrect: false,
      "corrected": "Моя Миша.",
      "explanation": null
    }
  ],
  "topicsToReview": [
  ]
}

This output is also wrong because 'isCorrect' is set to 'false' even though the sentence is correct.

{
  "reviewedSentences": [
    {
      "original": "Моя Миша.",
      "isCorrect: true,
      "corrected": "The sentence is correct",
      "explanation": null
    }
  ],
  "topicsToReview": [
  ]
}

The story is:

${story}
`;

const reviewArticle = async (story: string) => {
  return runLlmStream(promptTemplate(story));
};

export { reviewArticle };
