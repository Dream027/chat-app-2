import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/signin",
        "/users/:path*",
        "/groups/:path*",
        "/chat/:path*",
        "/friends/:path*",
    ],
};