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
            'Hey! My name is Jack.',
            'I am a versatile, analytical, jack-of-all-trades person focused on using software systems to maximize value of resources within businesses, improve operating efficiency, and assist employees and customers with inefficient workflows.',
            'Currently I am finishing my final semester at Saint Joseph’s University, double-majoring in Finance and Business Intelligence and Analytics.',
            'I am currently seeking companies that desire gritty, hardworking, and highly motivated individuals set on making a meaningful impact.',
            'Feel free to reach out if you have nay opportunities or if you would like to chat! Below is a list of technologies I am intimately familiar with, although the list is growing rapidly and will be updated frequently!'
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
