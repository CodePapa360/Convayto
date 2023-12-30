import { useLogout } from "./useLogout";
import { RiLogoutCircleLine } from "react-icons/ri";

function Logout() {
  const { logout, isLoading } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full text-lg hover:bg-slate-500/30"
      disabled={isLoading}
      onClick={handleLogout}
    >
      <RiLogoutCircleLine />
    </button>
  );
}

export default Logout;
