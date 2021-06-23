import React from "react";
import { Flex } from "theme-ui";
import { animated, useTransition } from "@react-spring/web";

import useAnimateScroll from "hooks/useAnimateScroll";

import AboutModal from "components/AboutModal";
import Banner from "components/Banner";
import Footer from "components/Footer";
import Head from "components/Head";
import Main from "components/Main";

import Wizard from "./wizard";
import Page from "./page";

const isWizard = (item = {}) => item.props?.pageContext?.layout === "wizard";

const Layout = ({ children }) => {
  const isMounted = React.useRef(false);
  const isFromWizard = React.useRef();

  React.useEffect(() => {
    isMounted.current = true;
  }, []);

  const animateScroll = useAnimateScroll();

  const inStyle = { position: "relative", opacity: 1, pointerEvents: "auto" };
  const outStyle = { position: "absolute", opacity: 0, pointerEvents: "none" };

  const transition = useTransition(children, {
    keys: item => (isWizard(item) ? "wizard" : item.key),
    from: isMounted.current ? outStyle : inStyle,
    enter: item => async next => {
      if (!isMounted.current) {
        await next({ ...inStyle, immediate: true });
        return;
      }

      if (!(isWizard(item) && isFromWizard.current)) {
        await animateScroll();
      }

      isFromWizard.current = isWizard(item);
      await next(inStyle);
    },
    leave: outStyle,
    config: { tension: 150, friction: 30, clamp: true, precision: 0.1 },
    trail: 200,
  });

  return (
    <React.Fragment>
      <Head />
      <Flex
        sx={{
          minHeight: "100vh",
          flexFlow: "column nowrap",
          position: "relative",
        }}
      >
        <Banner />
        <Main role="main">
          {transition((style, item) => (
            <animated.div style={{ ...style, width: "100%" }}>
              {isWizard(item) ? <Wizard>{item}</Wizard> : <Page>{item}</Page>}
            </animated.div>
          ))}
        </Main>
      </Flex>
      <Footer />
      <AboutModal />
    </React.Fragment>
  );
};

export default Layout;
