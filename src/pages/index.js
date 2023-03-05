import "../assets/styles/initialstate.css";
import 'react-tooltip/dist/react-tooltip.css'
import React from 'react';
import GlobalStyle from '../assets/styles/GlobalStyle';
import Layout from '../components/layout';
import About from '../components/sections/about';
import Hero from '../components/sections/hero';
import Contact from '../components/sections/contact';
import Projects from '../components/sections/projects';
import Seo from '../components/Seo';

const IndexPage = ({ location }) => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <div className="fillHeight">
                <Seo title="Jack Labbe - Home" description={"Jack Labbe's website - view the homepage to see details"} />
                <Layout location={location}>
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                </Layout>
            </div>
        </React.Fragment>
    );
};

export default IndexPage;