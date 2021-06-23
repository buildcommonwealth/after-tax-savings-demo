const invalid = {
  ":invalid": {
    outline: "none",
  },
  "&[data-invalid]": {
    variant: "invalid",
  },
};

const field = {
  display: "flex",
  flexFlow: "column nowrap",
  mt: 0,
  mb: 4,

  "fieldset &": {
    my: 0,
  },
};

const label = {
  mb: 1,
  color: "navy",
  fontWeight: "bold",
  "&[data-invalid]": {
    color: "error",
  },
};

const hint = {
  color: "textMuted",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  fontSize: 0,
  mt: 1,
  order: 1,
};

const error = {
  color: "error",
  fontSize: 1,
  fontStyle: "italic",
  mt: 1,
  order: 2,
};

const input = {
  maxWidth: "half",
  p: 2,
  border: "1px solid",
  borderRadius: "formControl",
  // borderColor: "borderMuted",
  borderColor: "lighterBlue",
  bg: "veryLightBlue",
  "::placeholder": {
    color: "borderMuted",
  },
  ":focus": {
    variant: "focus",
  },
  "&[data-with-prefix]": {
    paddingLeft: 4,
  },
  ...invalid,
};

const inputPrefix = {
  p: 2,
  color: "textMuted",
};

const select = {
  borderRadius: "formControl",
  borderColor: "borderMuted",
  color: "inherit",
  fontFamily: "body",
  fontSize: "inherit",
  lineHeight: "inherit",
  ":focus, :active": {
    variant: "focus",
  },
  ...invalid,
};

const textarea = {
  borderRadius: "formControl",
  borderColor: "borderMuted",
  color: "inherit",
  fontFamily: "body",
  fontSize: "inherit",
  lineHeight: "inherit",
  ":focus, :active": {
    variant: "focus",
  },
  ...invalid,
};

export {
  error,
  field,
  hint,
  input,
  inputPrefix,
  label,
  select,
  textarea,
};
