// ProfileBox.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../theme/ThemedText';
import { ThemedView } from '../theme/ThemedView';
import { View, Image } from 'react-native';

interface ProfileBoxProps {
	name: string | null | undefined;
	image: string;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ name, image }) => {
	return (
		<ThemedView style={styles.container}>
			<View>
				<ThemedText>{name}</ThemedText>
				<Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
			</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default ProfileBox;
