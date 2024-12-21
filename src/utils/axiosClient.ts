import axios from "axios";
import { Env } from "./env";
import { headers } from "next/headers";

export const axiosClient = axios.create({
    baseURL: Env.get("SERVER_URL"),
});

