'use client'

import Image from 'next/image'
import { Button } from '@/components/shadcn/button'
import { ThemeToggle } from '@/components/ui/themeToggle'
import { cn } from '@/lib/utils'
import { useDictionary } from '@/localization'

export default function Home() {
  return <main className={cn('flex flex-col items-center childs:m-2 mt-16')}></main>
}
