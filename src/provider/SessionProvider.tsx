'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import FirebaseAuthProvider from './FirebaseAuthProvider';

export interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
    return <NextAuthSessionProvider>
        <FirebaseAuthProvider>
            {children}
        </FirebaseAuthProvider>
    </NextAuthSessionProvider>;
};

export default SessionProvider;
