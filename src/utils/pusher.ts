import Pusher from "pusher";
import { Env } from "./env";

export const pusher = new Pusher({
    appId: Env.get("NEXT_PUBLIC_PUSHER_APP_ID"),
    key: Env.get("NEXT_PUBLIC_PUSHER_APP_KEY"),
    cluster: Env.get("NEXT_PUBLIC_PUSHER_APP_CLUSTER"),
    secret: Env.get("PUSHER_APP_SECRET"),
    useTLS: true,
});
