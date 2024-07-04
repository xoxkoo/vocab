import { StyleSheet, View, TextInput, Pressable, Text, useColorScheme } from 'react-native';

import { useTranslation } from 'react-i18next';
import '../i18n';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import useAuth from '@/firebase/useAuth';
import { borderRadius } from '@/assets/styles';
import { Colors, colorSecondary } from '@/constants/Colors';
import { ThemedText } from '@/components/theme/ThemedText';
import AppButton from '@/components/base/AppButton';
import GoogleIcon from '@/components/Icons/GoogleIcon';
import AppleIcon from '@/components/Icons/AppleIcon';
import Divider from '@/components/base/Divider';
import FacebookIcon from '@/components/Icons/FacebookIcon';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { EyeIcon } from '@/components/Icons/EyeIcon';
import { NavigationContext } from '@react-navigation/native';
import { EyeOffIcon } from '@/components/Icons/EyeOffIcon';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function LoginScreen() {
	const colorScheme = useColorScheme();

	const { loginWithGoogle, loginWithEmail, loginWithApple, loginWithFacebook } = useAuth();
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const navigation = useContext(NavigationContext);
	const togglePasswordText = () => {
		if (showPassword) setShowPassword(false);
		else setShowPassword(true);
	};

	useLayoutEffect(() => {
		navigation?.setOptions({
			headerShadowVisible: false,
			headerTitle: '',
			headerStyle: {
				backgroundColor: Colors[colorScheme ?? 'light'].background,
			},
		});
	}, [navigation]);

	useEffect(() => {
		// Initialize GoogleSignin
		GoogleSignin.configure({
			webClientId: '<YOUR_WEB_CLIENT_ID>', // Replace with your web client ID
			offlineAccess: true, // if you want to access Google API on behalf of the user from your server
			hostedDomain: '', // specifies a hosted domain restriction
			forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
		});
	}, []);

	const handleEmailLogin = async () => {
		loginWithEmail(email, password);
	};

	return (
		<View className='flex-1 justify-center p-5'>
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
		</View>
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
