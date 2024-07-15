import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { Path, G } from 'react-native-svg';

export default function CrossIcon({ height = 25, width = 25 }) {
	const colorScheme = useColorScheme();

	return (
		<Svg width={width} height={height} viewBox='0 0 24 24'>
			<G fill={Colors[colorScheme ?? 'light'].text} fill-rule='evenodd' clip-rule='evenodd'>
				<Path d='M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06' />
				<Path d='M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0' />
			</G>
		</Svg>
	);
}
