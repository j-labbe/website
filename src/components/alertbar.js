import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import isSupported from '../utils/supportedBrowser';

const StyledAlert = styled.div`
    position: fixed;
    top: 0;
    max-height: 30px;
    width: 100%;
    font-family: "Calibre", "Inter", "San Francisco", "SF Pro Text", -apple-system, system-ui, sans-serif;
    font-size: 13px;
    letter-spacing: 1px;
    margin: auto;
    padding: 1px;
    padding-bottom: 0;
    text-align: center;
    word-wrap: normal;
    background-color: #233554;
    display: block;
    z-index: 95;
    transform: ${props => (props.showAlert ? `translateY(0)` : `translateY(-30px)`)};
    transition: all 700ms cubic-bezier(0.645,0.045,0.355,1);
`;

const AlertBar = () => {

    const [showAlert, setShowAlert] = useState(false);

    let show = false,
    timeout = true,
    message = "Some features of this site may be displayed incorrectly. Please update your browser.";

    if (typeof navigator !== 'undefined') {
        show = !isSupported(navigator);
    }

    useEffect(() => {
        if(!show) return;
        setTimeout(() => {
            setShowAlert(true);
        }, 3510);
        const time = typeof timeout === 'number' ? timeout : 10000;
        if(timeout && show){
            setTimeout(() => {
                setShowAlert(false);
            }, time + 3510);
        }
    },[show, timeout]);

    return (
        <StyledAlert showAlert={showAlert}>
            {message}
        </StyledAlert>
    )
};
export default AlertBar;