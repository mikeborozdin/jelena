import { addDoc, collection } from 'firebase/firestore';

import { Feedback } from '@/lib/shared/types/types';

import { initFirestore } from '../firebase/firestore';

const saveFeedback = async (feedback: Feedback) => {
  const firestore = initFirestore();

  return addDoc(collection(firestore, 'feedback'), feedback);
};

export { saveFeedback };
