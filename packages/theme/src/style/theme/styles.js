const styles = {
  a: {
    color: "primary",
    textDecoration: "underline",
    ":focus": {
      variant: "focus",
    },
  },

  h1: {
    mb: 4,
    fontSize: 5,
    fontWeight: "300",
  },

  h2: {
    mt: 4,
    fontSize: 4,
    fontWeight: 400,
    color: "navy",
  },

  h3: {
    fontSize: 3,
    mb: 3,
    fontFamily: "body",
    fontWeight: 700,
    color: "navy",
  },

  h4: { fontSize: 3 },
  h5: { fontSize: 3 },
  h6: { fontSize: 3 },

  p: {
    mt: 0,
    mb: 3,
    color: "inherit",
    lineHeight: "inherit",
    fontFamily: "inherit",
  },

  pre: {
    backgroundColor: "gray.100",
    p: 3,
  },

  hr: {
    border: "none",
    height: 1,
    bg: "borderMuted",
    my: 4,
  },

  fieldset: {
    // mt: theme => `calc(0.75em + ${get(theme, "space.4")}px)`,
    mb: 4,
    mx: -4,
    py: 4,
    px: 4,
    borderRadius: "formControl",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "borderMuted",
  },

  legend: {
    display: "block",
    mx: -2,
    px: 2,
    lineHeight: 0,
    color: "textMuted",
  },

  li: {
    "::marker": {
      color: "orange",
    },
  },
};

export default styles;
