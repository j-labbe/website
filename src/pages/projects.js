import "../assets/styles/initialstate.css";
import React from 'react';
import GlobalStyle from '../assets/styles/GlobalStyle';
import Layout from '../components/layout';
import Projects from '../components/sections/projects';
import Seo from '../components/Seo';

const ProjectsPage = ({ location }) => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <div className="fillHeight">
                <Seo title="Jack Labbe - Projects" />
                <Layout location={location}>
                    <Projects fullPage={true} />
                </Layout>
            </div>
        </React.Fragment>
    );
};

export default ProjectsPage;