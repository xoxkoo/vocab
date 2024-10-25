import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Svg, { Path } from 'react-native-svg';

export function DocumentsIcon({ height = 40, width = 40, color = '' }) {
	const colorScheme = useColorScheme();

	return (
		<Svg width={width} height={height} viewBox='0 0 24 24'>
			<Path
				fill={color !== '' ? color : Colors[colorScheme ?? 'light'].text}
				d='M8.385 12.308h7.23v-1h-7.23zm0 2.769h7.23v-1h-7.23zm0 2.77h4.23v-1h-4.23zM6.615 21q-.69 0-1.152-.462T5 19.385V4.615q0-.69.463-1.152T6.616 3H14.5L19 7.5v11.885q0 .69-.462 1.153T17.384 21zM14 8V4H6.616q-.231 0-.424.192T6 4.615v14.77q0 .23.192.423t.423.192h10.77q.23 0 .423-.192t.192-.424V8zM6 4v4zv16z'
			/>
		</Svg>
	);
}
