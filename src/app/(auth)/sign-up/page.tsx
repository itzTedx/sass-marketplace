'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  AuthCredentialsValidator,
  TAuthCredentialValidator,
} from '@/lib/validators/account-credentials-validators'
import { trpc } from '@/trpc/client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ZodError } from 'zod'

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const router = useRouter()

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Sign in instead?.', {
          action: {
            label: 'Sign In',
            onClick: () => router.push('/sign-in'),
          },
        })
        return
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message)
        return
      }

      toast.error('Something went wrong. Please try again.')
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(
        <p>
          Verification link sent to{' '}
          <span className="font-semibold">{sentToEmail}</span>
        </p>
      )
      router.push('/verify-email?to=' + sentToEmail)
    },
  })

  const onSubmit = ({ email, password }: TAuthCredentialValidator) => {
    mutate({ email, password })
  }

  const [showPass, setShowPass] = useState(false)

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>

            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
            >
              Already have an account? Sign-in{' '}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-2 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    placeholder="you@email.com"
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2 py-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      {...register('password')}
                      placeholder="Password"
                      type={showPass ? 'text' : 'password'}
                      className={cn({
                        'focus-visible:ring-red-500': errors.password,
                      })}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                    {/* <Button
                      variant="link"
                      size="sm"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute top-0 right-0"
                    >
                      {showPass ? (
                        <Eye className="text-blue-500 w-5 h-5" />
                      ) : (
                        <EyeOff className="text-gray-400 w-5 h-5" />
                      )}
                    </Button> */}
                  </div>
                </div>
                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
