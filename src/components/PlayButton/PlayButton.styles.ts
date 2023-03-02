import styled from "styled-components";

export const PlayButtonWrapper = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    border: 0.063rem solid var(--gray100);
    border-radius: 0.675rem;
    background-color: var(--white);
    transition: filter 0.2s;

    font-size: 0;

    img {
        width: 1.5rem;
        height: 1.5rem;
    }

    &:hover {
        filter: brightness(0.95);
    }
`;
