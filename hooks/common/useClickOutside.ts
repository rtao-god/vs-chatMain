import { RefObject, useEffect } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  excludeRef?: RefObject<HTMLElement>
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if the clicked element is not within the ref element and also not the excludeRef element
      if (
        !ref.current || ref.current.contains(event.target as Node) ||
        (excludeRef?.current && excludeRef.current.contains(event.target as Node))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, excludeRef]);
}

export default useClickOutside