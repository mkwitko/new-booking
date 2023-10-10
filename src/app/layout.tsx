
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import './../config/awsConfig';

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { AuthCheck } from '@/components/coreComponents/AuthProtection';



const nunito = Nunito({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'Booking',
    description: 'Booking app',
}

function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <body
                className={`${nunito.className} bg-[#f5f7fa] tracking-[0.00938em] antialiased`}
            >
                <div className="w-full text-textPrimary">
                    <AuthCheck>
                        {children}
                    </AuthCheck>
                </div>

                <ToastContainer />
            </body>
        </html>
    )
}

export default RootLayout
