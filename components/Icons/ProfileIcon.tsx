import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { G, Path, Circle } from 'react-native-svg';

export function ProfileIcon({ height = 40, width = 40 }) {
	const colorScheme = useColorScheme();
	console.log(colorScheme);
	return (
		<Svg width={width} height={height} viewBox='0 0 24 24'>
			<G fill='none' stroke={Colors[colorScheme ?? 'light'].text} strokeWidth='1.5'>
				<Path strokeLinejoin='round' d='M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z' />
				<Circle cx='12' cy='7' r='3' />
			</G>
		</Svg>
	);
}
