"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    email: z.string().email("Invalid email.").toLowerCase(),
});

export default function ForgotPasswordForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
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
                <div className="flex justify-end gap-5">
                    <Button
                        type="submit"
                        className="basis-1/3 mt-11 py-7 text-2xl font-medium bg-[#EB5353] text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={() => console.log("click")}
                        className="basis-1/3 mt-11 py-7 text-2xl font-medium bg-[#4D96FF] text-white"
                    >
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
}
