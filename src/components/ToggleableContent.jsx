import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function ToggleableContent({
  children,
  isOpen,
  toggle,
  withOverlay = true,
}) {
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    if (isOpen) {
      toggle();
    }
  });

  return (
    <>
      {isOpen && (
        // overlay will always be there but with 0 opacity
        <div
          tabIndex={-1}
          onTouchStart={() => toggle()}
          className={`fixed inset-0 z-20 bg-black/5 md:hidden opacity-${withOverlay ? 40 : 0}`}
        />
      )}
      <div ref={ref}>{children}</div>
    </>
  );
}
