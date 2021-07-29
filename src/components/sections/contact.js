import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import revealOnScroll from '../../utils/scrollReveal';
import { scrollRevealConfig, email } from '../../config';
import { contact } from '../../config';

const ContactSection = styled.section`
    max-widith: 600px;
    margin: 0 auto 100px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media(max-width: 768px) {
        margin: 0 auto 50px;
    }

    .overline {
        display: block;
        margin-bottom: 20px;
        color: #64ffda;
        font-family: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;
        font-size: 16px;
        font-weight: 400;

        &:before {
            bottom: 0;
            font-size: 14px;
        }
        &:after{
            display: none;
        }
    }

    .title {
        font-size: clamp(40px, 5vw, 60px);
    }
    .email-link {
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
    }
    p{
        max-width: 600px;
        text-align: center;
    }
`;

const Contact = () => {
    const revealContact = useRef(null);
    useEffect(() => {
        revealOnScroll.reveal(revealContact.current, scrollRevealConfig);
    }, [revealContact]);
    return (
        <ContactSection id="contact" ref={revealContact}>
            <h2 className="overline">02. What's Next?</h2>
            <h2 className="title">{contact.heading}</h2>
            <p>
                {contact.blurb}
            </p>
            <a className="email-link" href={`mailto:${email}`}>Say Hello</a>
        </ContactSection>
    )
}

export default Contact;