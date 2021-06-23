import React from "react";
import { Helmet } from "react-helmet";
import { Global } from "@emotion/core";

import useLoadFonts from "hooks/useLoadFonts";
import { fontFaceDeclarations } from "assets/fonts";
import { global } from 'style';

const Head = () => {
  const { preloadLinks } = useLoadFonts();

  return (
    <React.Fragment>
      <Global
        styles={[
          { ":root": { "--reach-dialog": 1, "--reach-menu-button": 1 } },
          fontFaceDeclarations.map(o => ({ "@font-face": o })),
          global
        ]}
      />
      <Helmet titleTemplate={"Commonwealth | %s"}>
        <html lang="en" />
        <title>Savings Demo</title>
        {preloadLinks}
      </Helmet>
    </React.Fragment>
  );
};

export default Head;
