import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import revealOnScroll from '../../utils/scrollReveal';
import { scrollRevealConfig, email } from '../../config';
import { contact } from '../../config';

const ContactSection = styled.section`
    max-width: 600px;
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
        .norm {
            color: #fff;
        }
    }

    .title {
        font-size: clamp(40px, 5vw, 60px);
        font-weight: 800;
    }
    .email-link {
        color: var(--color-btn-primary-text);
        background-color: var(--color-btn-primary-bg);
        border-color: var(--color-btn-primary-border);
        box-shadow: var(--color-btn-primary-shadow), var(--color-btn-primary-inset-shadow);
        border-radius: 6px;
        padding: 0.75rem 1.25rem;
        font-size: 14px;
        font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
        /* transition: 100ms cubic-bezier(0.33, 1, 0.68, 1); */
        transition: all 0.2s cubic-bezier(0.645,0.045,0.355,1);
        margin-top: 30px;
        
        &:hover,
        &:focus,
        &:active {
            background-color: var(--color-btn-primary-hover-bg);
            outline: none;
            transform: scale(1.03);
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
            <h2 className="overline">03. <span className="norm">What's Next?</span></h2>
            <h2 className="title">{contact.heading}</h2>
            <p>
                {contact.blurb}
            </p>
            <a className="email-link" href={`mailto:${email}`}>Say Hello</a>
        </ContactSection>
    )
}

export default Contact;