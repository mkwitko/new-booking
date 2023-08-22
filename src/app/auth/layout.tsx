import { ReactNode } from 'react'
import type { Metadata } from 'next'

import '@/config'
import Header from '@/components/coreComponents/Header'

export const metadata: Metadata = {
  title: 'B2B - Login',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header showRouteIcons={false} />

      <div
        className="flex min-h-[calc(100vh-70px)] flex-col justify-center bg-buildings-dark 
      bg-cover bg-no-repeat py-8"
      >
        {children}
      </div>
    </>
  )
}
