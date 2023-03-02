import { ReactNode } from "react";
import { Episode } from "../../types/Episode";

// type Episode = {
//     title: string;
//     members: string;
//     thumbnail: string;
//     duration: number;
//     url: string;
// }

export type PlayerContextDataProps = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
};

export type PlayerContextProviderProps = {
    children: ReactNode;
}
