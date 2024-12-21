"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SidebarProfile({ image }: { image: string }) {
    return (
        <div className="sidebar_profile">
            <Link href={"/users/profile"} className="sidebar_image">
                <Image
                    src={image}
                    alt="profile image"
                    width={100}
                    height={100}
                />
            </Link>
            <div
                onClick={() =>
                    signOut({ redirect: true, callbackUrl: "/signin" })
                }
            >
                <LogOut />
            </div>
        </div>
    );
}
