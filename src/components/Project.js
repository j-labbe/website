import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { IoInformationCircleOutline, IoGlobeOutline } from "react-icons/io5";
import Tags from './Tags';

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
            margin-bottom: 10px;

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
                    width: 20px;
                    height: 20px;

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


const Project = ({ options }) => {

    const { key, title, postLink, projectLink, description, tags, revealInstance, truncateLength, tagMargin } = options;

    const truncate = (str, n) => str && typeof str === "string" && str.length > n ? str.substring(0, n - 1) + '...' : str;

    return (
        <StyledProject
            key={key}
            ref={revealInstance ? el => revealInstance.current = el : undefined}
            style={{ transitionDelay: `${key + 1}00ms` }}>
            <div className="project-inner">
                <div className="header">
                    <div className="project-title">
                        {title}
                    </div>
                    <div className="links">
                        <div className="project-link">
                            {projectLink && (
                                <a href={projectLink} target="_blank" rel="noreferrer"><IoGlobeOutline /></a>
                            )}
                        </div>
                        <div className="project-link">
                            {postLink && (
                                <Link to={postLink}><IoInformationCircleOutline /></Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="project-description">
                    {description && truncate(description, truncateLength)}
                </div>
                <div className="footer">
                    <Tags tags={tags} margin={tagMargin || 0} />
                </div>
            </div>
        </StyledProject>
    );
}

export default Project;