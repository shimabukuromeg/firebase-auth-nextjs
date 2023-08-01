"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import type { User } from '@firebase/auth'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '@/lib/firebase-config'

export type GlobalAuthState = {
    user: User | null | undefined
}
const initialState: GlobalAuthState = {
    user: undefined,
}
const AuthContext = createContext<GlobalAuthState>(initialState)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<GlobalAuthState>(initialState)

    useEffect(() => {
        try {
            return onAuthStateChanged(auth, (user) => {
                setUser({
                    user,
                })
            })
        } catch (error) {
            setUser(initialState)
            throw error
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
