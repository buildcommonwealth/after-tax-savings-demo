import React from "react";
import { Text, Heading } from "theme-ui";

import brand from "assets/images/commonwealth-logo-mark.svg";
import { styled } from 'style';

import Container from "components/Container";
import Link from "components/Link";
import Image from "components/Image";

const StyledFooter = styled('footer')({
  py: 5,
  bg: "lighterBlue",
  color: "navy",
})

const StyledContainer = styled(Container)({
  display: 'flex',
  '& > *': {
    maxWidth: 'half',
    px: 3,
  }
})

const StyledImage = styled(Image)({
  maxWidth: 180,
  mb: 3,
})

const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer>
        <div>
          <StyledImage src={brand} />
          <Heading sx={{ mb: 3 }}>About Commonwealth</Heading>
          <Text as="p">
            Commonwealth strengthens the financial opportunity and security of
            financially vulnerable people by discovering ideas, piloting
            solutions and driving innovations to scale.
          </Text>
          <p>
            Find out more at{" "}
            <Link to="https://https://buildcommonwealth.org/">
              buildcommonwealth.org
            </Link>
          </p>
        </div>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
