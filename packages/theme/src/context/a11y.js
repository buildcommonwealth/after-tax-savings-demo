import React from "react";
import { Globals } from "@react-spring/web";
import { Global } from "@emotion/core";

import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const A11yContext = React.createContext();

const A11yProvider = ({ children }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  React.useLayoutEffect(() => {
    Globals.assign({ skipAnimation: prefersReducedMotion });
  }, [prefersReducedMotion]);

  return (
    <A11yContext.Provider value={{}}>
      {prefersReducedMotion && (
        <Global
          styles={{
            "*": {
              transition: "none !important",
              animation: "none !important",
            },
          }}
        />
      )}
      {children}
    </A11yContext.Provider>
  );
};

// const useA11yContext

export { A11yProvider };
