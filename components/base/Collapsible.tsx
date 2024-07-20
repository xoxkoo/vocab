import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Pressable, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { Colors, colorSecondary } from '@/constants/Colors';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';

export function Collapsible({ children, title, icon }: PropsWithChildren & { title: string; icon?: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const theme = useColorScheme() ?? 'light';

	return (
		<ThemedView style={styles.container}>
			<Pressable style={styles.heading} onPress={() => setIsOpen((value) => !value)}>
				<View className='flex flex-row items-center'>
					{icon && <View style={styles.icon}>{icon}</View>}
					<ThemedText type='subtitle' className='pl-3'>
						{title}
					</ThemedText>
				</View>
				<ArrowLeftIcon width={30} height={30} iconClassName={isOpen ? '-rotate-90' : 'rotate-180'} />
			</Pressable>
			{isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
		</ThemedView>
	);
}

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
		marginVertical: 10,
	},
	chevronRight: {},
	icon: {},
});
