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
import {
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    TableHeader,
    TableRoot,
} from '@/components/Table'

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
        <div className="h-[calc(100vh-6.5rem-6rem)] lg:h-[calc(100vh-6.5rem)] overflow-y-scroll px-4 lg:px-16 pb-16">
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

                <TableRoot>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20"></TableHead>
                            <TableHead className=""> Podcast </TableHead>
                            <TableHead className="w-96">Integrantes</TableHead>
                            <TableHead className="w-20"> Data </TableHead>
                            <TableHead className="w-20"> Duração </TableHead>
                            <TableHead className="w-20"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {allEpisodes.map((episode, index) => {
                            return (
                                <TableRow key={episode.id}>
                                    <TableCell>
                                        <Image
                                            className="size-10 rounded-full object-cover"
                                            width={40}
                                            height={40}
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className="font-semibold leading-6 hover:underline"
                                            href={`/episodes/${episode.id}`}
                                        >
                                            {episode.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell> {episode.members} </TableCell>
                                    <TableCell>
                                        {' '}
                                        {episode.published_at}{' '}
                                    </TableCell>
                                    <TableCell>
                                        {' '}
                                        {episode.durationAsString}{' '}
                                    </TableCell>
                                    <TableCell>
                                        <PlayButton
                                            onClick={() =>
                                                playList(
                                                    episodeList,
                                                    index +
                                                        latestEpisodes.length,
                                                )
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </TableRoot>
            </section>
        </div>
    )
}
