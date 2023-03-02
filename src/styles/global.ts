import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --primary300: #9F75FF;
        --primary400: #9164FA;
        --primary500: #8257E5;
        --primary800: #6F48C9;

        --secondary50: #04D361;

        --white: #FFFFFF;

        --gray50: #F7F8FA;
        --gray100: #E6E8EB;
        --gray200: #AFB2B1;
        --gray500: #808080;
        --gray800: #494D4B;

        --gradient: linear-gradient(167.96deg, var(--primary100) 0%, var(--primary300) 100%);
    }

    &::-webkit-scrollbar {
        width: 0.75rem;
        padding-right: 0.25rem;
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0.125rem;
        background: var(--primary300);
    }

    html, body {
        scroll-behavior: smooth;
    }

    body {
        width: 100%;
        height: 100vh;
        background-color: var(--gray50);
        overflow: hidden;

        font-family: Inter, sans-serif;
        font-weight: 500;
        font-size: 1rem;
        color: var(--gray500);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: Lexend, sans-serif;
        font-weight: 600;
        color: var(--gray800);
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    button {
        cursor: pointer;
    }

    ul {
        list-style: none;
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(2, 1fr);
    }

    table {
        width: 100%;

        th,
        td {
            padding: 0.75rem 1rem;
            border-bottom: 0.063rem solid var(--gray100);
        }

        th {
            font-family: Lexend, sans-serif;
            font-weight: 500;
            font-size: 0.75rem;
            color: var(--gray200);
            text-align: left;
        }

        td {
            font-size: 0.875rem;

            img {
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 0.5rem;
            }

            a {
                font-family: Lexend, sans-serif;
                font-weight: 600;
                font-size: 0.75rem;
                line-height: 1.4rem;
                text-decoration: none;
                color: var(--gray800);

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .App {
        display: flex;
        overflow: hidden;

        main {
            flex: 1;
        }
    }

    .home-page {
        height: calc(100vh - 6.5rem);
        overflow-y: scroll;
        padding: 0 4rem;
    }
`;
