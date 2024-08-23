import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

import '@/styles/globals.css'
import ReactQueryClientProviders from '@/libs/react-query-client-provider'
import { PlayerContextProvider } from '@/contexts/PlayerContext'
import { Header } from '@/components/Header'
import { PlayerElement } from '@/components/PlayerElement'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Podcastr',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={twMerge(
                    'w-full h-screen scroll-smooth overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-medium text-base text-zinc-700 dark:text-zinc-500',
                    inter.className,
                )}
            >
                <ReactQueryClientProviders>
                    <PlayerContextProvider>
                        <div className="flex overflow-hidden flex-col lg:flex-row">
                            <main className="flex-1">
                                <Header />

                                <div className="h-[calc(100vh-6.5rem-6rem)] lg:h-[calc(100vh-6.5rem)] overflow-y-scroll px-4 lg:px-16 pb-16">
                                    {children}
                                </div>
                            </main>

                            <PlayerElement />
                        </div>
                    </PlayerContextProvider>
                </ReactQueryClientProviders>
            </body>
        </html>
    )
}
