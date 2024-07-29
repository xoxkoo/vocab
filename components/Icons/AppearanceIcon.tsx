import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { Path, G } from 'react-native-svg';

export function AppearanceIcon({ height = 40, width = 40 }) {
	const colorScheme = useColorScheme();
	return (
		//
		<Svg width={width} height={height} viewBox='0 0 24 24'>
			<G
				fill='none'
				stroke={Colors[colorScheme ?? 'light'].text}
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='2'
			>
				<Path d='M9.173 14.83a4 4 0 1 1 5.657-5.657' />
				<Path d='m11.294 12.707l.174.247a7.5 7.5 0 0 0 8.845 2.492A9 9 0 0 1 5.642 18.36M3 12h1m8-9v1M5.6 5.6l.7.7M3 21L21 3' />
			</G>
		</Svg>
	);
}
