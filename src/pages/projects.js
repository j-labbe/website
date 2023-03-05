import "../assets/styles/initialstate.css";
import 'react-tooltip/dist/react-tooltip.css'
import React from 'react';
import GlobalStyle from '../assets/styles/GlobalStyle';
import Layout from '../components/layout';
import Projects from '../components/sections/projects';
import Seo from '../components/Seo';

const ProjectsPage = ({ location }) => {
    const pageDescription = "View all of the projects Jack Labbe has posted. From data management to software engineering, Jack has completed a wide variety of projects!";
    return (
        <React.Fragment>
            <GlobalStyle />
            <div className="fillHeight">
                <Seo title="Jack Labbe - Projects" description={pageDescription} />
                <Layout location={location}>
                    <Projects fullPage={true} />
                </Layout>
            </div>
        </React.Fragment>
    );
};

export default ProjectsPage;