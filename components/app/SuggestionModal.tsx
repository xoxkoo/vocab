import { Pressable, View } from 'react-native';
import { ThemedText } from '../theme/ThemedText';
import { useTranslation } from 'react-i18next';
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import AppButton from '../base/AppButton';
import { borderRadius } from '@/assets/styles';
import { Colors, colorSecondary } from '@/constants/Colors';
import suggestion from '@/service/suggestion';
import { useToast } from 'react-native-toast-notifications';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SuggestionModal() {
	const { t } = useTranslation();
	const toast = useToast();
	const colorScheme = useColorScheme();

	const [input, setInput] = useState('');
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const postSuggestion = async (input: string) => {
		if (input.trim()) {
			bottomSheetModalRef.current?.dismiss();
			try {
				await suggestion.postSuggestion(input);

				setInput('');
				toast.show(t('suggestion.success'), { type: 'success' });
			} catch (error) {
				toast.show(t('suggestion.error'), { type: 'error' });
			}
		}
	};

	const snapPoints = useMemo(() => ['30%', '35%'], []);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<>
			<Pressable onPress={handlePresentModalPress}>
				<View className='flex flex-row'>
					<ThemedText>{t('suggestion.leaveUsSuggestion1')}</ThemedText>
					<ThemedText className='underline'>{t('suggestion.leaveUsSuggestion2')}</ThemedText>
				</View>
			</Pressable>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={1}
				snapPoints={snapPoints}
				backgroundStyle={{
					backgroundColor: Colors[colorScheme ?? 'light'].shade,
					borderColor: Colors[colorScheme ?? 'light'].background,
					borderWidth: 1,
					borderTopWidth: 4,
				}}
				handleIndicatorStyle={{ backgroundColor: Colors[colorScheme ?? 'light'].text }}
				android_keyboardInputMode='adjustResize'
			>
				<BottomSheetView style={{ ...styles.contentContainer }}>
					<ThemedText>{t('suggestion.title')} 🤝</ThemedText>
					<BottomSheetTextInput
						value={input}
						onChangeText={setInput}
						placeholder={t('suggestion.placeholder')}
						placeholderTextColor={colorSecondary}
						autoCapitalize='none'
						onSubmitEditing={() => postSuggestion(input)}
						returnKeyType='done'
						style={{ ...styles.input, color: Colors[colorScheme ?? 'light'].text }}
					/>
					<AppButton
						title={t('suggestion.button')}
						onPress={() => {
							postSuggestion(input);
						}}
						buttonClassName='w-full'
						outlined
					></AppButton>
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
}
const styles = StyleSheet.create({
	input: {
		fontSize: 18,
		borderWidth: 1.5,
		borderRadius: borderRadius,
		borderColor: colorSecondary,
		marginBottom: 15,
		marginTop: 20,
		padding: 10,
		width: '100%',
		fontFamily: 'DMSans-Regular',
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 10,
	},
});
