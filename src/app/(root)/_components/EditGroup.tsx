"use client";

import Alert from "@/components/styles/Alert";
import { Camera, PenBox } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

type EditGroupProps = {
    group: Group;
};

export default function EditGroup({ group }: EditGroupProps) {
    const [showChangeProfilePicDialog, setShowChangeProfilePicDialog] =
        useState(false);
    const [desc, setDesc] = useState(group.description);
    const [name, setName] = useState(group.name);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const updatePicture = useCallback(async () => {}, [file, group, router]);

    const updateGroup = useCallback(async () => {}, [
        desc,
        name,
        group,
        router,
    ]);

    return (
        <>
            <div>
                <div className="align-center">
                    <button
                        className="btn-secondary"
                        onClick={() => setShowChangeProfilePicDialog(true)}
                    >
                        <Camera />
                        Change Group Picture
                    </button>
                    <button onClick={updateGroup}>Save</button>
                </div>
                <div style={{ marginTop: "4rem", maxWidth: "600px" }}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Description</label>
                        <input
                            type="email"
                            id="email"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <>
                <Alert active={showChangeProfilePicDialog}>
                    <h1 style={{ marginBottom: "2rem" }}>
                        Change Profile Picture
                    </h1>
                    <div>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    if (!e.target.files?.length) return;
                                    setFile(e.target.files[0]);
                                }}
                            />
                            <div>
                                <div
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >
                                    {file ? (
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt=""
                                            width={50}
                                            height={50}
                                            style={{ borderRadius: "0" }}
                                        />
                                    ) : (
                                        "Chose an image to upload"
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className="align-center"
                            style={{ marginTop: "2rem" }}
                        >
                            <button
                                className="btn-secondary"
                                onClick={() =>
                                    setShowChangeProfilePicDialog(false)
                                }
                            >
                                Cancel
                            </button>
                            <button onClick={updatePicture}>Save</button>
                        </div>
                    </div>
                </Alert>
            </>
        </>
    );
}
