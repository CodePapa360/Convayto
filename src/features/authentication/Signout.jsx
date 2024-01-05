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
      className="flex flex-shrink-0 items-center justify-center gap-2 rounded-full p-3 hover:bg-slate-500/30"
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? <Loader /> : <RiLogoutCircleLine />}
      <span className="xm:block hidden">Sign out</span>
    </button>
  );
}

export default Logout;
