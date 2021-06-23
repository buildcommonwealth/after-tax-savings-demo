import React from "react";
import { useSpring } from "@react-spring/web";

import { isClientSide } from "../utils/helpers";

export default function useAnimateScroll() {
  const isScrollCanceled = React.useRef(false);

  const onWheel = React.useCallback(() => {
    isScrollCanceled.current = true;
    window.removeEventListener("wheel", onWheel);
  }, []);

  React.useEffect(() => {
    if (isClientSide()) {
      return () => {
        window.removeEventListener("wheel", onWheel);
      };
    }
  }, [onWheel]);

  const [, updateScroll] = useSpring(
    {
      scrollY: 0,
      config: { clamp: true, tension: 200, precision: 0.1 },
    },
    []
  );

  const animateScroll = React.useCallback(
    async ref => {
      if (!isClientSide()) {
        return Promise.resolve();
      }

      let to = !isNaN(Number(ref)) ? ref : 0;
      if (
        ref &&
        (ref.current || typeof ref.getBoundingClientRect === "function")
      ) {
        const el = ref.current || ref;
        to = window.scrollY + el.getBoundingClientRect().top;
      }

      return updateScroll.start({
        to: async next => {
          window.addEventListener("wheel", onWheel);
          await next({ scrollY: to });
        },
        from: { scrollY: window.scrollY },
        reset: true,
        onChange: props => {
          if (!isScrollCanceled.current) {
            window.scroll(0, props.value.scrollY);
          }
        },
        onRest: () => {
          isScrollCanceled.current = false;
          window.removeEventListener("wheel", onWheel);
        },
      });
    },
    [updateScroll, onWheel]
  );

  return animateScroll;
}
