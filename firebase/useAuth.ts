// useAuth.ts
import { useState, useEffect } from 'react';
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
	User,
	Unsubscribe,
	signInWithEmailAndPassword,
	FacebookAuthProvider,
	OAuthProvider,
	signInWithRedirect,
} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from './config';
import { router } from 'expo-router';

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const afterLoginPage = '/';
	const [isLoading, setIsLoading] = useState(true);
	const [hasFailed, setHasFailed] = useState(false);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				setUser(null);
			}
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const loginWithGoogle = async (): Promise<void> => {
		// GoogleSignin.configure();
		// const provider = new GoogleAuthProvider();
		// await signIn(provider);
	};

	const loginWithFacebook = async (): Promise<void> => {
		const provider = new FacebookAuthProvider();
		await signIn(provider);
	};

	const loginWithApple = async (): Promise<void> => {
		// 	  try {
		//    const appleAuthRequestResponse = await appleAuth.performRequest({
		//      requestedOperation: appleAuth.Operation.LOGIN,
		//      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		//    });
		//    const { identityToken, user } = appleAuthRequestResponse;
		//    const appleCredential = auth.AppleAuthProvider.credential(identityToken);
		//    await auth().signInWithCredential(appleCredential);
		//    console.log('Apple sign-in successful.');
		//    // Navigate to the next screen or handle success
		//  } catch (error) {
		//    console.error('Error in Apple sign-in:', error);
		//  }
	};

	const loginWithEmail = async (email: string, password: string): Promise<void> => {
		if (user) return;
		setIsLoading(true);
		setHasFailed(false);
		setError(null);
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			setUser(result.user);

			router.replace(afterLoginPage);
		} catch (error) {
			console.error(error);
		}
	};

	const logout = async (): Promise<void> => {
		await signOut(auth);
		setUser(null);
		router.replace('/login');
	};

	const isLogged = (): boolean => {
		return user !== null;
	};

	const getCurrentUser = (): Promise<User | null> => {
		return new Promise((resolve, reject) => {
			const unsubscribe = onAuthStateChanged(
				auth,
				(currentUser) => {
					unsubscribe();
					resolve(currentUser);
				},
				reject
			);
		});
	};

	const signIn = async (provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider) => {
		if (user) return;
		console.log('a');

		setIsLoading(true);
		setHasFailed(false);
		setError(null);

		try {
			const result = await signInWithRedirect(auth, provider);
			router.replace(afterLoginPage);
		} catch (err) {
			setHasFailed(true);
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		hasFailed,
		user,
		error,
		loginWithGoogle,
		loginWithEmail,
		loginWithApple,
		loginWithFacebook,
		logout,
		getCurrentUser,
		isLogged,
	};
};

export default useAuth;
