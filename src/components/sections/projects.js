import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import revealOnScroll from '../../utils/scrollReveal';
import { scrollRevealConfig, projects } from '../../config';
import { graphql, useStaticQuery } from 'gatsby';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Project from '../Project';

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

const Projects = ({ fullPage }) => {

    const isBrowser = () => typeof window !== "undefined";
    const isHome = isBrowser() && window.location.pathname === '/';

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
    }, [revealProjects, isHome]);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <ProjectStyle id="projects" ref={revealProjects}>
            {fullPage ? (
                <div className="fullpage-heading">
                    <h1>Projects</h1>
                </div>
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
                                <Project key={i} options={{
                                    key: i,
                                    title: project.node.frontmatter.title,
                                    postLink: `/projects/${project.node.slug}`,
                                    projectLink: project.node.frontmatter.projectLink,
                                    description: project.node.frontmatter.description,
                                    tags: project.node.frontmatter.tags,
                                    revealInstance: revealProjects,
                                    truncateLength: 56,
                                    tagMargin: fullPage ? 2 : 0
                                }} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </StyledProjectsGrid>
            </div>
        </ProjectStyle >
    );
};

export default Projects;