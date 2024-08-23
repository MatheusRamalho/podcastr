import { ReactNode } from 'react'

interface PlayerRootProps {
    children: ReactNode
}

export function PlayerRoot({ children }: PlayerRootProps) {
    return (
        <aside className="w-full h-24 overflow-hidden lg:w-[26.5rem] lg:h-screen px-8 lg:py-12 lg:px-16 bg-primary-500 text-white flex flex-row lg:flex-col items-center justify-around lg:justify-between gap-8">
            {children}
        </aside>
    )
}
