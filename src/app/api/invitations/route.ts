import { Invitation } from "@/modals/Invitation.modal";
import { User, UserDocument } from "@/modals/User.modal";
import { APIResponse } from "@/utils/APIResponse";
import { connectToDb } from "@/utils/db";
import { authoptions } from "@/utils/nextauth";
import { pusher } from "@/utils/pusher";
import { routeHandler } from "@/utils/routeHandler";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = routeHandler(async (req: NextRequest) => {
    const { email } = await req.json();

    if (!email) return new APIResponse(false, 400, "Email is required.");

    const session = await getServerSession(authoptions);
    if (!session) {
        return new APIResponse(false, 400, "Log in first.");
    }
    if (session?.user.email === email) {
        return new APIResponse(false, 400, "You cannot invite yourself.");
    }
    await connectToDb();

    const user = await User.findById(session?.user._id);
    if (!user) {
        return new APIResponse(false, 400, "User not found.");
    }

    const friend = await User.findOne({ email });
    if (!friend) {
        return new APIResponse(false, 400, "No User found with this email.");
    }

    const invitation = await Invitation.findOne({
        sender: session?.user._id,
        receiver: friend._id,
    });
    if (invitation) {
        return new APIResponse(false, 400, "Invitation already sent.");
    }

    const newInvitation = await Invitation.create({
        sender: session?.user._id,
        receiver: friend._id,
    });

    user.invitations.push(newInvitation._id);
    friend.invitations.push(newInvitation._id);

    await user.save();
    await friend.save();

    return {
        status: 200,
        success: true,
        message: "Invitation sent successfully.",
    };
});

export const GET = routeHandler(async () => {
    const invitations = await Invitation.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "sender",
                foreignField: "_id",
                as: "sender",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            email: 1,
                            image: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "receiver",
                foreignField: "_id",
                as: "receiver",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            email: 1,
                            image: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                sender: {
                    $arrayElemAt: ["$sender", 0],
                },
                receiver: {
                    $arrayElemAt: ["$receiver", 0],
                },
            },
        },
        {
            $project: {
                sender: 1,
                receiver: 1,
            },
        },
    ]);

    return {
        status: 200,
        success: true,
        message: "Invitations fetched successfully.",
        data: invitations,
    };
});

export const DELETE = routeHandler(async (req: NextRequest) => {
    const { id } = await req.json();
    if (!id) {
        return new APIResponse(false, 400, "Id is required.");
    }

    await connectToDb();

    const invitation = await Invitation.findById(id);
    if (!invitation) {
        return new APIResponse(false, 400, "Invitation not found.");
    }

    const session = await getServerSession(authoptions);
    if (!session) {
        return new APIResponse(false, 400, "Log in first.");
    }

    const user = await User.findById(session?.user._id);
    if (!user) {
        return new APIResponse(false, 400, "User not found.");
    }

    let friendId;
    if (user._id.toString() === invitation.sender.toString()) {
        friendId = invitation.receiver.toString();
    } else {
        friendId = invitation.sender.toString();
    }

    const friend = await User.findById(friendId);
    if (!friend) {
        return new APIResponse(false, 400, "Friend not found.");
    }

    user.invitations = user.invitations.filter(
        (invitationId: any) => invitationId.toString() !== id
    );
    friend.invitations = friend.invitations.filter(
        (invitationId: any) => invitationId.toString() !== id
    );

    await Invitation.findByIdAndDelete(id);

    await user.save();
    await friend.save();

    return new APIResponse(true, 200, "Invitation deleted successfully.");
});
export const PUT = routeHandler(async (req: NextRequest) => {
    const { id } = await req.json();
    if (!id) {
        return new APIResponse(false, 400, "Id is required.");
    }

    await connectToDb();

    const invitation = await Invitation.findById(id);
    if (!invitation) {
        return new APIResponse(false, 400, "Invitation not found.");
    }

    const session = await getServerSession(authoptions);
    if (!session) {
        return new APIResponse(false, 400, "Log in first.");
    }

    const user = (await User.findById(session?.user._id)) as UserDocument;
    if (!user) {
        return new APIResponse(false, 400, "User not found.");
    }

    let friendId;
    if (user._id.toString() === invitation.sender.toString()) {
        friendId = invitation.receiver.toString();
    } else {
        friendId = invitation.sender.toString();
    }

    const friend = (await User.findById(friendId)) as UserDocument;
    if (!friend) {
        return new APIResponse(false, 400, "Friend not found.");
    }

    user.invitations = user.invitations.filter(
        (invitationId: any) => invitationId.toString() !== id
    );
    friend.invitations = friend.invitations.filter(
        (invitationId: any) => invitationId.toString() !== id
    );

    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await pusher.trigger(`friend-added-${user._id}`, "friend-added", {
        _id: friend._id,
        name: friend.name,
        email: friend.email,
        image: friend.image,
    });

    await Invitation.findByIdAndDelete(id);

    await user.save();
    await friend.save();

    return new APIResponse(true, 200, "Invitation accepted successfully.");
});
