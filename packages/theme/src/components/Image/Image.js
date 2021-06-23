import React from "react";
import { Box } from "theme-ui";

import { styled } from 'style';

const StyledImage = styled('img')({
  display: "block",
  width: "100%",
  height: "100%",
})

const Image = ({ src, ...props }) => (
  <Box {...props}>
    <StyledImage as="img" alt="" src={src} />
  </Box>
);

export default Image;
