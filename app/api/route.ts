import { NextRequest } from "next/server";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { log } from "console";

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

async function main() {
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const signIn = () => auth.signInWithPopup(provider);
  const signOut = () => auth.signOut();
  signIn();
}

export function GET(req: NextRequest) {
  // Initialize Firebase
  main();
  return Response.json({ message: "Null Statisfy Neovim" });
}
