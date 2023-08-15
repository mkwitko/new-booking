import { ReactNode } from 'react';
import type { Metadata } from 'next';

import '@/config';
import Header from '@/components/coreComponents/Header';

export const metadata: Metadata = {
  title: 'B2B - Login',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header showRouteIcons={false} />

      <div
        className="min-h-[calc(100vh-70px)] py-8 bg-buildings-dark bg-no-repeat bg-cover 
      flex flex-col justify-center"
      >
        {children}
      </div>
    </>
  );
}
