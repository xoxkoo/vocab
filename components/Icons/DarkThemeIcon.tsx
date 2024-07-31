import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function DarkThemeIcon({ height = 20, width = 20, color = '' }) {
	const colorScheme = useColorScheme();

	return (
		<Svg width={width} height={height} viewBox='0 0 256 256'>
			<Path
				fill={color !== '' ? color : Colors[colorScheme ?? 'light'].text}
				d='M232.13 143.64a6 6 0 0 0-6-1.49a90.07 90.07 0 0 1-112.27-112.3a6 6 0 0 0-7.49-7.48a102.88 102.88 0 0 0-51.89 36.31a102 102 0 0 0 142.84 142.84a102.88 102.88 0 0 0 36.31-51.89a6 6 0 0 0-1.5-5.99m-42 48.29a90 90 0 0 1-126-126a90.9 90.9 0 0 1 35.52-28.27a102.06 102.06 0 0 0 118.69 118.69a90.9 90.9 0 0 1-28.24 35.58Z'
			/>
		</Svg>
	);
}
