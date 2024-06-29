import { StyleSheet, View, SafeAreaView, Text, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import useAuth from '@/firebase/useAuth';
import { ProfileIcon } from '@/components/Icons/ProfileIcon';
import { router } from 'expo-router';

export default function HomeScreen() {
	const { t } = useTranslation();
	const { user } = useAuth();
	return (
		<SafeAreaView className='flex-1'>
			<ThemedView className='flex-1 p-5'>
				{user ? (
					<View className='flex flex-row items-center justify-between'>
						<ThemedText type='title' className=''>
							{t('hello')} {user.displayName ? ', ' + user.displayName : ''} <HelloWave />
						</ThemedText>
						<ProfileIcon />
						{/* <Pressable onPress={router.replace('/login')} /> */}
					</View>
				) : (
					<Text>Not logged</Text>
				)}
			</ThemedView>
		</SafeAreaView>
	);
}
