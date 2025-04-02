"use client";
import React from "react";
import { useFlowManager } from "@/providers/flow-manager-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/atom/buttom";
import { ForgotPasswordModalComponent } from "./dialog-forgot-password";

const signinFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(1, { message: "Password required." }),
});

type SignInFormValues = z.infer<typeof signinFormSchema>;

export default function SignInClient() {
    const { login } = useFlowManager();
    const [loading, setLoading] = React.useState(false);
    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    async function onSubmit(values: SignInFormValues) {
        setLoading(true);
        const res = await login(values.email, values.password);
        if (res == false) setLoading(false);
    }

    return (
        <Form {...form}>
            <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-1">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        className="bg-background"
                                        {...field}
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
                            <FormItem className="w-full space-y-1">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        className="bg-background"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end">
                    <ForgotPasswordModalComponent />
                </div>
                <Button
                    loading={loading}
                    type="submit"
                    className="h-10 space-x-2 rounded border-none transition"
                    color="blue5"
                >
                    Sign In with Email
                </Button>
            </form>
        </Form>
    );
}