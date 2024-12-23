import Pusher from "pusher-js";
import { Env } from "./env";

export const pusherClient = new Pusher(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    }
);
