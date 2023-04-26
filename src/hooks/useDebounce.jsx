import { useCallback } from "react";
import debounce from "lodash.debounce";

export const useDebounce = (callback, delay) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(callback, delay), []);

  return debouncedCallback;
};
