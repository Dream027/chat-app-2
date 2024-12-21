import UserInvatations from "../../_components/UserInvatations";

export const metadata = {
    title: "View All Invitations",
};

export default async function UsersInvitationsPage() {
    const invitations = {} as Invitation[];
    return <UserInvatations invitations={invitations} />;
}
