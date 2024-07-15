import Swiper from 'react-native-swiper';
import React from 'react';
import { Text } from 'react-native';
import WordDisplay from './WordDisplay';
import { Word } from '@/service/word';

interface WordSwipeProps {
	words: Word[];
}

const WordSwipe: React.FC<WordSwipeProps> = ({ words }) => {
	console.log(words);

	if (words.length !== 0) {
		return (
			<Swiper showsButtons={true}>
				{words.map((word) => (
					<WordDisplay word={word.word} />
				))}
			</Swiper>
		);
	}
};

export default WordSwipe;
