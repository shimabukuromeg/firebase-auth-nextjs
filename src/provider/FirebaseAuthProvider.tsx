'use client';

import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/firebase/client";
import { useSession } from "next-auth/react";

const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
    const currentFirebaseUser = auth.currentUser;
    console.log('currentFirebaseUser', currentFirebaseUser)
    const { data: session, status } = useSession()

    const getCustomToken = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/auth/status`)
        return await res.json()
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (fbUser) => {
            console.log("firebase user info", fbUser);
            console.log("next auth session info", status);

            // NOTE: nextauth でログイン済みだが firebase auth でログインしていない場合、カスタムトークンを取得してログインする
            if (fbUser == null && status === 'authenticated') {
                getCustomToken().then((data: { customToken: string }) => {
                    console.log('data', data)
                    if (data?.customToken) {
                        signInWithCustomToken(auth, data.customToken).then((userCredential) => {
                            // Signed in
                            const user = userCredential.user;
                            console.log('user', user)
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

    return <>{children}</>;
};

export default FirebaseAuthProvider;
