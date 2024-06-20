function InputBox({
  value,
  onChange,
  onBlur,
  placeholder,
  type,
  error,
  htmlFor,
}) {
  return (
    <div className="input-container mb-4 w-full">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete="off"
          type={type}
          id={htmlFor}
          className="peer block w-full appearance-none rounded-lg border-2 border-deepSlate bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:border-textViolet-dark focus:outline-none focus:ring-0 dark:focus:border-textViolet-dark"
          placeholder=" "
        />
        <label
          htmlFor={htmlFor}
          className="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-mediumSlate px-2 text-sm text-lightSlate-dark transition-all duration-100 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-textViolet-dark dark:bg-mediumSlate-dark dark:text-gray-400 peer-focus:dark:text-textViolet-dark rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {placeholder}
        </label>
      </div>

      {error && <p className="ml-2 mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default InputBox;
