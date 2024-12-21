import OtpVerification from "../_components/OtpVerification";

export default function OtpVerifyPage({searchParams}: any) {
    return <OtpVerification email={searchParams.email} />;
}
