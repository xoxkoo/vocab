import { StyleSheet, Image, SafeAreaView } from 'react-native';

import { Collapsible } from '@/components/base/Collapsible';
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { useLayoutEffect } from 'react';
import { router, useNavigation } from 'expo-router';
import useAuth from '@/firebase/useAuth';
import { useTranslation } from 'react-i18next';
import AppButton from '@/components/base/AppButton';
import { colorDanger } from '@/constants/Colors';
import { AppearanceIcon } from '@/components/Icons/AppearanceIcon';
import { AppearanceSwitch } from '@/components/layout/AppearanceSwitch';
import { DangerIcon } from '@/components/Icons/DangerIcon';
import { useToast } from 'react-native-toast-notifications';
import { ProfileIcon } from '@/components/Icons/ProfileIcon';

export default function Profile() {
	const { sendPasswordResetLink, user, isLogged, deleteAccount, logout } = useAuth();
	const { t } = useTranslation();
	const navigation = useNavigation();
	const toast = useToast();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	const handleResetPassword = async () => {
		if (!user?.email) return;
		try {
			await sendPasswordResetLink();
			toast.show(t('profile.resetSend'), { type: 'success' });
		} catch (error) {
			toast.show(t('profile.resetError'), { type: 'danger' });
		}
	};

	return (
		<ParallaxScrollView
			headerImage={
				<SafeAreaView style={styles.headerImageContainer}>
					<Image source={require('@/assets/images/profile/sk.png')} style={styles.headerImage} />
				</SafeAreaView>
			}
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
		>
			<SafeAreaView className='flex-1'>
				<ThemedView className='flex h-full rounded-md'>
					<ThemedText type={isLogged() ? 'subtitle' : 'title'} className='mb-5'>
						{isLogged() ? (user?.displayName ?? user?.email) : t('profile.guest')} 🙋‍♂️
					</ThemedText>
					{isLogged() ? (
						<>
							<Collapsible title={t('profile.accountInformationTitle')} icon={<ProfileIcon width={30} height={30} />}>
								<AppButton title={t('profile.reset')} outlined onPress={handleResetPassword} />
							</Collapsible>
							<Collapsible title={t('profile.appearance')} icon={<AppearanceIcon width={30} height={30} />}>
								<AppearanceSwitch />
							</Collapsible>
							<Collapsible
								title={t('profile.dangerZoneTitle')}
								icon={<DangerIcon />}
								textStyle={{ color: colorDanger }}
							>
								<AppButton title={t('profile.deleteAccount')} severity='danger' onPress={deleteAccount} />
							</Collapsible>

							<AppButton title={t('profile.logout')} outlined buttonClassName='mt-5' onPress={logout}></AppButton>
						</>
					) : (
						<>
							<Collapsible title={t('profile.appearance')} icon={<AppearanceIcon width={30} height={30} />}>
								<AppearanceSwitch />
							</Collapsible>
							<AppButton
								title={t('login.title')}
								outlined
								buttonClassName='mt-5'
								onPress={() => router.push('/login')}
							></AppButton>
						</>
					)}
				</ThemedView>
			</SafeAreaView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerImage: {
		top: 50,
	},
});
