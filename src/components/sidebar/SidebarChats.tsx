"use client";

import { usePathname } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";
import SidebarIcon from "./SidebarIcon";
import axios from "axios";
import { generateChatId } from "@/utils/generateChatId";
import { useSession } from "next-auth/react";

export default function SidebarChats({
    chats,
}: {
    chats: {
        friends: User[];
        groups: Group[];
    };
}) {
    const pathname = usePathname();
    const [type, setType] = useState<"users" | "groups">("users");
    const session = useSession();

    useEffect(() => {
        if (pathname.startsWith("/group") && type === "users") {
            setType("groups");
        } else if (pathname.startsWith("/users") && type === "groups") {
            setType("users");
        }
    }, [pathname]);

    return (
        <>
            {type === "users" &&
                (chats.friends.length > 0 ? (
                    chats.friends.map((friend) => (
                        <SidebarIcon
                            key={friend._id}
                            href={`/users/chat/${generateChatId(
                                friend._id,
                                session.data?.user._id!!
                            )}`}
                            image={friend.image}
                            name={friend.name}
                        />
                    ))
                ) : (
                    <div className="sidebar_placeholder">
                        <p>Add a friend to start a conversation</p>
                    </div>
                ))}

            {type === "groups" &&
                (chats.groups.length > 0 ? (
                    chats.groups.map((group) => (
                        <SidebarIcon
                            key={group._id}
                            href={group._id}
                            image={group.image}
                            name={group.name}
                        />
                    ))
                ) : (
                    <div className="sidebar_placeholder">
                        <p>Join a group to start a conversation</p>
                    </div>
                ))}
        </>
    );
}
