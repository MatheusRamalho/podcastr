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
            className={twMerge('self-stretch', isNotEpisode && 'opacity-50')}
        >
            {children}
        </footer>
    )
}
