"use client";

import axios from "axios";
import { TrashIcon, UserRoundPlus, UserRoundX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

type InvitationIconProps = {
    type: "Sent" | "Received";
    name: string;
    image: string;
    id: string;
    email: string;
};

export default function InvitationIcon({
    email,
    name,
    image,
    id,
    type,
}: InvitationIconProps) {
    const router = useRouter();
    const addFriend = useCallback(() => {
        axios
            .put("/api/invitations", { id })
            .then((data) => {
                if (!data.data.success) {
                    toast.error(data.data.message);
                    return;
                }
                router.refresh();
                toast.success(data.data.message);
            })
            .catch((err) => toast.error(err.message));
    }, []);
    const deleteInvitation = useCallback(() => {
        axios
            .delete("/api/invitations", {
                data: { id },
            })
            .then((data) => {
                if (!data.data.success) {
                    toast.error(data.data.message);
                    return;
                }
                router.refresh();
                toast.success(data.data.message);
            })
            .catch((err) => toast.error(err.message));
    }, []);

    return (
        <div className="invitation_icon">
            <Image
                src={image}
                alt=""
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
            />
            <div>
                <h3>{name}</h3>
                <p>{email}</p>
            </div>
            <div>
                {type === "Sent" ? (
                    <button
                        onClick={deleteInvitation}
                        className="btn-icon btn-icon-trash"
                    >
                        <TrashIcon />
                    </button>
                ) : (
                    <>
                        <button onClick={addFriend} className="btn-icon">
                            <UserRoundPlus />
                        </button>
                        <button
                            onClick={deleteInvitation}
                            className="btn-icon btn-icon-trash"
                        >
                            <UserRoundX />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
