import React from 'react';
import { Pressable, StyleSheet, PressableProps, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { ThemedText } from '../theme/ThemedText';
import { colorPrimary, colorSecondary, colorDanger } from '@/constants/Colors';
import { borderRadius } from '@/assets/styles';

interface AppButtonProps extends PressableProps {
	title?: string;
	icon?: React.ReactNode;
	buttonStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	outlined?: boolean;
	severity?: 'primary' | 'secondary' | 'danger';
	buttonClassName?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
	title,
	buttonStyle,
	textStyle,
	outlined,
	severity,
	icon,
	buttonClassName,
	...rest
}) => {
	const getButtonStyle = (): StyleProp<ViewStyle> => {
		const baseStyle = [styles.button, outlined ? styles.outlinedButton : null];
		const severityStyle = outlined
			? severity === 'secondary'
				? styles.secondaryOutlinedButton
				: severity === 'danger'
					? styles.dangerOutlinedButton
					: styles.primaryOutlinedButton
			: severity === 'secondary'
				? styles.secondaryButton
				: severity === 'danger'
					? styles.dangerButton
					: styles.primaryButton;

		return [baseStyle, severityStyle, buttonStyle];
	};

	const getTextStyle = (): StyleProp<TextStyle> => {
		const baseTextStyle = [styles.text, outlined ? styles.outlinedText : null];
		const severityTextStyle = outlined
			? severity === 'secondary'
				? styles.secondaryOutlinedText
				: severity === 'danger'
					? styles.dangerOutlinedText
					: styles.primaryOutlinedText
			: severity === 'secondary'
				? styles.secondaryText
				: severity === 'danger'
					? styles.dangerText
					: styles.primaryText;

		return [baseTextStyle, severityTextStyle, textStyle];
	};

	return (
		<Pressable style={getButtonStyle()} {...rest} className={buttonClassName}>
			<View style={styles.content}>
				{icon && <View style={styles.icon}>{icon}</View>}
				{title && <ThemedText style={getTextStyle()}>{title}</ThemedText>}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: borderRadius,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	primaryButton: {
		backgroundColor: colorPrimary,
		shadowColor: '#163856',
		shadowOpacity: 1,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 2,
	},
	dangerButton: {
		backgroundColor: colorDanger,
	},
	secondaryButton: {
		backgroundColor: colorSecondary,
	},
	outlinedButton: {
		paddingHorizontal: 17,
		paddingVertical: 9,
		backgroundColor: 'transparent',
		borderWidth: 1.5,
		borderRadius: borderRadius,
	},
	primaryOutlinedButton: {
		borderColor: colorPrimary,
	},
	secondaryOutlinedButton: {
		borderColor: colorSecondary,
	},
	dangerOutlinedButton: {
		borderColor: colorDanger,
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
	dangerText: {
		color: '#FFFFFF',
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
	dangerOutlinedText: {
		color: colorDanger,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {},
});

export default AppButton;
