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

const formSchema = z.object({
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
});

export default function SigninForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-15">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="mt-5">
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

                <p className="font-medium text-base text-stone-600 mt-2">
                    Forgot password?
                    <span className="text-[#4D96FF]"> Click here</span>
                </p>
                <Button
                    type="submit"
                    className="w-full mt-11 py-7 text-2xl font-medium bg-[#4D96FF] text-white"
                >
                    Sign In
                </Button>
            </form>
        </Form>
    );
}
