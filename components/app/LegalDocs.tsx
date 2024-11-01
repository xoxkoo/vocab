import React from 'react';

import { useTranslation } from 'react-i18next';
import { Collapsible } from '../base/Collapsible';
import { DocumentsIcon } from '../Icons/DocumentsIcon';
import { ThemedText } from '../theme/ThemedText';
import { Linking, Pressable, View } from 'react-native';

export const LegalDocs: React.FC = () => {
	const { t } = useTranslation();

	return (
		<Collapsible title={t('profile.legal')} icon={<DocumentsIcon width={30} height={30} />}>
			<View className='pl-5'>
				<Pressable
					onPress={() =>
						Linking.openURL('https://vocab-sk.notion.site/Obchodne-podmienky-12a5b8cf17d0801783abd6aa888941c2?pvs=74')
					}
				>
					<ThemedText className='text-lg'>{t('profile.privacy')}</ThemedText>
				</Pressable>
				{/* <Pressable onPress={() => Linking.openURL('https://buymeacoffee.com/anton_durcak')} className='mt-3'>
				<ThemedText>{t('profile.legalDescription')}</ThemedText>
			</Pressable> */}
			</View>
		</Collapsible>
	);
};
