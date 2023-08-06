'use client';

import { User, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/client";
import { useSession } from "next-auth/react";

export type GlobalAuthState = {
    fbUser: User | null | undefined
}
const initialState: GlobalAuthState = {
    fbUser: undefined,
}
const AuthContext = createContext<GlobalAuthState>(initialState)

const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
    // firebase auth の user
    const [fbUser, setFbUser] = useState<GlobalAuthState>(initialState)

    // nextauth の session
    const { data: session, status } = useSession()

    const getCustomToken = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/auth/status`)
        return await res.json()
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (fbUser) => {
            console.log("firebase user info", fbUser);
            console.log("next auth session info", status);

            setFbUser({ fbUser })

            // NOTE: nextauth でログイン済みだが firebase auth でログインしていない場合、カスタムトークンを取得してログインする
            if (fbUser == null && status === 'authenticated') {
                getCustomToken().then((data: { customToken: string }) => {
                    console.log('data', data)
                    if (data?.customToken) {
                        signInWithCustomToken(auth, data.customToken).then((userCredential) => {
                            // Signed in
                            const user = userCredential.user;
                            console.log('signInWithCustomToken', user)
                            // ...
                        }).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ...
                        });
                    }
                }
                )
            }
        })
    }, [status])

    return <AuthContext.Provider value={fbUser}>{children}</AuthContext.Provider>
};

export const useAuthContext = () => useContext(AuthContext)

export default FirebaseAuthProvider;
