import styled from "styled-components";

export const HeaderWrapper = styled.header`
    height: 6.5rem;
    padding: 2rem 4rem;
    border-bottom: 0.063rem solid var(--gray100);
    background-color: var(--white);

    display: flex;
    align-items: center;

    p {
        margin-left: 2rem;
        padding: 0.25rem 0 0.25rem 2rem;
        border-left: 0.063rem solid var(--gray100);
    }

    span {
        margin-left: auto;
        text-transform: capitalize;
    }
`;
