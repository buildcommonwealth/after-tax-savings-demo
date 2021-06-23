/**
 * We use a two-stage font loading strategy:
 *   1. preload an optimized subsetted font file
 *   2. asynchronously load and add the full font file
 *
 * The resaoning is described variously by Zach Leatherman on his blog.
 * For an outline of the process, see this case-study:
 * @see https://www.zachleat.com/web/css-tricks-web-fonts/
 *
 * You can create optimized font files with the python library fonttools.
 * @see https://github.com/fonttools/fonttools
 *
 * Here's a sample command to create a file that excludes hinting and
 * uncommon characters:
 * $ pyftsubset "Montserrat-Light.ttf" --output-file="Montserrat-Light-kern-latin.woff2" --flavor=woff2 --layout-features=ccmp,locl,mark,mkmk,kern --no-hinting --desubroutinize --unicodes=U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD
 *
 * And one for the complete font:
 * $ pyftsubset "Montserrat-Light.ttf" --output-file="Montserrat-Light-hint-all.woff2" --flavor=woff2 --layout-features="*" --unicodes=U+0-10FFFF
 *
 * Be sure to repeat for woff v1 if you need to support it.
 */

import * as montserrat from "./montserrat";

const { fontSubsets, fonts } = [montserrat].reduce(
  (obj, { fontSubset, font }) => {
    obj.fontSubsets = [...(obj.fontSubsets || []), ...fontSubset];
    obj.fonts = [...(obj.fonts || []), ...font];
    return obj;
  },
  {}
);

const fontFaceDeclarations = fontSubsets.map(
  ({ family, src, descriptors }) => ({
    fontFamily: family,
    src: src
      .map(({ url, format }) => `url(${url}) format('${format}')`)
      .join(", "),
    fontWeight: descriptors.weight,
    fontStyle: descriptors.style,
    fontDisplay: "swap",
  })
);

/**
 * This file exports three arrays of plain objects:
 *
 * 1. fonts - an array of font file metadata
 * 2. fontSubsets - an array of subsetted font file metadata
 * 3. fontFaceDeclarations - an array of @font-face style objects ready
 *      for consumption by css-in-js solutions (like emotion)
 */
export { fonts, fontSubsets, fontFaceDeclarations };
