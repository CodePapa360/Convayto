import {
  RiInformationLine,
  RiMoonClearLine,
  RiBugLine,
  RiSettings2Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { useSignout } from "../features/authentication/useSignout";
import { useUi } from "../contexts/UiContext";

function Dropdown3() {
  const { openAccountView } = useUi();
  const { logout } = useSignout();

  return (
    <div
      id="dropdownInformation"
      className="fadeIn absolute left-4 top-12 z-50 w-60 divide-y divide-gray-100 rounded-lg bg-white p-2 shadow-[0_10px_60px_rgba(0,0,0,0.3)] dark:divide-gray-600 dark:bg-gray-700"
    >
      <div className="px-4 py-3 text-base text-gray-900 dark:text-white">
        <div>Bonnie Green</div>
        <div className="truncate font-medium">name@flowbite.com</div>
      </div>
      <ul
        className="py-2 text-base text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownInformationButton"
      >
        <li>
          <button
            onClick={() => openAccountView()}
            className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-base text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <RiSettings2Line />
            <div>My Account</div>
          </button>
        </li>

        <li>
          <label className="relative flex cursor-pointer items-center justify-between rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <span className="flex items-center gap-2 text-base">
              <RiMoonClearLine />
              <span>Dark Mode</span>
            </span>

            <div className="relative flex justify-between">
              <input type="checkbox" value="" className="peer sr-only" />
              <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:translate-x-[-100%] dark:border-gray-500 dark:bg-gray-500 dark:peer-focus:ring-blue-800"></div>
            </div>
          </label>
        </li>

        <li>
          <a
            className=" flex items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            href="https://github.com/CodePapa360/ConverseMe/issues"
            target="_blank"
            rel="noreferrer"
          >
            <RiBugLine />
            <span>Report Bug</span>
          </a>
        </li>

        <li>
          <a
            href="#"
            className=" flex items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <RiInformationLine />
            <span>About</span>
          </a>
        </li>
      </ul>
      <div className="pt-2">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-base text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <RiLogoutCircleLine />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}

export default Dropdown3;
