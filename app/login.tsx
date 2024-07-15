import { StyleSheet, View, TextInput, Pressable, SafeAreaView } from 'react-native';

import { useTranslation } from 'react-i18next';
import '../i18n';
import { useState } from 'react';
import useAuth from '@/firebase/useAuth';
import { borderRadius } from '@/assets/styles';
import { Colors, colorSecondary } from '@/constants/Colors';
import { ThemedText } from '@/components/theme/ThemedText';
import AppButton from '@/components/base/AppButton';
import GoogleIcon from '@/components/Icons/GoogleIcon';
import AppleIcon from '@/components/Icons/AppleIcon';
import Divider from '@/components/base/Divider';
import FacebookIcon from '@/components/Icons/FacebookIcon';
import { Link, router } from 'expo-router';
import { EyeIcon } from '@/components/Icons/EyeIcon';
import { EyeOffIcon } from '@/components/Icons/EyeOffIcon';
import { ThemedView } from '@/components/theme/ThemedView';

export default function LoginScreen() {
	const { loginWithGoogle, loginWithEmail, loginWithApple, loginWithFacebook } = useAuth();
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordText = () => {
		if (showPassword) setShowPassword(false);
		else setShowPassword(true);
	};

	const handleEmailLogin = async () => {
		loginWithEmail(email, password);
	};

	return (
		<SafeAreaView className='flex-1'>
			<ThemedView className='flex-1 justify-center p-5'>
				<ThemedText type='title'>{t('login.title')}</ThemedText>
				<ThemedText type='subtitle' lightColor={colorSecondary} darkColor={colorSecondary} className='mb-7 mt-2'>
					{t('login.subtitle')}
				</ThemedText>

				<ThemedText type='defaultSemiBold'>Email</ThemedText>
				<TextInput
					value={email}
					onChangeText={setEmail}
					placeholder={t('login.emailPlaceholder')}
					autoCapitalize='none'
					style={styles.input}
					className='p-3'
				/>

				<ThemedText type='defaultSemiBold'>{t('login.password')}</ThemedText>
				<View style={styles.input} className='flex flex-row justify-between p-3'>
					<TextInput
						value={password}
						style={styles.inputField}
						onChangeText={setPassword}
						placeholder={t('login.passwordPlaceholder')}
						secureTextEntry={!showPassword}
					/>
					<Pressable onPress={togglePasswordText}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</Pressable>
				</View>
				<AppButton title={t('login.button')} onPress={handleEmailLogin} severity='primary'></AppButton>
				<Divider className='my-5' title={t('login.divider')}></Divider>
				<View className='mx-auto flex w-4/5 flex-row justify-between'>
					<AppButton severity='secondary' outlined onPress={loginWithGoogle} icon={<GoogleIcon />}></AppButton>
					<AppButton severity='secondary' outlined onPress={loginWithApple} icon={<AppleIcon />}></AppButton>
					<AppButton severity='secondary' outlined onPress={loginWithFacebook} icon={<FacebookIcon />}></AppButton>
				</View>
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
	);
}

const styles = StyleSheet.create({
	input: {
		fontSize: 18,
		borderWidth: 1.5,
		borderRadius: borderRadius,
		borderColor: Colors.dark.icon,
		marginBottom: 15,
		marginTop: 5,
		fontFamily: 'DMSans-Regular',
	},
	inputField: {
		fontSize: 18,
	},
});
