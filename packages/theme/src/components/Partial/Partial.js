import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function Partial({ slug }) {
  const data = useStaticQuery(graphql`
    {
      allPartial {
        edges {
          node {
            slug
            name
            body
          }
        }
      }
    }
  `);

  const content = React.useMemo(() => filter(data, slug), [data, slug]);

  if (content) {
    return <MDXRenderer>{content}</MDXRenderer>;
  }

  return null;
}

function filter(data, slug) {
  const partials = data.allPartial?.edges || [];
  const content = partials.find(
    ({ node }) => node.slug === slug || node.name === slug
  );
  return content ? content.node.body : null;
}
