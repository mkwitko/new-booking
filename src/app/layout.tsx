import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Booking app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.className} tracking-[0.00938em] bg-[#f5f7fa]`}>
        <div className="w-full text-textPrimary">{children}</div>
      </body>
    </html>
  );
}
