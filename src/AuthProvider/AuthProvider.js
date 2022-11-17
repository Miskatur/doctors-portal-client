import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from "../firebase/Firebase.config";
import Loading from '../Pages/Shared/Loading/Loading';

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(false);

    if (loader) {
        <Loading></Loading>
    }

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUserWithEmail = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInwithGoogle = provider => {
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }

    const updateUser = name => {
        setLoader(true)
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
        })
        return () => unsubscribe()
    }, [])

    const authInfo = {
        user,
        loader,
        setLoader,
        createUser,
        loginUserWithEmail,
        logOut,
        updateUser,
        signInwithGoogle,
        forgetPassword,
        isDarkMode,
        setIsDarkMode

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>


    );
};

export default AuthProvider;