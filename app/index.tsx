import { View, Image } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import AppButton from '@/components/base/AppButton';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { checkIfPageVisited, markPageAsVisited } from '@/utils/welcomePage';

export default function HomeScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();

	useEffect(() => {
		const checkVisit = async () => {
			const hasVisited = await checkIfPageVisited();
			if (!hasVisited) {
				await markPageAsVisited();
			} else {
				router.push('/home');
			}
		};

		checkVisit();
	}, []);

	return (
		<>
			<SafeAreaView
				edges={['top', 'bottom']}
				style={{ flex: 0, backgroundColor: Colors[colorScheme ?? 'light'].background }}
			/>
			<SafeAreaView edges={['left', 'right']} className='flex-1'>
				<ThemedView className='flex-1 p-5 pb-20'>
					<ThemedText type='title' className='mx-auto'>
						{t('welcome.title')}
					</ThemedText>
					<ThemedText className='mx-auto mt-3'>{t('welcome.subtitle')}</ThemedText>
					<ThemedText className='mx-auto'>{t('welcome.subSubTitle')}</ThemedText>

					<View className='mt-auto'>
						<Image
							source={require('@/assets/images/welcome.png')}
							style={{ width: 300, height: 400, marginLeft: 'auto', marginRight: 'auto' }}
						/>
						<ThemedText className='mx-auto mb-5'>{t('welcome.description')}</ThemedText>
						<AppButton
							title={t('welcome.button')}
							onPress={() => router.navigate('/home')}
							severity='primary'
						></AppButton>
					</View>
				</ThemedView>
			</SafeAreaView>
		</>
	);
}
