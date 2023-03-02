import { useEffect, useRef, useState } from 'react';
import Image from "next/image";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { usePlayer } from '../../contexts/PlayerContext/PlayerContext.hook';
import { PlayerRootWrapper, PlayerProgressWrapper, PlayerControlsWrapper } from "./Player.styles";

export const Player = () => {
    // Quando se quer acessar um elemento nativo do html com javaScript,
    // por exemplo tag audio sendo acessada por um document.getElementById().
    // No react essa ação é chama de refs (referencia).
    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0);

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        clearPlayerState
    } = usePlayer();

    // Efeito colateral no react é que alguma coisa muda quando algo executa.
    useEffect(() => { // Essa função vai disparar, toda vez que isPlaying tiver seu valor alterado.
        if (!audioRef.current) { // Se eu não tiver valor dentro de audioRef.current.
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const setupProgressListener = () => {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    }

    const handleSeek = (amount: number) => {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    const handleEpisodeEnded = () => {
        if (hasNext) {
            playNext()
        } else {
            clearPlayerState()
        }
    }

    const episode = episodeList[currentEpisodeIndex]

    return (
        <PlayerRootWrapper>
            <header className="player-header">
                <img
                    src="/playing.svg"
                    alt="Tocando agora"
                />

                <strong> Tocando agora </strong>
            </header>

            {episode ? ( // Se tem episódio tocando
                <div className="current-episode">
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        alt={episode.title}
                    />

                    <strong> {episode.title}</strong>
                    <span> {episode.members} </span>
                </div>
            ) : (
                <div className="player-empty">
                    <strong> Selecione um podcast para ouvir </strong>
                </div>
            )}

            <footer className={!episode ? 'player-footer-empty' : ''}>
                <PlayerProgressWrapper>
                    <span className="player-time"> {convertDurationToTimeString(progress)} </span>

                    <div className="player-slider">
                        {episode ? (
                            <Slider
                                max={Number(episode.duration)}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className="player-slider-empty"></div>
                        )}
                    </div>

                    <span className="player-time"> {convertDurationToTimeString(Number(episode?.duration ?? 0))} </span>
                </PlayerProgressWrapper>

                {/* Quando tem um if que não vai ter else. Pode substituir por "&&". Dessa forma ele só executa o que ta depois do && caso valide. */}
                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        loop={isLooping}
                        autoPlay
                        onEnded={handleEpisodeEnded}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                    />
                )}

                <PlayerControlsWrapper>
                    <button
                        type="button"
                        disabled={!episode || episodeList.length === 1}
                        onClick={toggleShuffle}
                        className={isShuffling ? 'is-active' : ''}
                    >
                        <img
                            src="/shuffle.svg"
                            alt="Embaralhar"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={playPrevious}
                        disabled={!episode || !hasPrevious}
                    >
                        <img
                            src="/play-previous.svg"
                            alt="Tocar anterior"
                        />
                    </button>

                    <button
                        type="button"
                        className="player-button"
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        <img
                            src={`${isPlaying ? '/pause.svg' : '/play.svg'}`}
                            alt={`${isPlaying ? 'Tocar' : 'Pausar'}`}
                        />
                    </button>

                    <button
                        type="button"
                        disabled={!episode || !hasNext}
                        onClick={playNext}
                    >
                        <img
                            src="/play-next.svg"
                            alt="Tocar próxima"
                        />
                    </button>

                    <button
                        type="button"
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? 'is-active' : ''}
                    >
                        <img
                            src="/repeat.svg"
                            alt="Repetir"
                        />
                    </button>
                </PlayerControlsWrapper>
            </footer>
        </PlayerRootWrapper>
    );
}
