import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { G, Path, Circle } from 'react-native-svg';

export function HomeFilledIcon({ height = 40, width = 40 }) {
	const colorScheme = useColorScheme();
	return (
		<Svg width={width} height={height} viewBox='0 0 28 28'>
			<Path
				fill={Colors[colorScheme ?? 'light'].text}
				d='M15.408 3.498a2.25 2.25 0 0 0-2.816 0l-7.75 6.217A2.25 2.25 0 0 0 4 11.47v11.28A2.25 2.25 0 0 0 6.25 25h2.5A2.25 2.25 0 0 0 11 22.75v-5.5c0-.69.56-1.25 1.25-1.25h3.5c.69 0 1.25.56 1.25 1.25v5.5A2.25 2.25 0 0 0 19.25 25h2.5A2.25 2.25 0 0 0 24 22.75V11.47a2.25 2.25 0 0 0-.842-1.755z'
			/>
		</Svg>
	);
}
