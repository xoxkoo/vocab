import { StyleSheet, View, TextInput, Pressable } from 'react-native';

import { useTranslation } from 'react-i18next';
import '../i18n';
import { useState } from 'react';
import useAuth from '@/firebase/useAuth';
import { borderRadius } from '@/assets/styles';
import { colorPrimary, Colors, colorSecondary } from '@/constants/Colors';
import { ThemedText } from '@/components/theme/ThemedText';
import AppButton from '@/components/base/AppButton';
import Divider from '@/components/base/Divider';
import { Link, router } from 'expo-router';
import { EyeIcon } from '@/components/Icons/EyeIcon';
import { EyeOffIcon } from '@/components/Icons/EyeOffIcon';
import { ThemedView } from '@/components/theme/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

export default function LoginScreen() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const { loginWithEmail } = useAuth();
	const toast = useToast();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordText = () => {
		if (showPassword) setShowPassword(false);
		else setShowPassword(true);
	};

	const handleEmailLogin = async () => {
		try {
			if (!email.trim() || !password.trim()) {
				return;
			}
			await loginWithEmail(email, password);
		} catch (error) {
			toast.show(t('login.error'), { type: 'danger' });
		}
	};

	return (
		<>
			<SafeAreaView
				edges={['top', 'bottom']}
				style={{ flex: 0, backgroundColor: Colors[colorScheme ?? 'light'].background }}
			/>
			<SafeAreaView edges={['left', 'right']} className='flex-1'>
				<ThemedView className='flex h-full justify-center p-5'>
					<ThemedText type='title'>{t('login.title')} ✨</ThemedText>
					<ThemedText
						type='subtitle'
						lightColor={Colors['light'].text}
						darkColor={Colors['dark'].text}
						className='mb-7 mt-2'
					>
						{t('login.subtitle')}
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
					<AppButton title={t('login.button')} onPress={handleEmailLogin} severity='primary'></AppButton>
					{/* <Divider className='my-5' title={t('login.divider')}></Divider> */}
					{/* <View className='mx-auto flex w-4/5 flex-row justify-between'>
						<AppButton severity='secondary' outlined onPress={loginWithGoogle} icon={<GoogleIcon />}></AppButton>
						<AppButton severity='secondary' outlined onPress={loginWithApple} icon={<AppleIcon />}></AppButton>
						<AppButton severity='secondary' outlined onPress={loginWithFacebook} icon={<FacebookIcon />}></AppButton>
					</View> */}
					<Divider className='my-5' title={t('login.or')}></Divider>
					<Pressable onPress={() => router.push('/')}>
						<ThemedText type='subtitle' style={{ color: colorPrimary, marginHorizontal: 'auto' }}>
							{t('login.continue')}
						</ThemedText>
					</Pressable>

					<ThemedText className='mx-auto mt-auto'>
						{t('login.dontHaveAccount')}
						<Link href='/register' className='ml-5'>
							<ThemedText type='link' className='ml-5 block'>
								{t('login.signUp')}
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
