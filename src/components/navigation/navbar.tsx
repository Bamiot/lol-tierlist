'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/shadcn/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDictionary } from '@/localization'
import { ThemeToggle } from '../ui/themeToggle'
import { LangSelect } from '../ui/langSelect'
import { getPathnameWithoutLocale, getLocale } from '@/lib/localPath'

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

const NavLink = (props: NavLinkProps) => {
  const pathNameWithoutLocale = getPathnameWithoutLocale(usePathname())
  const locale = getLocale(usePathname())
  return (
    <Link href={`/${locale}${props.href}`} passHref>
      <NavigationMenuLink
        asChild={true}
        className={cn(
          '!text-lg',
          pathNameWithoutLocale === props.href && '!font-extrabold',
          'mx-2'
        )}
      >
        <p>{props.children}</p>
      </NavigationMenuLink>
    </Link>
  )
}

export function Navbar() {
  const { home } = useDictionary()

  return (
    <nav
      className={cn(
        'bg-primary-foreground',
        'flex justify-between',
        'border rounded m-4 p-3'
      )}
    >
      <span />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink href='/'>{home}</NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink href='/page2'>Page 2</NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className={cn('childs:mx-1')}>
        <ThemeToggle />
        <LangSelect />
      </div>
    </nav>
  )
}
