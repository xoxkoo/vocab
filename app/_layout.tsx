import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { StyleSheet, Text } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import useAuth from '@/firebase/useAuth';
import { Colors, colorSecondary } from '@/constants/Colors';
import AppButton from '@/components/base/AppButton';
import { Pressable, View } from 'react-native';
import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';
import { ProfileIcon } from '@/components/Icons/ProfileIcon';
import Modal from 'react-native-modal';
import { ThemedView } from '@/components/theme/ThemedView';
import CrossIcon from '@/components/Icons/CrossIcon';
import { useTranslation } from 'react-i18next';
import { borderRadius } from '@/assets/styles';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { isLogged, isLoading, logout } = useAuth();
	const { t } = useTranslation();

	const [modalVisible, setModalVisible] = useState(false);

	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
		'DMSans-Bold': require('../assets/fonts/DMSans-Bold.ttf'),
		'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
	});

	const headerOptionsAndHeaderLeft = {
		headerTitle: '',
		headerShown: true,
		headerShadowVisible: false,
		headerStyle: {
			backgroundColor: Colors[colorScheme ?? 'light'].background,
		},
		headerLeft: () =>
			router.canGoBack() ? (
				<Pressable
					onPress={() => {
						if (router.canGoBack()) router.back();
					}}
				>
					<ArrowLeftIcon />
				</Pressable>
			) : null,
	};

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded || isLoading) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen
					name='(tabs)'
					options={{
						...headerOptionsAndHeaderLeft,
						// headerRight: () => (
						// 	<>
						// 		<Pressable onPress={() => setModalVisible(true)}>
						// 			<ProfileIcon />
						// 		</Pressable>
						// 		<Modal
						// 			animationIn='slideInRight'
						// 			animationOut='slideOutRight'
						// 			hasBackdrop={false}
						// 			isVisible={modalVisible}
						// 		>
						// 			<Pressable className='flex-1' onPress={() => setModalVisible(false)}>
						// 				<ThemedView className='absolute right-0 mt-2 flex-1 p-3 pt-1' style={styles.modalView}>
						// 					<ThemedView>
						// 						<View className='flex-row items-center'>
						// 							<Text>Profil</Text>
						// 							<Pressable className='ml-auto' onPress={() => setModalVisible(!modalVisible)}>
						// 								<CrossIcon />
						// 							</Pressable>
						// 						</View>
						// 						{isLogged() ? (
						// 							<AppButton
						// 								title={t('logout')}
						// 								severity='secondary'
						// 								outlined
						// 								buttonClassName='mt-5'
						// 								onPress={logout}
						// 							/>
						// 						) : (
						// 							<AppButton
						// 								title={t('login.login')}
						// 								severity='secondary'
						// 								outlined
						// 								buttonClassName='mt-5'
						// 								onPress={() => router.push('/login')}
						// 							/>
						// 						)}
						// 					</ThemedView>
						// 				</ThemedView>
						// 			</Pressable>
						// 		</Modal>
						// 	</>
						// ),
					}}
				/>
				<Stack.Screen
					name='login'
					options={{
						...headerOptionsAndHeaderLeft,
					}}
				/>
				<Stack.Screen name='+not-found' />
			</Stack>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	modalView: {
		borderRadius,
		borderColor: colorSecondary,
		borderWidth: 1.5,
	},
});
