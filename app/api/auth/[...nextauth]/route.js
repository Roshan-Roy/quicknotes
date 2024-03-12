import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { prisma } from "@/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                username: { type: "text", label: "Username", placeholder: "Username" },
                password: { type: "password", label: "Password", placeholder: "Password" }
            },
            async authorize(credentials) {
                const { username, password } = credentials
                let user;
                try {
                    user = await prisma.cuser.findUnique({
                        where: {
                            username
                        }
                    })
                } catch (e) {
                    throw new Error("Something went wrong")
                }
                if (!user) {
                    throw new Error("User not found")
                }
                const passwordMatching = await bcrypt.compare(password, user.hashedPassword)
                if (!passwordMatching) {
                    throw new Error("Incorrect password")
                }
                return user
            }
        })
    ],
    callbacks: {
        jwt: ({ user, token, account }) => {
            if (user && account.provider === "github") {
                return {
                    id: user.id,
                    name: user.name
                }
            }
            if (user) {
                return {
                    id: user.id,
                    name: user.name,
                    username: user.username
                }
            }
            return token
        },
        session: ({ token, session }) => {
            if (token.username) {
                return {
                    ...session,
                    user: {
                        id: token.id,
                        name: token.name,
                        username: token.username
                    }
                }
            }
            return {
                ...session,
                user: {
                    id: token.id,
                    name: token.name
                }
            }
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }