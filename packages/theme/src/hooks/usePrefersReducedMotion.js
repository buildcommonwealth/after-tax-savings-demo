import React from "react";

export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPreference] = React.useState(false);

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const QUERY = "(prefers-reduced-motion: reduce)";
    const mediaQueryList = window.matchMedia(QUERY);
    setPreference(mediaQueryList.matches);
  }, []);

  return prefersReducedMotion;
}
