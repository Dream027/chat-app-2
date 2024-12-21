import Image from "next/image";
import Link from "next/link";

type SidebarIconProps = {
    image: string;
    name: string;
    href: string;
    lastMessage?: string;
    unreadMessage?: number;
};

export default function SidebarIcon({
    image,
    name,
    lastMessage,
    unreadMessage,
    href,
}: SidebarIconProps) {
    return (
        <Link className="sidebar_icon" href={href}>
            <div>
                <Image alt="" src={image} fill />
            </div>
            <div>
                <h3>{name}</h3>
                {lastMessage && <p>{lastMessage}</p>}
            </div>
            {!!unreadMessage && <pre>{unreadMessage}</pre>}
        </Link>
    );
}
