import React from "react";
import { Box, Checkbox as UICheckbox, Label } from "theme-ui";

const Checkbox = ({ direction, options, name, onChange, value }) => {
  return (
    <Box sx={{ flexDirection: direction }} variant="forms.checkboxGroup">
      {options.map(option => (
        <Label key={option} variant="forms.checkboxLabel">
          <UICheckbox
            checked={option === value}
            name={name}
            onChange={onChange}
            value={option}
          />
          {option}
        </Label>
      ))}
    </Box>
  );
};

export default Checkbox;
