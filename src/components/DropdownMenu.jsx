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

export default function DropdownMenu({ isMenuOpen, toggleMenu }) {
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullname },
  } = user;
  const { openAccountView, isDarkMode, toggleDarkMode } = useUi();
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
          <Menu.Item onClick={openAccountView}>
            <RiSettings2Line />
            <div>My Account</div>
          </Menu.Item>

          <Menu.ToggleItem isChecked={isDarkMode} toggler={toggleDarkMode}>
            <RiMoonClearLine />
            <div>Dark Mode</div>
          </Menu.ToggleItem>

          <Menu.Item href={"https://github.com/CodePapa360/ConverseMe/issues"}>
            <RiBugLine />
            <div>Report Bug</div>
          </Menu.Item>

          <Menu.Item>
            <RiInformationLine />
            <div>About</div>
          </Menu.Item>

          <Menu.Item onClick={signout}>
            {isPending ? <Loader /> : <RiLogoutCircleLine />}
            <div>Sign out</div>
          </Menu.Item>
        </Menu.List>
        <Menu.Footer />
      </Menu>
    </ToggleableContent>
  );
}
