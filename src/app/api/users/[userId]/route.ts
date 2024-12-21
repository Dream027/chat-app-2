import { User, UserDocument } from "@/modals/User.modal";
import { APIResponse } from "@/utils/APIResponse";
import { connectToDb } from "@/utils/db";
import { routeHandler } from "@/utils/routeHandler";
import { NextRequest } from "next/server";

export const GET = routeHandler(async (req: NextRequest, params: any) => {
    const id = params.params.userId;
    if (!id) return new APIResponse(false, 400, "Id is required");

    await connectToDb();

    const user = (await User.findById(id)) as UserDocument;
    if (!user) return new APIResponse(false, 404, "User not found");

    return new APIResponse(true, 200, "User found", {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
    });
});
