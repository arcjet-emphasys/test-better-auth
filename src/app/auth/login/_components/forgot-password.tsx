"use client"
import React from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";



const forgotPassword = z.object({
    email: z.email().min(1),
})

type ForgotPasswordForm = z.infer<typeof forgotPassword>;
export const ForgotPassword = ({
                                   openForgotPasswordTabAction,
                          }: {
    openForgotPasswordTabAction: () => void
}) => {

    const router = useRouter();
    const form = useForm<ForgotPasswordForm>(
        {
            resolver: zodResolver(forgotPassword),
            defaultValues: {
                email: "",
            },
        }
    )

    const handleSignIn = async (data: ForgotPasswordForm) => {
        const res = await authClient.requestPasswordReset({
            ...data,
            redirectTo: "/auth/reset-password"}, {
            onError : (error) => {toast.error(error.error.message || "Failed to send password reset email")},
            onSuccess : () => {toast.success("Password reset email sent")}
        });
    }

    const {isSubmitting} = form.formState;
    return <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
            <FormField name="email" control={form.control} render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={openForgotPasswordTabAction} >Back</Button>
                <Button type="submit" disabled={isSubmitting}>Sign In</Button>
            </div>
        </form>
    </Form>
}
export default ForgotPassword
