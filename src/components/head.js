import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ location }) => {
    const { pathname, hash } = location;
    const seo = {
        title: 'Jack Labbe',
        description: 'Jack Labbe is a curious and ambitious person with a strong drive to deliver exceptional results within any field he does work.',
        url: `https://jacklabbe.com${pathname}`,
        hash: hash.substring(1).charAt(0).toUpperCase() + hash.slice(2) || "Home"
    };

    return (
        <Helmet title={seo.title} defaultTitle={seo.title} titleTemplate={`${seo.hash} - ${seo.title}`}>
            <html lang="en" />
            <meta name="description" content={seo.description} />

            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
}

export default Head;