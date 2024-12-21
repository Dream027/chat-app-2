import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Env } from "./env";
import { connectToDb } from "./db";
import { User, UserDocument } from "@/modals/User.modal";

export const authoptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                name: {
                    label: "Name",
                    type: "text",
                },
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("All fields are required");
                }
                await connectToDb();

                const user = (await User.findOne({
                    email: credentials?.email,
                })) as UserDocument;
                if (!user) {
                    throw new Error("No user with such email exists.");
                }

                if (!user.emailVerified) {
                    throw new Error("Email is not verified.");
                }

                const isPasswordCorrect = await user.comparePassword(
                    credentials.password
                );
                if (!isPasswordCorrect) {
                    throw new Error("Invalid Password.");
                }
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                } as any;
            },
        }),
        GoogleProvider({
            clientId: Env.get("GOOGLE_CLIENT_ID"),
            clientSecret: Env.get("GOOGLE_CLIENT_SECRET"),
        }),
    ],
    callbacks: {
        jwt({ token, user, account }) {
            if (user) {
                return {
                    ...token,
                    ...user,
                } as any;
            }
            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    _id: token._id,
                    name: token.name,
                    email: token.email,
                    image: token.image,
                },
            };
        },
    },
    secret: Env.get("NEXTAUTH_SECRET"),
    session: {
        strategy: "jwt",
    },
};
