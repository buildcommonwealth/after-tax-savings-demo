const primary = {
  backgroundColor: "primary",
  borderColor: "primary",
  color: "background",
};

const secondary = {
  backgroundColor: "secondary",
  borderColor: "secondary",
  color: "text",
};

const outline = {
  color: "text",
  borderColor: "primary",
  svg: {
    color: "primary",
  },
  ":focus": {
    variant: "focus",
  },
  ":disabled, &[aria-disabled]": {
    bg: "transparent",
    color: "disabled",
    svg: {
      color: "disabled",
    },
  },
};

const small = {
  variant: "buttons.secondary",
  py: 1,
  fontSize: 1,
};

const success = {
  backgroundColor: "success",
  borderColor: "success",
  color: "background",
};

const link = {
  variant: "styles.a",
  p: 0,
  border: "none",
  borderRadius: 0,
  transform: "none",
  ":active": {
    transform: "none",
  },
};

export { link, outline, primary, secondary, small, success };
