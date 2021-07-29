import React, {useState, useEffect} from "react"
import styled from "styled-components";
import { Link } from "gatsby"
import { hero } from "../config";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const NFMainContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const NFTitle = styled.h1`
    color: #64ffda;
    font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
    font-size: clamp(100px, 25vw, 200px);
    line-height: 1;
`;
const NFSub = styled.h2`
    font-size: clamp(30px, 5vw, 50px);
    font-weight: 400;
`;
const NFBtn = styled(Link)`
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
`;

const NotFoundPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), hero.animation.delay);
        return () => clearTimeout(timeout);
    },[]);
    return (
        <div>
            <TransitionGroup component={null}>
                {isMounted && (
                    <CSSTransition timeout={500} className="fadeup">
                        <NFMainContainer className="fillheight">
                            <NFTitle>404</NFTitle>
                            <NFSub>Page Not Found</NFSub>
                            <NFBtn to="/">Go Home</NFBtn>
                        </NFMainContainer>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}

export default NotFoundPage
