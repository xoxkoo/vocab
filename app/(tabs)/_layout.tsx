import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ProfileIcon } from '@/components/Icons/ProfileIcon';
import { HomeOutlinedIcon } from '@/components/Icons/HomeOutlinedIcon';
import { HomeFilledIcon } from '@/components/Icons/HomeFilledIcon';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) =>
						focused ? <HomeFilledIcon /> : <HomeOutlinedIcon />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color, focused }) => <ProfileIcon />,
				}}
			/>
		</Tabs>
	);
}
