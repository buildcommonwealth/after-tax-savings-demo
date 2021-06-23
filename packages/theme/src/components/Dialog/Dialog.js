import React from "react";
import { Box } from "theme-ui";
import {
  DialogOverlay as ReachDialogOverlay,
  DialogContent as ReachDialogContent,
} from "@reach/dialog";

import { styled } from 'style';

const defaultProps = {
  size: "medium",
};

const Overlay = styled(ReachDialogOverlay)({
  variant: "layout.dialog.overlay"
})

const Content = styled(ReachDialogContent)(props => ({
  variant: "layout.dialog.content",
  width: props.size
}));

const Dialog = ({
  children,
  initialFocusRef,
  isOpen,
  onDismiss,
  size,
  sx,
  ...props
}) => (
  <Overlay
    initialFocusRef={initialFocusRef}
    isOpen={isOpen}
    onDismiss={onDismiss}
  >
    <Content size={size} {...props} >
      {children}
    </Content>
  </Overlay>
);

Dialog.defaultProps = defaultProps;

Dialog.Footer = DialogFooter;

export default Dialog;

function DialogFooter(props) {
  return <Box variant="layout.dialog.footer" {...props} />;
}
