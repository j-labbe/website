module.exports = {
    siteMetadata: {
        siteUrl: "https://jacklabbe.com",
        title: "Jack Labbe",
        description: "Jack Labbe's website.",
        author: "Jack Labbe"
    },
    plugins: [
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: ['.md', '.mdx'],
                gatsbyRemarkPlugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            backgroundColor: "none",
                            disableBgImage: true,
                            linkImagesToOriginal: false,
                            maxWidth: 650
                        }
                    },
                    {
                        resolve: "gatsby-remark-image-attributes",
                        options: {
                            dataAttributes: true
                        }
                    }
                ]
            }
        },
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
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "img",
                path: `${__dirname}/static/img`
            }
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                exclude: ["/admin"]
            }
        }
    ],
};
