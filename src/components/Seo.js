import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

const Seo = ({ title, description }) => {
    const { site } = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    description
                    siteUrl
                    title
                    author
                }
            }
        }
    `);
    const pageDescription = description || site.siteMetadata.description;
    const pageTitle = title || site.siteMetadata.title;
    const keywords = `${pageTitle} ${pageDescription}`.toLowerCase().split(" ").join(", ");
    return (
        <Helmet htmlAttributes={{ lang: "en" }} title={pageTitle}>
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={site.siteMetadata.url} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:creator" content={site.siteMetadata.author} />
            <meta property="twitter:title" content={pageTitle} />
            <meta property="twitter:description" content={pageDescription} />
        </Helmet>
    );
}

export default Seo;