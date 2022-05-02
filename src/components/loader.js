import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import styled from 'styled-components';

// creates a placeholder to make a clean loading style
// sometimes the svg will render incorrectly as the
// page loads. fix with styled components + useState
const Placeholder = styled.div`

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #040d21;
    z-index: 98;
    display: flex;
    justify-content: center;
    align-items: center;

    .loader-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        opacity: ${props => (props.isMounted ? 1 : 0)};
        width: 100%;

        .ml14 {
            font-weight: 800;
            font-size: 3em;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            
        }

        .ml14 .text-wrapper {
            position: relative;
            display: inline-block;
            padding-top: 0.1em;
            padding-right: 0.05em;
            padding-bottom: 0.15em;
        }

        .ml14 .loader-line {
            opacity: 0;
            position: absolute;
            left: 0;
            height: 2px;
            width: 100%;
            background-color: #fff;
            transform-origin: 100% 100%;
            bottom: 0;
            margin: 0;
        }

        .ml14 .letter {
            display: inline-block;
            line-height: 1em;
        }
    }
`;

const Loader = ({ onFinishLoad }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const animate = () => {
            anime.timeline({
                complete: () => onFinishLoad()
            })
                .add({
                    targets: '.ml14 .loader-line',
                    scaleX: [0, 1],
                    opacity: [0.5, 1],
                    easing: "easeInOutExpo",
                    duration: 900
                }).add({
                    targets: '.ml14 .letter',
                    opacity: [0, 1],
                    translateX: [40, 0],
                    translateZ: 0,
                    scaleX: [0.3, 1],
                    easing: "easeOutExpo",
                    duration: 800,
                    offset: '-=600',
                    delay: (el, i) => 150 + 25 * i
                }).add({
                    targets: '.ml14',
                    opacity: 0,
                    duration: 1000,
                    easing: "easeOutExpo",
                    delay: 600
                }).add({
                    targets: '.loader-backdrop',
                    duration: 200,
                    easing: 'easeInOutQuart',
                    opacity: 0,
                    zIndex: -1
                });
        };
        const timeout = setTimeout(() => setIsMounted(true), 10);
        animate();
        return () => clearTimeout(timeout);
    }, [onFinishLoad]);

    return (
        <div>
            <div className="loader-backdrop">
                <Placeholder isMounted={isMounted}>
                    <div className="loader-container">
                        <h1 className="ml14">
                            <span className="text-wrapper">
                                <span className="letters">
                                    <span className="letter">J</span>
                                    <span className="letter">a</span>
                                    <span className="letter">c</span>
                                    <span className="letter">k</span>
                                    <span className="letter">&nbsp;</span>
                                    <span className="letter">L</span>
                                    <span className="letter">a</span>
                                    <span className="letter">b</span>
                                    <span className="letter">b</span>
                                    <span className="letter">e</span>

                                </span>
                                <span className="loader-line"></span>
                            </span>
                        </h1>
                    </div>
                </Placeholder>
            </div>
        </div>
    );
}

export default Loader;