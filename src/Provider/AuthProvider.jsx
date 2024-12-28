import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export default function AuthProvider({children}) {

 

  const [user, setUser]= useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  }

  const userLogin=(email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle =()=>{
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const logOut = () =>{
    setLoading(true);
    return signOut(auth);
  }

  const authInfo = {
    createNewUser,
    updateUserProfile,
    userLogin,
    signInWithGoogle,
    loading,
    user,
    setUser,
    logOut
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser) =>{
      setUser(currentUser);
      setLoading(false);
    });
    return () =>{
      unsubscribe();
    }
  },[])

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}