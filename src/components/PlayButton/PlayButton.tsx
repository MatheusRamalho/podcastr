import { PlayButtonWrapper } from "./PlayButton.styles";
import { PlayButtonProps } from "./PlayButton.types";

export const PlayButton = ({ onClick }: PlayButtonProps) => {
    return (
        <PlayButtonWrapper
            type="button"
            onClick={onClick}
        >
            <img
                src="/play-green.svg"
                alt="Tocar episódio"
            />
        </PlayButtonWrapper>
    );
}
