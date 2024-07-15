import { View, Pressable } from 'react-native';
import { ThemedText } from '../theme/ThemedText';
import useAuth from '@/firebase/useAuth';
export default function ProfileModel() {
	const { logout } = useAuth();
	<View className='absolute right-0 mt-10 flex-1'>
		<View className='bg-red-200 p-10'>
			<Pressable onPress={logout}>
				<ThemedText>Logout</ThemedText>
			</Pressable>
			<Pressable onPress={() => setModalVisible(!modalVisible)}>
				<Text>Hide Modal</Text>
			</Pressable>
		</View>
	</View>;
}
