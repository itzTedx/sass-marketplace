import Link from 'next/link'
import { Icons } from './Icons'
import MaxWidthWrapper from './MaxWidthWrapper'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'

const Navbar = () => {
  const user = false

  return (
    <div className="bg-white/60 backdrop-blur-lg sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative">
        <MaxWidthWrapper>
          <div className="border-b">
            <div className="flex h-16 items-center">
              {/* TODO: Mobile Navbar */}
              <div className="ml-4 flex lg:ml-0">
                <Icons.logo className="w-10 h-10" />
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      Sign In
                    </Link>
                  )}
                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? null : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      Create Account
                    </Link>
                  )}
                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}
                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar
