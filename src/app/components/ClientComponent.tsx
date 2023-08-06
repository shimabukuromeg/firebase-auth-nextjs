"use client";

import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/provider/FirebaseAuthProvider";
import { signOut as signOutNextauth, useSession } from "next-auth/react";


export const ClientComponent = () => {
    const { fbUser } = useAuthContext()
    return (
        <div>
            <button onClick={() => {
                signOutNextauth({
                    callbackUrl: "/signin"
                }).then(() => {
                    // Sign-out successful.
                    signOut(auth).then(() => {
                        // Sign-out successful.
                    }).catch((error) => {
                        // An error happened.
                        console.error(error)
                    });
                }).catch((error) => {
                    // An error happened.
                });
            }}>
                ログアウト
            </button>
            <h3>firebase auth user</h3>
            <p>{JSON.stringify(fbUser ?? '未ログイン')}</p>
            <hr />
        </div>)
};
