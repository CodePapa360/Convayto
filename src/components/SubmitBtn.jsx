function SubmitBtn({ children, type = "submit", disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="mb-4 flex w-full items-center justify-center rounded-md bg-bgAccent p-3 font-bold leading-6 tracking-wider text-textPrimary-dark transition-all duration-200 hover:bg-bgAccent-dark active:scale-95 disabled:pointer-events-none disabled:bg-bgAccent/50"
    >
      {children}
    </button>
  );
}

export default SubmitBtn;
