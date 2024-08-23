import { ButtonHTMLAttributes } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import PlayIconGreen from '@/assets/play-green.svg'

interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function PlayButton({ className, ...rest }: PlayButtonProps) {
    return (
        <button
            className={twMerge(
                'cursor-pointer size-10 border border-zinc-200 dark:border-zinc-600 rounded-lg bg-zinc-100 dark:bg-zinc-700 transition-all flex items-center justify-center hover:brightness-95 hover:bg-primary-300 hover:border-primary-300',
                className,
            )}
            type="button"
            {...rest}
        >
            <Image
                className="size-6"
                width={24}
                height={24}
                src={PlayIconGreen}
                alt="Tocar episódio"
            />
        </button>
    )
}
