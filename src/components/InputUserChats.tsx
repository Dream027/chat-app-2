"use client";

import axios from "axios";
import { MousePointer2, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function InputUserChats({ friend }: { friend: User }) {
    const [value, setValue] = useState("");
    const session = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sendFiles = useCallback(() => {
        if (!fileInputRef.current) return;
        if (!fileInputRef.current.files) return;
        fileInputRef.current.files = null;
    }, [fileInputRef, friend, session]);

    const sendmessage = useCallback(() => {
        axios
            .post("/api/users/message", {
                data: value,
                sender: session.data?.user._id!,
                receiver: friend._id,
                timestamp: Date.now(),
            } satisfies Message)
            .then((data) => {
                if (!data.data.success) {
                    toast.error(data.data.message);
                    return;
                }
                setValue("");
            })
            .catch((err) => toast.error("Something went wrong."));
    }, [value, friend, session]);

    return (
        <div className="chat_input">
            <div className="align-center">
                {/* <div className="file_input">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={sendFiles}
                    />
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{ appearance: "none", color: "black" }}
                    >
                        <MousePointer2 />
                    </div>
                </div> */}
                <input
                    type="text"
                    placeholder="Type something..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendmessage();
                    }}
                />
                <button onClick={sendmessage}>
                    <Send />
                    Send
                </button>
            </div>
        </div>
    );
}
