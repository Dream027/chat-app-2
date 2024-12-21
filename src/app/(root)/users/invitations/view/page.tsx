import InvitationIcon from "@/app/(root)/_components/InvitationIcon";
import { axiosClient } from "@/utils/axiosClient";
import { authoptions } from "@/utils/nextauth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function InvitationViewPage() {
    const data = await axiosClient.get("/api/invitations");
    const invitations = data.data.data as Invitation[];
    const session = await getServerSession(authoptions);
    const sentInvitations = invitations.filter(
        (i) => i.sender._id === session?.user._id
    );
    const receivedInvitations = invitations.filter(
        (i) => i.receiver._id === session?.user._id
    );

    if (sentInvitations.length === 0 && receivedInvitations.length === 0) {
        return (
            <div className="margined-layout">
                <h1>View Invitations</h1>
                <div style={{ marginTop: "2rem" }} className="align-center">
                    <h3>No Invitation yet</h3>
                    <Link href={"/users/invitations/send"}>
                        Send Invitation
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="margined-layout">
            <h1>View Invitations</h1>
            <div style={{ marginTop: "2rem" }} className="align-center">
                <h3>Invite a friend</h3>
                <Link href={"/users/invitations/send"}>Send Invitation</Link>
            </div>
            <div className="invitations_view">
                {sentInvitations.length > 0 && (
                    <div>
                        <h3>Sent Invitations</h3>
                        <div>
                            {sentInvitations.map((i) => (
                                <InvitationIcon
                                    key={i._id}
                                    email={i.receiver.email}
                                    name={i.receiver.name}
                                    image={i.receiver.image}
                                    id={i._id}
                                    type="Sent"
                                />
                            ))}
                        </div>
                    </div>
                )}
                {receivedInvitations.length > 0 && (
                    <div>
                        <h3>Received Invitations</h3>
                        <div>
                            {receivedInvitations.map((i) => (
                                <InvitationIcon
                                    key={i._id}
                                    email={i.sender.email}
                                    name={i.sender.name}
                                    image={i.sender.image}
                                    id={i._id}
                                    type="Received"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
