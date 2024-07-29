import { db } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export default {
	async postSuggestion(suggestion: string) {
		try {
			await addDoc(collection(db, 'suggestions'), {
				suggestion,
			});
		} catch (error) {
			throw error;
		}
	},
};
