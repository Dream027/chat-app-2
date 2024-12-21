type EmailTemplateProps = {
    otp: string;
};

export default function EmailTemplate({ otp }: EmailTemplateProps) {
    return (
        <div>
            Your OTP for ChatterUp is: <b>{otp}</b>
        </div>
    );
}
