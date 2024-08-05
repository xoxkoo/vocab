import { StyleSheet, View, TextInput, Pressable } from 'react-native';

import { useTranslation } from 'react-i18next';
import '../i18n';
import { useLayoutEffect, useState } from 'react';
import useAuth from '@/firebase/useAuth';
import { borderRadius } from '@/assets/styles';
import { colorPrimary, Colors, colorSecondary } from '@/constants/Colors';
import { ThemedText } from '@/components/theme/ThemedText';
import AppButton from '@/components/base/AppButton';
import Divider from '@/components/base/Divider';
import { Link, router, useNavigation } from 'expo-router';
import { EyeIcon } from '@/components/Icons/EyeIcon';
import { EyeOffIcon } from '@/components/Icons/EyeOffIcon';
import { ThemedView } from '@/components/theme/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';

export default function Register() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const { createAccount } = useAuth();
	const toast = useToast();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordText = () => {
		if (showPassword) setShowPassword(false);
		else setShowPassword(true);
	};

	const handleEmailRegister = async () => {
		if (!email.trim() || !password.trim()) {
			return;
		}
		if (password !== repeatPassword) {
			toast.show(t('register.passwordMatch'), { type: 'danger' });
			return;
		}
		try {
			await createAccount(email, password);
		} catch (error) {
			toast.show(t('register.error'), { type: 'danger' });
		}
	};
	const navigation = useNavigation();
	// const [theme, toogleTheme] = useContext(ThemeContext);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: '',
			headerShown: true,
			headerShadowVisible: false,
			headerStyle: {
				backgroundColor: Colors[colorScheme ?? 'light'].background,
				marginBottom: 0,
			},
			headerLeft: () =>
				router.canGoBack() ? (
					<Pressable
						onPress={() => {
							if (router.canGoBack()) router.back();
						}}
					>
						<ArrowLeftIcon />
					</Pressable>
				) : null,
		});
	}, [navigation]);

	return (
		<>
			<SafeAreaView edges={['left', 'right']} className='flex-1'>
				<ThemedView className='flex h-full justify-center p-5'>
					<ThemedText type='title'>{t('register.title')} ✨</ThemedText>
					<ThemedText
						type='subtitle'
						lightColor={Colors['light'].text}
						darkColor={Colors['dark'].text}
						className='mb-7 mt-2'
					>
						{t('register.subtitle')}
					</ThemedText>

					<ThemedText type='defaultSemiBold'>Email</ThemedText>
					<TextInput
						value={email}
						onChangeText={setEmail}
						placeholder={t('login.emailPlaceholder')}
						placeholderTextColor={colorSecondary}
						autoCapitalize='none'
						style={{ ...styles.input, color: Colors[colorScheme ?? 'light'].text }}
						className='p-3'
					/>

					<ThemedText type='defaultSemiBold'>{t('login.password')}</ThemedText>
					<View style={styles.input} className='flex flex-row justify-between p-3'>
						<TextInput
							value={password}
							style={{ ...styles.inputField, color: Colors[colorScheme ?? 'light'].text }}
							onChangeText={setPassword}
							placeholder={t('login.passwordPlaceholder')}
							placeholderTextColor={colorSecondary}
							secureTextEntry={!showPassword}
						/>
						<Pressable onPress={togglePasswordText}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</Pressable>
					</View>
					<ThemedText type='defaultSemiBold'>{t('register.repeatPassword')}</ThemedText>
					<View style={styles.input} className='flex flex-row justify-between p-3'>
						<TextInput
							value={repeatPassword}
							style={{ ...styles.inputField, color: Colors[colorScheme ?? 'light'].text }}
							onChangeText={setRepeatPassword}
							placeholder={t('register.passwordRepeatPlaceholder')}
							placeholderTextColor={colorSecondary}
							secureTextEntry={!showPassword}
						/>
						<Pressable onPress={togglePasswordText}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</Pressable>
					</View>
					<AppButton title={t('register.button')} onPress={handleEmailRegister} severity='primary'></AppButton>

					<Divider className='my-5' title={t('login.or')}></Divider>
					<Pressable onPress={() => router.push('/')}>
						<ThemedText type='subtitle' style={{ color: colorPrimary, marginHorizontal: 'auto' }}>
							{t('login.continue')}
						</ThemedText>
					</Pressable>

					<ThemedText className='mx-auto mb-3 mt-auto'>
						{t('register.haveAccount')}
						<Link href='/login' className='ml-5'>
							<ThemedText type='link' className='ml-5 block'>
								{t('register.login')}
							</ThemedText>
						</Link>
					</ThemedText>
				</ThemedView>
			</SafeAreaView>
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
		marginTop: 5,
		fontFamily: 'DMSans-Regular',
	},
	inputField: {
		fontSize: 18,
		width: '90%',
	},
});
