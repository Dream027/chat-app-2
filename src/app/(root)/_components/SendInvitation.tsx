"use client";

import axios from "axios";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";

export default function SendInvitation() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const sendInvitation = useCallback(async () => {
        const email = inputRef.current?.value;
        if (!email) {
            toast.error("Email is required");
            return;
        }
        const data = await axios
            .post("/api/invitations", {
                email,
            })
            .catch((err) => {
                toast.error(err.message);
                return err;
            });

        if (data.status >= 300) {
            return;
        }
        if (!data.data.success) {
            toast.error(data.data.message);
            return;
        }
        toast.success(data.data.message);
    }, []);

    return (
        <div className="invitation_send">
            <input type="text" ref={inputRef} />
            <div>
                <button onClick={sendInvitation}>Send</button>
            </div>
        </div>
    );
}
