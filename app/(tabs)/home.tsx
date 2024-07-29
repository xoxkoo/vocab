import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import { HelloWave } from '@/components/app/HelloWave';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { useTranslation } from 'react-i18next';
import wordsService, { Word } from '@/service/word';
import '../../i18n';
import useAuth from '@/firebase/useAuth';
import { useEffect, useState } from 'react';
import WordSwipe from '@/components/app/WordSwipe';
import SuggestionModal from '@/components/app/SugestionModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function HomeScreen() {
	const { t } = useTranslation();
	const { user } = useAuth();
	const [words, setWords] = useState([] as Word[]);
	const [isLoading, setLoading] = useState(true);

	const loadWords = async () => {
		setLoading(true);
		const words = await wordsService.getToday();
		setWords(words);
		setLoading(false);
	};

	useEffect(() => {
		loadWords();
	}, []);

	return (
		<SafeAreaView className='flex-1'>
			<GestureHandlerRootView>
				<BottomSheetModalProvider>
					<ThemedView className='relative flex-1 p-5'>
						<View className='flex flex-row items-end justify-between'>
							<ThemedText type='title' className=''>
								{t('home.hello')} {user?.displayName ? ', ' + user?.displayName : ''} <HelloWave />
							</ThemedText>
						</View>
						{isLoading ? <ActivityIndicator className='my-auto' /> : <WordSwipe words={words} />}
						<View className='ml-auto mt-20'>
							<SuggestionModal />
						</View>
					</ThemedView>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
}
