"use client";

import { signInWithPopup, getIdToken } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase-config";
import { useAuthContext } from "@/providers/AuthProvider";

export default function SignIn() {

    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        console.log("user", user)
        if (user) {
            router.push("/")
        }
    }, [user, router])

    function signIn() {
        const signInFunc = async () => {
            const result = await signInWithPopup(auth, provider)
            const tokenId = await getIdToken(result.user, true);
            await fetch("/api/login", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokenId}`,
                },
            })
        }
        signInFunc()
    }

    return (
        <>
            <button onClick={() => signIn()}>Sign In</button>
        </>
    );
}

