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
        <div className="w-full h-80 text-center">
            <Image
                className="size-[inherit] rounded-3xl object-cover"
                width={592}
                height={592}
                src={thumbnail}
                alt={title}
            />

            <strong className="block mt-8 font-semibold text-xl leading-7">
                {title}
            </strong>

            <span className="block mt-4 opacity-60 leading-6">{members}</span>
        </div>
    )
}
