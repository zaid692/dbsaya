// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDpxzHoSr22S9YS2WMcTfIt5H00fsNfabM",
  authDomain: "databaseintegration-eb2f8.firebaseapp.com",
  databaseURL: "https://databaseintegration-eb2f8-default-rtdb.firebaseio.com",
  projectId: "databaseintegration-eb2f8",
  storageBucket: "databaseintegration-eb2f8.firebasestorage.app",
  messagingSenderId: "820483499718",
  appId: "1:820483499718:web:7eab70ad715188440819c7",
  measurementId: "G-Y8SJZHFPHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

export { database };
