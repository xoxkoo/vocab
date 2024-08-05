import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from '@/components/theme/ThemedText'; // Adjust the import according to your project structure
import { Word } from '@/service/word';
import { borderRadius } from '@/assets/styles';
import { Colors } from '@/constants/Colors';

interface WordDisplayProps {
	data: Word;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ data }) => {
	const colorTheme = useColorScheme();
	return (
		<View
			className='my-auto items-center p-5'
			style={{ ...styles.container, backgroundColor: Colors[colorTheme ?? 'light'].shade }}
		>
			<ThemedText type='subtitleSemiBold'>{data.word}</ThemedText>
			<ThemedText className='pt-5'>{data.description}</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
		borderRadius: borderRadius,
	},
});

export default WordDisplay;
