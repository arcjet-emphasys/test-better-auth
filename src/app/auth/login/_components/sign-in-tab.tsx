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


const signInSchema = z.object({
    email: z.email().min(1),
    password: z.string().min(10)
})

type SignInForm = z.infer<typeof signInSchema>;
const SignInTab = () => {

    const router = useRouter();
    const form = useForm<SignInForm>(
        {
            resolver: zodResolver(signInSchema),
            defaultValues: {
                email: "",
                password: ""
            },
        }
    )

    const handleSignIn = async (data: SignInForm) => {
        const res = await authClient.signIn.email({...data, callbackURL: "/"}, {
            onError : async (error) => {
                toast.error(error.error ? error.error.message ? error.error.message :error.error.statusText: `Something went wrong...`)
                //toast.error(`Something went wrong...`)
            },
            onSuccess : () => {
                router.push("/")
            }
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
            <FormField name="password" control={form.control} render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input type="password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <Button type="submit" disabled={isSubmitting}>
                Sign In
            </Button>
        </form>
    </Form>
}
export default SignInTab
