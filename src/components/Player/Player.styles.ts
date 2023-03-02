import styled from "styled-components";

export const PlayerRootWrapper = styled.aside`
    width: 26.5rem;
    height: 100vh;
    padding: 3rem 4rem;
    background-color: var(--primary500);
    overflow: hidden;
    color: var(--white);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    strong {
        font-family: Lexend, sans-serif;
        font-weight: 600;
    }

    .player-header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .current-episode {
        width: 100%;
        height: 20rem;
        text-align: center;

        img {
            width: inherit;
            height: inherit;
            border-radius: 1.5rem;
            object-fit: cover;
        }

        strong {
            display: block;
            margin-top: 2rem;

            font-family: Lexend, sans-serif;
            font-weight: 600;
            font-size: 1.25rem;
            line-height: 1.75rem;
        }

        span {
            display: block;
            margin-top: 1rem;
            opacity: 0.6;
            line-height: 1.5rem;
        }
    }

    .player-empty {
        width: 100%;
        height: 20rem;
        padding: 4rem;
        border: 0.094rem dashed var(--primary300);
        border-radius: 1.5rem;
        background: linear-gradient(143.8deg, rgba(145, 100, 250, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    footer {
        align-self: stretch;

        &.player-footer-empty {
            opacity: 0.5;
        }
    }
`;

export const PlayerProgressWrapper = styled.aside`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-size: 0.875rem;

    .player-time {
        display: inline-block;
        width: 4rem;
        text-align: center;
    }

    .player-slider {
        flex: 1;

        .player-slider-empty {
            width: 100%;
            height: 0.25rem;
            background-color: var(--primary300);
            border-radius: 0.125rem;
        }
    }
`;

export const PlayerControlsWrapper = styled.aside`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2.5rem;

    button {
        background-color: transparent;
        border: 0;
        font-size: 0; // Serve para centralizar a imagem.

        transition: filter 0.2s;

        &:disabled {
            cursor: not-allowed;
        }

        &:hover:not(:disabled) {
            filter: brightness(0.7);
        }

        &.is-active {
           filter: invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
        }

        &.is-active:hover {
            filter: brightness(0.6) invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
        }

        &.player-button {
            width: 4rem;
            height: 4rem;
            border-radius: 1rem;
            background-color: var(--primary400);

            &:hover:not(:disabled) {
                filter: brightness(0.95);
            }
        }
    }
`;
