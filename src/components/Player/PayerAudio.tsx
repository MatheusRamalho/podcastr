import { RefObject } from 'react'

import { EpisodeType } from '@/types/Episode'

interface PlayerAudioProps {
    episode: EpisodeType
    isLooping: boolean
    audioRef: RefObject<HTMLAudioElement>
    handleEpisodeEnded: () => void
    setupProgressListener: () => void
    setPlayingState: (state: boolean) => void
}

export function PlayerAudio({
    episode,
    isLooping,
    audioRef,
    handleEpisodeEnded,
    setupProgressListener,
    setPlayingState,
}: PlayerAudioProps) {
    return (
        <audio
            className=""
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onEnded={handleEpisodeEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
        />
    )
}
