import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import next, { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import { EpisodeProps } from '../../types/Episode';
import { EpisodeWrapper } from './Episodes.styles';
import { usePlayer } from '../../contexts/PlayerContext/PlayerContext.hook';

export default function Episode({ episode }: EpisodeProps) {
    const { play } = usePlayer();

    return (
        <EpisodeWrapper id={episode.id}>
            <div className="episode-thumbnail">
                <Link href="/">
                    <button type="button" className="button--return">
                        <img
                            src="/arrow-left.svg"
                            alt="Voltar"
                        />
                    </button>
                </Link>

                <Image
                    className="episode-thumbnail-image"
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    alt={episode.title}
                />

                <button
                    type="button"
                    className="button--play"
                    onClick={() => play(episode)}
                >
                    <img
                        src="/play.svg"
                        alt="Tocar episódio"
                    />
                </button>
            </div>

            <header className="episode-header">
                <h1> {episode.title} </h1>
                <span> {episode.members} </span>
                <span> {episode.published_at} </span>
                <span> {episode.durationAsString} </span>
            </header>

            <div className="episode-description"
                dangerouslySetInnerHTML={{ __html: episode.description }}
            // Para exibir dados sem as tags html. Não é recomendado se você não souber de onde os dados vem...
            />
        </EpisodeWrapper>
    )
}

// Quando o arquivo possui colchetes é necessário o método getStaticPaths.
export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('episodes', {
        params: {
            _limit: 2,
            _sort: 'published_at',
            _order: 'desc'
        }
    })

    const paths = data.map(episode => {
        return {
            params: {
                slug: episode.id
            }
        }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

// Geração de forma estática.
export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;
    const { data } = await api.get(`/episodes/${slug}`);

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        published_at: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }), // parseISO transforma string em data do javascript.
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
    };

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, // 24 horas
    }
}
