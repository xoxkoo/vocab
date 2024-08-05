// useAuth.ts
import { useState, useEffect } from 'react';
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
	User,
	Unsubscribe,
	signInWithEmailAndPassword,
	FacebookAuthProvider,
	OAuthProvider,
	signInWithRedirect,
	deleteUser,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
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
		// try {
		// 	await GoogleSignin.hasPlayServices();
		// 	const userInfo = await GoogleSignin.signIn();
		// } catch (error) {
		// 	if (isErrorWithCode(error)) {
		// 		switch (error.code) {
		// 			case statusCodes.SIGN_IN_CANCELLED:
		// 				// user cancelled the login flow
		// 				break;
		// 			case statusCodes.IN_PROGRESS:
		// 				// operation (eg. sign in) already in progress
		// 				break;
		// 			case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
		// 				// play services not available or outdated
		// 				break;
		// 			default:
		// 			// some other error happened
		// 		}
		// 	} else {
		// 		// an error that's not related to google sign in occurred
		// 	}
		// }
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
			throw error;
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

	const deleteAccount = async (): Promise<void> => {
		if (!user) return;

		deleteUser(user)
			.then(() => {
				setUser(null);
				router.replace('/login');
			})
			.catch((error) => {
				throw error;
			});
	};

	const sendPasswordResetLink = async (): Promise<void> => {
		try {
			if (!user?.email) return;
			await sendPasswordResetEmail(auth, user?.email);
		} catch (error) {
			throw error;
		}
	};

	const createAccount = async (email: string, password: string): Promise<void> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			setUser(userCredential.user);
			router.replace(afterLoginPage);
		} catch (error) {
			throw error;
		}
	};
	const signIn = async (provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider) => {
		if (user) return;

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
		deleteAccount,
		loginWithEmail,
		loginWithApple,
		loginWithFacebook,
		createAccount,
		sendPasswordResetLink,
		logout,
		getCurrentUser,
		isLogged,
	};
};

export default useAuth;
