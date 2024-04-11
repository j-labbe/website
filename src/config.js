import React from "react";
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin, IoLogoTiktok } from "react-icons/io5";

const config = {
    email: 'mail@jacklabbe.com',
    social: [
        {
            name: 'GitHub',
            url: 'https://github.com/j-labbe',
            Logo: <IoLogoGithub />
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/jack-labbe/',
            Logo: <IoLogoLinkedin />
        }
    ],
    // TODO (2/9/2023): announcements banner feature
    // idea: figure out how to create announcements without requiring a redeploy in netlify
    banner: {
        show: false,
        type: 'info',
        message: ''
    },
    navLinks: [
        {
            name: 'About',
            url: '/#about',
            location: 'internal'
        },
        {
            name: 'Projects',
            url: '/projects',
            location: 'internal'
        },
        {
            name: 'Contact',
            url: '/#contact',
            location: 'internal'
        },
        {
            name: 'Book a Meeting',
            url: 'https://appointmentthing.com/jacklabbe/meeting',
            location: 'external'
        }
    ],
    hero: {
        animation: {
            delay: 650
        },
        section1: {
            text: ''
        },
        section2: {
            text: 'Jack Labbe'
        },
        section3: {
            text: 'Software and IT Consultant'
        },
        section4: {
            text: ''
        }
    },
    about: {
        heading: 'About Me',
        bio: [
            'Hey! My name is Jack.',
            'As a passionate technology enthusiast, I strive to provide clients with the latest and greatest technology solutions. From Data Warehouses and Custom ETL Pipelines to dynamic frontend user-facing experiences, my goal is to empower clients to understand their data and users, and enable them to push the boundaries of their business.'
        ],
        skills: [
            'JavaScript (ESNext)',
            'TypeScript',
            'Python',
            'Node.js',
            'React',
            'AWS',
            'Docker',
            'Linux'
        ]
    },
    projects: {
        heading: 'Projects'
    },
    contact: {
        heading: 'Get In Touch',
        blurb: 'My inbox is always open. Feel free to inquire with any opportunities or just to say hi!'
    },
    scrollRevealConfig: {
        origin: 'bottom',
        distance: '60px',
        duration: 500,
        delay: 200,
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        scale: 1,
        easing: 'cubic-bezier(0, 0.55, 0.45, 1)',
        mobile: true,
        reset: false,
        useDelay: 'always',
        viewFactor: 0.15,
        viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
    },
}

export const { email, social, navLinks, hero, about, projects, contact, scrollRevealConfig } = config;

export default config;
