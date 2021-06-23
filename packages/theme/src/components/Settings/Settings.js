import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@reach/menu-button";
import { navigate } from "gatsby";
import { ChevronDown } from "react-feather";

import { styled } from 'style';
import { useResetWizard, useToggleGlobalValidation } from "context/wizard";

import Icon from "components/Icon";

const StyledMenuButton = styled(MenuButton)({
  variant: 'buttons.link',
  flex: "0 0 auto",
  whiteSpace: "nowrap",
})

const StyledMenuList = styled(MenuList)({
  position: "relative",
  zIndex: "menu",
  minWidth: 200,
  p: 2,
  my: 2,
  bg: "background",
  outline: "none",
  boxShadow: "raised",
})

const StyledMenuItem = styled(MenuItem)({
  py: 2,
  px: 3,
  cursor: "pointer",
  "&:hover, &[data-selected]": {
    color: "primary",
  },
  "&[data-selected]": {
    variant: "focus",
  },
})

const Settings = props => {
  const {
    globalValidation,
    toggleGlobalValidation
  } = useToggleGlobalValidation();
  const { reset, restart } = useResetWizard();

  return (
    <Menu>
      <StyledMenuButton {...props}>
        <span>Settings</span>
        &thinsp;
        <Icon icon={ChevronDown} />
      </StyledMenuButton>
      <StyledMenuList>
        <StyledMenuItem onSelect={() => toggleGlobalValidation()}>
          Turn <strong>{globalValidation ? "OFF" : "ON"}</strong> form
          validation
        </StyledMenuItem>
        <StyledMenuItem onSelect={() => reset()}>
          Unset form values
        </StyledMenuItem>
        <StyledMenuItem
          onSelect={() => {
            restart();
            navigate("/");
          }}
        >
          Start over
        </StyledMenuItem>
      </StyledMenuList>
    </Menu>
  );
};

export default Settings;
