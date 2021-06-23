import React from "react";
import { Radio as UIRadio, Label } from "theme-ui";

import { styled } from 'style';

const defaultProps = {
  direction: "vertical",
  options: [],
};

const Container = styled('div')({
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  mx: -2,
  borderRadius: "formControl",
  flexDirection: "row",
  "&[data-invalid]": {
    variant: "invalid",
  },
  '&[data-direction="vertical"]': {
    flexDirection: "column"
  },
})

const StyledLabel = styled(Label)({
  width: "auto",
  mx: 2,
  color: "text",
})

const RadioInput = React.forwardRef(
  ({ name, options, direction, onChange, value, ...props }, ref) => {
    return (
      <Container data-direction={direction} {...props} >
        {options.map(option => (
          <StyledLabel key={option}>
            <UIRadio
              name={name}
              value={option}
              checked={option === value}
              onChange={onChange}
            />
            {option}
          </StyledLabel>
        ))}
      </Container>
    );
  }
);

RadioInput.defaultProps = defaultProps;

export default RadioInput;
