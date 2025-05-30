import ResetPasswordForm from "@/components/reset-password-form";

export default function ResetPassword() {
    return (
        <div className="bg-white h-screen flex items-center justify-center">
            <div className="">
                <p className="text-5xl text-[var(--biru-tiga)] font-bold text-center">
                    New password
                </p>
                <p className="text-[40px] text-[var(--biru-dua)] font-medium text-center mt-3">
                    Input your new password
                </p>
                <ResetPasswordForm />
            </div>
        </div>
    );
}
