import { StyleSheet, Image, Platform, SafeAreaView, View, Pressable, useColorScheme } from 'react-native';

import { Collapsible } from '@/components/base/Collapsible';
import { ExternalLink } from '@/components/base/ExternalLink';
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { useContext, useLayoutEffect } from 'react';
import { router, useNavigation } from 'expo-router';
import useAuth from '@/firebase/useAuth';
import { useTranslation } from 'react-i18next';
import { ProfileIcon } from '@/components/Icons/ProfileIcon';
import AppButton from '@/components/base/AppButton';
import { colorDanger, colorPrimary } from '@/constants/Colors';
import CheckmarkIcon from '@/components/Icons/CheckmarkIcon';
import LightThemeIcon from '@/components/Icons/LightThemeIcon';
import { AppearanceIcon } from '@/components/Icons/AppearanceIcon';
import Divider from '@/components/base/Divider';
import DarkThemeIcon from '@/components/Icons/DarkThemeIcon';
import SystemThemeIcon from '@/components/Icons/SystemThemeIcon';
import { AppearanceSwitch } from '@/components/layout/AppearanceSwitch';
import { DangerIcon } from '@/components/Icons/DangerIcon';

export default function Profile() {
	const { isLogged, user, logout } = useAuth();
	const { t } = useTranslation();
	const navigation = useNavigation();
	// const [theme, toogleTheme] = useContext(ThemeContext);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	const setScheme = (scheme: string) => {
		// setColorScheme();
	};

	return (
		<ParallaxScrollView
			headerImage={
				<SafeAreaView style={styles.headerImageContainer}>
					<Image source={require('@/assets/images/profile/sk.jpg')} style={styles.headerImage} />
				</SafeAreaView>
			}
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
		>
			<SafeAreaView className='flex-1'>
				<ThemedView className='flex h-full rounded-md'>
					<ThemedText type='title' className='mb-5'>
						{isLogged() ? (user?.displayName ?? user?.email) : t('profile.guest')} 🙋‍♂️
					</ThemedText>
					{isLogged() ? (
						<>
							<Collapsible title={t('profile.accountInformationTitle')} icon={<ProfileIcon width={30} height={30} />}>
								<ThemedText>
									This app has two screens: <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText> and{' '}
									<ThemedText type='defaultSemiBold'>app/(tabs)/explore.tsx</ThemedText>
								</ThemedText>
								<ThemedText>
									The layout file in <ThemedText type='defaultSemiBold'>app/(tabs)/_layout.tsx</ThemedText> sets up the
									tab navigator.
								</ThemedText>
								<ExternalLink href='https://docs.expo.dev/router/introduction'>
									<ThemedText type='link'>Learn more</ThemedText>
								</ExternalLink>
							</Collapsible>
							<Collapsible title={t('profile.appearance')} icon={<AppearanceIcon width={30} height={30} />}>
								<AppearanceSwitch />
							</Collapsible>
							<Collapsible
								title={t('profile.dangerZoneTitle')}
								icon={<DangerIcon />}
								textStyle={{ color: colorDanger }}
							>
								<AppButton title={t('profile.deleteAccount')} severity='danger' />
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
