import GlobalStyle from '../styles/global';

import { PlayerContextProvider } from '../contexts/PlayerContext/PlayerContextProvider';
import { Header } from '../components/Header';
import { Player } from '../components/Player';

function MyApp({ Component, pageProps }) {
	return (
		<PlayerContextProvider>
			<GlobalStyle />

			<div className="App">
				<main>
					<Header />
					<Component {...pageProps} />
				</main>
				<Player />
			</div>
		</PlayerContextProvider>
	)
}

export default MyApp
