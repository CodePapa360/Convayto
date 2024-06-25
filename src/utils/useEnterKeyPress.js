import { useCallback } from "react";

export function useEnterKeyPress(onClick) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") onClick(event);
    },
    [onClick],
  );

  return handleKeyDown;
}
