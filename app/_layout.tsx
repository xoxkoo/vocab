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

	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
		'DMSans-Bold': require('../assets/fonts/DMSans-Bold.ttf'),
		'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
	});

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
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='login'
					options={{
						headerShown: false,
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
