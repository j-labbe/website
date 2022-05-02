const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
    const result = await graphql(`
        query {
            allMdx(filter: {fileAbsolutePath: {regex: "/projects/"}}) {
                edges {
                    node {
                        slug
                        frontmatter {
                            tags
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild('Error while running GraphQL query.');
        return;
    }

    const { data } = result;

    data.allMdx.edges.forEach(edge => {
        const slug = `projects/${edge.node.slug}`;
        actions.createPage({
            path: slug,
            component: require.resolve('./src/templates/project.js'),
            context: { slug: edge.node.slug }
        });
    });
    // TODO: create browsing page for tags - select a tag and see other posts with that tag

    const tags = {};

    data.allMdx.edges.filter(({ node }) => node.frontmatter.tags).forEach(({ node }) => {
        const tagList = node.frontmatter.tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
        tagList.forEach(tag => {
            if (!tags[tag]) {
                tags[tag] = [];
            }
            tags[tag].push(node.slug);
        });
    });
    Object.keys(tags).forEach(tag => {
        actions.createPage({
            path: `/tag/${tag}`,
            component: require.resolve('./src/templates/tags.js'),
            context: {
                tag, slugs: tags[tag]
            }
        });
    });
    // const tagTemplate = path.resolve
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /miniraf/,
                        use: loaders.null()
                    },
                    {
                        test: /scrollreveal/,
                        use: loaders.null(),
                    },
                    {
                        test: /animejs/,
                        use: loaders.null(),
                    }
                ]
            }
        })
    }
    actions.setWebpackConfig({
        resolve: {
            alias: {
                path: require.resolve('path-browserify')
            },
            fallback: {
                fs: false
            }
        }
    });
}