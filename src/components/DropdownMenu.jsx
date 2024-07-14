import {
  RiInformationLine,
  RiMoonClearLine,
  RiBugLine,
  RiSettings2Line,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { useSignout } from "../features/authentication/useSignout";
import { useUi } from "../contexts/UiContext";
import { useUser } from "../features/authentication/useUser";
import Loader from "./Loader";
import ToggleableContent from "./ToggleableContent";
import Menu from "./Menu";
import { APP_NAME } from "../config";

export default function DropdownMenu() {
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullname },
  } = user;
  const {
    openAccountView,
    isDarkMode,
    toggleDarkMode,
    isMenuOpen,
    toggleMenu,
  } = useUi();
  const { signout, isPending } = useSignout();

  return (
    <ToggleableContent
      isOpen={isMenuOpen}
      toggle={toggleMenu}
      withOverlay={false}
    >
      <Menu>
        <Menu.Header>
          <Menu.Header.Name>{fullname}</Menu.Header.Name>
          <Menu.Header.Email>{email}</Menu.Header.Email>
        </Menu.Header>

        <Menu.List>
          <Menu.ButtonItem onClick={openAccountView}>
            <RiSettings2Line />
            <div>My Account</div>
          </Menu.ButtonItem>

          <Menu.TogglerItem isChecked={isDarkMode} toggler={toggleDarkMode}>
            <RiMoonClearLine />
            <div>Dark Mode</div>
          </Menu.TogglerItem>

          <Menu.LinkItem
            href={`https://github.com/CodePapa360/${APP_NAME}/issues`}
          >
            <RiBugLine />
            <div>Report Bug</div>
          </Menu.LinkItem>

          <Menu.RouteItem to={"/about"}>
            <RiInformationLine />
            <div>About</div>
          </Menu.RouteItem>

          <Menu.ButtonItem onClick={signout}>
            {isPending ? <Loader /> : <RiLogoutCircleLine />}
            <div>Sign out</div>
          </Menu.ButtonItem>
        </Menu.List>
        <Menu.Footer />
      </Menu>
    </ToggleableContent>
  );
}
