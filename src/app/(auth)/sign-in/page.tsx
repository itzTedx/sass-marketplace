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
import { useRouter, useSearchParams } from 'next/navigation'
import { ZodError } from 'zod'

const SignInPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  //Checking if user is a seller
  const isSeller = searchParams.get('as') === 'seller'
  const origin = searchParams.get('origin')

  const asSeller = () => {
    router.push('?as=seller')
  }
  const asBuyer = () => {
    router.replace('/sign-in', undefined)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success('Signed in successfully')
      router.refresh()

      if (origin) {
        router.push(`/${origin}`)
        return
      }
      if (isSeller) {
        router.push('/sell')
        return
      }

      router.push('/')
      router.refresh()
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password')
      }
    },
  })

  const onSubmit = ({ email, password }: TAuthCredentialValidator) => {
    signIn({ email, password })
  }

  const [showPass, setShowPass] = useState(false)

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller ? 'seller' : ''} account
            </h1>

            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
            >
              Don&apos;t have an account
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
                <Button>Sign in</Button>
              </div>
            </form>
            <div className="relative">
              <div aria-hidden className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button
                onClick={asBuyer}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={asSeller}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage
