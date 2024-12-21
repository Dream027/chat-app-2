import mongoose from "mongoose";
import { Env } from "./env";

export const connectToDb = () => mongoose.connect(Env.get("MONGODB_URL"));
