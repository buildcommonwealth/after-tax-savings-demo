import React from "react";
import { animated } from "@react-spring/web";
import { useKeyboardFocus } from "@zendeskgarden/container-keyboardfocus";

import { bracketSlashes } from "utils/helpers";
import { styled } from "style";
import { useSteps, useIsCompleted } from "context/wizard";

import Link from "components/Link";

const paginationDuration = "300ms";

const Nav = animated(styled('nav')({
  "--bullet-size": "1em",
  position: "relative",
  mb: [3, null, 4],
  mt: [3, null, 0],
}))

const Progress = styled('span')({
  position: "absolute",
  top: "calc(var(--bullet-size) / 2)",
  left: "calc(100% / var(--step-count) / 2)",
  zIndex: 0,
  width: "calc((var(--step-count) - 1) / var(--step-count) * 100%)",
  height: "1px",
  mt: 2,
  bg: "grey",
  transition: `transform ${paginationDuration} cubic-bezier(0.5, 0, 0.5, 1)`,
  "::before, ::after": {
    position: "absolute",
    top: "0",
    transition: "inherit",
    content: "''",
    zIndex: -1,
    height: "1px",
  },
  "::before": {
    left: "0",
    width: "100%",
    transform: "scaleX(calc(var(--step-current) / (var(--step-count) - 1)))",
    transformOrigin: "left center",
    bg: "success",
  },
  "@supports ((mask-image: inherit) or (-webkit-mask-image: inherit))": {
    "::after": {
      left: "calc(var(--step-current) / (var(--step-count) - 1) * 100%)",
      width: "6em",
      opacity: 1,
      transform: "translateX(-100%)",
      transitionProperty: "left, opacity",
      maskImage: "linear-gradient(to left, black, transparent)",
      bg: "primary",
    },
    "[data-wizard-completed] &::after": {
      opacity: 0,
    },
    "[data-current-step='0'] &::after": {
      opacity: 0,
    },
    "*:not([data-current-step]) &::after": {
      opacity: 0,
    },
  },
})

const StyledLink = styled(Link)({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  py: 2,
  border: "none",
  borderRadius: 0,
  color: "primary",
  transition: `200ms cubic-bezier(0.5, 0, 0.5, 1) ${paginationDuration}`,
  transitionProperty: "opacity, color, background-color",
  textDecoration: "none",
  overflow: "visible",
  ":hover, :focus": {
    "&:not([aria-current='step']):not([aria-disabled])": {
      textDecoration: "underline",
      textDecorationColor: theme => theme.colors.primary,
    },
  },
  "&[aria-current='step']": {
    cursor: "default",
  },
  "&[aria-disabled]": {
    pointerEvents: "none",
    color: "grey",
  },
  "&[data-completed]": {
    color: "success",
    transitionDelay: "0ms",
  },
  ":focus": {
    outline: "none",
  },
  "&[data-keyboard-focused]": {
    variant: "focus",
  },
  "*": {
    tranisition: "inherit",
    tranisitionDelay: "inherit",
    transitionProperty: "inherit",
  },
})

const Reticle = styled('span')({
  position: "absolute",
  top: 0,
  left: "calc(var(--step-active) / (var(--step-count) - 1) * 100%)",
  transform: "translate(-50%, -50%)",
  transition: "inherit",
  transitionProperty: "left, border-color",
  width: "calc(var(--bullet-size) + 12px)",
  height: "calc(var(--bullet-size) + 12px)",
  border: "1px solid",
  borderColor: "primary",
  borderRadius: "50%",
  bg: "background",
  zIndex: 1,
  "[data-active-completed='true'] & ": {
    borderColor: "success",
  },
})

const Bullet = styled('span')({
  position: "relative",
  width: "var(--bullet-size)",
  height: "var(--bullet-size)",
  borderRadius: "50%",
  border: "1px solid",
  borderColor: "currentColor",
  backgroundColor: "background",
  fontWeight: "bold",
  lineHeight: "1.35",
  textDecoration: "none",
  mb: 2,
  "[data-completed] &": {
    backgroundColor: "currentColor",
  },
})

const Text = styled('span')({
  display: ["none", null, "block"],
  whiteSpace: "nowrap",
  "[aria-current='step'] &": {
    opacity: 1,
  },
})

const List = styled('ol')({
  position: "relative",
  display: 'grid',
  gridTemplateColumns: `repeat(var(--step-count), calc(1 / var(--step-count) * 100%))`,
  gridColumnGap: 0,
  p: 0,
  m: 0,
  listStyle: "none",
})

const Button = ({
  isCompleted,
  isActive,
  isDisabled,
  slug,
  cta,
  index,
}) => {
  const disabledClickHandler = e => {
    e.preventDefault();
    return false;
  };

  const { getFocusProps, keyboardFocused } = useKeyboardFocus();

  return (
    <StyledLink
      aria-current={isActive ? "step" : undefined}
      data-completed={isCompleted || undefined}
      data-keyboard-focused={keyboardFocused || undefined}
      disabled={isDisabled || undefined}
      onClick={isDisabled ? disabledClickHandler : null}
      to={bracketSlashes(slug)}
      {...getFocusProps()}
    >
      <Bullet />
      <Text>
        {index > 0 ? `${index}. ${cta}` : cta}
      </Text>
    </StyledLink>
  );
};

const Pagination = React.forwardRef((props, ref) => {
  const { steps, active, current } = useSteps();
  const getStatus = useIsCompleted();

  return (
    <Nav
      data-active-completed={getStatus(active)}
      data-current-step={current.index}
      data-wizard-completed={getStatus() || null}
      style={{
        "--step-count": steps.length,
        "--step-active": active.index,
        "--step-current": current.index,
      }}
      ref={ref}
      {...props}
    >
      <Progress>
        <Reticle />
      </Progress>
      <List count={steps.length}>
        {steps.map((step, index) => {
          const isActive = index === active.index;
          const isCompleted = getStatus({ slug: step.slug });
          const isCurrent = current && current.index === index;
          const isDisabled = !isCompleted && !isCurrent;
          return (
            <li key={step.slug}>
              <Button
                isActive={isActive}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isDisabled={isDisabled}
                index={index}
                {...step}
              />
            </li>
          );
        })}
      </List>
    </Nav>
  );
});

export default Pagination;
