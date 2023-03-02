
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import { usePlayer } from '../contexts/PlayerContext/PlayerContext.hook';
import { Episode } from '../types/Episode';

import { Section } from '../components/Section';
import { FeatureEpsiode } from '../components/FeaturedEpisode';
import { PlayButton } from '../components/PlayButton';

export type HomeProps = {
	latestEpisodes: Array<Episode>;
	allEpisodes: Array<Episode>;
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
	const { playList } = usePlayer();
	const episodeList = [...latestEpisodes, ...allEpisodes];

	return (
		<div className="home-page">
			<Section
				id="last-releases"
				title="Últimos lançamentos"
			>
				<ul>
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
			</Section>

			<Section
				id="all-epsodes"
				title="Todos episódios"
			>
				<table cellSpacing={0}>
					<thead>
						<tr>
							<th></th>
							<th> Podcast </th>
							<th> Integrantes </th>
							<th> Data </th>
							<th> Duração </th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{allEpisodes.map((episode, index) => {
							return (
								<tr key={episode.id}>
									<td style={{ width: 72 }}>
										<Image
											width={120}
											height={120}
											src={episode.thumbnail}
											alt={episode.title}
										/>
									</td>
									<td>
										<Link href={`/episodes/${episode.id}`}>
											{episode.title}
										</Link>
									</td>
									<td> {episode.members} </td>
									<td style={{ width: 100 }}> {episode.published_at} </td>
									<td> {episode.durationAsString} </td>
									<td>
										<PlayButton onClick={() => playList(episodeList, index + latestEpisodes.length)} />
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</Section>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await api.get('episodes', {
		params: {
			_limit: 12,
			_sort: 'published_at',
			_order: 'desc'
		}
	})

	const episodes = data.map(episode => {
		return {
			id: episode.id,
			title: episode.title,
			thumbnail: episode.thumbnail,
			members: episode.members,
			published_at: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }), // parseISO transforma string em data do javascript.
			durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
			url: episode.file.url,
			duration: Number(episode.file.duration),
		};
	})

	const latestEpisodes = episodes.slice(0, 2);
	const allEpisodes = episodes.slice(2, episodes.length);

	return {
		props: {
			latestEpisodes,
			allEpisodes
		},
		revalidate: 60 * 60 * 8, // 24 horas
	}
}
