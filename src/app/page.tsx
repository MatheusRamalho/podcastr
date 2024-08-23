'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { getEpisodes } from '@/api/get-episodes'
import { usePlayer } from '@/hooks/usePlayer'
import { EpisodeType } from '@/types/Episode'
import { PlayButton } from '@/components/PlayButton'
import { FeatureEpsiode } from '@/components/FeatureEpisode'
import { Loading } from '@/components/Loading'

export default function Home() {
    const { playList } = usePlayer()

    const {
        data: episodes,
        isLoading,
        isError,
    } = useQuery<EpisodeType[]>({
        queryKey: ['episodes'],
        queryFn: getEpisodes,
        staleTime: 60 * 60 * 8, // 24 horas
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div>Erro ao carregar episódios</div>
    }

    const latestEpisodes = episodes?.slice(0, 2) || []
    const allEpisodes = episodes?.slice(2) || []

    const episodeList = [...latestEpisodes, ...allEpisodes]

    return (
        <div className="h-[calc(100vh-6.5rem)] overflow-y-scroll px-16">
            <section id="last-releases" className="">
                <h6 hidden> Últimos lançamentos </h6>

                <h2 className="font-semibold text-gray-800 dark:text-zinc-100 text-2xl mt-12 mb-6">
                    Últimos lançamentos
                </h2>

                <ul className="list-none flex flex-row items-center flex-wrap gap-8">
                    {latestEpisodes.map((episode, index) => {
                        return (
                            <FeatureEpsiode
                                key={episode.id}
                                id={episode.id}
                                title={episode.title}
                                members={episode.members}
                                thumbnail={episode.thumbnail}
                                durationAsString={episode.durationAsString}
                                published_at={episode.published_at}
                                onClick={() => playList(episodeList, index)}
                            />
                        )
                    })}
                </ul>
            </section>

            <section id="all-epsodes">
                <h6 hidden> Todos episódios </h6>

                <h2 className="font-semibold text-gray-800 dark:text-zinc-100 text-2xl mt-12 mb-6">
                    Todos episódios
                </h2>

                <table className="w-full" cellSpacing={0}>
                    <thead>
                        <tr className="border-b border-b-zinc-200 dark:border-b-zinc-700">
                            <th className="py-3 px-4 font-medium text-sm text-zinc-600 dark:text-zinc-300 text-left"></th>

                            <th className="py-3 px-4 font-medium text-sm text-zinc-600 dark:text-zinc-300 text-left">
                                Podcast
                            </th>

                            <th className="py-3 px-4 font-medium text-sm text-zinc-600 dark:text-zinc-300 text-left">
                                Integrantes
                            </th>

                            <th className="py-3 px-4 font-medium text-sm text-zinc-600 dark:text-zinc-300 text-left">
                                Data
                            </th>

                            <th className="py-3 px-4 font-medium text-sm text-zinc-600 dark:text-zinc-300 text-left">
                                Duração
                            </th>

                            <th className="py-3 px-4 font-medium text-sm text-zinc-600 dark:text-zinc-300 text-left"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {allEpisodes.map((episode, index) => {
                            return (
                                <tr
                                    key={episode.id}
                                    className="border-b border-b-zinc-200 dark:border-b-zinc-700"
                                >
                                    <td
                                        className="py-3 px-4 text-sm"
                                        style={{ width: 72 }}
                                    >
                                        <Image
                                            className="size-10 rounded-full"
                                            width={120}
                                            height={120}
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                        />
                                    </td>

                                    <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                                        <Link
                                            className="font-semibold leading-6 hover:underline"
                                            href={`/episodes/${episode.id}`}
                                        >
                                            {episode.title}
                                        </Link>
                                    </td>

                                    <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                                        {episode.members}
                                    </td>

                                    <td
                                        className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400"
                                        style={{ width: 100 }}
                                    >
                                        {episode.published_at}
                                    </td>

                                    <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                                        {episode.durationAsString}
                                    </td>

                                    <td className="py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                                        <PlayButton
                                            onClick={() =>
                                                playList(
                                                    episodeList,
                                                    index +
                                                        latestEpisodes.length,
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}
