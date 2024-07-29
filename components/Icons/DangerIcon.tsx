import { colorDanger, Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { G, Path, Circle } from 'react-native-svg';

export function DangerIcon({ height = 30, width = 30 }) {
	const colorScheme = useColorScheme();
	return (
		<Svg width={width} height={height} viewBox='0 0 24 24'>
			<G fill='none'>
				<Path stroke={colorDanger} stroke-linecap='round' stroke-width='1.5' d='M12 7v6' />
				<Circle cx='12' cy='16' r='1' fill={colorDanger} />
				<Path
					stroke={colorDanger}
					stroke-width='1.5'
					d='M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z'
				/>
			</G>
		</Svg>
	);
}
