import React from "react";
import { Grid } from "theme-ui";

import { styled } from 'style'

const defaultProps = {
  sx: {},
};

const Container = styled('div')({
  minHeight: 400,
  mb: 5,
  bg: "green",
  color: "primary",
  overflow: "visible",
  boxShadow: "raised",
  borderRadius: [0, null, "lg"],
  mx: [-3, null, -6],
  py: 4,
})

const StyledGrid = styled(Grid)({
  px: [3, 3, 6],
  columnGap: 5,
  rowGap: 4,
  maxWidth: "100%",
  gridTemplateColumns: ["1fr", "1fr", "repeat(2, 1fr)"],
  alignItems: "center",
})

const Feature = ({ children, ...props }) => (
  <Container {...props} >
    <StyledGrid>
      {children}
    </StyledGrid>
  </Container>
);

Feature.defaultProps = defaultProps;

export default Feature;
