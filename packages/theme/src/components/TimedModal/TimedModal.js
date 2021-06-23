import React from "react";

import Dialog from "components/Dialog";
import Button from "components/Button";

const defaultProps = {
  delay: 1000,
};

const TimedModal = ({ children, delay, ...props }) => {
  const [isOpen, setState] = React.useState(0);
  const closeDialog = () => setState(false);
  const timeout = React.useRef();
  const isCancelled = React.useRef();
  const buttonRef = React.useRef();

  React.useEffect(() => {
    if (isCancelled.current) {
      cancel();
      return;
    }

    function cancel() {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    }

    timeout.current = setTimeout(() => {
      setState(true);
      isCancelled.current = true;
    }, delay);

    return () => {
      cancel();
    };
  }, [setState, delay]);

  return (
    <Dialog isOpen={isOpen} onDismiss={closeDialog} {...props}>
      {children}
      <Dialog.Footer>
        <Button ref={buttonRef} onClick={closeDialog}>
          Okay
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

TimedModal.defaultProps = defaultProps;

export default TimedModal;
