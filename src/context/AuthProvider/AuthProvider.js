import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import app  from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'


export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user ,setUser] = useState(null)
    const[loading ,setLoading] =useState(true)

   

    const providerLogin = (provider)=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    

    const createUser =(email ,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email ,password)
    }

    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (profile)=>{
        return updateProfile(auth.currentUser ,profile)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , (currentUser)=>{
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        })

        return ()=>{
            unsubscribe();
        }
    },[])


    const authInfo = {user, logOut ,createUser ,signIn,loading ,updateUserProfile ,providerLogin}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
            
        </div>
    );
};

export default AuthProvider;