'use client'

import { useEffect, useRef, useState } from 'react'

import { usePlayer } from '@/hooks/usePlayer'

import {
    PlayerRoot,
    PlayerHeader,
    PlayerCurrentEpisode,
    PlayerEmpty,
    PlayerFooter,
    PlayerProgress,
    PlayerAudio,
    PlayerControls,
} from '@/components/Player'

export function PlayerElement() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState<number | number[]>(0)

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
        clearPlayerState,
    } = usePlayer()

    useEffect(() => {
        if (!audioRef.current) {
            return
        }

        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    function setupProgressListener() {
        if (audioRef && audioRef.current) {
            audioRef.current.currentTime = 0

            audioRef.current.addEventListener('timeupdate', () => {
                setProgress(Math.floor(audioRef.current?.currentTime || 0))
            })
        }
    }

    const handleSeek = (amount: number | number[]) => {
        if (audioRef && audioRef.current) {
            audioRef.current.currentTime = Number(amount)
            setProgress(amount)
        }
    }

    function handleEpisodeEnded() {
        if (hasNext) {
            playNext()
        } else {
            clearPlayerState()
        }
    }

    const episode = episodeList[currentEpisodeIndex]

    return (
        <PlayerRoot>
            <PlayerHeader />

            {episode ? (
                <PlayerCurrentEpisode
                    thumbnail={episode.thumbnail}
                    title={episode.title}
                    members={episode.members}
                />
            ) : (
                <PlayerEmpty />
            )}

            <PlayerFooter isNotEpisode={!episode}>
                <PlayerProgress
                    episode={episode}
                    progress={progress}
                    handleSeek={handleSeek}
                />

                {episode && (
                    <PlayerAudio
                        episode={episode}
                        audioRef={audioRef}
                        isLooping={isLooping}
                        handleEpisodeEnded={handleEpisodeEnded}
                        setPlayingState={setPlayingState}
                        setupProgressListener={setupProgressListener}
                    />
                )}

                <PlayerControls
                    episode={episode}
                    episodeList={episodeList}
                    isPlaying={isPlaying}
                    isShuffling={isShuffling}
                    hasPrevious={hasPrevious}
                    hasNext={hasNext}
                    isLooping={isLooping}
                    togglePlay={togglePlay}
                    toggleShuffle={toggleShuffle}
                    playPrevious={playPrevious}
                    playNext={playNext}
                    toggleLoop={toggleLoop}
                />
            </PlayerFooter>
        </PlayerRoot>
    )
}
