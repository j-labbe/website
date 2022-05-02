import React from 'react';
import '../assets/styles/css/style.css';
import Layout from '../components/layout';
import About from '../components/sections/about';
import Hero from '../components/sections/hero';
import Contact from '../components/sections/contact';
import Projects from '../components/sections/projects';
import Seo from '../components/Seo';

const IndexPage = ({ location }) => {
    return (
        <div className="fillHeight">
            <Seo title="Jack Labbe - Home" />
            <Layout location={location}>
                <Hero />
                <About />
                <Projects />
                <Contact />
            </Layout>
        </div>
    );
};

export default IndexPage;