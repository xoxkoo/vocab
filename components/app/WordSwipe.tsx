import Swiper from 'react-native-swiper';
import React from 'react';
import { Text, View } from 'react-native';
import WordDisplay from './WordDisplay';
import { Word } from '@/service/word';
import { ThemedText } from '../theme/ThemedText';
import { useTranslation } from 'react-i18next';

interface WordSwipeProps {
	words: Word[];
}

const WordSwipe: React.FC<WordSwipeProps> = ({ words }) => {
	const { t } = useTranslation();
	const renderPagination = (index: number, total: number, context: any) => {
		return (
			<View className='mt-0'>
				<Text>
					<Text>{index + 1}</Text>/{total}
				</Text>
			</View>
		);
	};

	if (words.length !== 0) {
		return (
			<>
				<ThemedText type='subtitle' className='mt-10'>
					{t('home.wordsTitle')}
				</ThemedText>
				<Swiper
					showsButtons={true}
					height={100}
					renderPagination={renderPagination}
					paginationStyle={{ position: 'absolute', top: 0, left: 0 }}
				>
					{words.map((word, index) => (
						<WordDisplay word={word.word} key={index} />
					))}
				</Swiper>
			</>
		);
	}
};

export default WordSwipe;
