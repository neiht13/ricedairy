'use sever';

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// @ts-ignore
import prisma from "./../../../prisma/prisma";

// @ts-ignore
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Login",
            credentials: {
                username: { label: "Username", type: "username"},
                password: {  label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                console.log('credentials',credentials)
                const authUser = await prisma.user.findUnique({
                    where: {
                        username: credentials?.username,
                    }
                })
                console.log('authUser', authUser)

                if (authUser?.password === credentials?.password && authUser?.status) {
                    return authUser
                } else {
                    return null
                }
            }
        })
    ],

    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        // @ts-ignore
        async jwt({ token, user }) {
        /* Step 1: update the token based on the user object */
        if (user) {
            token.role = user.role;
            token.username = user.username;
            token.xId = user.xId;
            token.uId = user.id;
            token.expires = Date.now() + 3 * 24 * 60 * 60 * 1000; // 30 ngày
        }
        return token;
    },
        // @ts-ignore
        session({ session, token }) {
        /* Step 2: update the session.user based on the token object */
        if (token && session.user) {
            session.user.role = token.role;
            session.user.username = token.username;
            session.user.xId = token.xId;
            session.user.uId = token.uId;
            session.expires = token.expires; // 30 ngày
        }
        return session;
    },
},

}
// @ts-ignore
export default NextAuth(authOptions);