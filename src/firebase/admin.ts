import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export const firebaseAdmin =
    getApps()[0] ??
    initializeApp({
        credential: cert(JSON.parse(process.env.NEXTAUTH_FIREBASE_CREDENTIALS ?? "{}")),
    });

export const auth = getAuth();
