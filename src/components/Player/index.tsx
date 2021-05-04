import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { PlayerContext } from '../../contexts/PlayerContext';

import styles from './styles.module.scss';

export function Player() {
    // Quando se quer acessar um elemento nativo do html com javaScript, 
    // por exemplo tag audio sendo acessada por um document.getElementById().
    // No react essa ação é chama de refs (referencia).
    const audioRef = useRef<HTMLAudioElement>(null)

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState
    } = useContext(PlayerContext)

    // Efeito colateral no react é que alguma coisa muda quando algo executa.
    useEffect(() => { // Essa função vai disparar, toda vez que isPlaying tiver seu valor alterado.
        if (!audioRef.current) { // Se eu não tiver valor dentro de audioRef.current.
            return;
        }

        if (isPlaying) { // Se recebeu um novo valor e ele for true.
            audioRef.current.play(); // Executa o play.
        } else { // se for false
            audioRef.current.pause(); // executa o pause.
        }
    }, [isPlaying])

    const episode = episodeList[currentEpisodeIndex]

    return (
        <aside className={styles.player__wrapper}>
            <header className={styles.player__header}>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong> Tocando agora </strong>
            </header>

            { episode ? ( // Se tem episódio tocando
                <div className={styles.current__episode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                    />
                    <strong> {episode.title}</strong>
                    <span> {episode.members} </span>
                </div>

            ) : (  // Se não tem episódio tocando.
                <div className={styles.player__empty}>
                    <strong> Selecione um podcast para ouvir </strong>
                </div>
            )}

            {/* Passar a class "player__footer__empty" somente se não tiver o episódio, se tiver passa vazio */}
            <footer className={!episode ? styles.player__footer__empty : ''}>
                <div className={styles.player__progress}>
                    <span className={styles.player__time}> 00.00 </span>

                    <div className={styles.player__slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={styles.player__slider__empty}></div>
                        )}
                    </div>

                    <span className={styles.player__time}> 00.00 </span>
                </div>

                {/* Quando tem um if que não vai ter else. Pode substituir por "&&". Dessa forma ele só executa o que ta depois do && caso valide. */}
                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}
                <div className={styles.player__controls}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button
                        type="button"
                        className={styles.player__button}
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        {isPlaying
                            ? <img src="/pause.svg" alt="tocar" />
                            : <img src="/play.svg" alt="tocar" />
                        }
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>

                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </aside>
    )
}