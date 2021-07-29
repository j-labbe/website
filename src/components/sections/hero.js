import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { email, hero } from '../../config';

const HeroSection = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        padding: 0;
    @media (max-width: 480px) and (min-height: 700px) {
        padding-bottom: 10vh;
    }

    h1 {
        margin: 0 0 30px 4px;
        color: #64ffda;
        font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
        font-size: clamp(14px, 5vw, 16px);
        font-weight: 400;
    }
    h3 {
        margin-top: 10px;
        color: #8892b0;
        line-height: 0.9;
    }
    p {
        margin: 20px 0 0;
        max-width: 540px;
    }
    .cta-btn{
        color: #64ffda;
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
        margin-top: 50px;
        
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

const HeroGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    @media(max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 50px;
    }

`;

const HeroGridChild = styled.div`
    place-self: center;
    align-self: center;
    @media(max-width: 768px) {
        margin: auto;
        margin-bottom: 35px!important;
    }
    @media(min-width: 769px) and (max-width: 1080px) {
        &:nth-child(1){
            margin-right: 30px;
            margin-left: -30px;
        }
    }
`;
const StyledPic = styled.div`
    position: relative;
    max-width: 300px;
    border-radius: 25px;
    will-change: transform;

    @media (max-width: 768px) {
        margin: 50px auto 0;
        width: 70%;
    }

    .wrapper{
        box-shadow: 0 20px 30px -15px rgba(2,12,27,0.7);
        transform: scale(1);
        transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        display: block;
        position: relative;
        width: 100%;
        border-radius: inherit;
        background-color: transparent;
        will-change: transform;

        &:hover,
        &:focus {
            background: transparent;
            outline: 0;
            transform: scale(0.995);
            box-shadow: 0 20px 5px -15px rgba(2,12,27,0.7);
            border-radius: inherit;

            &:after {
                top: 15px;
                left: 15px;
                border-radius: inherit;
            }
            .img {
                filter: none;
                mix-blend-mode: normal;
                border-radius: inherit;
                will-change: transform;
            }
        }
        .img {
            position: relative;
            border-radius: inherit;
            transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
            will-change: transform;
        }
        img{
            border-radius: inherit;
            will-change: transform;
        }
        picture{
            border-radius: inherit;
            will-change: transform;
        }
    }
`;

const Hero = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsMounted(true), hero.animation.delay);
    }, []);

    const top = <h1>{hero.section1.text}</h1>;
    const middle = <h2 className="big-heading">{hero.section2.text}</h2>;
    const bottom = <p className="medium-heading">{hero.section3.text}</p>;
    const more = <p className="medium-heading">{hero.section4.text}</p>
    const cta = <a href={`mailto:${email}`} className="cta-btn">Get In Touch</a>;

    const elements = [top, middle, bottom, more, cta];

    return (
        <TransitionGroup component={null}>
            <CSSTransition key={'hero-section'} classNames="fastfadeup" timeout={2000}>
                <HeroSection>
                    <HeroGrid>
                        <HeroGridChild>
                            <TransitionGroup component={null}>
                                {isMounted ? (
                                    <CSSTransition key={'hero-image'} classNames="fastfadeup" timeout={2000}>
                                        <StyledPic>
                                            <div className="wrapper">
                                                <StaticImage
                                                    className="img"
                                                    src="../../assets/images/img/jack.jpeg"
                                                    width={500}
                                                    quality={95}
                                                    loading="eager"
                                                    fomats={['AUTO', 'WEBP', 'AVIF']}
                                                    alt="Headshot"
                                                    style={{ borderRadius: '25px' }}
                                                    imgStyle={{ borderRadius: '25px' }}
                                                />
                                            </div>
                                        </StyledPic>
                                    </CSSTransition>
                                ) : ''}
                            </TransitionGroup>
                        </HeroGridChild>
                        <HeroGridChild>
                            <TransitionGroup component={null}>
                                {isMounted && elements.map((item, i) => (
                                    <CSSTransition key={i} classNames="fastfadeup" timeout={2000}>
                                        <div style={{ transitionDelay: `${i + 1}00ms` }} className="hero-center">{item}</div>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </HeroGridChild>
                    </HeroGrid>
                </HeroSection>
            </CSSTransition>
        </TransitionGroup >
    );
};

export default Hero;