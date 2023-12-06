import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email!' })
    .email({ message: 'Please enter valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at 6 characters long.' }),
})

export type TAuthCredentialValidator = z.infer<typeof AuthCredentialsValidator>
