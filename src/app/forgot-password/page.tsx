import ForgotPasswordForm from "@/components/forgot-password-form";

export default function ForgotPassword() {
    return (
        <div className="bg-white h-screen text-[#555555] flex items-center justify-center">
            <div className="">
                <p className="text-5xl font-bold text-center">
                    Forgot password ?
                </p>
                <p className="text-[40px] font-medium text-center mt-3">
                    First, verify your email
                </p>
                <ForgotPasswordForm />
            </div>
        </div>
    );
}
