import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { Path } from 'react-native-svg';

export function ArrowLeftIcon({ height = 30, width = 30, iconClassName = '' }) {
	const colorScheme = useColorScheme();
	return (
		<Svg width={width} height={height} viewBox='0 0 1024 1024' className={iconClassName}>
			<Path
				fill={Colors[colorScheme ?? 'light'].text}
				d='M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0'
			/>
		</Svg>
	);
}
