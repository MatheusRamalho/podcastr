import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { api } from '@/libs/axios'
import { EpisodeJsonType } from '@/types/Episode'
import { convertDurationToTimeString } from '@/utils/convert-duration-to-time-string'

interface getEpisodesResponse extends EpisodeJsonType {}

export async function getEpisodes() {
    const response = await api.get<getEpisodesResponse[]>('/episodes', {
        params: {
            _limit: 12,
            _sort: 'published_at',
            _order: 'desc',
        },
    })

    const data = response.data.map((episode: EpisodeJsonType) => ({
        id: episode.id,
        thumbnail: episode.thumbnail,
        title: episode.title,
        description: episode.description,
        members: episode.members,
        url: episode.file.url,
        duration: Number(episode.file.duration),
        durationAsString: convertDurationToTimeString(
            Number(episode.file.duration),
        ),
        published_at: format(parseISO(episode.published_at), 'd MMM yy', {
            locale: ptBR,
        }),
    }))

    return data
}
