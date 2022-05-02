import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

const Seo = ({ title }) => {
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
    return (
        <Helmet htmlAttributes={{ lang: "en" }} title={title ? title : site.siteMetadata.title}>
            <meta name="description" content={site.siteMetadata.description} />
            <meta property="og:title" content={title ? title : site.siteMetadata.title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={site.siteMetadata.url} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:creator" content={site.siteMetadata.author} />
            <meta property="twitter:title" content={title ? title : site.siteMetadata.title} />
            <meta property="twitter:description" content={site.siteMetadata.description} />
        </Helmet>
    );
}

export default Seo;