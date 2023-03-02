export type Episode = {
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    description: string;
    url: string;
    duration: string;
    durationAsString: string;
    published_at: string;
}

export type EpisodeProps = {
    episode: Episode;
}
