import { StyleSheet, Pressable, useColorScheme, View, Appearance, ColorSchemeName } from 'react-native';

import { ThemedText } from '@/components/theme/ThemedText';
import { colorPrimary } from '@/constants/Colors';
import { t } from 'i18next';
import Divider from '../base/Divider';
import { AppearanceIcon } from '../Icons/AppearanceIcon';
import CheckmarkIcon from '../Icons/CheckmarkIcon';
import DarkThemeIcon from '../Icons/DarkThemeIcon';
import LightThemeIcon from '../Icons/LightThemeIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function AppearanceSwitch() {
	const colorScheme = useColorScheme();
	const [theme, setTheme] = useState('');

	const schemeOptions = ['light', 'dark', 'system'];

	const onChangeTheme = (option: string) => {
		AsyncStorage.setItem('theme', option);
		setTheme(option);
		Appearance.setColorScheme(option !== 'system' ? (option as ColorSchemeName) : null);
	};

	const getTheme = async () => {
		const stored = await AsyncStorage.getItem('theme');

		if (stored) {
			setTheme(stored);
			Appearance.setColorScheme(stored !== 'system' ? (stored as ColorSchemeName) : null);
		} else {
			setTheme(colorScheme ?? 'light');
			AsyncStorage.setItem('theme', theme);
		}
	};
	useEffect(() => {
		getTheme();
	}, []);

	const isOptionSet = (option: string) => {
		return theme === option;
	};

	const getThemeIcon = (option: string) => {
		switch (option) {
			case 'light':
				return <LightThemeIcon color={isOptionSet(option) ? colorPrimary : ''} />;
			case 'dark':
				return <DarkThemeIcon color={isOptionSet(option) ? colorPrimary : ''} />;
			case 'system':
				return <AppearanceIcon width={20} height={20} color={isOptionSet(option) ? colorPrimary : ''} />;
			default:
				return null;
		}
	};
	return (
		<View className='flex gap-3'>
			{schemeOptions.map((option) => (
				<View className='pl-5' key={option}>
					<Pressable className='flex flex-row items-center justify-between pb-3' onPress={() => onChangeTheme(option)}>
						<View className='flex flex-row items-center'>
							{getThemeIcon(option)}
							<ThemedText style={isOptionSet(option) ? styles.primary : {}} className='ml-3 text-lg'>
								{t(`appearance.${option}`)}
							</ThemedText>
						</View>
						{isOptionSet(option) ? <CheckmarkIcon width={20} height={20} /> : null}
					</Pressable>
					<Divider />
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	primary: {
		color: colorPrimary,
		fontFamily: 'DMSans-Medium',
	},
});
