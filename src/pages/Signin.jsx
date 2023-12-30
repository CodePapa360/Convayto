import { useState } from "react";
import { useSignin } from "../features/authentication/useSignin";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("tanzil@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { signin, isLoading } = useSignin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    signin(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-900 transition-all duration-200 ease-in-out">
      <div className="w-80 rounded-xl bg-slate-800 p-6">
        <h1 className="mb-8 text-center text-3xl  uppercase">Sign in</h1>
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
          <div className="input-container mb-4 w-full">
            <div className="input-wrapper relative h-12">
              <input
                className="form-input absolute left-0 top-0 z-10 h-full w-full rounded-md border-2 border-slate-400 bg-transparent px-4 text-sm outline-none focus:border-violet-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder=" "
                autoComplete="off"
              />
              <label
                className="form-label pointer-events-none absolute left-4 top-[calc(3rem_/_2_-_0.9rem_/_1.5)] z-20 text-sm opacity-80 transition-all duration-200 ease-in-out"
                htmlFor="email"
              >
                Email address
              </label>
            </div>
            {/* <p className="output-message"></p> */}
          </div>

          <div className="input-container mb-4 w-full">
            <div className="input-wrapper relative h-12">
              <input
                className="form-input absolute left-0 top-0 z-10 h-full w-full rounded-md border-2 border-slate-400 bg-transparent px-4 text-sm outline-none focus:border-violet-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                placeholder=" "
                autoComplete="off"
              />
              <label
                className="form-label pointer-events-none absolute left-4 top-[calc(3rem_/_2_-_0.9rem_/_1.5)] z-20 text-sm opacity-80 transition-all duration-200 ease-in-out"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            {/* <p className="output-message"></p> */}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-violet-800 p-3 font-bold uppercase tracking-wider transition-all duration-200 hover:bg-violet-900 active:scale-95"
          >
            Sign in
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
