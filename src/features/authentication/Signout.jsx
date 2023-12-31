import { useLogout } from "./useLogout";
import { RiLogoutCircleLine } from "react-icons/ri";

function Logout() {
  const { logout, isLoading } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <button
      className="flex flex-shrink-0 items-center justify-center gap-2 rounded-full  p-3 hover:bg-slate-500/30"
      disabled={isLoading}
      onClick={handleLogout}
    >
      <RiLogoutCircleLine /> <span>Sign out</span>
    </button>
  );
}

export default Logout;
