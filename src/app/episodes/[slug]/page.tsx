'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

import { getEpisode } from '@/api/get-episode'
import { usePlayer } from '@/hooks/usePlayer'
import { EpisodeType } from '@/types/Episode'
import { Loading } from '@/components/Loading'
import arrowLeftIcon from '@/assets/arrow-left.svg'
import playIcon from '@/assets/play.svg'

export default function Episode() {
    const { play } = usePlayer()
    const { slug } = useParams()

    const {
        data: episode,
        isLoading,
        error,
    } = useQuery<EpisodeType>({
        queryKey: ['episode', slug],
        queryFn: () => getEpisode({ slug }),
        staleTime: 60 * 60 * 24, // 24 horas
    })

    if (isLoading) {
        return <Loading />
    }

    if (error || !episode) {
        return <div>Erro ao carregar o episódio.</div>
    }

    return (
        <section className="max-w-[50rem] mx-auto py-12 px-4" id={episode.id}>
            <h6 hidden> Episódio {episode.title} </h6>

            <div className="relative max-w-[45rem] rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Link
                    className="z-10 absolute size-12 border-0 rounded-xl text-[0] transition-all top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-primary-500 flex items-center justify-center hover:bg-primary-400"
                    href="/"
                    title="Voltar"
                >
                    <Image className="" src={arrowLeftIcon} alt="Voltar" />
                </Link>

                <div className="w-full h-80 rounded-2xl overflow-hidden">
                    <Image
                        className="size-full rounded-2xl object-cover"
                        width={700}
                        height={320}
                        src={episode.thumbnail}
                        alt={episode.title}
                    />
                </div>

                <button
                    type="button"
                    className="z-10 absolute size-12 border-0 rounded-xl text-[0] transition-all top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-secondary-500 flex items-center justify-center hover:bg-secondary-500/80"
                    onClick={() => play(episode)}
                >
                    <Image className="" src={playIcon} alt="Tocar episódio" />
                </button>
            </div>

            <header className="pb-4 border-b border-b-zinc-200 dark:border-b-zinc-700">
                <h1 className="mt-8 mb-6 text-zinc-800 dark:text-zinc-100 text-2xl lg:text-4xl">
                    {episode.title}
                </h1>

                <span className="inline-block text-sm text-zinc-600 dark:text-zinc-400">
                    {episode.members}
                </span>

                <span className="inline-block text-zinc-600 dark:text-zinc-400 text-sm relative ml-4 pl-4 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-x-1/2 before:-translate-y-1/2 before:size-1 before:rounded-sm before:bg-[#DDD]">
                    {episode.published_at}
                </span>

                <span className="inline-block text-zinc-600 dark:text-zinc-400 text-sm relative ml-4 pl-4 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-x-1/2 before:-translate-y-1/2 before:size-1 before:rounded-sm before:bg-[#DDD]">
                    {episode.durationAsString}
                </span>
            </header>

            <div
                className="mt-8 leading-8 font-normal text-zinc-500 dark:text-zinc-500"
                dangerouslySetInnerHTML={{ __html: episode.description }}
                // Para exibir dados sem as tags html. Não é recomendado se você não souber de onde os dados vem...
            />
        </section>
    )
}
