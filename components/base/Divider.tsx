import { colorSecondary } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '../theme/ThemedText';

interface DividerProps {
	title?: string;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	className?: string;
}

const Divider: React.FC<DividerProps> = ({ title, style, textStyle, className }) => {
	return (
		<View style={[styles.container, style]} className={className}>
			<View style={styles.line} />
			{title && <ThemedText style={[styles.title, textStyle]}>{title}</ThemedText>}
			{title && <View style={styles.line} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: colorSecondary,
	},
	title: {
		marginHorizontal: 8,
		fontSize: 14,
	},
});

export default Divider;
