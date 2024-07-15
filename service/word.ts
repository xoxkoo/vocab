import { db } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export interface Word {
	word: string;
	description: string;
	date: Date;
}

export default {
	async getToday() {
		try {
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);

			const q = query(collection(db, 'words'), where('date', '>=', today), where('date', '<', tomorrow));

			const querySnapshot = await getDocs(q);
			const words = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return { word: data.word };
			});

			return words as Word[];
		} catch (error) {
			console.error('Error getting documents: ', error);
			return [];
		}
	},
};
