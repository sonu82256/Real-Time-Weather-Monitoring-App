import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw4srjGeYZ5qknEPpJn3X5o0YLIK1vfbg",
  authDomain: "weather-monitoring-app-864ef.firebaseapp.com",
  projectId: "weather-monitoring-app-864ef",
  storageBucket: "weather-monitoring-app-864ef.appspot.com",
  messagingSenderId: "837984730634",
  appId: "1:837984730634:web:e0fb357d082febf55269f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };