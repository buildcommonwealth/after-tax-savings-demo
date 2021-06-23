import React from "react";
import { Flex, Text } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { styled } from "style";
import useDialog from "hooks/useDialog";
import usePartial from "hooks/usePartial";

import Button from "components/Button";
import Dialog from "components/Dialog";
import Settings from "components/Settings";

const Container = styled('div')({
  position: "relative",
  zIndex: 100,
  width: "100%",
  py: 2,
  bg: "lighterBlue",
  fontSize: 1,
  color: "navy",
})

const StyledText = styled(Text)({
  mr: [0, 0, "auto"],
  width: ["100%", null, "auto"]
})

const StyledFlex = styled(Flex)({
  alignItems: "center",
  px: 3,
  flexWrap: "wrap",
  "button + button": {
    ml: 3,
  },
})

const Banner = props => {
  const { isOpen, closeDialog, getTriggerProps } = useDialog();
  const dialogRef = React.useRef();
  const dialogContent = usePartial("modal-info");

  return (
    <Container {...props}>
      <StyledFlex variant="layout.container">
        <StyledText as="p">
          This is a demo for testing purposes only. No account will be created.
        </StyledText>
        {dialogContent && (
          <Button variant="link" {...getTriggerProps()}>
            What is this?
          </Button>
        )}
        <Settings />
        {dialogContent && (
          <Dialog
            aria-label="What is this?"
            initialFocusRef={dialogRef}
            isOpen={isOpen}
            onDismiss={closeDialog}
            size="half"
          >
            <MDXRenderer>{dialogContent}</MDXRenderer>
            <Dialog.Footer>
              <Button ref={dialogRef} onClick={closeDialog}>
                Okay
              </Button>
            </Dialog.Footer>
          </Dialog>
        )}
      </StyledFlex>
    </Container>
  );
};

export default Banner;
