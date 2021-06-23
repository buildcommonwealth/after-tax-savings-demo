import React from "react";
import { Select as UISelect } from "theme-ui";

import { isPlainObject } from "utils/helpers";

const Select = ({ options, ...props }) => {
  return (
    <UISelect {...props}>
      {options.map(option => {
        let value, text;
        if (isPlainObject(option)) {
          value = option.value;
          text = option.text;
        } else {
          value = text = option;
        }
        return <option key={value}>{text}</option>;
      })}
    </UISelect>
  );
};

export default Select;
