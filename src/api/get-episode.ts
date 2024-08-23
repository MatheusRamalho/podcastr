import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { api } from '@/libs/axios'
import { EpisodeJsonType } from '@/types/Episode'
import { convertDurationToTimeString } from '@/utils/convert-duration-to-time-string'

interface getEpisodeParams {
    slug: string | string[]
}

interface getEpisodeResponse extends EpisodeJsonType {}

export async function getEpisode({ slug }: getEpisodeParams) {
    const response = await api.get<getEpisodeResponse>(`/episodes/${slug}`)

    const data = {
        id: response.data.id,
        thumbnail: response.data.thumbnail,
        title: response.data.title,
        description: response.data.description,
        url: response.data.file.url,
        members: response.data.members,
        duration: Number(response.data.file.duration),
        durationAsString: convertDurationToTimeString(
            Number(response.data.file.duration),
        ),
        published_at: format(parseISO(response.data.published_at), 'd MMM yy', {
            locale: ptBR,
        }),
    }

    return data
}
