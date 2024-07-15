import { View, SafeAreaView } from 'react-native';
import { HelloWave } from '@/components/app/HelloWave';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { useTranslation } from 'react-i18next';
import wordsService, { Word } from '@/service/word';
import '../../i18n';
import useAuth from '@/firebase/useAuth';
import { useEffect, useState } from 'react';
import WordSwipe from '@/components/app/WordSwipe';

export default function HomeScreen() {
	const { t } = useTranslation();
	const { user } = useAuth();
	const [words, setWords] = useState([] as Word[]);
	useEffect(() => {
		const loadWords = async () => {
			const words = await wordsService.getToday();
			setWords(words);
		};
		loadWords();
	}, []);

	return (
		<SafeAreaView className='flex-1'>
			<ThemedView className='flex-1 p-5'>
				<View className='flex flex-row items-end justify-between'>
					<ThemedText type='title' className=''>
						{t('hello')} {user?.displayName ? ', ' + user?.displayName : ''} <HelloWave />
					</ThemedText>
				</View>
				<WordSwipe words={words} />
			</ThemedView>
		</SafeAreaView>
	);
}
