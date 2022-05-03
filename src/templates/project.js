import React from 'react';
import { graphql, Link } from "gatsby";
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Layout from "../components/layout";
import { MDXProvider } from "@mdx-js/react";
import CodeWindow from '../components/CodeWindow';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { StaticImage } from 'gatsby-plugin-image';
import Seo from '../components/Seo';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const StyledProjectContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 125px;
    min-height: 60vh;
    width: 100%;

    .inner-wrapper {
        max-width: 1000px;
        @media (max-width: 768px) {
            max-width: 100%;
        }
    }

    .breadcrumb {
        color: 8892b0;
        text-decoration: none;
        a {
            outline: none;
            color: #8892b0;
            .arrow {
                position: relative;
                left: 0;
                transition: left 0.2s cubic-bezier(0.645,0.045,0.355,1);
            }
            transition: color 0.2s cubic-bezier(0.645,0.045,0.355,1);
        }

        &:hover {
            a {
                color: #64ffda;
                .arrow {
                    left: -5px;
                }
            }
        }
    }
`;

const StyledProjectHeader = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 50px;
    width: 100%;
    .tag {
        margin-right: 10px;
    }
    h1 {
        text-align: center;
        font-weight: 800;
    }
    h3 {
        text-align: center;
        font-weight: 400;
        color: #8892b0;
    }
`;

const StyledProjectContent = styled.div`
    margin-bottom: 50px;

    h1 {
        margin: 40px 0;
        font-weight: 800;
    }

    h2 {
        margin: 30px 0;
    }

    h3 {
        margin: 30px 0;
    }

    h4 {
        margin: 10px 0;
    }

    p {
        margin: 1em 0;
        line-height: 1.5;
        color: #eaeaea;
        font-size: 18px;
    }

    a {
        color: #8892b0;
        text-decoration: underline;
        transition: color 0.2s cubic-bezier(0.645,0.045,0.355,1);
        &:hover {
            color: #64ffda;
        }
    }
    ul, ol {
        li {
            color: #8892b0;
            transition: color 0.2s cubic-bezier(0.645,0.045,0.355,1);
            cursor: default;
            &:hover {
                color: #64ffda;
            }
        }
    }

    details {
        margin: 10px 0;
        summary {
            cursor: pointer;
            color: #8892b0;
            transition: color 0.2s cubic-bezier(0.645,0.045,0.355,1);
            &:hover {
                color: #64ffda;
            }
        }
    }

    code {
        color: #8892b0;
    }

    small {
        color: #8892b0;
    }

    img {
        width: auto;
    }
`;

const StyledTags = styled.div`
    display: flex;
    flex-direction: row;
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
    margin: 0 5px;
    border-radius: 10px;
    margin-bottom: 30px;
    cursor: pointer;
    transition: color 0.2s cubic-bezier(0.645,0.045,0.355,1), background-color 0.2s cubic-bezier(0.645,0.045,0.355,1);

    a {
        color: #fff;
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

const MDXCodeBlock = ({ children }) => {
    const matches = children.props.className.match(/language-(?<lang>.*)/);
    return <CodeWindow language={matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''} source={children.props.children} title="Code" />;
}

const components = {
    p: props => <p {...props}>{props.children}</p>,
    h1: props => <h1 {...props}>{props.children}</h1>,
    h2: props => <h2 {...props}>{props.children}</h2>,
    h3: props => <h3 {...props}>{props.children}</h3>,
    pre: props => <MDXCodeBlock {...props} />,
    ul: props => <ul {...props} />,
    li: props => <li {...props} />
}

const ProjectTemplate = ({ data, location }) => {

    // TODO: show an error dialog or page
    if (!data || !data.mdx) return (<h3>Error fetching data.</h3>);

    const { frontmatter, body } = data.mdx;
    const { title, description, date, image, projectLink, tags } = frontmatter;

    return (
        <Layout location={location}>
            <Seo title={`Jack Labbe - ${title}`} />
            <StyledProjectContainer>
                <TransitionGroup component={null}>
                    <CSSTransition key="project" timeout={2000} classNames="fastfadeup">
                        <div className="inner-wrapper">
                            <span className="breadcrumb">
                                <Link to="/projects"><span className="arrow">&larr;</span> All Projects</Link>
                            </span>
                            <StyledProjectHeader>
                                <h1>{title}</h1>
                                <h3>{description}</h3>
                            </StyledProjectHeader>
                            {/* {image && <StaticImage src={image} />} */}
                            <StyledProjectContent>
                                <MDXProvider components={components}>
                                    <MDXRenderer>
                                        {body}
                                    </MDXRenderer>
                                </MDXProvider>
                            </StyledProjectContent>
                            <StyledTags>
                                {tags && tags.split(",").map((tag, i) => (
                                    <StyledTag key={i}>
                                        <Link to={`/tag/${tag}`}>
                                            #{tag}
                                        </Link>
                                    </StyledTag>
                                ))}
                            </StyledTags>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </StyledProjectContainer>
        </Layout>
    );
}

export default ProjectTemplate;

export const query = graphql`
    query($slug: String!) {
        mdx(fileAbsolutePath: {regex: "/projects/"}, slug: {eq: $slug}) {
            body
            frontmatter {
              title
              description
              image
              projectLink
              date
              tags
            }
          }
    }
`