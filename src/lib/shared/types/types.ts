interface ReviewedSentence {
  original: string;
  isCorrect: boolean;
  corrected?: string;
  explanation?: string;
}

interface Review {
  numberOfCorrectSentences?: number;
  totalNumberOfSentences?: number;
  reviewedSentences?: Partial<ReviewedSentence>[];
  topicsToReview?: string[];
}

interface Feedback {
  feedback: string;
  email?: string;
}

interface ChatResponse {
  isCorrect: boolean;
  response?: string;
  reviewedSentences?: ReviewedSentence[];
}

export { type ReviewedSentence, type ChatResponse, type Review, type Feedback };
