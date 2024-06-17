import { RiArrowLeftLine, RiCloseFill, RiMenuLine } from "react-icons/ri";

function IconButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative z-50 flex flex-shrink-0 items-center justify-center rounded-full text-lg hover:bg-black/10 dark:hover:bg-lightSlate/10"
    >
      {children}
    </button>
  );
}

function BackIcon() {
  return (
    <IconButton>
      <RiArrowLeftLine className="h-11 w-11 p-3" aria-label="Back" />
    </IconButton>
  );
}

function MenuIcon() {
  return (
    <IconButton>
      <RiMenuLine className="h-11 w-11 p-3" aria-label="Menu" />
    </IconButton>
  );
}

function CloseIcon() {
  return (
    <IconButton>
      <RiCloseFill className="h-11 w-11 p-3" aria-label="Close" />
    </IconButton>
  );
}

IconButton.Back = BackIcon;
IconButton.Menu = MenuIcon;
IconButton.Close = CloseIcon;

export default IconButton;
