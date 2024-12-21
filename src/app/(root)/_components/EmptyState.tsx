import Image from "next/image";

export default function EmptyState() {
    return (
        <div className="home_page">
            <div>
                <Image src="/logo.svg" alt="" width={300} height={300} />
                <h1>ChatterUp</h1>
                <p>
                    ChatterUp: Where real-time connections thrive, effortlessly.
                </p>
            </div>
        </div>
    );
}
