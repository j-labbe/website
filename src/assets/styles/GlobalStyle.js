import { createGlobalStyle } from "styled-components";
import AllianceNo1Regular from "../fonts/Alliance-No-1-Regular.woff2";
import AllianceNo1ExtraBold from "../fonts/Alliance-No-1-ExtraBold.woff2";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Alliance No.1';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${AllianceNo1Regular}) format('woff2');
    }
    @font-face {
        font-family: 'Alliance No.1';
        font-style: bold;
        font-weight: 700;
        font-display: swap;
        src: url(${AllianceNo1ExtraBold}) format('woff2');
    }
    :root {
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

`