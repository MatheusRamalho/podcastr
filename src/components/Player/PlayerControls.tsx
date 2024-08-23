import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { EpisodeType } from '@/types/Episode'

import shuffleIcon from '@/assets/shuffle.svg'
import playIcon from '@/assets/play.svg'
import pauseIcon from '@/assets/pause.svg'
import playPreviousIcon from '@/assets/play-previous.svg'
import playNextIcon from '@/assets/play-next.svg'
import repeatIcon from '@/assets/repeat.svg'

interface PlayerControlsProps {
    episode: EpisodeType
    episodeList: EpisodeType[]
    isPlaying: boolean
    isShuffling: boolean
    hasPrevious: boolean
    hasNext: boolean
    isLooping: boolean
    togglePlay: () => void
    toggleShuffle: () => void
    playPrevious: () => void
    playNext: () => void
    toggleLoop: () => void
}

export function PlayerControls({
    episode,
    episodeList,
    isPlaying,
    isShuffling,
    hasPrevious,
    hasNext,
    isLooping,
    togglePlay,
    toggleShuffle,
    playPrevious,
    playNext,
    toggleLoop,
}: PlayerControlsProps) {
    return (
        <div className="max-w-96 flex items-center justify-center gap-4 mt-2 lg:mt-10">
            <button
                type="button"
                disabled={!episode || episodeList.length === 1}
                onClick={toggleShuffle}
                className={twMerge(
                    'relative cursor-pointer size-8 lg:size-10 flex items-center justify-center rounded-lg bg-transparent border-none text-[0] transition-all disabled:cursor-not-allowed hover:bg-primary-400',
                    isShuffling &&
                        'before:content-[""] before:absolute before:bottom-0 before:left-1/2 before:size-1 before:rounded-sm before:bg-secondary-500 before:-translate-x-1/2 before:-translate-y-1/2',
                )}
            >
                <Image className="" src={shuffleIcon} alt="Embaralhar" />
            </button>

            <button
                className={twMerge(
                    'cursor-pointer size-8 lg:size-10 flex items-center justify-center rounded-lg bg-transparent border-none text-[0] transition-all disabled:cursor-not-allowed hover:bg-primary-400',
                )}
                type="button"
                onClick={playPrevious}
                disabled={!episode || !hasPrevious}
            >
                <Image
                    className=""
                    src={playPreviousIcon}
                    alt="Tocar anterior"
                />
            </button>

            <button
                type="button"
                className={twMerge(
                    'cursor-pointer bg-transparent border-none text-[0] transition-all disabled:cursor-not-allowed hover:backdrop-brightness-75',
                    'size-10 lg:size-14 rounded-xl bg-primary-400 hover:bg-primary-300 flex items-center justify-center',
                )}
                disabled={!episode}
                onClick={togglePlay}
            >
                <Image
                    className=""
                    src={isPlaying ? pauseIcon : playIcon}
                    alt={`${isPlaying ? 'Tocar' : 'Pausar'}`}
                />
            </button>

            <button
                className={twMerge(
                    'cursor-pointer size-8 lg:size-10 flex items-center justify-center rounded-lg bg-transparent border-none text-[0] transition-all disabled:cursor-not-allowed hover:bg-primary-400',
                )}
                type="button"
                disabled={!episode || !hasNext}
                onClick={playNext}
            >
                <Image className="" src={playNextIcon} alt="Tocar próxima" />
            </button>

            <button
                className={twMerge(
                    'relative cursor-pointer size-8 lg:size-10 flex items-center justify-center rounded-lg bg-transparent border-none text-[0] transition-all disabled:cursor-not-allowed hover:bg-primary-400',
                    isLooping &&
                        'before:content-[""] before:absolute before:bottom-0 before:left-1/2 before:size-1 before:rounded-sm before:bg-secondary-500 before:-translate-x-1/2 before:-translate-y-1/2',
                )}
                type="button"
                disabled={!episode}
                onClick={toggleLoop}
            >
                <Image className="" src={repeatIcon} alt="Repetir" />
            </button>
        </div>
    )
}
