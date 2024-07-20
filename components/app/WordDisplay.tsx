import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText'; // Adjust the import according to your project structure

interface WordDisplayProps {
	word: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word }) => {
	return (
		<View className='my-auto flex items-center'>
			<ThemedText>{word}</ThemedText>
		</View>
	);
};

export default WordDisplay;
