import EmailTemplate from "@/components/EmailTemplate";
import { User, UserDocument } from "@/modals/User.modal";
import { APIResponse } from "@/utils/APIResponse";
import { redis } from "@/utils/redis";
import { resend } from "@/utils/resend";
import { routeHandler } from "@/utils/routeHandler";
import { NextRequest } from "next/server";

export const POST = routeHandler(async (req: NextRequest) => {
    const { email, otp } = await req.json();
    if (!email || !otp) {
        return new APIResponse(false, 400, "Email is required.");
    }

    const userId = req.cookies.get("otp-session")?.value;
    if (!userId) {
        return new APIResponse(false, 400, "User not found.");
    }
    const user = (await User.findOne({
        email,
    })) as UserDocument;
    if (!user) {
        return new APIResponse(false, 400, "Invalid user");
    }
    user.emailVerified = true;
    await user.save();

    const dbOtp = await redis.get(`otp-${userId}`);
    if (!dbOtp) {
        return new APIResponse(false, 400, "OTP not found.");
    }

    if (dbOtp !== otp) {
        return new APIResponse(false, 400, "Invalid OTP.");
    }
    await redis.del(`otp-${userId}`);

    return new APIResponse(true, 200, "OTP is valid.");
});

export const PUT = routeHandler(async (req: NextRequest) => {
    const { email } = await req.json();
    if (!email) {
        return new APIResponse(false, 400, "Email is required.");
    }

    const userId = req.cookies.get("otp-session")?.value;
    if (!userId) {
        return new APIResponse(false, 400, "User not found.");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await redis.set(`otp-${userId}`, otp);
    await redis.expireat(`otp-${userId}`, Math.floor(Date.now() / 1000) + 60);

    const emailRes = await resend.emails.send({
        from: "ChatterUp <7Nt9o@example.com>",
        to: email,
        subject: "Verify your email",
        react: EmailTemplate({ otp: otp.toString() }),
    });
    if (emailRes.error) {
        return new APIResponse(false, 400, emailRes.error.message);
    }
    return new APIResponse(
        true,
        200,
        `OTP sent to email ${email} successfully.`
    );
});
