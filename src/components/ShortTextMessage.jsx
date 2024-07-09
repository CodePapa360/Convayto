function ShortTextMessage({ children, opacity = 60 }) {
  return (
    <span
      className={`slideUpMessage my-4 flex select-none items-center justify-center opacity-${opacity}`}
    >
      {children}
    </span>
  );
}

export default ShortTextMessage;
