import AsyncStorage from '@react-native-async-storage/async-storage';

const VISITED_PAGE_KEY = 'welcome_page';

export const checkIfPageVisited = async () => {
	try {
		const visited = await AsyncStorage.getItem(VISITED_PAGE_KEY);
		return visited === 'true';
	} catch (error) {
		console.error('Error checking visit status:', error);
		return false;
	}
};

export const markPageAsVisited = async () => {
	try {
		await AsyncStorage.setItem(VISITED_PAGE_KEY, 'true');
	} catch (error) {
		console.error('Error marking page as visited:', error);
	}
};

export const clearPageVisitStatus = async () => {
	try {
		await AsyncStorage.removeItem(VISITED_PAGE_KEY);
	} catch (error) {
		console.error('Error clearing visit status:', error);
	}
};
