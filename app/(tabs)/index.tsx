import { StyleSheet, View, SafeAreaView, Text, Pressable, Button, Modal } from 'react-native';

import { HelloWave } from '@/components/app/HelloWave';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedView } from '@/components/theme/ThemedView';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import useAuth from '@/firebase/useAuth';
import { ProfileIcon } from '@/components/Icons/ProfileIcon';
import { router } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {
	const { t } = useTranslation();
	const { user, logout } = useAuth();
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<SafeAreaView className='flex-1'>
			<ThemedView className='flex-1 p-5'>
				{user ? (
					<View className='flex flex-row items-end justify-between'>
						<ThemedText type='title' className=''>
							{t('hello')} {user.displayName ? ', ' + user.displayName : ''} <HelloWave />
						</ThemedText>
						<View className='relative'>
							<Pressable onPress={() => setModalVisible(true)}>
								<ProfileIcon />
							</Pressable>
							<Modal
								animationType='slide'
								transparent={true}
								visible={modalVisible}
								onRequestClose={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<View className='absolute right-0 mt-10 flex-1'>
									<View className='bg-red-200 p-10'>
										<Pressable onPress={logout}>
											<Text>Hide Modal</Text>
										</Pressable>
										<Pressable onPress={() => setModalVisible(!modalVisible)}>
											<Text>Hide Modal</Text>
										</Pressable>
									</View>
								</View>
							</Modal>
						</View>
						{/* <Button title='login' onPress={router.replace('/login')}></Button> */}
						<Pressable onPress={() => router.replace('/login')} />
					</View>
				) : (
					<Text>Not logged</Text>
				)}
			</ThemedView>
		</SafeAreaView>
	);
}
