"use client"
import { AuthProvider, User, UserCredential } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
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

// BEGIN

const provider = (): AuthProvider => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithRedirect(provider);
    return provider
}

interface AuthContextT {
    user: User | null;
    signIn: () => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextT | undefined>(undefined);

 const AuthContextProvider  = ({ children }:{children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user as User);
        });

        return () => unsubscribe();
    }, [user]);

    const signIn = async () => {
        try {
            //@ts-ignore
            const result: UserCredential = await auth.signInWithPopup(provider());
        console.log("UseEffected");
            setUser(result.user);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const contextValue: AuthContextT = {
        user,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>

};

const useAuth = (): AuthContextT => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Out of Syllabus");
    }
    return context;
};

export { AuthContextProvider, useAuth };
