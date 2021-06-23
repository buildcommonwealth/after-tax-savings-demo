import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default function usePartial(slug) {
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
  return content;
}

function filter(data, slug) {
  const partials = data.allPartial?.edges || [];
  const content = partials.find(
    ({ node }) => node.slug === slug || node.name === slug
  );
  return content ? content.node.body : null;
}
