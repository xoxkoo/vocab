import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small';
	className?: string;
};

export function ThemedText({ style, lightColor, darkColor, type = 'default', className, ...rest }: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return (
		<Text
			className={className}
			style={[
				{ color },
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				type === 'small' ? styles.small : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: 'DMSans-Regular',
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: 'DMSans-Medium',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 32,
		fontFamily: 'DMSans-Medium',
	},
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
		fontFamily: 'DMSans-Regular',
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: '#0a7ea4',
		fontFamily: 'DMSans-Regular',
	},
	small: {
		lineHeight: 16,
		fontSize: 14,
		fontFamily: 'DMSans-Regular',
	},
});
