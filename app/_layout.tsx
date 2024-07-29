import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Appearance, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import useAuth from '@/firebase/useAuth';
import { colorSecondary } from '@/constants/Colors';
import { borderRadius } from '@/assets/styles';
import { ToastProvider } from 'react-native-toast-notifications';
import { NativeWindStyleSheet } from 'nativewind';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
	default: 'native',
});

export default function RootLayout() {
	const { isLoading } = useAuth();

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
			<ToastProvider placement='top'>
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
							// headerTitle: '',
							// headerShadowVisible: false,
							// headerLeft: () => '',
							// headerStyle: {
							// 	backgroundColor: Colors[colorScheme ?? 'light'].background,
							// },
						}}
					/>
					<Stack.Screen
						name='index'
						options={{
							headerShown: false,
							// headerTitle: '',
							// headerShadowVisible: false,
							// headerLeft: () => '',
							// headerStyle: {
							// 	backgroundColor: Colors[colorScheme ?? 'light'].background,
							// },
						}}
					/>

					<Stack.Screen name='+not-found' />
				</Stack>
			</ToastProvider>
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
