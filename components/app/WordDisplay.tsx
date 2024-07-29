import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText'; // Adjust the import according to your project structure
import { Word } from '@/service/word';

interface WordDisplayProps {
	data: Word;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ data }) => {
	return (
		<View className='my-auto items-center'>
			<ThemedText type='subtitleSemiBold'>{data.word}</ThemedText>
			<ThemedText className='pt-5'>{data.description}</ThemedText>
		</View>
	);
};

export default WordDisplay;
