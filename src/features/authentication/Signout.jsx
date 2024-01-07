import Loader from "../../components/Loader";
import { useSignout } from "./useSignout";
import { RiLogoutCircleLine } from "react-icons/ri";

function Logout() {
  const { logout, isPending } = useSignout();

  function handleLogout() {
    logout();
  }

  return (
    <button
      className="hover:bg-lightSlate/50 flex flex-shrink-0 items-center justify-center gap-2 rounded-full p-3"
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? <Loader /> : <RiLogoutCircleLine />}
      <span className="hidden xm:block">Sign out</span>
    </button>
  );
}

export default Logout;
