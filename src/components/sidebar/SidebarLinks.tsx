"use client";

import { UserRound, UserRoundCheck, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLinksProps = {};

export default function SidebarLinks({}: SidebarLinksProps) {
    const pathname = usePathname();
    return (
        <nav>
            <div>
                <Link
                    href="/users"
                    className={
                        pathname.startsWith("/users") &&
                        pathname !== "/users/invitations/view" &&
                        pathname !== "/users/invitations/send"
                            ? "active_link"
                            : ""
                    }
                >
                    <UserRound />
                </Link>
                <label>Users</label>
            </div>
            {/* <div>
                <Link
                    href="/groups"
                    className={
                        pathname.startsWith("/groups") ? "active_link" : ""
                    }
                >
                    <UsersRound />
                </Link>
                <label>Groups</label>
            </div> */}
            <div>
                <Link
                    href="/users/invitations/view"
                    className={
                        pathname === "/users/invitations/view" ||
                        pathname === "/users/invitations/send"
                            ? "active_link"
                            : ""
                    }
                >
                    <UserRoundCheck />
                </Link>
                <label>Invitations</label>
            </div>
        </nav>
    );
}
