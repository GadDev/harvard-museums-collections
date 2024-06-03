'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button, ButtonProps } from '@/components/ui/button'

export interface NavButtonProps extends ButtonProps {
  children?: React.ReactNode
  href: string
}

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ children, href, ...props }, ref) => {
    const router = useRouter()

    return (
      <Button onClick={() => router.push(href)} ref={ref} {...props}>
        {children}
      </Button>
    )
  },
)

NavButton.displayName = 'Button'

export { NavButton }
