import { v2 as cloud } from "cloudinary";
import { Env } from "./env";

export const cloudinary = cloud.config({
    api_key: Env.get("NEXT_PUBLIC_CLOUDINARY_API_KEY"),
    api_secret: Env.get("CLOUDINARY_API_SECRET"),
    cloud_name: Env.get("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
});

cloud.uploader.upload_stream({});
