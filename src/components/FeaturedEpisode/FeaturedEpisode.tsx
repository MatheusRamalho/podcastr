import Image from "next/image";
import Link from "next/link";

import { PlayButton } from "../PlayButton";

import { FeatureEpsiodeWrapper } from "./FeaturedEpisode.styles";
import { FeatureEpsiodeProps } from "./FeatureEpsiode.types";

export const FeatureEpsiode = ({ id, title, members, thumbnail, durationAsString, published_at, onClick }: FeatureEpsiodeProps) => {
    return (
        <FeatureEpsiodeWrapper>
            <Image
                className="feature-image"
                width={192}
                height={192}
                src={thumbnail}
                alt={title}
            />

            <div className="featured-episode-details">
                <Link href={`/episodes/${id}`}>
                    {title}
                </Link>

                <p> {members} </p>
                <span> {published_at} </span>
                <span> {durationAsString} </span>
            </div>

            <PlayButton
                onClick={onClick}
            />
        </FeatureEpsiodeWrapper>
    );
}
