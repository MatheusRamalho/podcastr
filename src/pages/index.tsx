
import { useContext } from 'react';

import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import { PlayerContext } from '../contexts/PlayerContext';

import styles from './home.module.scss';

type Episode = {
	id: string;
	title: string;
	members: string;
	thumbnail: string;
	url: string;
	duration: string;
	durationAsString: string;
	published_at: string;
}

type HomeProps = {
	// Duas formas de declarar arrays: Episode[] / Array<Episode>
	latestEpisodes: Episode[];
	allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
	const { play } = useContext(PlayerContext);

	return (
		<div className={styles.home__page}>
			<section className={styles.episodes__latest}>
				<h2> Últimos lançamentos </h2>

				<ul>
					{
						latestEpisodes.map(episode => {
							return (
								<li key={episode.id}>
									<Image
										width={192}
										height={192}
										src={episode.thumbnail}
										alt={episode.title}
										objectFit="cover"
									/>

									<div className={styles.episodeDetails}>
										<Link href={`/episodes/${episode.id}`}>
											<a> {episode.title} </a>
										</Link>
										<p> {episode.members} </p>
										<span> {episode.published_at} </span>
										<span> {episode.durationAsString} </span>
									</div>

									<button type="button" onClick={() => play(episode)}>
										<img src="/play-green.svg" alt="Tocar episódio" />
									</button>
								</li>
							)
						})
					}
				</ul>
			</section>

			<section className={styles.episodes__all}>
				<h2> Todos episódios </h2>

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
						{allEpisodes.map(episode => {
							return (
								<tr key={episode.id}>
									<td style={{ width: 72 }}>
										<Image
											width={120}
											height={120}
											src={episode.thumbnail}
											alt={episode.title}
											objectFit="cover"
										/>
									</td>

									<td>
										<Link href={`/episodes/${episode.id}`}>
											<a> {episode.title} </a>
										</Link>
									</td>
									<td> {episode.members} </td>
									<td style={{ width: 100 }}> {episode.published_at} </td>
									<td> {episode.durationAsString} </td>
									<td>
										<button type="button">
											<img src="/play-green.svg" alt="Tocar episódio" />
										</button>
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

export const getStaticProps: GetStaticProps = async () => {
	// Pega os dados da api, com axios.
	const { data } = await api.get('episodes', {
		params: {
			_limit: 12,
			_sort: 'published_at',
			_order: 'desc'
		}
	})

	// Formatando episódios assim que pegar.
	const episodes = data.map(episode => { // percorre todos os episódios.
		return { // retorna pra cada episódio um objeto
			id: episode.id,
			title: episode.title,
			thumbnail: episode.thumbnail,
			members: episode.members,
			published_at: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }), // parseISO transforma string em data do javascript.
			duration: Number(episode.file.duration),
			durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
			url: episode.file.url,
		};
	})

	const latestEpisodes = episodes.slice(0, 2);
	const allEpisodes = episodes.slice(2, episodes.length);

	// Retornando
	return {
		props: {
			latestEpisodes,
			allEpisodes
		},

		revalidate: 60 * 60 * 8,
	}
}

/*
Formas de consumir API (SPA / SSR / SSG).

	SPA - Single Page Aplication. (Em projeto React)

		import { useEffect } from "react"

		export default function Home() {
			// Função do React que dispara algo sempre que a aplicação sofrer alteração.
			// O primeiro parâmetro é o que quer executar e o segundo parâmetro é quando, que é um array.
			// Para executar um component assim que estiver em tela uma única vez, é só passar o array vazio.

			useEffect(() => {
				fetch('http://localhost:3333/episodes') // Busca os dados nesse endereço.
					.then(response => response.json()) // Convertendo a resposta em json.
					.then(data => console.log(data)) // Para ver os dados sendo exibidos.
			}, [])

			// Problema dessa forma, é a indexação dos mecanismos de busca.
			// Se precisa que já estejam disponíveis assim que acessar a página, não é o método indicado.

			return (
				<h1> Index </h1>
			)
		}


	SSR - Server Siding Render. (Só em projeto Next)
	SSG - Static Side Generation. (Só em projeto Next) - SÓ FUNCIONA EM PRODUÇÃO
		// Para usar SSR no Next precisa apenas em qualquer arquivo da pasta pages e exporte uma função chamada getServerSideProps()
		// Para usar SSR no Next precisa apenas em qualquer arquivo da pasta pages e exporte uma função chamada getStaticProps()

		// A DIFERENÇA entre os dois tipos fica apenas no nome da função.
		// getServerSideProps() - Executa todas as vezes que alguém acessa a home da aplicação.
		// getStaticProps() - Executa de x tempos em x tempo de acordo passado no revalidate no return da função.

		export default function Home(props) {
			return (
				<div>
					<h1> Index </h1>
					<p> { JSON.stringify(props.episodes) } </p>
				</div>
			)
		}

		// async - transforma a função em uma função assíncrona.
		export async function getServerSideProps() { // SSR
		export async function getStaticProps() { // SSG
			const response = await fetch('http://localhost:3333/episodes') // Busca os dados nesse endereço.
			const data = await response.json();

			// retorna um objeto de props.
			// sempre precisa retornar props.
			return {
				props: {
					episodes: data,
				},

				// Esse é só no SSG, ele recebe um número em segundos que é responsável por de quanto em quanto tempo eu quero gerar uma nova versão da página.
				revalidate: 60 * 60 * 8, // A cada 8 horas é feita uma chamada nova, quem acessar durante esse meio tempo, vai acessar uma página estática.
			}
		}

*/