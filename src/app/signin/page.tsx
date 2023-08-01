"use client";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    getIdToken,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn as signInByNextAuth } from "next-auth/react";

const SingIn = () => {

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            // popupで認証画面を出す
            const result = await signInWithPopup(auth, provider);

            // ID Tokenを取得する
            const idToken = await getIdToken(result.user, true);

            await signInByNextAuth("credentials", {
                idToken,
                callbackUrl: "/",
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    signIn();
                }}
            >
                Googleでログイン/新規登録
            </button>
        </div>
    );
};

export default SingIn;
