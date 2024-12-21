import { APIResponse } from "@/utils/APIResponse";
import { redis } from "@/utils/redis";
import { routeHandler } from "@/utils/routeHandler";
import { NextRequest } from "next/server";

export const GET = routeHandler(async (req: NextRequest, params: any) => {
    const id = params.params.id;
    if (!id) return new APIResponse(false, 400, "Id is required");

    let messages: any[] = [];
    // while (true) {
    const [cursor, chats] = await redis.sscan(`message-${id}`, 0);
    console.log(cursor, "\n----\n");
    console.log(chats, "\n-------\n");
    messages = messages.concat(chats);
    //     if (cursor === "0") break;
    // }
    console.log("\n\n\n\n\n-------------------", messages);
    return new APIResponse(
        true,
        200,
        "Mesageges fetched successfully.",
        messages
    );
});
