import React from 'react';
import styled from 'styled-components';
import { social } from '../config';

const FooterStyle = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: auto;
    min-height: 70px;
    padding: 15px;
    text-align: center;
    color: #a8b2d1;
`;

const SocialLinks = styled.div`
    display: block;
    @media(max-width: 768px) {
        display: block;
        width: 100%;
        max-width: 270px;
        margin: 0 auto 10px;
        color: #a8b2d1;
    }
    ul{
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        padding: 0;
        margin: 0;
        list-style: none;

        a{
            padding: 10px;

            svg {
                width: 20px !important;
                height: 20px !important;
            }
        }
    }
`;

const Footer = () => {
    return (
        <FooterStyle>
            <SocialLinks>
                <ul>
                    {
                        social && social.map(({ name, url, Logo }, i) => (
                            <li key={i}>
                                <a href={url} aria-label={name}>
                                    {Logo}
                                </a>
                            </li>
                        )
                        )
                    }
                </ul>
            </SocialLinks>
        </FooterStyle>
    )
};

export default Footer;