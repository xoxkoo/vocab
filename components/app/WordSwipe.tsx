import Swiper from 'react-native-swiper';
import React from 'react';
import { View } from 'react-native';
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
			<View className='ml-auto'>
				<ThemedText>
					<ThemedText>{index + 1}</ThemedText>/{total}
				</ThemedText>
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
					// showsButtons={words.length > 1}
					// nextButton={<ArrowLeftIcon iconClassName='rotate-180' />}
					// prevButton={<ArrowLeftIcon />}
					// buttonWrapperStyle={{ top: '50%', position: 'absolute', paddingBottom: 15 }}
					renderPagination={renderPagination}
				>
					{words.map((data, index) => (
						<WordDisplay data={data} key={index} />
					))}
				</Swiper>
			</>
		);
	} else {
		return (
			<ThemedText type='subtitle' className='mb-auto mt-10'>
				{t('home.empty')}
			</ThemedText>
		);
	}
};

export default WordSwipe;
