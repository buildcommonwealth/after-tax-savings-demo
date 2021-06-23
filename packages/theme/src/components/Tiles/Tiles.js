import React from "react";
import { useSelection } from "@zendeskgarden/container-selection";

import { isSet, isPlainObject } from "utils/helpers";
import { styled } from 'style';

const defaultProps = {
  direction: "horizontal",
};

const Container = styled('div')({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  mx: -1,
  p: 0,
  borderRadius: "sm",
  listStyle: "none",
  "& > button": {
    mx: 1,
    my: 1,
  },
  "&[data-direction='vertical']": {
    flexDirection: "column",
    alignItems: "stretch",
  },
  "&[data-layout]": {
    display: "grid",
    gridTemplateColumns: "repeat(var(--columns), 1fr)",
    gap: 2,
  },
  "&[data-invalid]": {
    variant: "invalid",
  },
})

const Tile = styled('button')({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  py: 3,
  px: 4,
  borderWidth: 1,
  borderRadius: "button",
  textAlign: "center",
  color: "textMuted",
  borderColor: "borderMuted",
  transition: "100ms cubic-bezier(0.5, 0, 0.5, 1)",
  tranisionProperty: "color, border-color, border-radius, background-color",
  lineHeight: 1.25,
  ":hover, :focus": {
    color: "primary",
    borderColor: "primary",
  },
  ":focus": {
    variant: "focus",
  },
  "&[data-checked='true']": {
    color: "background",
    borderColor: "success",
    backgroundColor: "success",
  },
  ":invalid": {
    outline: "none",
  },
  "&[data-invalid]": {
    variant: "invalid",
  },
})

const Tiles = React.forwardRef(
  (
    {
      autocomplete,
      columns,
      direction,
      name,
      onBlur,
      onChange,
      options,
      placeholder,
      tiles,
      value: controlledValue,
      ...props
    },
    ref
  ) => {
    const refs = React.useMemo(
      () => (options ? options.map(() => React.createRef()) : []),
      [options]
    );

    const { getContainerProps, getItemProps } = useSelection({
      direction,
      selectedItem: isSet(controlledValue) ? controlledValue : undefined,
      defaultFocusedIndex: 0,
      onSelect: value => {
        onChange(value);
      },
    });

    return (
      <Container
        {...getContainerProps({
          "data-direction": direction,
          "data-layout": columns || undefined,
          style: columns ? { "--columns": columns } : undefined,
          role: "radiogroup",
          ...props
        })}
      >
        {options &&
          options.map((option, i) => {
            let value, text;
            if (isPlainObject(option)) {
              value = option.value;
              text = option.text;
            } else {
              value = text = option;
            }

            return (
              <Tile
                {...getItemProps({
                  "data-checked": controlledValue === value,
                  focusRef: refs[i],
                  item: value,
                  key: value,
                  ref: refs[i],
                  role: "radio",
                  selectedAriaKey: "aria-checked",
                  type: "button",
                })}
              >
                <span>{text}</span>
              </Tile>
            );
          })}
      </Container>
    );
  }
);

Tiles.defaultProps = defaultProps;

export default Tiles;
