"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
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

const formSchema = z
    .object({
        password: z.string().min(5, {
            message: "Password must be at least 5 characters.",
        }),
        confirm_password: z.string().min(5, {
            message: "Confirm password must be at least 5 characters.",
        }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });

export default function ResetPasswordForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    });

    const params = useParams(); // dapatkan token dari URL
    const router = useRouter();
    const token = params.token as string;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch(
                `http://localhost:5000/reset-password/${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ new_password: values.password }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Gagal reset password.");
            } else {
                alert("Password berhasil diubah!");
                router.push("/signin");
            }
        } catch (error) {
            alert("Terjadi kesalahan server. Message: " + error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-15">
                {/* Password field */}
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
                                        className="text-xl font-normal pr-10 w-[700px]"
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
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password field */}
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem className="mt-6">
                            <FormLabel className="font-medium text-2xl text-stone-600">
                                Confirm Password
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="Input confirm password"
                                        {...field}
                                        className="text-xl font-normal pr-10 w-[700px]"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {showConfirmPassword ? (
                                            <Eye />
                                        ) : (
                                            <EyeOff />
                                        )}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit button */}
                <div className="flex justify-end gap-5">
                    <Button
                        type="button"
                        className="basis-1/3 mt-11 py-7 text-2xl font-medium bg-[var(--merah-satu)] text-white"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="basis-1/3 mt-11 py-7 text-2xl font-medium bg-[var(--biru-dua)] text-white"
                    >
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
}
