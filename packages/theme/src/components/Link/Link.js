import React from "react";
import { Link as GatsbyLink } from "gatsby";

import { bracketSlashes } from "utils/helpers";
import { styled } from "style";
import { useSteps } from "context/wizard";

const StyledLink = styled("a")();
const StyledGatsbyLink = styled(GatsbyLink)();

const Link = React.forwardRef(({ to, href, disabled, ..._props }, ref) => {
  const { steps } = useSteps();
  let url = href || to;

  if (!isNaN(Number(to)) && steps[to]) {
    url = steps[Number(to)].slug;
  }

  const isInternal = /^\/(?!\/)/.test(url);

  const props = {
    __themeKey: "links",
    "aria-disabled": disabled || undefined,
    ref,
    variant: "styles.a",
    ..._props,
  };

  return isInternal ? (
    <StyledGatsbyLink to={bracketSlashes(url)} {...props} />
  ) : (
    <StyledLink href={url} rel="noreferrer" target="_blank" {...props} />
  );
});

export default Link;
