import React from "react";

import { useDisclosure } from "context/wizard";

import Button from "components/Button";
import Dialog from "components/Dialog";
import Partial from "components/Partial";

const AboutModal = () => {
  const { isDismissed, dismiss } = useDisclosure();
  const ref = React.useRef();

  return (
    <Dialog
      aria-label="What is this?"
      initialFocusRef={ref}
      isOpen={!isDismissed}
      onDismiss={() => dismiss()}
      size="half"
    >
      <Partial slug="modal-begin-final" />
      <Dialog.Footer>
        <Button ref={ref} onClick={() => dismiss()}>
          Okay
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default AboutModal;
