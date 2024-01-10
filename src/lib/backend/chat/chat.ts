import { runLlmStream } from '../llm/llm';

interface Dialog {
  customer: string;
  assistant: string;
}

const FLOW: Dialog[] = [
  {
    customer: 'say I am looking for shoes',
    assistant: 'ask what kind of shoes they are looking for',
  },
  {
    customer: 'say the type of the shoes',
    assistant: 'ask what color the shoes should be in',
  },
  {
    customer: 'say the color of the shoes',
    assistant: 'ask what size the shoes are',
  },
  {
    customer: 'say the size of the shoes',
    assistant: 'Here they are',
  },
];

const promptTemplate = (message: string, flowIndex: number) => `
I'm studying a foreign language and  I want to practise talking in a clothing shop.
Detect a language and correct each sentence of the story. When correcting a sentence focus on grammar, spelling, and vocabulary.

I'm a woman looking to buy shoes and a dress. Act as a shop assistant. I'll be asking questions in a foreign language. Detect that language.

If I ${FLOW[flowIndex].customer} then you should respond with ${FLOW[flowIndex].assistant}

I must ${FLOW[flowIndex].customer}}. That need can be expressed differently. As long I convey a message that ${FLOW[flowIndex].assistant}, I'm on topic. 
I may also say some niceties like 'Hi' and 'Bye'. I may also say 'Thank you' and 'You are welcome'. And I may also provide additional context like I'm going to a party.
The main thing is to extract the need that ${FLOW[flowIndex].customer}.
If I say anything that is not ${FLOW[flowIndex].customer}, then set 'response' to 'stay on topic' and set 'reviewedSentences' to null.
If I do say that ${FLOW[flowIndex].customer}, then you should respond with ${FLOW[flowIndex].assistant}.

Do not change the meaning of the sentence. If the sentence is correct, do not change it.
Do not correct the punctuation of the sentence.
Do not correct the capitalization of the sentence.
Do not correct the style of the sentece.
Make sure that the corrected sentence is not the same as the original sentence.
Make sure to set the 'isCorrect' to 'false' only when the sentence is incorrect. 
If the sentence is correct, set 'isCorrect' to 'true'. If the sentence is correct, set 'corrected' to null and 'explanation' to null.
If 'corrected' has 'The sentence is correct', then 'isCorrect' must be 'true'.
If I say something offtopic, then set 'response' to 'stay on topic' and set 'reviewedSentences' to null.

Return the results as a JSON object with the following structure:

{
  "isCorrect": "boolean value whether I am on topic and have said everything gramatically correct.",
  "response": "Your response as a shop assistant to what I am saying. Respond in the detected language. Use ${FLOW[flowIndex].assistant} as a cue what to respond",
  "reviewedSentences": [
    {
      "original": "original sentence",
      "isCorrect: "boolean value indicating whether the sentence is correct or not. True if the sentence is correct, false if the sentence is not correct."
      "corrected": "corrected sentence. Can be null if isCorrect is true",
      "explanation": "explanation in English of why the sentence is incorrect. Can be null if isCorrect is true"
    }
  ]
}

Rules about the result:

#1. On topic and gramatically correct:
{
  "isCorrect": true,
  "response": "Your response as a shop assistant to what I am saying. Respond in the detected language. Use ${FLOW[flowIndex].assistant} as a cue what to respond"",
  "reviewedSentences": [
    {
      "original": "original sentence",
      "isCorrect: true,
      "corrected": null,
      "explanation": null
    }
  ]
}

Example (remember to change the response depending on what the customer says)):

{
  "isCorrect": true,
  "response": "Ciao! Che tipo di scarpe cerchi?",
  "reviewedSentences": [
    {
      "original": "Ciao! Cerco delle scarpe",
      "isCorrect: true,
      "corrected": null,
      "explanation": null
    }
  ]
}

#2. On topic and gramatically incorrect:
{
  "isCorrect": false,
  "response": null,
  "reviewedSentences": [
    {
      "original": "original sentence",
      "isCorrect: false,
      "corrected": "corrected sentence",
      "explanation": "explanation in English of why the sentence is incorrect"
    }
  ]
}

Example:

{
  "isCorrect": false,
  "response": null,
  "reviewedSentences": [
    {
      "original": "Ciao! Cerca delle scarpe",
      "isCorrect: false,
      "corrected": "Ciao! Cerco delle scarpe",
      "explanation": "Cerca is the third person singular of the verb cercare. The first person singular is cerco."
    }
  ]
}

#3. Not on topic (grammar is irrelevant if not on topic):

I say: 'Mi chiamo Mike.' but I should be saying something related to ${FLOW[flowIndex].customer}.

An example below is just an example. Phrase it in a way that makes sense. Use English in the 'response' field.

{
  "isCorrect": false,
  "response": "You are looking for shoes, not a dress.",
  "reviewedSentences": null,
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
  ]
}

First detect if what I am saying is on topic and then correct the grammar. If I say something that is not on topic, then set 'response' to 'stay on topic' and set 'reviewedSentences' to null.

What your are saying is:

${message}
`;

const chat = async (message: string, flowIndex: number) => {
  console.log(promptTemplate(message, 1));

  return runLlmStream(promptTemplate(message, flowIndex));
};

export { chat };
