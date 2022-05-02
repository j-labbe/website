import React from 'react';
import '../assets/styles/css/style.css';
import Layout from '../components/layout';
import Projects from '../components/sections/projects';
import Seo from '../components/Seo';

const ProjectsPage = ({ location }) => {
    return (
        <div className="fillHeight">
            <Seo title="Jack Labbe - Projects" />
            <Layout location={location}>
                <Projects fullPage={true} />
            </Layout>
        </div>
    );
};

export default ProjectsPage;