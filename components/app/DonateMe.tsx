import React from 'react';
import { Pressable, StyleSheet, View, Linking } from 'react-native';

import { useTranslation } from 'react-i18next';
import { ThemedView } from '../theme/ThemedView';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { ThemedText } from '../theme/ThemedText';
import { colorSecondary } from '@/constants/Colors';
import DonateMeIcon from '../Icons/DonateMeIcon';

export const DonateMe: React.FC = () => {
	const { t } = useTranslation();

	return (
		<ThemedView style={styles.container}>
			<Pressable style={styles.heading} onPress={() => Linking.openURL('https://buymeacoffee.com/anton_durcak')}>
				<View className='flex flex-row items-center'>
					<View style={styles.icon}>
						<DonateMeIcon />
					</View>
					<ThemedText type='subtitle' className='pl-3'>
						{t('profile.donateMe')}
					</ThemedText>
				</View>
				<ArrowLeftIcon width={30} height={30} iconClassName={'rotate-180'} />
			</Pressable>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomColor: colorSecondary,
		paddingVertical: 15,
		borderBottomWidth: 1,
	},
	heading: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 6,
	},
	content: {
		marginVertical: 15,
	},
	chevronRight: {},
	icon: {},
});
