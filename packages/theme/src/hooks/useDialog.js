import React from "react";

export default function useDialog(defaultState = false) {
  const [isOpen, setStatus] = React.useState(defaultState);
  const ref = React.useRef();

  const openDialog = React.useCallback(() => {
    setStatus(true);
  }, [setStatus]);

  const closeDialog = React.useCallback(() => {
    setStatus(false);
  }, [setStatus]);

  const getTriggerProps = () => ({
    onClick: openDialog,
    ref,
  });

  return {
    isOpen,
    getTriggerProps,
    openDialog,
    closeDialog,
  };
}
