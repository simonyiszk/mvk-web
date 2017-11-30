const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({
  node, getNode, getNodes, boundActionCreators,
}) => {
  const { createNodeField, createParentChildLink } = boundActionCreators;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    // Attach thumbnail's ImageSharp node by public path if necessary
    if (typeof node.frontmatter.thumbnail === 'string') {
      // Find absolute path of linked path
      const pathToFile = path
        .join(__dirname, 'static', node.frontmatter.thumbnail)
        .split(path.sep)
        .join('/');

      // Find ID of File node
      const fileNode = getNodes().find(n => n.absolutePath === pathToFile);

      if (fileNode != null) {
        // Find ImageSharp node corresponding to the File node
        const imageSharpNodeId = fileNode.children.find(n => n.endsWith('>> ImageSharp'));
        const imageSharpNode = getNodes().find(n => n.id === imageSharpNodeId);

        // Add ImageSharp node as child
        createParentChildLink({ parent: node, child: imageSharpNode });
      }
    }
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(({ data }) => {
      data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: node.fields.slug.startsWith('/gallery/')
            ? path.resolve('./src/templates/album.jsx')
            : path.resolve('./src/templates/blog-post.jsx'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables
            slug: node.fields.slug,
          },
        });
      });

      resolve();
    });
  });
};
