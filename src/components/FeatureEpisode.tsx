/* eslint-disable camelcase */

import Image from 'next/image'
import Link from 'next/link'

import { PlayButton } from './PlayButton'

interface FeatureEpsiodeProps {
    id: string
    title: string
    members: string
    thumbnail: string
    durationAsString: string
    published_at: string
    onClick: () => void
}

export function FeatureEpsiode({
    id,
    title,
    members,
    thumbnail,
    durationAsString,
    published_at,
    onClick,
}: FeatureEpsiodeProps) {
    return (
        <li className="relative w-full lg:flex-1 p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center gap-4 flex-col lg:flex-row">
            <div className="size-24 rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <Image
                    className="size-24 rounded-2xl object-cover"
                    width={192}
                    height={192}
                    src={thumbnail}
                    alt={title}
                />
            </div>

            <div className="flex-1 ml-4 text-center">
                <Link
                    className="block font-semibold decoration-0 leading-6 text-zinc-700 dark:text-zinc-300 hover:underline"
                    href={`/episodes/${id}`}
                >
                    {title}
                </Link>

                <p className="text-sm mt-2 lg:truncate lg:max-w-[70%] text-zinc-400 dark:text-zinc-600">
                    {members}
                </p>

                <span className="inline-block mt-2 text-sm text-zinc-400 dark:text-zinc-600">
                    {published_at}
                </span>

                <span className="text-zinc-400 dark:text-zinc-600 inline-block mt-2 text-sm relative ml-2 pl-2 before:content-[''] before:absolute before:top-1/2 before:left-0 before:size-1 before:rounded-sm before:bg-zinc-400 before:dark:bg-zinc-400 before:-translate-x-1/2 before:-translate-y-1/2">
                    {durationAsString}
                </span>
            </div>

            <PlayButton
                onClick={onClick}
                className="absolute top-8 left-8 lg:left-auto lg:top-auto lg:bottom-8 lg:right-8"
            />
        </li>
    )
}
