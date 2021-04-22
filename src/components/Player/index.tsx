import styles from './styles.module.scss';

export function Player() {
    return (
        <aside className={ styles.player__wrapper }>
            <header className={ styles.player__header }>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong> Tocando agora </strong>
            </header>

            <div className={ styles.player__empty }>
                <strong> Selecione um podcast para ouvir </strong>
            </div>

            <footer className={ styles.player__footer__empty }>
                <div className={ styles.player__progress }>
                    <span className={ styles.player__time }> 00.00 </span>

                    <div className={ styles.player__slider }>
                        <div className={ styles.player__slider__empty }></div>
                    </div>

                    <span className={ styles.player__time }> 00.00 </span>
                </div>

                <div className={ styles.player__controls }>
                    <button type="button">
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button type="button" className={ styles.player__button }>
                        <img src="/play.svg" alt="tocar" />
                    </button>

                    <button type="button">
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>

                    <button type="button">
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </aside>
    )
}