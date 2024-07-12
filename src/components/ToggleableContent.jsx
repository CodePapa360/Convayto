export default function ToggleableContent({
  children,
  isOpen,
  toggle,
  withOverlay = true,
}) {
  return (
    <>
      {isOpen && (
        // overlay will always be there but with 0 opacity
        <div
          tabIndex={-1}
          onClick={() => toggle()}
          className={`${withOverlay ? "opacity-100" : "opacity-0"} fixed inset-0 z-20 bg-black/10`}
        />
      )}
      {children}
    </>
  );
}
