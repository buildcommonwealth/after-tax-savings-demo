import React from "react";
import { keyframes } from "@emotion/core";

import { styled } from "style";

const defaultProps = {
  color: "textMuted",
  duration: "600ms",
  size: "0.5em",
};

/**
 * Adapted from the "ellipsis" loader by LOADING.IO
 * @link https://loading.io/css/
 */

const grow = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); }
`;

const shrink = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(0); }
`;

const move = keyframes`
  0% { transform: translate(0, 0); }
  100% { transform: translate(calc(var(--size) * 2), 0); }
`;

const Container = styled('span')({
  display: "inline-block",
  position: "relative",
  width: "calc(var(--size) * 7)",
  height: "var(--size)",
  verticalAlign: "middle",
});

const Disk = styled("span")({
  position: "absolute",
  top: 0,
  width: "var(--size)",
  height: "var(--size)",
  borderRadius: "50%",
  background: "currentColor",
  animationTimingFunction: "cubic-bezier(0, 1, 1, 0)",
  '&:nth-of-type(1)': {
    left: "var(--size)",
    animation: `${grow} var(--duration) infinite`,
  },
  '&:nth-of-type(2)': {
    left: "var(--size)",
    animation: `${move} var(--duration) infinite`,
  },
  '&:nth-of-type(3)': {
    left: "calc(var(--size) * 3)",
    animation: `${move} var(--duration) infinite`,
  },
  '&:nth-of-type(4)': {
    left: "calc(var(--size) * 5)",
    animation: `${shrink} var(--duration) infinite`,
  },
});

const Loading = ({ duration, size, ...props }) => {
  return (
    <Container
      as="span"
      aria-hidden="true"
      style={{
        "--size": size,
        "--duration": duration,
      }}
      {...props}
    >
      <Disk />
      <Disk />
      <Disk />
      <Disk />
    </Container>
  );
};

Loading.defaultProps = defaultProps;

export default Loading;
