import Image from "next/image";
import SignupForm from "@/components/signup-form";

export default function Signup() {
    return (
        <div className="flex items-center h-screen">
            <Image
                className="h-full w-fit object-cover"
                src="/wallpaper_signup.svg"
                alt="Wallpaper Login"
                width={1000}
                height={1200}
            />
            <div className="px-20 w-full">
                <p className="font-bold text-5xl text-[var(--biru-tiga)]">
                    Don’t have account ?
                </p>
                <p className="font-medium text-4xl text-[var(--biru-dua)]">
                    Let’s create your account
                </p>
                <SignupForm />
                <p className="font-normal text-xl text-stone-600 mt-8 text-center">
                    Do you have an account?
                    <span className="text-[var(--biru-dua)]"> Log In</span>
                </p>
            </div>
        </div>
    );
}
