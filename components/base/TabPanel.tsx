// TabPanel.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { ThemedView } from '../theme/ThemedView';

const { width } = Dimensions.get('window');

interface TabPanelProps {
	titles: string[];
	content: React.ComponentType[];
}

const TabPanel: React.FC<TabPanelProps> = ({ titles, content }) => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const pagerRef = React.useRef<PagerView>(null);

	const handlePageChange = (index: number) => {
		setSelectedIndex(index);
		pagerRef.current?.setPage(index);
	};

	return (
		<ThemedView style={styles.container}>
			<View style={styles.tabContainer}>
				{titles.map((title, index) => (
					<Pressable
						key={index}
						style={[styles.tab, selectedIndex === index && styles.selectedTab]}
						onPress={() => handlePageChange(index)}
					>
						<Text style={[styles.tabText, selectedIndex === index && styles.selectedTabText]}>{title}</Text>
					</Pressable>
				))}
			</View>
			if (selectedIndex === 0)
			{
				<View style={styles.page}>
					<Text>Page 1</Text>
				</View>
			}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#f8f8f8',
		paddingVertical: 10,
	},
	tab: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	selectedTab: {
		borderBottomWidth: 2,
		borderBottomColor: '#000',
	},
	tabText: {
		fontSize: 16,
		color: '#888',
	},
	selectedTabText: {
		color: '#000',
	},
	pagerView: {
		flex: 1,
	},
	page: {
		width,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f8f8',
	},
});

export default TabPanel;
