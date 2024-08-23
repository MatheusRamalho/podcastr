import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import logoIcon from '@/assets/logo.svg'

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    })

    return (
        <header className="h-24 px-16 border-b border-b-zinc-200 dark:border-b-zinc-700 bg-zinc-100 dark:bg-zinc-900 flex item-center">
            <div className="flex items-center justify-center pr-8">
                <Image
                    className="size-32"
                    width={128}
                    height={128}
                    src={logoIcon}
                    alt="Podcastr"
                />
            </div>

            <div className="w-full border-l border-l-zinc-200 dark:border-l-zinc-700 flex items-center justify-between">
                <p className="hidden sm:block text-sm pl-8">
                    O melhor para você ouvir, sempre
                </p>

                <span className="text-sm ml-auto capitalize">
                    {currentDate}
                </span>
            </div>
        </header>
    )
}
