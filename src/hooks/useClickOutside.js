import { useEffect } from "react";

const OnClickOutside = (refs, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (Array.isArray(refs)) {
        // Check if any of the refs contain the target element
        const clickedOutside = refs.every(
          (ref) => ref.current && !ref.current.contains(event.target)
        );
        if (clickedOutside) {
          handler();
        }
      } else {
        // Single ref case
        if (refs.current && !refs.current.contains(event.target)) {
          handler();
        }
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [refs, handler]);
};

export default OnClickOutside;