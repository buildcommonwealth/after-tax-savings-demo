// import { isStepRoute } from "./src/context/wizard"

// const shouldUpdateScroll = ({ routerProps, prevRouterProps }) => {
//   if (!prevRouterProps) {
//     return true;
//   }

//   return !(isStepRoute(routerProps) && isStepRoute(prevRouterProps))
// };

const shouldUpdateScroll = () => false;

export { shouldUpdateScroll };
