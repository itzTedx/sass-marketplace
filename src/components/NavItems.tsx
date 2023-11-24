'use client'

import { useEffect, useRef, useState } from 'react'

import { PRODUCT_CATEGORIES } from '@/config'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const NavItems = () => {
  const [active, setActive] = useState<null | number>(null)

  const isAnyOpen = active !== null

  const navRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(navRef, () => setActive(null))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActive(null)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (active === i) {
            setActive(null)
          } else {
            setActive(i)
          }
        }

        const isOpen = i === active
        return (
          <NavItem
            key={category.value}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
    </div>
  )
}

export default NavItems
