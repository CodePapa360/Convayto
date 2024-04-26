import { useEffect, useState } from "react";
import { useSignin } from "./useSignin";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { RiLoginCircleLine } from "react-icons/ri";
import { useUser } from "./useUser";

function Signin() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const [email, setEmail] = useState("tanzil@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { signin, isPending } = useSignin();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    signin(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
          navigate("/", {
            replace: true,
          });
        },
      },
    );
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-deepSlate text-black transition-all duration-200 ease-in-out dark:bg-deepSlate-dark dark:text-white">
      <div className="w-full max-w-80 rounded-xl bg-mediumSlate p-6 dark:bg-mediumSlate-dark">
        <h1 className="mb-8 text-center text-3xl  uppercase">Sign in</h1>
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

          <div className="input-container mb-4 w-full">
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                type="password"
                id="password"
                className="peer block w-full appearance-none rounded-lg border-2 border-deepSlate bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:border-textViolet-dark focus:outline-none focus:ring-0 dark:focus:border-textViolet-dark"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-mediumSlate px-2 text-sm text-lightSlate-dark transition-all duration-100 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-textViolet-dark dark:bg-mediumSlate-dark dark:text-gray-400 peer-focus:dark:text-textViolet-dark rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Password
              </label>
            </div>

            {/* <p className="output-message"></p> */}
          </div>

          <Link
            className="mb-4 text-violet-400 underline"
            to="/forgot-password"
          >
            Forgot password?
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center rounded-md bg-lightViolet p-3 font-bold uppercase leading-6 tracking-wider text-lightSlate transition-all duration-200 hover:bg-darkViolet active:scale-95 disabled:pointer-events-none disabled:bg-darkViolet dark:bg-lightViolet-dark"
          >
            {isPending ? <Loader size="small" /> : <RiLoginCircleLine />}
            <span className="ml-2">Sign in</span>
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link className="text-violet-400 underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
