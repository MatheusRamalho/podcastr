import { ReactNode } from 'react'

interface PlayerRootProps {
    children: ReactNode
}

export function PlayerRoot({ children }: PlayerRootProps) {
    return (
        <aside className="w-[26.5rem] h-screen py-12 px-16 bg-primary-500 text-white flex flex-col items-center justify-between">
            {children}
        </aside>
    )
}
