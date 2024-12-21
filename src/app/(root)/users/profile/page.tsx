import "@/styles/Profile.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import UserProfile from "../../_components/UserProfile";
import { getServerSession } from "next-auth";

export const metadata = {
    title: "Profile",
};

export default async function UserProfilePage() {
    const session = await getServerSession();
    if (!session || !session.user) notFound();
    return (
        <div className="margined-layout profile_main">
            <div>
                <Image
                    src={session.user.image!}
                    alt=""
                    width={120}
                    height={120}
                />
                <div style={{ marginTop: "1rem" }}>
                    <h2>{session.user.name}</h2>
                    <p>{session.user.email}</p>
                </div>
            </div>
            <UserProfile session={session.user} />
        </div>
    );
}
