// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAh24kdT0UUvywk1k0pvmlzT7Yj-W-ZMw",
  authDomain: "vuejs-http-1ad0c.firebaseapp.com",
  // databaseURL: "https://vuejs-http-1ad0c-default-rtdb.firebaseio.com",
  projectId: "vuejs-http-1ad0c",
  storageBucket: "vuejs-http-1ad0c.firebasestorage.app",
  messagingSenderId: "512135830970",
  appId: "1:512135830970:web:434418b09b824d81145183",
  measurementId: "G-YB4JG7T3ML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);