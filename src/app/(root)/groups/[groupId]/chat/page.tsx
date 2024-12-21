import ChatHeader from "@/components/ChatHeader";
import GroupChats from "@/components/GroupChats";
import InputGroupchats from "@/components/InputGroupchats";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Chat with friends",
};

export default async function GroupChatPage({
    params: { groupId },
}: {
    params: { groupId: string };
}) {
    const group = {} as Group;
    if (!group) {
        notFound();
    }

    const chats = [] as Message[];
    if (chats === null) {
        notFound();
    }

    return (
        <div>
            <ChatHeader
                image={group.image}
                name={group.name}
                link={`/groups/${groupId}`}
            />
            <GroupChats chats={chats.reverse()} />
            <InputGroupchats group={group} />
        </div>
    );
}
