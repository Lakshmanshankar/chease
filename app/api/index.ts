// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMgCz10_LO3YvMerlzQiHCXA08wZ8_TRI",
  authDomain: "chease-21.firebaseapp.com",
  projectId: "chease-21",
  storageBucket: "chease-21.appspot.com",
  messagingSenderId: "1007808656608",
  appId: "1:1007808656608:web:78edbd89977a9be6358c85",
  measurementId: "G-D73HR80G51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
