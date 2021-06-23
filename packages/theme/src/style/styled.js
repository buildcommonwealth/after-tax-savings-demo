import _styled from "@emotion/styled";
import { css, get } from "@theme-ui/css";
import isPropValid from "@emotion/is-prop-valid";
import merge from "deepmerge";

/**
 * A wrapper around Emotion's styled function.
 * Adds support for Theme UI's variant and sx props.
 */
export function styled(component, _options) {
  const options = _options || {
    shouldForwardProp: getDefaultShouldForwardProp(component),
  };
  return (...styles) => _styled(component, options)(compose(styles));
}

function compose(arr) {
  return props => {
    const styles = arr
      .concat(themeProps)
      .flatMap(getStyles(props))
      .filter(Boolean);

    return css(merge.all(styles))(props.theme);
  };
}

function themeProps({ __css, __themeKey, sx, theme, variant }) {
  const style = get(
    theme,
    `${__themeKey || 'variants'}.${variant}`,
    get(theme, variant)
  );
  return [__css, style, sx];
}

function getStyles(props) {
  return style => {
    if (Array.isArray(style)) {
      return style.map(getStyles(props));
    }

    if (typeof style === "function") {
      return style(props);
    }

    return style;
  };
}

/**
 * Re-implements the built-in prop forwarding behavior from @emotion/styled.
 * Only valid html attributes are forwarded to string tags while *all* props
 * are forwarded to styled components (except for __css, __themeKey, theme,
 * variant and sx).
 * @see https://github.com/emotion-js/emotion/blob/main/packages/styled/src/utils.js
 */
const testOmitPropsOnStringTag = isPropValid;
function testOmitPropsOnComponent(prop) {
  return (
    prop !== "__css" &&
    prop !== "__themeKey" &&
    prop !== "sx" &&
    prop !== "theme" &&
    prop !== "variant"
  );
}

function getDefaultShouldForwardProp(tag) {
  if (typeof tag === "string" && tag.charCodeAt(0) > 96) {
    return testOmitPropsOnStringTag;
  }

  return tag.defaultProps?.__themeKey ? () => true : testOmitPropsOnComponent;
}
