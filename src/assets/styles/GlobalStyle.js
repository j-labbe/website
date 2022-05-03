import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`

    :root {
        --accent: #238636;
        --color-btn-primary-bg: #238636;
        --color-btn-primary-border: rgba(240,246,252,0.1);
        --color-btn-primary-shadow: 0 0 transparent;
        --color-btn-primary-inset-shadow: 0 0 transparent;
        --color-btn-primary-hover-bg: #2ea043;
        --color-btn-primary-hover-border: rgba(240,246,252,0.1);
        --color-btn-primary-disabled-border: rgba(240,246,252,0.1);
        --color-btn-primary-focus-bg: #238636;
        --color-btn-primary-focus-border: rgba(240,246,252,0.1);
        --color-btn-primary-focus-shadow: 0 0 0 3px rgba(46,164,79,0.4);
        --color-btn-primary-text: #ffffff;
        --color-btn-primary-counter-bg: rgba(255,255,255,0.2);

        --new-serif-font: 'Alliance No.1', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        --new-mono-font: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;

        --new-text-light-hero: #FFFFFF;
        --new-text-body: #24292f;

        --new-hero-dark-background: #040d21;
        --new-hero-light-background: #FFFFFF;

        --new-mono-light-gray: #8193b2;
        --new-serif-light-gray: #627597;

        --new-text-dark-gray: #040d21;

        --new-link-blue: #0969da;
        --new-accent-green: #2ea44f;

        --new-button-on-dark-bg-hover: 0 4px 7px rgba(0, 0, 0, 0.15), 0 100px 80px rgba(255, 255, 255, 0.02), 0 42px 33px rgba(255, 255, 255, 0.024), 0 22px 18px rgba(255, 255, 255, 0.028), 0 12px 10px rgba(255, 255, 255, 0.034), 0 7px 5px rgba(255, 255, 255, 0.04), 0 3px 2px rgba(255, 255, 255, 0.07);
        --new-bottom-box-shadow: 0 0 0 1px rgba(53, 72, 91, 0.14), 0 3px 2px rgba(0, 0, 0, 0.04), 0 7px 5px rgba(0, 0, 0, 0.02), 0 13px 10px rgba(0, 0, 0, 0.02), 0 22px 17px rgba(0, 0, 0, 0.02);

        --new-hero-large-font: 72px;
    }

    html {
        box-sizing: border-box;
        width: 100%;
        background-color: #040d21;
        scrollbar-width: thin;
        scrollbar-color: #495670 #0a192f;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    ::selection {
        background-color: #233554;
        color: #ccd6f6;
    }

    body {
        margin: 0;
        width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        background-color: #040d21;
        color: #8892b0;
        font-family: 'Alliance No.1', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        font-size: 20px;
        line-height: 1.3;

        @media (max-width: 480px) {
            font-size: 18px;
        }

        &.loaded {
            background-color: #040d21;
            transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        &.hidden {
            overflow: hidden;
        }
        &.blur {
            overflow: hidden;

            header {
                background-color: transparent;
            }

            #content > * {
                filter: blur(5px) brightness(0.7);
                transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
                pointer-events: none;
                user-select: none;
            }
        }
    }

    body::-webkit-scrollbar {
        width: 12px;
    }

    body::-webkit-scrollbar-track {
        background: #040d21;
    }

    body::-webkit-scrollbar-thumb {
        background-color: #495670;
        border: 3px solid #0a192f;
        border-radius: 10px;
    }

    #root {
        min-height: 100vh;
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: 100%;
    }

    main {
        margin: 0 auto;
        width: 100%;
        max-width: 1600px;
        min-height: 100vh;
        padding: 200px 150px;

        @media (max-width: 1080px) {
            padding: 200px 100px;
        }
        @media (max-width: 768px) {
            padding: 150px 50px;
        }

        @media (max-width: 480px) {
            padding: 125px 25px;
        }

        .fillHeight {
            padding: 0 150px;

            @media (max-width: 1080px) {
                padding: 0 100px;
            }

            @media (max-width: 768px) {
                padding: 0 50px;
            }

            @media (max-width: 480px) {
                padding: 0 25px;
            }
        }
    }

    section {
        margin: 0 auto;
        padding: 100px 0;
        max-width: 1000px;
        
        @media (max-width: 768px) {
            padding: 80px 0;
        }

        @media (max-width: 480px) {
            padding: 60px 0;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Alliance No.1', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        margin: 0 0 10px 0;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 1.1;
    }

    .big-heading {
        margin: 0;
        font-size: clamp(40px, 8vw, 80px);
        font-weight: 800;
        letter-spacing: 0.1rem;
    }

    .medium-heading {
        margin: 0;
        font-size: clamp(40px 8vw, 60px);
    }

    .numbered-heading {
        display: flex;
        align-items: center;
        position: relative;
        margin: 10px 0 30px;
        width: 100px;
        font-size: clamp(26px, 5vw, 30px);
        white-space: nowrap;
    }

    .numbered-heading .text {
        margin-top: -15px;
        font-family: 'Alliance No.1', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        font-weight: 800;
    }

    img,
    svg {
        width: 100%;
        max-width: 100%;
        vertical-align: middle;
    }

    img[alt=""],
    img:not([alt]) {
        filter: blur(5px);
    }

    svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
        vertical-align: middle;
    }

    svg.feather {
        fill: none;
    }

    a {
        display: inline-block;
        text-decoration: none;
        text-decoration-skip-ink: auto;
        color: inherit;
        position: relative;
        transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    a:hover, a:focus {
        color: #64ffda;
    }

    code {
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        font-size: 16px;
    }

    #logo {
        color: #64ffda;
    }

    .subtitle {
        color: #64ffda;
        margin: 0 0 20px 0;
        font-size: 16px;
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        font-weight: 400;
        line-height: 1.5;

        @media (max-width: 1080px) {
            font-size: 14px;
        }

        @media (max-width: 768px) {
            font-size: 13px;
        }

        a {
            line-height: 1.5;
        }
    }

    .generalContainer {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .numbered-heading {
        display: flex;
        align-items: center;
        position: relative;
        margin: 10px 0 40px;
        width: 100%;
        font-size: clamp(26px, 5vw, 30px);
        white-space: nowrap;

        span { margin: 0; }

        .number {
            position: relative;
            bottom: 4px;
            margin-right: 10px;
            color: #64ffda;
            font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
            font-size: clamp(16px, 3vw, 20px);
            font-weight: 400;
        }

        @media (max-width: 480px) {
            &:before {
                margin-bottom: -3px;
                margin-right: 5px;
            }
        }
    }

        .line {
            position: relative;
            border-bottom: 1px solid #8892b0;
            width: 100%;
            margin: 20px;
            top: -5px;
        }


        /* ADD MEDIA FOR MOBILE STLYE - #10 */
        #content {
            padding: 0 100px 0 100px;

            @media (max-width: 1080px) {
                padding: 0 50px 0 50px;
            }

            @media (max-width: 768px) {
                padding: 0 40px 0 40px;
            }
        }

        .hero-center {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
        }

        .darkblur {
            transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
            #content > * {
                filter: blur(5px) brightness(0.6);
                transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
                pointer-events: none;
                user-select: none;
            }
        }

    /****

    Transitions

    ****/
    /* Fade */
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        opacity: 1;
        transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

    .fade-exit {
        opacity: 1;
    }

    .fade-exit-active {
        opacity: 0;
        transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

/* Fade Down */
    .fadedown-enter {
        opacity: 0.01;
        transform: translateY(-20px);
        transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1), transform 1500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

    .fadedown-enter-active {
        opacity: 1;
        transform: translateY(0px);
        transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1), transform 1500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

/* Fade Up */
    .fadeup-enter {
        opacity: 0.01;
        transform: translateY(20px);
        transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1), transform 1500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

    .fadeup-enter-active {
        opacity: 1;
        transform: translateY(0px);
        transition: opacity 1500ms cubic-bezier(0, 0.55, 0.45, 1), transform 1500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

/***

FAST TRANSITIONS

***/
    .fastfade-enter {
        opacity: 0;
    }

    .fastfade-enter-active {
        opacity: 1;
        transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

    .fastfade-exit {
        opacity: 1;
    }

    .fastfade-exit-active {
        opacity: 0;
        transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

/* Fade Down */
    .fastfadedown-enter {
        opacity: 0.01;
        transform: translateY(-60px);
        transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

    .fastfadedown-enter-active {
        opacity: 1;
        transform: translateY(0px);
        transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

/* Fade Up */
    .fastfadeup-enter {
        opacity: 0.01;
        transform: translateY(60px);
        transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

    .fastfadeup-enter-active {
        opacity: 1;
        transform: translateY(0px);
        transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
    }

    .loader-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #020c1b;
        overflow: hidden;
    }

    .loader-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: max-content;
        max-width: 400px;
        opacity: 0;
    }

    .loader-container svg {
        width: 100%;
        height: 100%;
        display: block;
        margin: 0 auto;
        fill: none;
    }

    .accent {
        color: var(--accent);
    }
`;

export default GlobalStyle;