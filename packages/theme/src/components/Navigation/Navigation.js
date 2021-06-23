import React from "react";
import { animated } from "@react-spring/web";
import { ArrowLeft, ArrowRight } from "react-feather";

import { bracketSlashes } from "utils/helpers";
import { styled } from "style";
import { useSteps } from "context/wizard";

import Button from "components/Button";
import Icon from "components/Icon";

const defaultProps = {
  previous: "Back",
  next: "Continue",
};

const Container = animated(styled('div')({
  display: 'flex',
  alignItems: "baseline",
  flexShrink: 0,
  flexWrap: "wrap"
}));

const Navigation = React.forwardRef((props, ref) => {
  const { previous, last, active } = useSteps();
  const { nextText, backText } = active;
  const isLast = active === last;
  const back = backText || "Back";
  const next = nextText || (isLast ? "Confirm & Submit" : "Next");

  return (
    <Container as="nav" ref={ref} {...props} >
      <Button
        disabled={!previous}
        state={{ scroll: true }}
        to={previous && bracketSlashes(previous.slug)}
        variant="outline"
      >
        <Icon icon={ArrowLeft} />
        &thinsp;
        {back}
      </Button>
      <Button
        sx={{ ml: "auto" }}
        type="submit"
        variant={isLast ? "success" : "primary"}
      >
        {next}
        &thinsp;
        <Icon icon={ArrowRight} />
      </Button>
    </Container>
  );
});

Navigation.defaultProps = defaultProps;

export default Navigation;
