import { useState } from "react";
import Loader from "../../components/Loader";

function ForgotPasswordPage() {
  // Temporary state to hold the email address
  const [email, setEmail] = useState("");
  const isUpdating = false;

  function handleSubmit() {}

  return (
    <div className="bg- flex min-h-screen items-center justify-center bg-deepSlate text-black dark:bg-deepSlate-dark dark:text-white">
      <div className="w-full max-w-80 rounded-xl bg-mediumSlate p-6 dark:bg-mediumSlate-dark">
        <h1 className="mb-8 text-center text-xl">Reset your password</h1>

        <p className="mb-4 text-center text-sm">
          {" "}
          Enter your email address to reset your password
        </p>

        <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
          <div className="input-container mb-4 w-full">
            <div className="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                type="email"
                id="email"
                className="peer block w-full appearance-none rounded-lg border-2 border-deepSlate bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:border-textViolet-dark focus:outline-none focus:ring-0 dark:focus:border-textViolet-dark"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-mediumSlate px-2 text-sm text-lightSlate-dark transition-all duration-100 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-textViolet-dark dark:bg-mediumSlate-dark dark:text-gray-400 peer-focus:dark:text-textViolet-dark rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Email address
              </label>
            </div>

            {/* <p className="output-message"></p> */}
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="flex items-center justify-center rounded-md bg-lightViolet p-3 font-bold uppercase leading-6 tracking-wider text-lightSlate transition-all duration-200 hover:bg-darkViolet active:scale-95 disabled:pointer-events-none disabled:bg-darkViolet dark:bg-lightViolet-dark"
          >
            {isUpdating && <Loader size="small" />}
            <span className="ml-2"> Continue </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
