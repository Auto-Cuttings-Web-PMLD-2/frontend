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

const formSchema = z
    .object({
        email: z.string().email("Invalid email.").toLowerCase(),
        username: z
            .string()
            .min(2, {
                message: "Username must be at least 2 characters.",
            })
            .max(30, {
                message: "Username must be less than 30 characters.",
            }),
        password: z.string().min(5, {
            message: "Password must be at least 5 characters.",
        }),
        confirm_password: z.string().min(2, {
            message: "Password must be at least 6 characters.",
        }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"], // menaruh error di field confirm_password
    });

export default function SignupForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirm_password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-15">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium text-2xl text-stone-600">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Input email"
                                    {...field}
                                    className="text-xl font-normal"
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="mt-6">
                            <FormLabel className="font-medium text-2xl text-stone-600">
                                Username
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
                                        className="text-xl font-normal pr-10"
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
                <Button
                    type="submit"
                    className="w-full mt-11 py-6 text-2xl font-medium bg-[#4D96FF] text-white"
                >
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}
