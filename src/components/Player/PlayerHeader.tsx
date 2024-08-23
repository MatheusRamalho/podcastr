import Image from 'next/image'

import playingIcon from '@/assets/playing.svg'

export function PlayerHeader() {
    return (
        <header className="hidden lg:flex items-center gap-4">
            <Image className="" src={playingIcon} alt="Tocando agora" />

            <strong className="font-semibold"> Tocando agora </strong>
        </header>
    )
}
