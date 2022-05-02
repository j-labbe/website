module.exports = {
    siteMetadata: {
        siteUrl: "https://jacklabbe.com",
        title: "Jack Labbe",
        description: "Jack Labbe's website.",
        author: "Jack Labbe"
    },
    plugins: [
        {
            resolve: "gatsby-plugin-netlify-cms",
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`
            }
        },
        "gatsby-plugin-sass",
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "UA-182638587-1",
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: ['.md', '.mdx']
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "projects",
                path: `${__dirname}/content/projects`
            }
        }
    ],
};
