import React from "react";
import { Box, Flex, Grid } from "theme-ui";
import { animated, useSpring, useTransition } from "@react-spring/web";

import { isSet } from "utils/helpers";
import { useFormSubmit } from "context/wizard";
import useAnimateScroll from "hooks/useAnimateScroll";
import useResizeObserver from "hooks/useResizeObserver";

import Illustration from "components/Illustration";
import Navigation from "components/Navigation";
import Pagination from "components/Pagination";

const styles = {
  container: {
    gridTemplateColumns: ["1fr", "1fr", "minmax(50%, 3fr) minmax(0, 2fr)"],
    gridGap: 0,
    mt: [0, null, -3],
    pt: [0, null, 3],
  },

  pagination: {
    position: "relative",
    zIndex: 1,
    gridColumn: "1 / -1 ",
    gridRow: ["2", null, "1"],
  },

  background: {
    gridColumn: "1 / -1",
    gridRow: [3, 3, 2],
    mx: [-3, -3, -6],
  },

  content: {
    position: "relative",
    zIndex: 1,
    py: [3, 4, 5],
    px: [0, 0, 6],
    ml: [0, 0, -6],
    gridColumn: "1",
    gridRow: ["3", null, "2"],
    flexFlow: "column nowrap",
  },

  illustration: {
    position: "relative",
    pointerEvents: "none",
    display: "block",
    gridColumn: ["1", null, "2"],
    gridRow: ["1", null, "2"],
    bg: "green",
    mr: [-3, null, -6],
    ml: [-3, null, 0],
    height: ["calc(150px + 35vw)", null, "auto"],
    borderTopRightRadius: [0, null, "lg"],
    borderBottomRightRadius: [0, null, "lg"],
  },
};

const AnimatedFlex = animated(Flex);

const Step = ({ children }) => {
  const isMounted = React.useRef(false);

  const scrollRef = React.useRef();
  const animateScroll = useAnimateScroll();

  // Compare current and previous step indices in order to determine the
  // direction of the transition. Next steps come from the right, previous
  // steps come from the left.
  const previousStepIndex = React.useRef();

  React.useEffect(() => {
    previousStepIndex.current = children.props.pageContext.index;
  }, [children]);

  let direction = 0;

  if (isSet(previousStepIndex.current)) {
    direction =
      children.props.pageContext.index > previousStepIndex.current ? 1 : -1;
  }

  // In order to smoothly animate the height of our step container on page
  // transitions, we need to keep and update a reference to the container's
  // current height.
  const itemHeight = React.useRef(0);

  // We use a ResizeObserver to ensure that our container height reference
  // stays true between transitions. This handles both viewport changes and
  // content changes (as when a field is conditionally rendered).
  // The useResizeObserver hook includes a polyfill for IE.
  const heightRef = useResizeObserver(entry => {
    const { borderBoxSize, contentRect } = entry;
    const nextHeight = borderBoxSize?.blockSize || contentRect.height;
    if (nextHeight) {
      itemHeight.current = nextHeight;
    }
  });

  const container = React.useRef();
  const containerHeight = React.useRef(0);

  // We keep a map of refs, keyed by the items supplied to useTransition, which
  // provides us access dom elements and their dimensions on page transitions.
  const [refs] = React.useState(new WeakMap());

  // This is a curried ref-setting function. Call it with the item provided by
  // our page transition function, and pass its result as a ref to the step
  // parent element.
  const setPageItemRef = item => ref => {
    if (ref) {
      refs.set(item, ref);
    }
  };

  // Animated value for our step container.
  const [{ minHeight }, updateHeight] = useSpring(
    {
      minHeight: 0,
      config: { clamp: true, tension: 200, precision: 0.1 },
    },
    []
  );

  const transition = useTransition(children, {
    keys: item => item.key,
    from: {
      x: isMounted.current ? direction * 24 : 0,
      opacity: 0,
      position: "absolute",
    },
    enter: item => async next => {
      const height = refs.get(item).offsetHeight;
      if (itemHeight.current) {
        const style = window.getComputedStyle(container.current);
        let min = 0;
        if (style.minHeight && style.minHeight.endsWith("px")) {
          min = Number(style.minHeight.slice(0, -2));
        }
        const nextHeight =
          containerHeight.current - itemHeight.current + height;

        await Promise.all([
          updateHeight.start({
            to: { minHeight: Math.max(nextHeight, min) },
            from: { minHeight: Math.max(containerHeight.current, min) },
          }),
          animateScroll(scrollRef),
        ]);
      } else {
        await animateScroll(isMounted.current ? scrollRef : 0);
      }

      await next({ x: 0, opacity: 1, position: "relative" });
      itemHeight.current = height;
      containerHeight.current = container.current.offsetHeight;
      minHeight.set(0);
    },
    leave: () => async next => {
      containerHeight.current = container.current.offsetHeight;
      minHeight.set(containerHeight.current);
      await next({
        x: direction * -24,
        opacity: 0,
        position: "absolute",
        pointerEvents: "none",
      });
    },
    config: { tension: 240, friction: 30, clamp: true, precision: 0.05 },
    trail: 200,
  });

  const handleSubmit = useFormSubmit();

  return (
    <Grid
      as="form"
      onSubmit={handleSubmit}
      ref={scrollRef}
      sx={styles.container}
    >
      {/* pagination */}
      <Pagination sx={styles.pagination} />

      {/* background */}
      <Box
        __themeKey="wizard"
        ref={container}
        sx={styles.background}
        variant="container"
      />

      {/* illustration */}
      <Box sx={styles.illustration}>
        {transition(({ opacity, position }, item) => {
          const illustration = item.props.pageContext.illustration;
          return (
            illustration && (
              <animated.div
                style={{
                  position,
                  height: "100%",
                  width: "120%",
                  maxHeight: "100%",
                  left: "calc(-10 / 120 * 100%)",
                  opacity,
                }}
              >
                <Illustration
                  sx={{ height: 0, pb: "100%" }}
                  {...illustration}
                />
              </animated.div>
            )
          );
        })}
      </Box>

      {/* step content */}
      <AnimatedFlex style={{ minHeight }} sx={styles.content}>
        <Box
          ref={heightRef}
          sx={{
            position: "relative",
            flexBasis: "100%",
            mb: 4,
          }}
        >
          {transition((style, item) => (
            <animated.div
              children={item}
              ref={setPageItemRef(item)}
              style={{ padding: "1px 0", width: "100%", ...style }}
            />
          ))}
        </Box>
        <Navigation sx={{ mt: "auto" }} />
      </AnimatedFlex>
    </Grid>
  );
};

export default Step;
