import { Image, StyleSheet, Platform, View, TextInput, Button } from 'react-native';

import { useTranslation } from 'react-i18next';
import '../i18n';
import { useState } from 'react';
import useAuth from '@/firebase/useAuth';

export default function LoginScreen() {
	const { loginWithGoogle, loginWithEmail } = useAuth();
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailLogin = async () => {
		loginWithEmail(email, password);
	};

	return (
		<View className='flex-1 justify-center p-5'>
			<TextInput value={email} onChangeText={setEmail} autoCapitalize='none' style={styles.input} />
			<TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
			<Button title='Log in' onPress={handleEmailLogin}></Button>
			<Button title='Google' onPress={loginWithGoogle}></Button>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		padding: 10,
		borderWidth: 1,
		borderColor: 'red',
		marginBottom: 20,
	},
	button: {
		marginTop: 10,
	},
});
