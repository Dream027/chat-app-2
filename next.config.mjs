/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
            },
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: "res.cloudinary.com"
            }
        ]
    },
    env: {
        NEXT_PUBLIC_PUSHER_APP_ID: process.env.NEXT_PUBLIC_PUSHER_APP_ID
    }
};

export default nextConfig;
