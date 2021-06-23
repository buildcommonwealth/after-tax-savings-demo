import { get } from "theme-ui";

import * as tokens from "./tokens";
import styles from "./styles";
import * as variants from "./variants";

const focus = {
  outline: "none",
  boxShadow: theme =>
    `0 0 0 1px ${get(theme, "colors.background")},
     0 0 0 4px ${get(theme, "colors.focus")},
     0 0 6px 0 ${get(theme, "colors.focus")}`,
  transition: "box-shadow 200ms",
};

const invalid = {
  outline: "none",
  boxShadow: theme =>
    `0 0 0 1px ${get(theme, "colors.background")},
     0 0 0 4px ${get(theme, "colors.error")},
     0 0 6px 0 ${get(theme, "colors.error")}`,
  transition: "box-shadow 200ms",
};

export const theme = {
  ...tokens,
  styles,
  ...variants,
  focus,
  invalid,
};
