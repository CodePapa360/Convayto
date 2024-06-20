function SubmitBtn({ children, type = "submit", disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="mb-4 flex items-center justify-center rounded-md bg-lightViolet p-3 font-bold uppercase leading-6 tracking-wider text-lightSlate transition-all duration-200 hover:bg-darkViolet active:scale-95 disabled:pointer-events-none disabled:bg-darkViolet dark:bg-lightViolet-dark"
    >
      {children}
    </button>
  );
}

export default SubmitBtn;
