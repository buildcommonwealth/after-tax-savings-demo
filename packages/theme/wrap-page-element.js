import React from "react";

import { WizardContextProvider } from "./src/context/wizard";
import { A11yProvider } from "./src/context/a11y";
import Layout from "./src/layouts";

export const wrapPageElement = ({ props, element }, pluginOptions = {}) => (
  <A11yProvider>
    <WizardContextProvider routes={pluginOptions.routes}>
      <Layout {...props}>{element}</Layout>
    </WizardContextProvider>
  </A11yProvider>
);
