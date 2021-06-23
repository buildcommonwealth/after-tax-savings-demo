import React from "react";

let ro;

const callbacks = new WeakMap([]);

const getResizeObserver = async () => {
  if (typeof window === "undefined") {
    return;
  }

  if (ro) {
    return ro;
  }

  let Observer;

  if (typeof ResizeObserver !== "function") {
    Observer = (await import("@juggle/resize-observer")).ResizeObserver;
  } else {
    Observer = ResizeObserver;
  }

  ro = new Observer(entries => {
    for (const entry of entries) {
      if (callbacks.has(entry.target)) {
        callbacks.get(entry.target)(entry);
      }
    }
  });
};

export default function useResizeObserver(callback, options = {}) {
  const [ref, setRef] = React.useState();
  const { ref: passedRef } = options;

  React.useEffect(() => {
    let observer;
    let el = ref || passedRef;
    if (el && el.current) {
      el = el.current;
    }

    if (el instanceof HTMLElement) {
      addObserver();
    }

    async function addObserver() {
      observer = await getResizeObserver();

      if (observer) {
        observer.observe(ref);
        callbacks.set(ref, callback);
      }
    }

    return () => {
      if (observer) {
        observer.unobserve(ref);
        callbacks.delete(ref);
      }
    };
  }, [ref, passedRef, callback]);

  return setRef;
}
