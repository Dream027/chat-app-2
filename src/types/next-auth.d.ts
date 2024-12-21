import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import type { User as DefaultUser } from "./User";

declare module "next-auth" {
    interface Session {
        user: {
            _id: string;
            name: string;
            email: string;
            image: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id: string;
        name: string;
        email: string;
        image: string;
    }
}
