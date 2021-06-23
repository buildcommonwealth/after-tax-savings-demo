import React from "react";

import { isSet } from "utils/helpers";
import { styled } from "style";

import Link from "components/Link";

const StyledButton = styled("button")({
  display: "inline-block",
  px: 3,
  py: 2,
  border: "1px solid currentColor",
  borderRadius: "button",
  textAlign: "center",
  textDecoration: 'none',
  transition: "all 200ms cubic-bezier(0.5, 0, 0.5, 1)",
  ":focus": {
    variant: "focus",
  },
  ":disabled, &[aria-disabled]": {
    backgroundColor: "disabled",
    borderColor: "disabled",
    cursor: "not-allowed",
  },
  "&[data-invalid]": {
    variant: "invalid",
  },
  ":active": {
    transform: "translateY(1px)",
  },
});

const Button = React.forwardRef(({ to, href, ...props }, ref) => {
  let url = href || to;

  if (isSet(url)) {
    return (
      <StyledButton
        __themeKey="buttons"
        as={Link}
        ref={ref}
        to={url}
        variant="primary"
        {...props}
      />
    );
  }

  return (
    <StyledButton
      __themeKey="buttons"
      as="button"
      ref={ref}
      type="button"
      variant="primary"
      {...props}
    />
  );
});

export default Button;
