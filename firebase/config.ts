import { initializeApp } from 'firebase/app';
//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyACfv3CZRViiGco3yEdFA83PnLBrbbwqCc',
	authDomain: 'vocab-67785.firebaseapp.com',
	databaseURL: 'https://vocab-67785.firebaseio.com',
	projectId: 'vocab-67785',
	storageBucket: 'vocab-67785.appspot.com',
	messagingSenderId: '763704671353',
	appId: 'app-id',
	measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
