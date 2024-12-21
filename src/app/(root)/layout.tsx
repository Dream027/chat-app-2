import Sidebar from "@/components/sidebar/Sidebar";
import "@/styles/Profile.css";
import "@/styles/Group.css";
import "@/styles/Chat.css";

export const metadata = {
    description: "ChatterUp: Where real-time connections thrive, effortlessly.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Sidebar>{children}</Sidebar>;
}
