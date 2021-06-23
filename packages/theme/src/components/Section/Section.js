import React from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";
import sift, { createEqualsOperation } from "sift";

import { isEmptyObject, isSet } from "utils/helpers";
import { styled } from 'style';
import { useLiveFormValues } from "context/wizard";

const defaultProps = {
  conditions: {},
};

const Outer = animated(styled('div')());

const Inner = animated(styled('div')({
  paddingBottom: "1px"
}));

const operations = {
  $isSet: (params, ownerQuery, options) => {
    return createEqualsOperation(
      value => {
        if (typeof params !== "string") {
          throw new Error(
            `$isSet expected a string: received "${typeof params}"`
          );
        }
        return isSet(value[params]);
      },
      ownerQuery,
      options
    );
  },
};

const Section = ({ children, conditions, remain, ...props }) => {
  const isPreviouslyVisible = React.useRef();
  const formValues = useLiveFormValues();
  const ref = React.useRef();

  const isVisible = React.useMemo(() => {
    return (conditions && !isEmptyObject(conditions))
      ? sift(conditions, { operations })(formValues)
      : true;
  }, [conditions, formValues])

  React.useEffect(() => {
    if (isVisible) {
      isPreviouslyVisible.current = true;
    }
  }, [isVisible]);

  const [{ height }, updateHeight] = useSpring(
    {
      height: 0,
      config: { clamp: true, tension: 200, precision: 0.1 },
    },
    []
  );

  const transition = useTransition(
    isVisible || (remain && isPreviouslyVisible.current),
    {
      from: { opacity: 0 },
      enter: () => async next => {
        if (ref.current) {
          await updateHeight.start({
            to: { height: ref.current.offsetHeight },
          });
        }
        await next({ opacity: 1 });
        height.set(null);
      },
      leave: () => async next => {
        await Promise.all([
          next({ opacity: 0 }),
          updateHeight.start({ to: { height: 0 } }),
        ]);
      },
    }
  );

  return transition(
    (style, show) => {
      return show && (
        <Outer style={{ height, ...style }} {...props}>
          <Inner ref={ref} style={{ paddingBottom: "1px" }}>
            {children}
          </Inner>
        </Outer>
      );
    }
  );
};

Section.defaultProps = defaultProps;

export default Section;
