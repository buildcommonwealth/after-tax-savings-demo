import React from "react";
import { Input as UIInput } from "theme-ui";

const Input = React.forwardRef((props, ref) => {
  return <UIInput ref={ref} {...props} />;
});

export default Input;
