import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import revealOnScroll from '../../utils/scrollReveal';
import { StaticImage } from 'gatsby-plugin-image';
import { scrollRevealConfig, projects } from '../../config';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { IoInformationCircleOutline, IoGlobeOutline } from "react-icons/io5";

const ProjectStyle = styled.section`
    max-width: 1000px;
    margin: auto;
    margin-bottom: 50px;
    .hide-content {
        width: 100%;
        height: 100%;
        background-color: #040d21;
    }
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
            margin-bottom: 40px;
        }

        .center-text {
            h3 {
                margin: 0 0 10px;
                color: #8892b0;
                font-weight: 400;
                font-size: 20px;
            }
        }
    }
    @media (max-width: 768px) {
        margin-bottom: 50px;
    }
    .fullpage-heading {
        margin-top: 120px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            font-weight: 800;
            color: #fff;
        }

        h3 {
            margin-top: 10px;
            color: #8892b0;
            font-size: 20px;
            font-weight: 400;
        }
    }
`;

const StyledProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 200px;
    grid-gap: 15px;
    height: auto;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    a {
        color: inherit;
        &:hover {
            color: inherit;
        }
        &:focus {
            outline: none;
        }
    }

    .project-grid-transition-enter {
        opacity: 0.01;
        transform: translateY(60px);
        transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
    }
    .project-grid-transition-enter-active {
        opacity: 1;
        transform: translateY(0px);
        transition: opacity 500ms cubic-bezier(0, 0.55, 0.45, 1), transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
    }
`;

const StyledProject = styled.div`
    position: relative;
    cursor: default;
    height: 100%;
    transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
    
    &:hover {
        .project-inner {
            transform: translateY(-7px);
        }
    }

    .project-inner {
        display: flex;
        /* justify-content: space-between; */
        align-items: flex-start;
        flex-direction: column;
        position: relative;
        height: 100%;
        width: 100%;
        padding: 1.35rem 1.15rem;
        border-radius: 10px;
        background-color: #13203d;
        box-shadow: 0 10px 30px -15px rgba(2,10,27,0.7);
        transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);

        &:hover {
            box-shadow: 0 20px 30px -15px rgba(2,10,27,0.7);
            /* margin-bottom: 35px; */
            transform: translateY(-10px);

            .project-description {
                color: #64ffda;
            }

        }

        .header {
            display: flex;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;

            .project-title {
                color: #fff;
                font-weight: 800;
                font-size: 20px;
            }

            .links {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                .project-link a {
                    color: #8892b0;
                    margin: 0 3px;
                    transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);

                    &:hover {
                        color: #64ffda;
                    }
                }
            }
        }

        .project-description {
            font-size: 18px;
            width: 100%;
            color: #8892b0;
            max-height: 90px;
            overflow-y: scroll;
            padding-bottom: 5px;
            scrollbar-width: thin;
            scrollbar-color: #495670 #0a192f;
            transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);

            &::-webkit-scrollbar {
                width: 12px;
            }

            &::-webkit-scrollbar-track {
                background: #13203d;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;
            }
        }
    }

    .project-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        position: relative;
        height: 100%;
        padding: 2rem 1.75rem;
        border-radius: 10px;
        background-color: #071533;
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #13203d;
        width: 100%;
        max-height: 50px;
        padding: 10px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
`;

const StyledTags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`;

const StyledTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(21, 33, 59);
    height: 20px;
    font-size: 14px;
    margin: 0;
    border-radius: 10px;
    margin-bottom: 30px;
    cursor: pointer;
    transition: color 0.2s cubic-bezier(0.645,0.045,0.355,1), background-color 0.2s cubic-bezier(0.645,0.045,0.355,1);

    a {
        color: #8892b0;
        padding: 10px 10px;
        outline: none;
        width: 100%;
        transition: all 0.2s cubic-bezier(0.645,0.045,0.355,1);
    }

    &:hover {
        background-color: #64ffda;
        color: #000 !important;
    }

    a:hover {
        color: #000;
    }
`;

const Projects = ({ fullPage }) => {

    const truncate = (str, n) => str && typeof str === "string" && str.length > n ? str.substring(0, n - 1) + '...' : str;

    const isHome = window && window.location.pathname === '/';

    // TODO: show more button (only needed for more than eight projects)
    const [showMore, setShowMore] = useState(false);

    // isMounted state only applies on fullpage renders of this component
    const [isMounted, setIsMounted] = useState(isHome);

    const results = useStaticQuery(graphql`{
        allMdx(sort: {fields: frontmatter___date, order: DESC}) {
            edges {
                node {
                    frontmatter {
                        date
                        description
                        image
                        projectLink
                        tags
                        title
                    }
                    slug
                }
            }
        }
    }`);
    const LIMIT = 8;
    const data = results.allMdx.edges;
    const projectList = data.map((proj) => proj);
    const firstSix = data.slice(0, LIMIT);
    const projectsToShow = fullPage || showMore ? projectList : firstSix;

    const revealProjects = useRef(null);

    useEffect(() => {
        if (isHome) {
            revealOnScroll.reveal(revealProjects.current, scrollRevealConfig);
        }
    }, [revealProjects]);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <ProjectStyle id="projects" ref={revealProjects}>
            {fullPage ? (
                <>
                    <div className="fullpage-heading">
                        <h1>Projects</h1>
                    </div>
                </>
            ) : (
                <h2 className="numbered-heading">
                    <span className="number">02.</span>
                    <span className="text">
                        {projects.heading}
                    </span>
                    <div className="line"></div>
                </h2>
            )}
            <div className="inner">
                <div className="center-text">
                    <h3>Discover projects I have worked on.</h3>
                </div>
                <StyledProjectsGrid>
                    <TransitionGroup component={null}>
                        {isMounted && projectsToShow && projectsToShow.map((project, i) => (
                            <CSSTransition key={i} classNames="project-grid-transition" timeout={2000}>
                                <StyledProject key={i}
                                    ref={el => revealProjects.current = el}
                                    style={{ transitionDelay: `${i + 1}00ms` }}>
                                    <div className="project-inner">
                                        <div className="header">
                                            <div className="project-title">
                                                {project.node.frontmatter.title}
                                            </div>
                                            <div className="links">
                                                <div className="project-link">
                                                    {project.node.frontmatter.projectLink && (
                                                        <a href={project.node.frontmatter.projectLink} target="_blank" rel="noreferrer"><IoGlobeOutline /></a>
                                                    )}
                                                </div>
                                                <div className="project-link">
                                                    {project.node.slug && (
                                                        <Link to={`/projects/${project.node.slug}`}><IoInformationCircleOutline /></Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="project-description">{project.node.frontmatter.description && truncate(project.node.frontmatter.description, 56)}</div>
                                        <div className="footer">
                                            <StyledTags>
                                                {project.node.frontmatter.tags && project.node.frontmatter.tags.split(",").map((tag, i) => (
                                                    <StyledTag key={i}>
                                                        <Link to={`/tag/${tag}`}>
                                                            #{tag}
                                                        </Link>
                                                    </StyledTag>
                                                ))}
                                            </StyledTags>
                                        </div>
                                    </div>
                                </StyledProject>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </StyledProjectsGrid>
            </div>
        </ProjectStyle >
    );
};

export default Projects;