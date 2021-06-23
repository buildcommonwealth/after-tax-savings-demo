const brand = {
  blue: "#2559a7",
  teal: "#4db6c1",
  cyan: "#00b9f2",
  green: "#c8cfa2",
  grey: "#e5e6e7",
  gray: "#e5e6e7",
  grayBlue: "#6e8390",
  yellow: "#facd42",
  navy: "#20496d",
  softBlue: "#a4c4d5",
  lightYellow: "#efe175",
  charcoal: "#35353e",
  orange: "#e18d58",
  brown: "#312913",
};

const grays = {
  100: "#fafafa",
};

const lighterBlue = "#ecf3f7";
const veryLightBlue = "#f6f9fb";

const white = "#fff";

export default {
  primary: brand.blue,
  secondary: brand.yellow,
  text: brand.charcoal,
  textMuted: brand.grayBlue,
  // textMuted: brand.softBlue,
  background: white,
  // borderMuted: brand.grayBlue,
  borderMuted: brand.softBlue,

  // state indicators
  // focus: brand.cyan,
  focus: brand.yellow,
  success: brand.teal,
  // success: brand.cyan,
  successMuted: "#E9F5F7",
  disabled: brand.grey,
  error: brand.orange,

  // basic colors
  white,
  grays,
  lighterBlue,
  veryLightBlue,
  ...brand,
};
