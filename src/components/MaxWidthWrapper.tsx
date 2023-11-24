import { cn } from '@/lib/utils'

interface MaxWidthProps {
  className?: string
  children: React.ReactNode
}

const MaxWidthWrapper = ({ className, children }: MaxWidthProps) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-2-screen-xl px-2.5 md:px-20',
        className
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper
