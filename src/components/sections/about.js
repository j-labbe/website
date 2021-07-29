import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import revealOnScroll from '../../utils/scrollReveal';
import { StaticImage } from 'gatsby-plugin-image';
import { scrollRevealConfig, about } from '../../config';

const AboutStyle = styled.div`
    max-width: 1000px;
    margin: auto;
    .inner {
        display: flex;
        flex-direction: column;
        gap: 10%;
        max-width: 1000px;
        margin: auto;
        align-items: center;
        justify-content: center;

        @media (max-width: 768px) {
            display: flex;
            margin-bottom:40px;
        }
    }
`;

const StyledText = styled.div`
    max-width: 750px;

    ul.skills-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(140px, 200px));
        grid-gap: 0 10px;
        padding: 0;
        margin: 20px 0 0 0;
        overflow: hidden;
        list-style: none;

        li {
            position: relative;
            margin-bottom: 10px;
            padding-left: 20px;
            font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
            font-size: 13px;
            cursor: default;
            transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
            &:before {
                content: '▹';
                position: absolute;
                left: 0;
                color: #64ffda;
                font-size: 14px;
                line-height: 12px;
            }
            &:hover {
                color: #64ffda;
                transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
            }
        }
    }
`;

const StyledPic = styled.div`
    position: relative;
    max-width: 600px;

    @media (max-width: 768px) {
        margin: 0 auto 40px;
    }

    .wrapper{
        box-shadow: 0 20px 30px -15px rgba(2,12,27,0.7);
        transform: scale(1);
        transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        display: block;
        position: relative;
        width: 100%;
        border-radius: 25px;
        background-color: transparent;

        &:hover,
        &:focus {
            background: transparent;
            outline: 0;
            transform: scale(0.995);
            box-shadow: 0 20px 5px -15px rgba(2,12,27,0.7);

            &:after {
                top: 15px;
                left: 15px;
            }
            .img {
                filter: none;
                mix-blend-mode: normal;
            }
        }
        .img-about {
            position: relative;
            border-radius: 25px;
            filter: grayscale(80%) contrast(1);
            max-width: 100%;
            max-height: 100%;
            transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        }
        &:before,
        &:after {
            content: '';
            display: block;
            position: absolute;
            border-radius: 25px;
            transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
        }
    }
`;

const About = () => {

    const revealAbout = useRef(null);

    useEffect(() => {
        revealOnScroll.reveal(revealAbout.current, scrollRevealConfig);
    }, [revealAbout]);

    const skills = about.skills;
    const bio = about.bio;

    return (
        <AboutStyle id="about" ref={revealAbout}>
            <h2 className="numbered-heading">
                {about.heading}
                <div className="line"></div>
            </h2>
            <div className="inner">
            <StyledPic>
                    <div className="wrapper">
                        <StaticImage
                            className="img-about"
                            src="../../assets/images/img/jack-in-action.jpeg"
                            width={700}
                            height={500}
                            quality={95}
                            fomats={['AUTO', 'WEBP', 'AVIF']}
                            alt="Jack in Action"
                        />
                    </div>
                </StyledPic>
                <StyledText>
                    <div>
                        {bio && bio.map((text, i) => (
                            <p key={i}>{text}</p>
                        ))}
                    </div>
                    <ul className="skills-list">
                        {skills && skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                </StyledText>
            </div>
        </AboutStyle>
    );
};

export default About;