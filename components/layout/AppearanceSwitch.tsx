import { StyleSheet, Pressable, useColorScheme, View, Appearance, ColorSchemeName } from 'react-native';

import { ThemedText } from '@/components/theme/ThemedText';
import { colorPrimary } from '@/constants/Colors';
import { t } from 'i18next';
import Divider from '../base/Divider';
import { AppearanceIcon } from '../Icons/AppearanceIcon';
import CheckmarkIcon from '../Icons/CheckmarkIcon';
import DarkThemeIcon from '../Icons/DarkThemeIcon';
import LightThemeIcon from '../Icons/LightThemeIcon';

export function AppearanceSwitch() {
	const colorScheme = useColorScheme();

	const schemeOptions = ['light', 'dark', 'system'];
	// useEffect(() => {
	// 	console.log(Appearance.getColorScheme());
	// }, []);

	const setTheme = (option: string) => {
		Appearance.setColorScheme(option !== 'system' ? (option as ColorSchemeName) : null);
	};

	const isOptionSet = (option: string) => {
		return colorScheme === option;
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
					<View className='flex flex-row items-center justify-between pb-3'>
						<Pressable className='flex flex-row items-center' onPress={() => setTheme(option)}>
							{getThemeIcon(option)}
							<ThemedText style={isOptionSet(option) ? styles.primary : {}} className='ml-3 text-lg'>
								{t(`appearance.${option}`)}
							</ThemedText>
						</Pressable>
						{isOptionSet(option) ? <CheckmarkIcon width={30} height={30} /> : null}
					</View>
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
