import React from "react";
import { Input } from "theme-ui";

import { styled } from 'style';

const Container = styled('span')({
  position: "relative"
})

const Prefix = styled('span')({
  variant: 'forms.inputPrefix',
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translate(0, -50%)",
})

const NumberInput = React.forwardRef((
  {
    units,
    invalid,
    onChange,
    ...props
  },
  ref
) => {
    const { symbol, ...unitProps } = getUnitSpecificProps(units);
    const handleChange = e => {
      const val = parseFloat(e.currentTarget.value, 10);
      onChange(val);
    };

    if (symbol) {
      return (
        <Container>
          <Prefix children={symbol} />
          <Input
            data-with-prefix
            onChange={handleChange}
            type="number"
            {...unitProps}
            {...props}
          />
        </Container>
      );
    }

    return (
      <Input type="number" onChange={handleChange} {...unitProps} {...props} />
    );
  }
);

function getUnitSpecificProps(units) {
  switch (units) {
    case "USD": {
      return {
        min: 0,
        step: 1,
        symbol: "$",
      };
    }
    default: {
      return {};
    }
  }
}

export default NumberInput;
