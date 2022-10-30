import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import {getStorage, uploadBytes} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzCkLgPzwj0E85YFz0GH6iEWBy2KbvsTI",
  authDomain: "timepiker.firebaseapp.com",
  databaseURL: "https://timepiker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "timepiker",
  storageBucket: "timepiker.appspot.com",
  messagingSenderId: "568982849504",
  appId: "1:568982849504:web:a4896163af24855c950d85",
  measurementId: "G-K6TCTQ8ZGP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);