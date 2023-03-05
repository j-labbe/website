import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledTags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
    width: 100%;

    scrollbar-color: transparent;
    transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
    &::-webkit-scrollbar {
        background: transparent;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const StyledTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(31, 43, 69);
    height: 20px;
    font-size: 14px;
    margin: ${props => props.margin ? `${props.margin}` : `0`}px;
    border-radius: 10px;
    margin: 0 3px;
    margin-bottom: 30px;
    color: #8892b0;
    cursor: pointer;
    transition: background-color 0.2s cubic-bezier(0.645,0.045,0.355,1), background-color 0.2s cubic-bezier(0.645,0.045,0.355,1);

    a {
        padding: 10px 10px;
        outline: none;
        width: 100%;
        transition: color 0.2s cubic-bezier(0.645,0.045,0.355,1) !important;

        
    }

    &:hover {
        color: #000 !important;
        background-color: #64ffda;
    }
`;

const Tags = ({ tags, margin }) => (
    <StyledTags>
        {tags && tags.split(",").map((tag, i) => (
            <StyledTag key={i} margin={margin}>
                <Link to={`/tag/${tag}`}>
                    #{tag}
                </Link>
            </StyledTag>
        ))}
    </StyledTags>
);

export default Tags;