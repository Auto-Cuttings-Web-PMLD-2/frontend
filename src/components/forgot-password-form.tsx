// ForgotPasswordForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
    email: z.string().email("Email tidak valid.").toLowerCase(),
});

export default function ForgotPasswordForm() {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await fetch("http://127.0.0.1:5000/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: values.email }),
            });

            const result = await res.json();

            if (res.ok) {
                setMessage(result.message);
                setError(null);
            } else {
                setError(result.message || "Terjadi kesalahan");
                setMessage(null);
            }
        } catch (err) {
            setError("Gagal terhubung ke server. Message: " + err);
            setMessage(null);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
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
                                    className="text-xl font-normal w-[700px]"
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {message && (
                    <p className="mt-4 text-green-600 text-xl">{message}</p>
                )}
                {error && <p className="mt-4 text-red-600 text-xl">{error}</p>}

                <div className="flex justify-end gap-5">
                    <Button
                        type="button"
                        className="basis-1/3 mt-11 py-7 text-2xl font-medium bg-[var(--merah-satu)] text-white"
                        onClick={() => history.back()}
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
