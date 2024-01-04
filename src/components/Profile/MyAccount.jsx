import { RiArrowLeftLine } from "react-icons/ri";
import Name from "./Name";
import Username from "./Username";
import Bio from "./Bio";

function MyAccount({ onSetMyAccountView }) {
  // set history so that when user clicks on back button, the view is changed
  // to the previous view
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = () => {
    onSetMyAccountView(false);
  };

  function handleGoBack() {
    onSetMyAccountView(false);
  }

  return (
    <div className="overflow-hidden">
      <div className="flex h-16 items-center justify-start gap-4 bg-slate-700 p-2">
        <button
          className="rounded-full p-3 text-xl hover:bg-slate-600"
          onClick={handleGoBack}
        >
          <RiArrowLeftLine />
        </button>
        <p className="select-none font-bold tracking-wider">Profile</p>
      </div>

      <div className="overflow-scroll p-4">
        <div className="mt-4 flex items-center justify-center overflow-hidden">
          <img
            className=" h-full max-h-40 w-full max-w-40 rounded-full border-2 border-violet-500"
            src="/images/default-avatar.svg"
            alt="avatar"
          />
        </div>

        <Name />

        <Username />

        <Bio />

        <div className="mt-4">
          <p className="select-none text-sm font-bold tracking-wider text-violet-400 opacity-80">
            Email
          </p>
          <p className="mt-3">test email</p>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
