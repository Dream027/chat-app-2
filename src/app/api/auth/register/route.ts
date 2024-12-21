import { User } from "@/modals/User.modal";
import { APIResponse } from "@/utils/APIResponse";
import { connectToDb } from "@/utils/db";
import { routeHandler } from "@/utils/routeHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = routeHandler(async (req: NextRequest) => {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
        return new APIResponse(false, 400, "All fields are required.");

    await connectToDb();

    await User.create({
        name,
        email,
        password,
        emailVerified: true,
    });

    const res = NextResponse.json({
        success: true,
        status: 200,
        message: "User created successfully",
    });

    return res;
});
