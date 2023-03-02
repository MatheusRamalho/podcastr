import styled from "styled-components";

export const FeatureEpsiodeWrapper = styled.li`
    position: relative;
    padding: 1.25rem;
    border: 0.063rem solid var(--gray100);
    border-radius: 1.5rem;
    background-color: var(--white);

    display: flex;
    align-items: center;

    .feature-image {
        width: 6rem;
        height: 6rem;
        border-radius: 1rem;
        object-fit: cover;
    }

    .featured-episode-details {
        flex: 1;
        margin-left: 1rem;

        a {
            display: block;

            font-family: Lexend, sans-serif;
            font-weight: 600;
            text-decoration: none;
            line-height: 1.4rem;
            color: var(--gray800);

            &:hover {
                text-decoration: underline;
            }
        }

        p {
            font-size: 0.875rem;
            margin-top: 0.5rem;

            max-width: 70%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        span {
            display: inline-block;

            margin-top: 0.5rem;
            font-size: 0.875rem;

            &:last-child {
                position: relative;

                margin-left: 0.5rem;
                padding-left: 0.5rem;

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

    button {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
    }
`;
