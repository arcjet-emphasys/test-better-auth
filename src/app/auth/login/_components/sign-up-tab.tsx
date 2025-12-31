'use client'
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


const signUpSchema = z.object({
    name: z.string().min(1),
    email: z.email().min(1),
    password: z.string().min(10)
})

type SignUpForm = z.infer<typeof signUpSchema>;

export const SignUpTab = () => {

    const router = useRouter();
    const form = useForm<SignUpForm>(
        {
            resolver: zodResolver(signUpSchema),
            defaultValues: {
                name: "",
                email: "",
                password: ""
            },
        }
    )

    const {isSubmitting} = form.formState;

    const handleSignUp = async (data: SignUpForm) => {
        const res = await authClient.signUp.email({...data, callbackURL: "/"}, {
            onError : (error) => {toast.error(error.error ? error.error.message: `Something went wrong...`)},
            onSuccess : () => {
                router.push("/")
            }
        });
    }
    return <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUp)}>
            <FormField name="name" control={form.control} render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder='Please enter your name' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
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
                Sign Up
            </Button>
        </form>
    </Form>
}
export default SignUpTab
