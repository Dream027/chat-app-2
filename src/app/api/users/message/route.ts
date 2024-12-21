import { APIResponse } from "@/utils/APIResponse";
import { generateChatId } from "@/utils/generateChatId";
import { pusher } from "@/utils/pusher";
import { redis } from "@/utils/redis";
import { routeHandler } from "@/utils/routeHandler";
import { NextRequest } from "next/server";

export const POST = routeHandler(async (req: NextRequest) => {
    const message = (await req.json()) as Message;
    if (!message) return new APIResponse(false, 400, "Message is required");

    const roomId = generateChatId(message.sender, message.receiver);

    await redis.sadd(`message-${roomId}`, JSON.stringify(message));
    await pusher.trigger("message", `message-${message.receiver}`, message);
    await pusher.trigger("message", `message-${message.sender}`, message);

    return new APIResponse(true, 200, "Message sent");
});
