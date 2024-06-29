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

	const loginWithGoogle = async (): Promise<void> => {
		if (user) return;

		const provider = new GoogleAuthProvider();

		setIsLoading(true);
		setHasFailed(false);
		setError(null);

		try {
			const result = await signInWithPopup(auth, provider);
			setUser(result.user);

			router.replace(afterLoginPage);
		} catch (err) {
			setHasFailed(true);
			setError(err);
		} finally {
			setIsLoading(false);
		}
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

	return {
		isLoading,
		hasFailed,
		user,
		error,
		loginWithGoogle,
		loginWithEmail,
		logout,
		getCurrentUser,
		isLogged,
	};
};

export default useAuth;
