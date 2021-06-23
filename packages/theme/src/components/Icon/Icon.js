import React from "react";

import { styled } from "style";
import { upperFirst } from "utils/helpers";

import * as icons from "./icons";

const StyledIcon = styled('span')({
  display: "inline-block",
  height: "1em",
  width: "1em",
  verticalAlign: "-0.15em",
  fontSize: "inherit",
  color: "inherit",
  "*": {
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke",
  },
})

const Icon = ({ icon, ...props }) => {
  if (!icon) {
    return null;
  }

  if (typeof icon === "string" && icons[upperFirst(icon)]) {
    return (
      <StyledIcon
        aria-hidden="true"
        as={icons[upperFirst(icon)]}
        {...props}
        __css={{ fontSize: 6 }}
      />
    );
  }

  return (
    <StyledIcon
      aria-hidden="true"
      as={icon}
      {...props}
    />
  );
};

export default Icon;
