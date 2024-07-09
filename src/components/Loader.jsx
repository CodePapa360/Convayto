import { RiLoader4Fill } from "react-icons/ri";

function Loader({ size = "small", text = "", customClasses = "" }) {
  const sizes = {
    small: "text-[1rem]",
    medium: "text-[1.5rem]",
    large: "text-[2rem]",
  };

  return (
    <span className={`flex items-center justify-center ${customClasses}`}>
      <RiLoader4Fill className={`${sizes[size]} animate-spin`} />
      {text && <span className="ml-2">{text}...</span>}
    </span>
  );
}

export default Loader;
