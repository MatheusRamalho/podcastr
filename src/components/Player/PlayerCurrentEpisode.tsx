import Image from 'next/image'

interface PlayerCurrentEpisodeProps {
    title: string
    members: string
    thumbnail: string
}

export function PlayerCurrentEpisode({
    thumbnail,
    title,
    members,
}: PlayerCurrentEpisodeProps) {
    return (
        <div className="size-16 lg:w-full lg:h-96 text-center flex flex-col items-center justify-center gap-2">
            <div className="w-16 h-16 lg:w-72 lg:h-96">
                <Image
                    className="size-full rounded-md lg:rounded-3xl object-cover"
                    width={320}
                    height={384}
                    src={thumbnail}
                    alt={title}
                />
            </div>

            <strong className="hidden lg:block font-semibold text-base leading-7">
                {title}
            </strong>

            <span className="hidden lg:block opacity-60 leading-6 text-xs">
                {members}
            </span>
        </div>
    )
}
