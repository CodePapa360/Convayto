// Compund component for the menu

import { Link } from "react-router-dom";

function Menu({ children }) {
  return (
    <div className="fadeIn absolute left-4 top-12 z-50 w-60 divide-y divide-gray-100 rounded-lg bg-white  p-2 shadow-[0_10px_60px_rgba(0,0,0,0.3)] dark:divide-gray-600  dark:bg-gray-700">
      {children}
    </div>
  );
}

function Header({ children }) {
  return (
    <div className="px-4 py-3 text-gray-900 dark:text-white">{children}</div>
  );
}

function Name({ children }) {
  return <div className="truncate">{children}</div>;
}

function Email({ children }) {
  return <div className="truncate text-sm opacity-70">{children}</div>;
}

function List({ children }) {
  return (
    <ul
      className="py-2 text-base text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownInformationButton"
    >
      {children}
    </ul>
  );
}

function Item({ children, onClick, route, href }) {
  const classes =
    "flex w-full items-center gap-2 rounded-md px-4 py-2 text-base text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white";

  if (route) {
    return (
      <li className={classes}>
        <Link to={route}>{children}</Link>
      </li>
    );
  }

  if (href) {
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

  return (
    <li>
      <button className={classes} onClick={() => onClick()}>
        {children}
      </button>
    </li>
  );
}

function ToggleItem({ children, toggler, isChecked }) {
  return (
    <li>
      <label className="relative flex cursor-pointer items-center justify-between rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <span className="flex items-center gap-2 text-base">{children}</span>

        <div className="relative flex justify-between">
          <input
            checked={isChecked}
            type="checkbox"
            onChange={() => toggler()}
            className="peer sr-only"
          />
          <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-500 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:translate-x-[-100%]"></div>
        </div>
      </label>
    </li>
  );
}

function Footer() {
  // footer will have the app name and version number
  return (
    <div className="px-4 py-3 text-gray-900 dark:text-white">
      <div className="truncate text-center text-xs opacity-70">
        ConverseMe v1.0.0
      </div>
    </div>
  );
}

Menu.Header = Header;
Header.Name = Name;
Header.Email = Email;
Menu.List = List;
Menu.Item = Item;
Menu.ToggleItem = ToggleItem;
Menu.Footer = Footer;

export default Menu;
