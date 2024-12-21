"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export default function InviteFriends() {
    const [friend, setFriend] = useState<User | null>(null);
    const [loading, setLoading] = useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const searchFriend = useCallback(async () => {}, []);

    const inviteFriend = useCallback(async (id: string) => {}, []);

    return (
        <div className="invitations_main">
            <div>
                <h1>Invite Friend</h1>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <div>
                        <input type="email" id="email" ref={inputRef} />
                        <button onClick={searchFriend}>Search</button>
                    </div>
                </div>
            </div>
            <div className="invitations_result">
                {loading === 0 ? null : loading === 1 ? (
                    <Loader className="loader" />
                ) : (
                    <>
                        <h3>Results</h3>
                        {friend ? (
                            <div>
                                <div>
                                    <Image
                                        src={friend?.image}
                                        alt=""
                                        width={60}
                                        height={60}
                                    />
                                    <div>
                                        <h3>{friend.name}</h3>
                                        <p>{friend.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => inviteFriend(friend._id)}
                                    >
                                        Invite
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>Friend not found</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
