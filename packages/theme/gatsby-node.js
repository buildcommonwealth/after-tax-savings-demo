const path = require("path");
const fs = require("fs");

const NODE_TYPE_PARTIAL = "Partial";
const NODE_TYPE_STEP = "WizardStep";

exports.onCreateWebpackConfig = ({ actions }) => {
  // const ignore = file => file.startsWith("gatsby-plugin");
  // const files = fs.readdirSync(path.resolve(__dirname, "src"));
  // const alias = files.reduce((acc, file) => {
  //   const filePath = path.resolve(__dirname, "src", file);
  //   return fs.lstatSync(filePath).isDirectory() && !ignore(file)
  //     ? { ...acc, [file]: filePath }
  //     : acc;
  // }, {});

  // actions.setWebpackConfig({ resolve: { alias } });
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    [NODE_TYPE_STEP]: {
      body: {
        resolve: mdxResolverPassthrough("body"),
      },
    },
    [NODE_TYPE_PARTIAL]: {
      body: {
        resolve: mdxResolverPassthrough("body"),
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type WizardStep implements Node @dontInfer @childOf(types: ["Mdx"]) {
      slug: String!
      index: Int!
      body: String!
      cta: String!
      illustration: File @fileByRelativePath
      nextText: String
      backText: String
    }

    type Partial implements Node @dontInfer @childOf(types: ["Mdx"]) {
      name: String!
      slug: String!
      body: String!
    }
  `);
};

exports.onCreateNode = async (
  { node, actions, getNode, createNodeId, createContentDigest },
  pluginOptions
) => {
  const { createNode, createParentChildLink } = actions;

  const parent = getNode(node.parent);
  const nodeMeta = getMdxNodeMeta(node, parent, pluginOptions.sources);

  if (!nodeMeta) {
    return;
  }

  const { name, slug, type } = nodeMeta;
  const nodeId = createNodeId(`${node.id} >>> ${type}`);
  let nodeData = { slug };

  if (type === NODE_TYPE_PARTIAL) {
    nodeData.name = name;
  } else if (type === NODE_TYPE_STEP) {
    nodeData = {
      index: getIndexFromFileName(name),
      ...node.frontmatter,
      ...nodeData,
    };
  }

  await createNode({
    ...nodeData,
    name,
    id: nodeId,
    parent: node.id,
    children: [],
    internal: {
      type,
      contentDigest: createContentDigest(nodeData),
      content: JSON.stringify(nodeData),
      description: `A ${type}`,
    },
  });

  await createParentChildLink({ parent: node, child: getNode(nodeId) });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const component = require.resolve("./src/templates/step");
  const { data, errors } = await graphql(`
    query {
      allWizardStep {
        edges {
          node {
            id
            slug
            index
            illustration {
              publicURL
              childMdx {
                childPartial {
                  body
                }
              }
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  data.allWizardStep.edges.forEach(
    ({ node: { id, slug, index, illustration } }) => {
      createPage({
        path: slug,
        component,
        context: {
          id,
          layout: "wizard",
          index,
          illustration,
        },
      });
    }
  );
};

function getMdxNodeMeta(node, parent, sources) {
  // Only work on markdown nodes
  if (![`MarkdownRemark`, `Mdx`].includes(node.internal.type)) {
    return;
  }

  // Make sure the parent is a file node
  if (parent.internal.type !== `File`) {
    return;
  }

  let slug, type;
  const types = {
    steps: NODE_TYPE_STEP,
    partials: NODE_TYPE_PARTIAL,
  };

  for (let source in sources) {
    if (parent.absolutePath.startsWith(sources[source])) {
      type = types[source];
    }
  }

  if (!type) {
    return;
  }

  const { dir, name } = path.parse(parent.relativePath);

  if (name === "index" && dir === "") {
    slug = "/";
  } else if (name !== "index" && dir !== "") {
    slug = `/${dir}/${name}/`;
  } else if (dir === "") {
    slug = `/${name}/`;
  } else {
    slug = `/${dir}/`;
  }

  return { slug, type, name };
}

function mdxResolverPassthrough(fieldName) {
  return async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
      fieldName,
    });
    return result;
  };
}

function getIndexFromFileName(name) {
  if (/^(\d+)/.test(name)) {
    const index = parseInt(name.match(/^(\d+)/).pop(), 10);
    return index;
  }

  return;
}
