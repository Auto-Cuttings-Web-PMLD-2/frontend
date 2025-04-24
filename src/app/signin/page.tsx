import Image from "next/image";
import SigninForm from "@/components/signin-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Signin() {
    return (
        <div className="flex items-center h-screen">
            <div className="px-20 w-full">
                <p className="font-bold text-5xl text-stone-600">Welcome !</p>
                <p className="font-medium text-4xl text-stone-600 mt-5">
                    Log In to accsess your account
                </p>
                <SigninForm />
                <div className="mt-10 flex justify-between items-center font-normal text-xl text-stone-600">
                    <div className="flex items-center space-x-3">
                        <Switch id="remember-me" className="w-18 h-8" />
                        <Label
                            htmlFor="remember-me"
                            className="font-normal text-xl text-stone-600"
                        >
                            Remember Me
                        </Label>
                    </div>
                    <p className="text-center">
                        Don’t have account?
                        <span className="text-[#4D96FF]"> Sign Up</span>
                    </p>
                </div>
            </div>
            <Image
                className="h-full w-fit object-cover"
                src="/wallpaper_signin.svg"
                alt="Wallpaper Login"
                width={1000}
                height={1200}
            />
        </div>
    );
}
