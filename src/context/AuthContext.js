

import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext (AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password, displayName) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updatePhotoUrl(photoUrl) {
        return currentUser.updatePhotoUrl(photoUrl)
    }

    function updateDisplayName(displayName) {
        return currentUser.updateDisplayName(displayName)
    }

    function updateDescription(description) {
        return currentUser.updateDescription(description)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword,
        updatePhotoUrl,
        updateDisplayName,
        updateDescription,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
     )
}
