import Image from "next/image";
import { notFound } from "next/navigation";
import EditGroup from "@/app/(root)/_components/EditGroup";

export const metadata = {
    title: "Edit Group",
};

export default async function GroupPage({
    params: { groupId },
}: {
    params: { groupId: string };
}) {
    const group = {} as Group;
    if (!group) {
        notFound();
    }
    return (
        <div className="margined-layout profile_main">
            <div>
                <Image
                    src={group.image}
                    alt=""
                    width={120}
                    height={120}
                    style={{ borderRadius: "50%" }}
                />
                <div style={{ marginTop: "1rem" }}>
                    <h2>{group.name}</h2>
                    <p>{group.description}</p>
                </div>
            </div>
            <EditGroup group={group} />
        </div>
    );
}
