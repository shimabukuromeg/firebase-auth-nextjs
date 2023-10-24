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

                        return { ...decoded, idToken } as any as User & { idToken: string };
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
        // maxAge: 60 * 60 * 24 * 360, // 1 year
    },
    cookies: process.env.NODE_ENV === 'production' ? {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                domain: "shimabukuromeg.dev",
                secure: "shimabukuromeg.dev",
            },
        },
    } : {},
    callbacks: {
        // NOTE: session { strategy: jwt } の場合は　token にしか値はっていないっぽい。(JWTをシリアライズした値)
        // JWT トークンを生成・更新する際に呼び出されます
        async jwt({ token, user }: { token: JWT; user: User }) {
            console.log('jwt: token => ', token);
            console.log('jwt: user => ', user);
            return { ...token, ...user };
        },
        // NOTE: sessionにJWTトークンからのユーザ情報を格納
        // セッションオブジェクトを生成・更新する際に呼び出されます。
        async session({ session, token }) {
            session.user.emailVerified = token.emailVerified;
            session.user.uid = token.uid;

            console.log('session: session => ', session);
            console.log('session: token => ', token);

            return {
                ...session,
                user: {
                    ...session.user,
                    emailVerified: token.emailVerified,
                    uid: token.uid,
                },
                idToken: token.idToken,
            }
        },
    },
};

const hander = NextAuth(authOptions);
export { hander as GET, hander as POST }
