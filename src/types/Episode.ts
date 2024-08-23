export interface EpisodeType {
    id: string
    thumbnail: string
    title: string
    description: string
    duration: number
    durationAsString: string
    url: string
    members: string
    published_at: string
}

export interface EpisodeJsonType {
    id: string
    title: string
    members: string
    thumbnail: string
    description: string
    published_at: string
    file: {
        url: string
        duration: number
        type: string
    }
}
