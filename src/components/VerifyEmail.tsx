'use client'

import { trpc } from '@/trpc/client'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  })

  //Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3>There was a problem verifying</h3>
        <p className="text-[12px] text-muted-foreground">
          This token is not valid or might be expired. Please try again
        </p>
      </div>
    )
  }

  //Success State
  if (data?.success) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" fill alt="the email was sent" />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set</h3>
        <p className="text-muted-foreground text-center mt-1">
          Thank you for verifying your email
        </p>
        <Link href="/sign-in" className={buttonVariants({ className: 'mt-4' })}>
          Sign in
        </Link>
      </div>
    )
  }

  //Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
        <h3>Verifying...</h3>
        <p className="text-sm text-muted-foreground">
          This won&apos;t take long.
        </p>
      </div>
    )
  }
}

export default VerifyEmail
