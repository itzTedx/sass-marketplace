import Navbar from '@/components/Navbar'
import { TailwindIndicator } from '@/components/TailwindIndicator'
import Providers from '@/components/providers'
import { cn, constructMetadata } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn('relative h-full font-sans antialiased', inter.className)}
      >
        <Providers>
          <Navbar />
          <TailwindIndicator />
          <main className="relative flex flex-col min-h-screen">
            <div className="flex-grow flex-1">{children}</div>
          </main>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}
