import "../assets/styles/initialstate.css";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Layout from '../components/layout';
import Seo from '../components/Seo';
import Project from '../components/Project';
import GlobalStyle from "../assets/styles/GlobalStyle";

const PostStyle = styled.div`
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
                margin: 10px 0 10px;
                color: #8892b0;
                font-weight: 400;
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

const StyledPostsGrid = styled.div`
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


const TagPage = ({ data, pageContext, location }) => {

    const posts = data.allMdx.edges || [];
    const pageDescription = `Browse Jack Labbe's posts tagged #${pageContext.tag}`;

    const isBrowser = () => typeof window !== "undefined"

    const isHome = isBrowser() && window.location.pathname === '/';

    // isMounted state only applies on fullpage renders of this component
    const [isMounted, setIsMounted] = useState(isHome);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // all dynamic links will go to /projects/{slug}
    // while this isn't truly dynamic, it is a foundation
    // for future expansion.
    //
    // to be able to point to different paths (other than /projects/),
    // each post should have some attribute associated with it that
    // contains the full path

    return (
        <React.Fragment>
            <GlobalStyle />
            <div className="fillHeight">
                <Seo title={`Jack Labbe - #${pageContext.tag}`} description={pageDescription} />
                <Layout location={location}>
                    <PostStyle id="posts-with-tag">
                        <div className="fullpage-heading">
                            <h1>#{pageContext.tag}</h1>
                        </div>
                        <div className="inner">
                            <div className="center-text">
                                <h3>{posts.length} posts found</h3>
                            </div>
                            <StyledPostsGrid>
                                <TransitionGroup component={null}>
                                    {isMounted && posts && posts.map((project, i) => (
                                        <CSSTransition key={i} classNames="project-grid-transition" timeout={2000}>
                                            <Project key={i} options={{
                                                key: i,
                                                title: project.node.frontmatter.title,
                                                postLink: `/projects/${project.node.slug}`,
                                                projectLink: project.node.frontmatter.projectLink,
                                                description: project.node.frontmatter.description,
                                                tags: project.node.frontmatter.tags,
                                                truncateLength: 56
                                            }} />
                                        </CSSTransition>
                                    ))}
                                </TransitionGroup>
                            </StyledPostsGrid>
                        </div>
                    </PostStyle>
                </Layout>
            </div>
        </React.Fragment>
    );
};

export default TagPage;

export const pageQuery = graphql`
query($slugs: [String]) {
    allMdx(sort: {fields: frontmatter___date, order: DESC}, filter: {slug: {in: $slugs }}) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            description
            projectLink
          }
          slug
        }
      }
    }
  }
`