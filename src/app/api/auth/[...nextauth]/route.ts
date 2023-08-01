import NextAuth from 'next-auth';
import type { NextAuthOptions, User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import { auth } from '@/firebase/admin';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            authorize: async ({ idToken }: any, _req) => {
                if (idToken) {
                    try {
                        const decoded = await auth.verifyIdToken(idToken);

                        return { ...decoded } as any as User;
                    } catch (err) {
                        console.error(err);
                    }
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            return { ...token, ...user };
        },
        // sessionにJWTトークンからのユーザ情報を格納
        async session({ session, token }) {
            session.user.emailVerified = token.emailVerified;
            session.user.uid = token.uid;
            return session;
        },
    },
};

const hander = NextAuth(authOptions);
export { hander as GET, hander as POST }