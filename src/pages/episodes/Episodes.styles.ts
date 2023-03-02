import styled from "styled-components";

export const EpisodeWrapper = styled.div`
    max-width: 50rem;
    margin: 0 auto;
    padding: 3rem 2rem;

    .episode-thumbnail {
        position: relative;
        max-width: 45rem;
        border-radius: 1rem;

        .episode-thumbnail-image {
            width: 100%;
            border-radius: 1rem;
            object-fit: cover;
        }

        button {
            z-index: 5;
            position: absolute;

            width: 3rem;
            height: 3rem;
            border: 0;
            border-radius: 0.75rem;
            font-size: 0;
            transition: filter 0.2s;

            &.button--return {
                top: 50%;
                left: 0;
                transform: translate(-50%, -50%);
                background-color: var(--primary500);
            }

            &.button--play {
                top: 50%;
                right: 0;
                transform: translate(50%, -50%);
                background-color: var(--secondary50);
            }

            &:hover {
                filter: brightness(0.9);
            }
        }
    }

    .episode-header {
        padding-bottom: 1rem;
        border-bottom: 0.063rem solid var(--gray100);

        h1 {
            margin-top: 2rem;
            margin-bottom: 1.5rem;
        }

        span {
            display: inline-block;
            font-size: 0.875rem;

            &+span { // Pega todo span que antes dele tem um span.
                position: relative;

                margin-left: 1rem;
                padding-left: 1rem;

                &::before {
                    content: '';

                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translate(-50%, -50%);

                    width: 4px;
                    height: 4px;
                    border-radius: 2px;
                    background-color: #DDD;
                }
            }
        }
    }

    .episode-description {
        margin-top: 2rem;

        line-height: 1.675rem;
        color: var(--gray800);

        p {
            margin: 1.5rem 0;
        }
    }
`;
