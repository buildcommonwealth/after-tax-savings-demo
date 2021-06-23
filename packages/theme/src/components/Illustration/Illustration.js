import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { styled } from 'style'

const StyledImage = styled('img')({
  display: "block",
  width: "100%",
  height: "100%",
})

const Illustration = ({ publicURL, childMdx }) => {
  return childMdx
    ? <MDXRenderer>{childMdx.childPartial.body}</MDXRenderer>
    : <StyledImage as="img" alt="" src={publicURL} />;
}

export default Illustration;
