import React from 'react';
import { Pressable, StyleSheet, PressableProps, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { ThemedText } from '../theme/ThemedText';
import { colorPrimary, colorSecondary } from '@/constants/Colors';

interface AppButtonProps extends PressableProps {
	title?: string;
	icon?: React.ReactNode;
	buttonStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	outlined?: boolean;
	severity?: 'primary' | 'secondary';
	className?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
	title,
	buttonStyle,
	textStyle,
	outlined,
	severity,
	icon,
	className,
	...rest
}) => {
	const getButtonStyle = (): StyleProp<ViewStyle> => {
		const baseStyle = [styles.button, outlined ? styles.outlinedButton : null];
		const severityStyle = outlined
			? severity === 'secondary'
				? styles.secondaryOutlinedButton
				: styles.primaryOutlinedButton
			: severity === 'secondary'
				? styles.secondaryButton
				: styles.primaryButton;

		return [baseStyle, severityStyle, buttonStyle];
	};

	const getTextStyle = (): StyleProp<TextStyle> => {
		const baseTextStyle = [styles.text, outlined ? styles.outlinedText : null];
		const severityTextStyle = outlined
			? severity === 'secondary'
				? styles.secondaryOutlinedText
				: styles.primaryOutlinedText
			: severity === 'secondary'
				? styles.secondaryText
				: styles.primaryText;

		return [baseTextStyle, severityTextStyle, textStyle];
	};

	return (
		<Pressable style={getButtonStyle()} {...rest} className={className}>
			<View style={styles.content}>
				{icon && <View style={styles.icon}>{icon}</View>}
				{title && <ThemedText style={getTextStyle()}>{title}</ThemedText>}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	primaryButton: {
		backgroundColor: colorPrimary,
	},
	secondaryButton: {
		backgroundColor: colorSecondary,
	},
	outlinedButton: {
		backgroundColor: 'transparent',
		borderWidth: 1.5,
		borderRadius: 5,
	},
	primaryOutlinedButton: {
		borderColor: colorPrimary,
	},
	secondaryOutlinedButton: {
		borderColor: colorSecondary,
	},
	text: {
		fontSize: 16,
		fontFamily: 'DMSans-Medium',
	},
	primaryText: {
		color: '#FFFFFF',
	},
	secondaryText: {
		color: '#000000',
	},
	outlinedText: {
		fontSize: 16,
		fontFamily: 'DMSans-Medium',
	},
	primaryOutlinedText: {
		color: colorPrimary,
	},
	secondaryOutlinedText: {
		color: colorSecondary,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {},
});

export default AppButton;
