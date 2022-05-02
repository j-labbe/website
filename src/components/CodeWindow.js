import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark/index.js";

const StyledHeader = styled.div`
    display: flex;
    padding: 18px 14px 0px 14px;
    background: #13203d;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

const Name = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
`;

const Content = styled.div`
    overflow: auto;
    opacity: 1;
    transition: opacity 0.2s;
    > pre {
        margin: 0;
        text-align: initial;
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        font-size: 16px;
        .token-line:last-child {
            display: none;
        }
    }
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background: #13203d;
    scrollbar-width: thin;
    scrollbar-color: #495670 #0a192f;

    &::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }

    &::-webkit-scrollbar-track {
        background: #13203d;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #495670;
        border: 3px solid #13203d;
        border-radius: 10px;
    }
`;

const Window = styled.div`
    box-shadow: 0 20px 30px -15px rgba(2,12,27,0.7);
    transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
    max-width: 750px;
    min-width: 625px;
    @media (max-width: 768px) {
       max-width: 120%;
       min-width: 100%;
    }
    &:hover {
        box-shadow: 0 20px 5px -15px rgba(2,12,27,0.7);
    }
`;

const WindowWrapperFullWidth = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const darkTheme = { ...theme, plain: { ...theme, backgroundColor: "#13203d" } };

const CodeWindow = ({ className, title, language, source }) => (
    <WindowWrapperFullWidth>
        <Window className={className}>
            {title && <StyledHeader>
                <Name>{title}</Name>
            </StyledHeader>}
            <Content>
                <Highlight {...defaultProps} theme={darkTheme} code={source} language={language}>
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={className} style={{ ...style, padding: '20px' }}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </Content>
        </Window>
    </WindowWrapperFullWidth>
);

export default CodeWindow;