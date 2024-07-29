import { colorPrimary } from '@/constants/Colors';
import Svg, { Path } from 'react-native-svg';

export default function CheckmarkIcon({ height = 30, width = 30 }) {
	return (
		<Svg width={width} height={height} viewBox='0 0 16 16'>
			<Path
				fill={colorPrimary}
				d='M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032'
			/>
		</Svg>
	);
}
