import colors from "./colors";

const systemFontStack = `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;`;

const fonts = {
  body: systemFontStack,
  heading: `"Montserrat",${systemFontStack}`,
};

const lineHeights = {
  body: 1.5,
  heading: 1.25,
};

const fontWeights = {
  body: "unset",
  heading: 300,
};

const sizes = {
  full: 1024,
  half: 512,
  large: 640,
  medium: 512,
  small: 384,
};

const radii = {
  // lg: 16,
  lg: 8,
  md: 8,
  sm: 3,
  button: 3,
  formControl: 3,
};

const shadows = {
  raised: "0 16px 36px #00000011",
};

const zIndices = {
  modal: 1000,
  banner: 900,
  controls: 900,
  menu: 900,
};

export {
  colors,
  fonts,
  fontWeights,
  lineHeights,
  sizes,
  shadows,
  radii,
  zIndices,
};
