import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navLinks } from '../config';
import MobileNav from './mobilenav';

const Header = styled.header`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    position: fixed;
    top: 0px;
    z-index: 11;
    padding: 0px 50px;
    width: 100%;
    height: 100px;
    background-color: ${props => (props.isMounted ? `rgba(4, 13, 33, 0.75)` : 'transparent')};
    backdrop-filter: blur(10px);
    transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
    filter: none !important;
    pointer-events: auto !important;
    user-select: auto !important;

    @media(max-width: 1080px){
        padding: 0 40px;
    }
    @media(max-width: 768px) {
        padding: 0 25px;
    }
`;

const Nav = styled.nav`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    width: 100%;
    color: #8892b0;
    font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
    counter-reset: item 0;
    z-index: 12;

    .logo {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        font-family: 'Alliance No.1', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        font-weight: 800;
        cursor: default;
        letter-spacing: 0.03em;
        margin: 0;
    }
`;

const Links = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;

    @media(max-width: 768px) {
        display: none;
    }

    ol {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        padding: 0;
        margin: 0;
        list-style: none;

        li{
            margin: 0 5px;
            position: relative;
            font-size: 13px;
            counter-increment: item 1;

            a{
                padding: 10px;

                &:before {
                    content: '0' counter(item) '.';
                    margin-right: 5px;
                    color: #64ffda;
                    font-size: 12px;
                    text-align: right;
                }
            }
        }
    }

    .resume-button {
        color: #64ffda;
        background-color: transparent;
        border: 1px solid #64ffda;
        border-radius: 4px;
        padding: 0.75rem 1rem;
        font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
        line-height: 1;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        margin-left: 15px;
        font-size: 13px;

        &:hover,
        &:focus{
            background-color: rgba(100,255,218,0.1);
            transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        }
    }
`;

const Navigation = ({ isHome }) => {
    const [isMounted, setIsMounted] = useState(!isHome);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    const timeout = isHome ? 2000 : 0;
    const fadeClass = isHome ? 'fade' : '';
    const fadeDownClass = isHome ? 'fadedown' : '';
    const resumeLink = (''
        // <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener norefferer">Resume</a>
    );


    return (
        <Header isMounted={isMounted}>
            <Nav>
                <TransitionGroup component={null}>
                    {isMounted && (
                        <CSSTransition classNames={fadeClass} timeout={timeout}>
                            <h4 className="logo"><Link to="/">Jack Labbe</Link></h4>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                <Links>
                    <ol>
                        <TransitionGroup component={null}>
                            {isMounted &&
                                navLinks &&
                                navLinks.map(({ url, name, location }, i) => (
                                    <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                                        {location === 'internal' ? (
                                            <Link to={url}>{name}</Link>
                                        ) : (
                                            <a href={url} target="_blank" rel="noreferrer">{name}</a>
                                        )}
                                        </li>
                                    </CSSTransition>
                                ))}
                        </TransitionGroup>
                    </ol>
                    <TransitionGroup component={null}>
                        {isMounted && (
                            <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                                <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                                    {resumeLink}
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </Links>
                <TransitionGroup component={null}>
                    {isMounted && (
                        <CSSTransition classNames={fadeClass} timeout={timeout}>
                            <MobileNav />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </Nav>
        </Header>
    );
}
export default Navigation;