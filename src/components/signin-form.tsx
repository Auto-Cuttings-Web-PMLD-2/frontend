"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInUser } from "@/lib/auth";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email("Invalid email.").toLowerCase(),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
    }),
});

export default function SigninForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a signin submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const result = await signInUser(values);
            console.log("Login berhasil", result);

            // Redirect ke dashboard
            if (typeof window !== "undefined") {
                window.location.href = "/dashboard";
            }
        } catch (error: any) {
            alert("Login gagal: " + error.message);
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-15">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mt-5">
                            <FormLabel className="font-medium text-2xl text-stone-600">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Input username"
                                    {...field}
                                    className="text-xl font-normal"
                                    type="text"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mt-6">
                            <FormLabel className="font-medium text-2xl text-stone-600">
                                Password
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="Input password"
                                        {...field}
                                        className="text-xl font-normal pr-10"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        tabIndex={-1} // biar ga tab focus ke tombol
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <p className="font-medium text-base text-stone-600 mt-2">
                    Forgot password?
                    <span className="text-[var(--biru-dua)]">
                        <Link href="/forgot-password"> Click here</Link>
                    </span>
                </p>
                <Button
                    type="submit"
                    className="w-full mt-11 py-7 text-2xl font-medium bg-[var(--biru-dua)] text-white"
                >
                    Sign In
                </Button>
            </form>
        </Form>
    );
}
