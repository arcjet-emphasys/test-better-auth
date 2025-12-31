"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignUpTab } from "./_components/sign-up-tab"
import { SignInTab } from "./_components/sign-in-tab"
import { Separator } from "@/components/ui/separator"
import { SocialAuthButtons } from "./_components/social-auth-buttons"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

type Tab = "signin" | "signup" | "email-verification" | "forgot-password"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [selectedTab, setSelectedTab] = useState<Tab>("signin")

    useEffect(() => {
        authClient.getSession().then(session => {
            if (session.data != null) router.push("/")
        })
    }, [router])

    function openEmailVerificationTab(email: string) {
        setEmail(email)
        setSelectedTab("email-verification")
    }

    return (
        <Tabs
            value={selectedTab}
            onValueChange={t => setSelectedTab(t as Tab)}
            className="max-auto w-full my-6 px-4"
        >
            {(selectedTab === "signin" || selectedTab === "signup") && (
                <TabsList>
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
            )}
            <TabsContent value="signin">
                <Card>
                    <CardHeader className="text-2xl font-bold">
                        <CardTitle>Sign In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SignInTab />
                    </CardContent>

                    <Separator />

                    <CardFooter className="grid grid-cols-2 gap-3">
                        <SocialAuthButtons />
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="signup">
                <Card>
                    <CardHeader className="text-2xl font-bold">
                        <CardTitle>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SignUpTab />
                    </CardContent>

                    <Separator />

                    <CardFooter className="grid grid-cols-2 gap-3">
                        <SocialAuthButtons />
                    </CardFooter>
                </Card>
            </TabsContent>

        </Tabs>
    )
}
