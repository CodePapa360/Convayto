import { useSignout } from "../authentication/useSignout";
import { RiLogoutCircleLine } from "react-icons/ri";
import Loader from "../../components/Loader";

function Signout() {
  const { signout, isPending } = useSignout();

  function handleSignout() {
    signout();
  }

  return (
    <button
      className="flex flex-shrink-0 items-center justify-center gap-2 rounded-full p-3 hover:bg-black/10 dark:hover:bg-lightSlate/10"
      disabled={isPending}
      onClick={handleSignout}
    >
      {isPending ? <Loader /> : <RiLogoutCircleLine aria-label="logout" />}
      <span className="hidden xm:block">Sign out</span>
    </button>
  );
}

export default Signout;
