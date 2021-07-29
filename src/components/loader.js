import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import IconLoader from '../assets/images/loader';
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
    background-color: #020c1b;
    z-index: 98;
    display: flex;
    justify-content: center;
    align-items: center;

    .loader-container{
        transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        opacity: ${props => (props.isMounted ? 1 : 0)};
    }
`;

const Loader = ({ onFinishLoad }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const animate = () => {
            anime.timeline({
                complete: () => onFinishLoad()
            }).add({
                targets: '#circle path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutQuart',
                duration: 1500,
            }).add({
                targets: '#circle #J',
                duration: 1000,
                opacity: 1,
                easing: 'easeInOutQuart'
            }).add({
                targets: '#circle',
                delay: 500,
                duration: 300,
                easing: 'easeInOutQuart',
                opacity: 0,
                scale: 0.1
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
                        <IconLoader />
                    </div>
                </Placeholder>
            </div>
        </div>
    );
}

export default Loader;