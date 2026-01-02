"use client"
import React, {useEffect, useRef, useState} from 'react'
import {BetterAuthActionButton} from "@/components/auth/better-auth-action-button";
import {authClient} from "@/lib/auth-client";

const EmailVerification = ({email, initialTime = 30}: {email: string, initialTime?: number}) => {
    const [timeToNextResend, setTimeToNextResend] = useState(initialTime)
    const interval = useRef<NodeJS.Timeout>(undefined)

    function startEmailVerificationCountdown(time = 30) {
        setTimeToNextResend(time)

        clearInterval(interval.current)
        interval.current = setInterval(() => {
            setTimeToNextResend(t => {
                const newT = t - 1

                if (newT <= 0) {
                    clearInterval(interval.current)
                    return 0
                }
                return newT
            })
        }, 1000)
    }


    useEffect(() => {
        const setTime = async () => startEmailVerificationCountdown();
        setTime().then(result => console.log(result)).catch(error => console.log(error));
    }, [])


    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground mt-2">
                We sent you a verification link. Please check your email and click the
                link to verify your account.
            </p>

            <BetterAuthActionButton
                variant="outline"
                className="w-full"
                successMessage="Verification email sent!"
                disabled={timeToNextResend > 0}
                action={() => {
                    startEmailVerificationCountdown()
                    return authClient.sendVerificationEmail({
                        email,
                        callbackURL: "/",
                    })
                }}
            >
                {timeToNextResend > 0
                    ? `Resend Email (${timeToNextResend})`
                    : "Resend Email"}
            </BetterAuthActionButton>
        </div>
    )
}
export default EmailVerification
