// Compund component for the menu

import { Link } from "react-router-dom";
import { APP_NAME, APP_VERSION } from "../config";

function Menu({ children }) {
  return (
    <div className="fadeIn absolute left-4 top-12 z-50 w-60 divide-y divide-LightShade/20 rounded-lg bg-bgPrimary p-2 shadow-[0_10px_60px_rgba(0,0,0,0.3)] dark:divide-LightShade/50  dark:bg-bgTertiary">
      {children}
    </div>
  );
}

function Header({ children }) {
  return <div className="px-4 py-3 text-lg">{children}</div>;
}

function Name({ children }) {
  return <div className="truncate">{children}</div>;
}

function Email({ children }) {
  return <div className="truncate text-sm opacity-70">{children}</div>;
}

function List({ children }) {
  return (
    <ul className="py-2" aria-labelledby="dropdownInformationButton">
      {children}
    </ul>
  );
}

////////////
// Menu Items
////////////

const classes =
  "focus:outline-none cursor-pointer flex w-full items-center gap-2 rounded-md px-4 py-2 text-base hover:bg-LightShade/10 dark:hover:text-textPrimary-dark focus:ring-2 focus:ring-bgAccent";

function LinkItem({ children, href }) {
  return (
    <li>
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </li>
  );
}

function RouteItem({ children, to }) {
  return (
    <li>
      <Link to={to} className={classes}>
        {children}
      </Link>
    </li>
  );
}

function ButtonItem({ children, onClick }) {
  return (
    <li>
      <button className={classes} onClick={() => onClick()}>
        {children}
      </button>
    </li>
  );
}

function TogglerItem({ children, toggler, isChecked }) {
  return (
    <li>
      <label
        onChange={() => toggler()}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            toggler();
          }
        }}
        className={classes + " justify-between"}
        tabIndex={0}
      >
        <span className="flex items-center gap-2">{children}</span>

        <div className="relative flex">
          <input
            checked={isChecked}
            type="checkbox"
            onChange={() => toggler()}
            tabIndex={-1}
            className="peer sr-only"
          />
          <div className="peer h-5 w-9 rounded-full bg-LightShade/20 shadow-sm after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-bgPrimary after:shadow-md after:transition-all after:content-[''] peer-checked:bg-bgAccent peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%]" />
        </div>
      </label>
    </li>
  );
}

function Footer() {
  // footer will have the app name and version number
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-center gap-2 truncate text-center text-xs">
        <img
          className="h-6 rounded-full border-2 border-LightShade/20"
          src="/images/convayto-logo-short-circle.svg"
          alt="Logo"
        />
        <span className=" opacity-60">
          {APP_NAME} {APP_VERSION}
        </span>
      </div>
    </div>
  );
}

Menu.Header = Header;
Header.Name = Name;
Header.Email = Email;
Menu.List = List;
Menu.LinkItem = LinkItem;
Menu.RouteItem = RouteItem;
Menu.ButtonItem = ButtonItem;
Menu.TogglerItem = TogglerItem;
Menu.Footer = Footer;

export default Menu;
