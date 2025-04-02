"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    EyeIcon,
    EyeOffIcon,
} from "lucide-react";
import { OTPInput } from "input-otp";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FakeDash, Slot } from "@/components/atom/otp-input";
import { Alert } from "@/components/ui/alert";
import { useFlowManager } from "@/providers/flow-manager-provider";

const emailSchema = z.object({
    email: z.string().email("Invalid email address"),
});

const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
});

const passwordSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type EmailFormValues = z.infer<typeof emailSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export function ForgotPasswordModalComponent() {
    const { forgotPassword, verifyOTP, resetPassword } = useFlowManager();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<"email" | "otp" | "password" | "success">(
        "email"
    );
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");

    const emailForm = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    });

    const otpForm = useForm<OTPFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (step === "otp") {
            otpForm.reset({ otp: "" });
        }
    }, [step]);

    const handleEmailSubmit = async (data: EmailFormValues) => {
        setError("");
        setIsLoading(true);
        try {
            await forgotPassword(data.email);
            setEmail(data.email);
            setStep("otp");
            // Initialize OTP form with an empty string
            otpForm.reset({ otp: "" });
        } catch (error: any) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (data: OTPFormValues) => {
        setError("");
        setIsLoading(true);
        try {
            await verifyOTP(email, data.otp);
            setStep("password");
        } catch (error: any) {
            console.error("OTP verification error:", error);
            setError(error.message || "Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (data: PasswordFormValues) => {
        setError("");
        setIsLoading(true);
        try {
            await resetPassword(email, data.password);
            setStep("success");
        } catch (error: any) {
            setError(
                error.message || "An unexpected error occurred. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setStep("email");
        emailForm.reset();
        otpForm.reset();
        setError("");
        setIsLoading(false);
        setEmail("");
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    handleClose();
                }
            }}
        >
            <DialogTrigger asChild>
                <Button variant="link" className="text-sm">
                    Forgot Password?
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Forgot Password</DialogTitle>
                    <DialogDescription>
                        {step === "email" && "Enter your email address to receive an OTP."}
                        {step === "otp" && "Enter the OTP sent to your email."}
                        {step === "password" && "Enter your new password."}
                        {step === "success" && "Password reset successfully!"}
                    </DialogDescription>
                </DialogHeader>
                {step === "email" && (
                    <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
                            <FormField
                                control={emailForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && (
                                <Alert variant="destructive" title="Error" className="mt-2">
                                    {error}
                                </Alert>
                            )}
                            <DialogFooter className="mt-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
                {step === "otp" && (
                    <Form {...otpForm}>
                        <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)}>
                            <FormField
                                control={otpForm.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>OTP</FormLabel>
                                        <FormControl>
                                            <OTPInput
                                                maxLength={6}
                                                value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    // Only submit when the OTP is complete
                                                    if (value.length === 6) {
                                                        otpForm.handleSubmit(handleOtpSubmit)();
                                                    }
                                                }}
                                                containerClassName="group flex items-center has-[:disabled]:opacity-30"
                                                render={({ slots }) => (
                                                    <>
                                                        <div className="flex">
                                                            {slots.slice(0, 3).map((slot, idx) => (
                                                                <Slot key={idx} {...slot} />
                                                            ))}
                                                        </div>
                                                        <FakeDash />
                                                        <div className="flex">
                                                            {slots.slice(3).map((slot, idx) => (
                                                                <Slot key={idx} {...slot} />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && (
                                <Alert variant="destructive" title="Error" className="mt-2">
                                    {error}
                                </Alert>
                            )}
                            <DialogFooter className="mt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading || otpForm.watch("otp").length !== 6}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        "Verify OTP"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
                {step === "password" && (
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
                            <FormField
                                control={passwordForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter new password"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    aria-label={
                                                        showPassword ? "Hide password" : "Show password"
                                                    }
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? (
                                                        <EyeOffIcon className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <EyeIcon className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm new password"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() =>
                                                        setShowConfirmPassword(!showConfirmPassword)
                                                    }
                                                    aria-label={
                                                        showConfirmPassword
                                                            ? "Hide password"
                                                            : "Show password"
                                                    }
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    tabIndex={-1}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOffIcon className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <EyeIcon className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && (
                                <Alert variant="destructive" title="Error" className="mt-2">
                                    {error}
                                </Alert>
                            )}
                            <DialogFooter className="mt-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
                {step === "success" && (
                    <div className="py-6">
                        <div className="flex items-center gap-2 text-green-600 mb-4">
                            <CheckCircle2 size={16} />
                            <span className="font-semibold">
                                Password reset successfully!
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Your password has been successfully reset. You can now log in
                            using your new password.
                        </p>
                        <DialogFooter className="mt-4">
                            <Button onClick={handleClose} variant="default">
                                Close
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}