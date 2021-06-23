const container = {
  maxWidth: "full",
  width: "100%",
  mx: "auto",
};

const cta = {
  default: {
    display: ["grid", null, "block"],
    gridGap: 4,
    justifyItems: "center",
    my: [4, null, 5],
    mx: [0, null, -5],
    px: [3, null, 5],
    py: [5, null, 4],
    borderRadius: "lg",
    color: "navy",
    textAlign: "center",
    bg: "lighterBlue",
  },

  plain: {
    display: ["grid", null, "block"],
    gridGap: 4,
    justifyItems: "center",
    mx: -2,
    my: 3,
    px: 2,
    py: 4,
    color: "navy",
    textAlign: "center",
  },
};

const dialog = {
  overlay: {
    position: "fixed",
    zIndex: "modal",
    top: 0,
    left: 0,
    display: "flex",
    width: "100vw",
    height: "100vh",
    p: [2, 3, 4],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#35353e22",
    overflow: "auto",
  },

  content: {
    px: [4, null, 5],
    py: 4,
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    overflowY: "auto",
    bg: "background",
    borderRadius: "md",
    boxShadow: "0 8px 36px #00000011",
  },

  footer: {
    position: "sticky",
    bottom: -4,
    mt: 4,
    mb: -4,
    mx: -5,
    pt: 3,
    pb: 4,
    px: 5,
    display: "flex",
    flexFlow: "row-reverse nowrap",
    justifyContent: "space-between",
    bg: "lighterBlue",
  },
};

export {
  container,
  cta,
  dialog,
};
