"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function OtpVerification({ email }: { email: string }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        axios
            .put("/api/resend", {
                email,
            })
            .then((res) => {
                if (res.status >= 300) {
                    toast.error("Something went wrong.");
                } else {
                    if (!res.data.success) {
                        toast.error(res.data.message);
                    }
                }
            })
            .catch((err) => toast.error(err));
    }, []);

    const submitOTP = useCallback(() => {
        axios
            .post("/api/resend", {
                email,
                otp: inputRef.current?.value,
            })
            .then((res) => {
                if (res.status >= 300) {
                    toast.error("Something went wrong.");
                } else {
                    if (res.data.success) {
                        toast.success(res.data.message);
                        router.replace("/");
                    } else {
                        toast.error(res.data.message);
                    }
                }
            })
            .catch((err) => toast.error(err));
    }, []);

    const resendOTP = useCallback(() => {
        axios
            .put("/api/resend", {
                email,
            })
            .then((res) => {
                if (res.status >= 300) {
                    toast.error("Something went wrong.");
                } else {
                    if (res.data.success) {
                        toast.success(res.data.message);
                    } else {
                        toast.error(res.data.message);
                    }
                }
            })
            .catch((err) => toast.error(err));
    }, []);

    return (
        <div className="margined-layout otp-verify">
            <h2>Enter your OTP</h2>
            <p>
                OTP has been sent to your email <b>{email}</b>
            </p>
            <div>
                <input ref={inputRef} type="text" maxLength={4} />
            </div>
            <div>
                <button onClick={resendOTP} className="btn-secondary">
                    Resend OTP
                </button>
                <button onClick={submitOTP}>Submit</button>
            </div>
        </div>
    );
}
