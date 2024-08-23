import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface PlayerFooterProps {
    isNotEpisode: boolean
    children: ReactNode
}

export function PlayerFooter({
    isNotEpisode = false,
    children,
}: PlayerFooterProps) {
    return (
        <footer
            className={twMerge(
                'w-full flex items-center justify-center flex-col lg:w-auto lg:self-stretch',
                isNotEpisode && 'opacity-50',
            )}
        >
            {children}
        </footer>
    )
}
