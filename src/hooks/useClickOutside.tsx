import { useEffect, RefObject } from "react";

type EventType = MouseEvent | TouchEvent;

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: EventType) => void
) => {
  useEffect(() => {
    const listener = (event: EventType) => {
      const target = event.target as Node;

      // if click outside
      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      handler(event);
    };
    
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
