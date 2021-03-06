import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { navLinks } from '../config';
import { Link } from 'gatsby';
import useOnClickOutside from '../utils/useOnClickOutside';
import { Spin as Hamburger } from 'hamburger-react';

const StyledMenu = styled.div`
    display: none;
    @media(max-width: 768px) {
        display: block;
    }
`;

// https://codepen.io/djuangrm/pen/oNxjggN
const StyledHamburgerButton = styled.div`
    display: none;
    border: none !important;
    outline: none !important;
    @media(max-width: 768px) {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        position:relative;
        z-index: 12;
        color: #8892b0;
        background-color: transparent;
    }
`;

const StyledSidebar = styled.aside`
    display: none;
    @media(max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        padding: 50px 10px;
        width: min(60vw, 400px);
        height: 100vh;
        outline: 0;
        background-color: #13203d;
        box-shadow: -10px 0px 30px -15px rgba(2,12,27,0.7);
        z-index: 9;
        transform: translateX(${props => (props.menuOpen ? 0 : 100)}vw);
        visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
        transition: all ${props => (props.menuOpen ? `500ms cubic-bezier(0, 0.55, 0.45, 1)` : `500ms cubic-bezier(0.65, 0, 0.35, 1)`)};
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex-direction: column;
        color: #8892b0;
        font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
        text-align: center;
    }

    ol {
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;

        li {
            position: relative;
            margin: 0 auto 20px;
            counter-increment: item 1;
            font-size: clamp(14px, 4vw, 18px);

            @media (max-width: 600px) {
                margin: 0 auto 10px;
            }

            &:before {
                content: '0' counter(item) '.';
                display: block;
                margin-bottom: 5px;
                color: #64ffda;
                font-size: 14px;
            }
            a{
                display: inline-block;
                text-decoration: none;
                text-decoration-skip-ink: auto;
                color: inherit;
                position: relative;
                transition: all 0.25s cubic-bezier(0.55, 0, 1, 0.45);
                width: 100%;
                padding: 3px 20px 20px;

                &:hover,
                &:active,
                &:focus {
                    color: #64ffda;
                    outline: 0;
                }
            }
        }
    }

    .resume-link {
        color: var(--green);
        background-color: transparent;
        border: 1px solid #64ffda;
        border-radius: 4px;
        padding: 1.25rem 1.75rem;
        font-size: 14px;
        font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
        line-height: 1;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        &:hover,
        &:focus,
        &:active {
            background-color: rgba(100,255,218,0.1);
            outline: none;
        }
        &:after {
            display: none !important;
        }
    }
`;

const MobileNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const buttonRef = useRef(null);
    const navRef = useRef(null);

    let menuFocus, firstFocus, lastFocus;

    const setFocus = () => {
        menuFocus = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
        firstFocus = menuFocus[0];
        lastFocus = menuFocus[menuFocus.length - 1];
    };
    const handleBackwardTab = e => {
        if (document.activeElement === firstFocus) {
            e.preventDefault();
            lastFocus.focus();
        }
    }
    const handleForwardTab = e => {
        if (document.activeElement === lastFocus) {
            e.preventDefault();
            firstFocus.focus();
        }
    }
    const onKeyDown = e => {
        switch (e.key) {

            case "Escape":
            case "Esc":
                setMenuOpen(false);
                break;

            case "Tab":
                if (menuFocus && menuFocus.length === 1) {
                    e.preventDefault();
                    break;
                }
                if (e.shiftKey) {
                    handleBackwardTab(e);
                } else {
                    handleForwardTab(e);
                }
                break;

            default: break;
        }
    };

    const onResize = e => {
        if (e.currentTarget.innerWidth > 768) {
            setMenuOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', onResize);
        setFocus();
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', onResize);
        }
    }, []);

    const wrapperRef = useRef();
    useOnClickOutside(wrapperRef, () => setMenuOpen(false));

    return (
        <StyledMenu>
            <Helmet>
                <body className={menuOpen ? ' loaded darkblur' : ' loaded'} />
            </Helmet>
            <div ref={wrapperRef}>
                <StyledHamburgerButton ref={buttonRef}>
                    <Hamburger toggled={menuOpen} toggle={toggleMenu} size={25} />
                </StyledHamburgerButton>

                <StyledSidebar menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
                    <nav ref={navRef}>
                        {navLinks && (
                            <ol>
                                {navLinks.map(({ url, name, location }, i) => (
                                    <li key={i}>
                                        {location === "internal" ? (
                                            <Link to={url} onClick={() => setMenuOpen(false)}>
                                                {name}
                                            </Link>
                                        ) : (
                                            <a href={url} target="_blank" rel="noreferrer">{name}</a>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        )}
                        {/* <a href="/resume.pdf" className="resume-link">Resume</a> */}
                    </nav>
                </StyledSidebar>
            </div>
        </StyledMenu>
    )
};

export default MobileNav;