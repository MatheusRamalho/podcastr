'use client'

import { createContext, ReactNode, useState } from 'react'

import { EpisodeType } from '@/types/Episode'

interface PlayerContextProps {
    episodeList: Array<EpisodeType>
    currentEpisodeIndex: number
    isPlaying: boolean
    isLooping: boolean
    isShuffling: boolean
    play: (episode: EpisodeType) => void
    playList: (list: EpisodeType[], index: number) => void
    setPlayingState: (state: boolean) => void
    togglePlay: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    playNext: () => void
    playPrevious: () => void
    clearPlayerState: () => void
    hasNext: boolean
    hasPrevious: boolean
}

interface PlayerContextProviderProps {
    children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextProps)

export function PlayerContextProvider({
    children,
}: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState<EpisodeType[]>([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

    function play(episode: EpisodeType) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(list: EpisodeType[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(
                Math.random() * episodeList.length,
            )
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                playList,
                playNext,
                playPrevious,
                isPlaying,
                isLooping,
                isShuffling,
                togglePlay,
                setPlayingState,
                hasNext,
                hasPrevious,
                toggleLoop,
                toggleShuffle,
                clearPlayerState,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}
