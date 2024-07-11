function InputBox({
  value,
  onChange,
  onBlur,
  placeholder,
  type,
  error,
  htmlFor,
  disabled,
}) {
  return (
    <div className="input-container mb-6 w-full">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete="off"
          type={type}
          id={htmlFor}
          disabled={disabled}
          className={`${error ? "border-RedColor" : ""} peer block w-full appearance-none rounded-lg border-2 border-LightShade/50 bg-transparent px-4 pb-2.5 pt-4 focus:border-textAccentDim focus:outline-none focus:ring-0 dark:border-LightShade dark:focus:border-textAccentDim-dark`}
          placeholder=" "
        />
        <label
          htmlFor={htmlFor}
          className={`${error ? "text-RedColor" : ""} pointer-events-none absolute start-1 top-2 z-10 mx-2 origin-[0] -translate-y-5 scale-75 transform bg-bgPrimary px-2 text-LightGray transition-all duration-100 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:mx-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-textAccentDim dark:bg-bgTertiary  dark:text-LightGray-dark peer-focus:dark:text-textAccentDim-dark rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
        >
          {placeholder}
        </label>
      </div>

      {error && <p className="ml-2 mt-1 text-sm text-RedColor">{error}</p>}
    </div>
  );
}

export default InputBox;
