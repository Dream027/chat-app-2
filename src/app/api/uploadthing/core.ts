import { authoptions } from "@/utils/nextauth";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });
export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
        .middleware(async ({ req }) => {
            // const user = await auth(req);
            const session = await getServerSession(authoptions);

            if (!session?.user) throw new UploadThingError("Unauthorized");

            return { user: session.user };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.user.email);

            console.log("file url", file.url);

            return { uploadedBy: metadata.user.email };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
