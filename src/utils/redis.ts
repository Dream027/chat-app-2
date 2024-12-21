import { Redis } from "@upstash/redis";
import { Env } from "./env";

export const redis = new Redis({
    url: Env.get("UPSTASH_REDIS_REST_URL"),
    token: Env.get("UPSTASH_REDIS_REST_TOKEN"),
});
