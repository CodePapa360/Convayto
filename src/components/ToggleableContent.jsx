import { useRef } from "react";
import useOutsideClick from "./useOutsideClick";

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
      {withOverlay && isOpen && (
        <div className="fixed inset-0 z-20 bg-black opacity-40" />
      )}
      <div ref={ref}>{children}</div>
    </>
  );
}
