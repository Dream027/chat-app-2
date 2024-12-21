import ChatHeader from "@/components/ChatHeader";
import InputUserChats from "@/components/InputUserChats";
import UserChats from "@/components/UserChats";
import { axiosClient } from "@/utils/axiosClient";
import { authoptions } from "@/utils/nextauth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Chat with friends",
};

export default async function ChatRoomPage({
    params: { chatId },
}: {
    params: { chatId: string };
}) {
    const session = await getServerSession(authoptions);
    if (!session) notFound();
    const freindId = chatId
        .split("-")
        .filter((id) => id !== session.user?._id)[0];
    const res = await axiosClient.get(`/api/users/${freindId}`);

    if (res.status >= 300 || !res.data.success) {
        notFound();
    }
    const friend = res.data.data as User;
    if (!friend) notFound();

    const re2 = await axiosClient.get(`/api/users/message/${chatId}`);
    if (!re2.data.success) {
        notFound();
    }

    const chats = re2.data.data as Message[];

    return (
        <div className="chat_main">
            <ChatHeader image={friend.image} name={friend.name} />
            <UserChats chats={chats} />
            <InputUserChats friend={friend} />
        </div>
    );
}
