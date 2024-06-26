import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { locales, DictionaryProvider } from '@/localization'
import { getDictionary } from '@/localization/dictionaries'
import { UIProviders } from '@/components/providers/ui.provider'
import { Navbar } from '@/components/navigation/navbar'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return Object.keys(locales).map((lang) => ({ lang }))
}

type RootLayoutProps = {
  children: ReactNode
  params: { lang: string }
}

export async function generateMetadata(props: RootLayoutProps) {
  const dictionary = await getDictionary(props.params.lang)

  return {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: dictionary.metaDescription,
  } as Metadata
}

export default async function RootLayout(props: RootLayoutProps) {
  const dictionary = await getDictionary(props.params.lang)

  return (
    <html lang={props.params.lang} suppressHydrationWarning>
      <body className={cn(inter.className, 'p-0 m-0')}>
        <DictionaryProvider dictionary={dictionary}>
          <UIProviders>
            <Navbar />
            {props.children}
          </UIProviders>
        </DictionaryProvider>
      </body>
    </html>
  )
}
