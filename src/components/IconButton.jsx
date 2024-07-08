import { RiArrowLeftLine, RiCloseFill, RiMenuLine } from "react-icons/ri";

function IconButton({ children, onClick, addClass = "" }) {
  return (
    <button
      onClick={onClick}
      className={`${addClass} relative z-50 flex flex-shrink-0 items-center justify-center rounded-full text-lg hover:bg-LightShade/20`}
    >
      {children}
    </button>
  );
}

function BackIcon() {
  return <RiArrowLeftLine className="h-11 w-11 p-3" aria-label="Back" />;
}

function MenuIcon() {
  return <RiMenuLine className="h-11 w-11 p-3" aria-label="Menu" />;
}

function CloseIcon() {
  return <RiCloseFill className="h-11 w-11 p-3" aria-label="Close" />;
}

IconButton.Back = BackIcon;
IconButton.Menu = MenuIcon;
IconButton.Close = CloseIcon;

export default IconButton;
