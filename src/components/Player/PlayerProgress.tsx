import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { EpisodeType } from '@/types/Episode'
import { convertDurationToTimeString } from '@/utils/convert-duration-to-time-string'

interface PlayerProgressProps {
    episode: EpisodeType
    progress: number | number[]
    handleSeek: (amount: number | number[]) => void
}

export function PlayerProgress({
    episode,
    progress,
    handleSeek,
}: PlayerProgressProps) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <span className="inline-block w-16 text-center">
                {convertDurationToTimeString(Number(progress))}
            </span>

            <div className="flex-1">
                {episode ? (
                    <Slider
                        max={Number(episode.duration)}
                        value={progress}
                        onChange={handleSeek}
                        trackStyle={{ backgroundColor: '#04d361' }}
                        railStyle={{ backgroundColor: '#9f75ff' }}
                        handleStyle={{
                            borderColor: '#04d361',
                            borderWidth: 4,
                        }}
                    />
                ) : (
                    <div className="w-full h-1 bg-primary-300 rounded-sm" />
                )}
            </div>

            <span className="inline-block w-16 text-center">
                {convertDurationToTimeString(Number(episode?.duration ?? 0))}{' '}
            </span>
        </div>
    )
}
