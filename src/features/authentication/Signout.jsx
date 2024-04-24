import Loader from "../../components/Loader";
import { useSignout } from "./useSignout";
import { RiLogoutCircleLine } from "react-icons/ri";

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
      {isPending ? <Loader /> : <RiLogoutCircleLine />}
      <span className="hidden xm:block">Sign out</span>
    </button>
  );
}

export default Signout;
