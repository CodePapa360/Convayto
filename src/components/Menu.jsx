// Compund component for the menu

import { createContext, useContext } from "react";
import { useUi } from "../contexts/UiContext";

const MenuContext = createContext();

function Menu({ children }) {
  const { isDarkMode, toggleDarkMode, openAccountView } = useUi();

  return (
    <MenuContext.Provider
      value={{ isDarkMode, toggleDarkMode, openAccountView }}
    >
      <div className="fadeIn absolute left-4 top-12 z-50 w-60 divide-y divide-gray-100 rounded-lg bg-white  p-2 shadow-[0_10px_60px_rgba(0,0,0,0.3)] dark:divide-gray-600  dark:bg-gray-700">
        {children}
      </div>
    </MenuContext.Provider>
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

function Item({ children }) {
  return (
    <li>
      <button className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-base text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
        {children}
      </button>
    </li>
  );
}

function ToggleItem({ children }) {}

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
Menu.Header.Name = Name;
Menu.Header.Email = Email;
Menu.List = List;
Menu.Item = Item;
Menu.ToggleItem = ToggleItem;
Menu.Footer = Footer;

export default Menu;
