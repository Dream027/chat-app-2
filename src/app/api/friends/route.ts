import { User } from "@/modals/User.modal";
import { APIResponse } from "@/utils/APIResponse";
import { connectToDb } from "@/utils/db";
import { authoptions } from "@/utils/nextauth";
import { routeHandler } from "@/utils/routeHandler";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export const GET = routeHandler(async () => {
    const session = await getServerSession(authoptions);
    if (!session) {
        return new APIResponse(false, 400, "Log in first.");
    }

    await connectToDb();

    const friends = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(session.user._id),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "friends",
                foreignField: "_id",
                as: "friends",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            email: 1,
                            image: 1,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                friends: 1,
                groups: 1,
            },
        },
    ]);
    return new APIResponse(true, 200, "Success", friends[0]);
});
