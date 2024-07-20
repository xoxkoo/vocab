import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { G, Path, Circle } from 'react-native-svg';

export function ProfileFilledIcon({ height = 40, width = 40 }) {
	const colorScheme = useColorScheme();
	return (
		<Svg width={width} height={height} viewBox='0 0 24 24'>
			<Path
				fill={Colors[colorScheme ?? 'light'].text}
				fill-rule='evenodd'
				d='M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z'
				clip-rule='evenodd'
			/>
		</Svg>
	);
}
