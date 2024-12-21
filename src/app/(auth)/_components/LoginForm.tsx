"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type FormFields = {
    email: string;
    password: string;
};

export default function LoginForm({ state }: { state: boolean }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();
    const router = useRouter();

    const onSubmit = useCallback(
        async (data: FormFields) => {
            signIn("credentials", { ...data, redirect: false }).then((res) => {
                if (res?.error) {
                    toast.error(res.error);
                } else if (res?.ok) {
                    toast.success("Login successful");
                    router.push("/users");
                }
            });
        },
        [router]
    );

    useEffect(() => {
        reset();
    }, [state, reset]);

    return (
        <form className="auth_form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1>Login</h1>
                <div>
                    <div>
                        <label htmlFor="login_email">Email Address</label>
                        <input
                            type="email"
                            id="login_email"
                            {...register("email")}
                        />
                    </div>
                    <div>
                        <label htmlFor="login_password">Password</label>
                        <input
                            type="password"
                            id="login_password"
                            {...register("password")}
                        />
                    </div>
                </div>
                <button disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="loader" />}
                    Login
                </button>
            </div>
            <div className="auth_or">
                <div></div>
                <div>or</div>
                <div></div>
            </div>
            <button
                type="button"
                className="auth_google"
                onClick={() => signIn("google")}
            >
                <Image src="/google.svg" alt="google" width={24} height={24} />
                Continue with Google
            </button>
        </form>
    );
}
