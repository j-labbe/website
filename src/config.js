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
            name: 'Instagram',
            url: 'https://instagram.com/jack.labbe',
            Logo: <IoLogoInstagram />
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/jack-labbe/',
            Logo: <IoLogoLinkedin />
        },
        {
            name: 'TikTok',
            url: 'https://tiktok.com/@sheetwizard',
            Logo: <IoLogoTiktok />
        }
    ],
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
            text: 'Software Engineer, IT Consultant'
        },
        section4: {
            text: 'Finance and Business Intelligence & Analytics @ Saint Joseph\'s University'
        }
    },
    about: {
        heading: 'About Me',
        bio: [
            'Hey! My name is Jack, and I am building the future of the web / software.',
            'Right now I am a Finance and Business Intelligence & Analytics student at Saint Joseph\'s University in Philadelphia, PA. I also work as a freelance Software Engineer and IT Consultant.',
            'In early 2022 I completed a remote Computer Science class at Harvard University that helped me deepen my knowledge of the inner-workings of computers.',
            'Since 2021, I have worked with many companies around the United States building web apps to improve productivity and provide new insights.',
            'As someone who is highly motivated to create excellent products, services, and experiences, I welcome any opportunity that comes my way.',
            'Check out some of the technologies and platforms I\'ve been using recently:'
        ],
        skills: [
            'JavaScript (ESNext)',
            'TypeScript',
            'Python',
            'Node.js',
            'React',
            'AWS',
            'Docker',
            'Azure'
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