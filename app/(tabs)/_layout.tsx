import { router, Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ProfileIcon } from '@/components/Icons/ProfileIcon';
import { HomeOutlinedIcon } from '@/components/Icons/HomeOutlinedIcon';
import { HomeFilledIcon } from '@/components/Icons/HomeFilledIcon';
import { ProfileFilledIcon } from '@/components/Icons/ProfileFilledIcon';
import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';
import { Pressable } from 'react-native';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: Colors[colorScheme ?? 'light'].shade,
				},
				headerTitle: '',
				headerShown: true,
				headerShadowVisible: false,
				headerStyle: {
					backgroundColor: Colors[colorScheme ?? 'light'].background,
				},
				headerLeft: () =>
					router.canGoBack() ? (
						<Pressable
							className='pl-3'
							onPress={() => {
								if (router.canGoBack()) router.back();
							}}
						>
							<ArrowLeftIcon />
						</Pressable>
					) : null,
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
						focused ? <HomeFilledIcon /> : <HomeOutlinedIcon />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
						focused ? <ProfileFilledIcon /> : <ProfileIcon />,
				}}
			/>
		</Tabs>
	);
}
