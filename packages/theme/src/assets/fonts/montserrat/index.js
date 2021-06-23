// import MontserratLightWOFF from "./Montserrat-Light-hint-all.woff";
import MontserratLightWOFF2 from "./Montserrat-Light-hint-all.woff2";
// import MontserratLightSubsetWOFF from "./Montserrat-Light-kern-latin.woff";
import MontserratLightSubsetWOFF2 from "./Montserrat-Light-kern-latin.woff2";

// import MontserratRegularWOFF from "./Montserrat-Regular-hint-all.woff";
import MontserratRegularWOFF2 from "./Montserrat-Regular-hint-all.woff2";
// import MontserratRegularSubsetWOFF from "./Montserrat-Regular-kern-latin.woff";
import MontserratRegularSubsetWOFF2 from "./Montserrat-Regular-kern-latin.woff2";

const fontSubset = [
  {
    family: "Montserrat",
    src: [
      { url: MontserratLightSubsetWOFF2, format: "woff2" },
      // { url: MontserratLightSubsetWOFF, format: "woff" },
    ],
    descriptors: {
      weight: 300,
    },
  },
  {
    family: "Montserrat",
    src: [
      { url: MontserratRegularSubsetWOFF2, format: "woff2" },
      // { url: MontserratRegularSubsetWOFF, format: "woff" },
    ],
    descriptors: {
      weight: "normal",
    },
  },
];

const font = [
  {
    family: "Montserrat",
    src: [
      { url: MontserratLightWOFF2, format: "woff2" },
      // { url: MontserratLightWOFF, format: "woff" },
    ],
    descriptors: {
      weight: 300,
    },
  },
  {
    family: "Montserrat",
    src: [
      { url: MontserratRegularWOFF2, format: "woff2" },
      // { url: MontserratRegularWOFF, format: "woff" },
    ],
    descriptors: {
      weight: "normal",
    },
  },
];

export { fontSubset, font };
