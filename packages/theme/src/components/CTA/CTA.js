import React from "react";
import PropTypes from "prop-types";
import { Box, Heading, Text } from "theme-ui";

import Button from "components/Button";

const propTypes = {
  cta: PropTypes.string.isRequired,
};

const CTA = ({ children, to, cta, heading, subheading, ...props }) => {
  if (heading && subheading) {
    return (
      <Box as="section" __themeKey="layout.cta" variant="default" {...props}>
        {heading && (
          <Heading variant="display2" sx={{ mb: 2 }}>
            {heading}
          </Heading>
        )}
        {subheading && <Text as="p">{subheading}</Text>}
        <Button to={to} sx={{ mt: 4 }}>
          {cta}
        </Button>
      </Box>
    );
  }

  return (
    <Box as="section" __themeKey="layout.cta" variant="default" {...props}>
      {(heading || subheading) && (
        <Text as="span" variant="display3">
          {heading || subheading}
          &emsp;
        </Text>
      )}
      <Button to={to}>{cta}</Button>
    </Box>
  );
};

CTA.propTypes = propTypes;

export default CTA;
