// Todo o conteúdo fica dentro do desse arquivo. 
// Então os components que sempre deverão estar na tela, são importados aqui.

import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
	return (
		<div className={styles.app__wrapper}>
			<main>
				<Header />
				<Component {...pageProps} />
			</main>

			<Player />
		</div>
	)
}

export default MyApp
