"use client"
import { AuthProvider, User } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import {  useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBMgCz10_LO3YvMerlzQiHCXA08wZ8_TRI",
  authDomain: "chease-21.firebaseapp.com",
  projectId: "chease-21",
  storageBucket: "chease-21.appspot.com",
  messagingSenderId: "1007808656608",
  appId: "1:1007808656608:web:78edbd89977a9be6358c85",
  measurementId: "G-D73HR80G51",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


const signInFunc = () =>{
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithRedirect(provider);
return provider
}


const signIn = () => auth.signInWithPopup(signInFunc() as AuthProvider);
const signOut = () => auth.signOut();


export default function MainPage() {
  const [user, setUser] = useState<User | null|undefined>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user !== null) setUser(user as User);
      else setUser(undefined)
    });
    console.log(user?.displayName)
  }, [user]);

  const handleOnClick = (e: React.MouseEvent) => {
    signIn();
  }

  if (user === null) {
     return <div>loadding.....</div> 
  }

  if (user !== null && user !== undefined) {
    console.log(user);
    return (
      <div> Dungllle Pappi Create a COntext Wrapped Da M
        <h1> Signed In and as {user.displayName}</h1>
        <button onClick={signOut}> Signout</button>
      </div>
    ) 
  }
  else{
  return (
    <div>
      <h1> Hell o with GOogld </h1>
      <button onClick={handleOnClick}> Clicke</button>
    </div>
  );
  }
}
