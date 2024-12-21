import { Resend } from "resend";
import { Env } from "./env";

export const resend = new Resend(Env.get("RESEND_API_KEY"));
