import React from "react";

import { fonts, fontSubsets } from "assets/fonts";

export default function useLoadFonts() {
  const shouldAddFonts = React.useRef(true);

  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (!("fonts" in document)) {
      shouldAddFonts.current = false;
      return;
    }

    if (shouldAddFonts.current) {
      addFonts();
    }

    async function addFonts() {
      await Promise.all(
        fonts.map(async ({ family, src, descriptors }) => {
          const source = src
            .map(({ url, format }) => `url(${url}) format('${format}')`)
            .join(", ");
          const fontFace = new FontFace(family, source, descriptors);
          const font = await fontFace.load();
          document.fonts.add(font);
        })
      );
      shouldAddFonts.current = false;
    }
  }, []);

  const preloadLinks = fontSubsets.reduce((arr, { src }) => {
    return arr.concat(
      src.map(({ url, format }) => (
        <link
          key={url}
          rel="preload"
          href={url}
          as="font"
          type={`font/${format}`}
          crossorigin="anonymous"
        />
      ))
    );
  }, []);

  return {
    preloadLinks,
  };
}
