// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeAuth} from 'firebase/auth'
import {getReactNativePersistence} from '@firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8P-6IRl6ywp-TZ4Bl-fVrxkRSEivQO8U",
    authDomain: "online-ticket-booking-d94bd.firebaseapp.com",
    projectId: "online-ticket-booking-d94bd",
    storageBucket: "online-ticket-booking-d94bd.appspot.com",
    messagingSenderId: "765352524389",
    appId: "1:765352524389:web:bff8a30eee1651e44ae48c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth=initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
});

export const db =getFirestore(app);

export const usersRef=collection(db,'users');
export const airportsRef=collection(db,'airports');
export const flightsRef=collection(db,'flights');
export const bookingsRef=collection(db,'bookings');

