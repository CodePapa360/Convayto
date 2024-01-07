import { useState } from "react";
import { useSignup } from "../features/authentication/useSignup";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456789");

  const { signup, isPending } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();

    signup(
      { fullname, username, email, password },
      {
        onSettled: () => {
          setFullname("");
          setUsername("");
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <div className="bg-deepSlate dark:bg-deepSlate-dark flex min-h-dvh items-center justify-center text-black transition-all duration-200 ease-in-out dark:text-white">
      <div className="bg-mediumSlate dark:bg-mediumSlate-dark w-full max-w-80 rounded-xl p-6">
        <h1 className="mb-8 text-center text-3xl  uppercase">Sign up</h1>

        <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
          <div className="input-container mb-4 w-full">
            <div className="input-wrapper relative h-12">
              <input
                className="form-input absolute left-0 top-0 z-10 h-full w-full rounded-md border-2 border-white/20 bg-transparent px-4 outline-none focus:border-violet-500"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                id="fullname"
                name="fullname"
                type="fullname"
                placeholder=" "
                autoComplete="off"
              />
              <label
                className="form-label pointer-events-none absolute left-4 top-[calc(3rem_/_2_-_0.9rem_/_1.5)] z-20 opacity-80 transition-all duration-200 ease-in-out"
                htmlFor="fullname"
              >
                Fullname
              </label>
            </div>
            {/* <p className="output-message"></p> */}
          </div>

          {/* Username */}

          <div className="input-container mb-4 w-full">
            <div className="input-wrapper relative h-12">
              <input
                className="form-input absolute left-0 top-0 z-10 h-full w-full rounded-md border-2 border-white/20 bg-transparent px-4 outline-none focus:border-violet-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="username"
                placeholder=" "
                autoComplete="off"
              />
              <label
                className="form-label pointer-events-none absolute left-4 top-[calc(3rem_/_2_-_0.9rem_/_1.5)] z-20 opacity-80 transition-all duration-200 ease-in-out"
                htmlFor="username"
              >
                Username
              </label>
            </div>
            {/* <p className="output-message"></p> */}
          </div>

          {/* Email */}

          <div className="input-container mb-4 w-full">
            <div className="input-wrapper relative h-12">
              <input
                className="form-input absolute left-0 top-0 z-10 h-full w-full rounded-md border-2 border-white/20 bg-transparent px-4 outline-none focus:border-violet-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder=" "
                autoComplete="off"
              />
              <label
                className="form-label pointer-events-none absolute left-4 top-[calc(3rem_/_2_-_0.9rem_/_1.5)] z-20 opacity-80 transition-all duration-200 ease-in-out"
                htmlFor="email"
              >
                Email
              </label>
            </div>
            {/* <p className="output-message"></p> */}
          </div>

          {/* Password */}

          <div className="input-container mb-4 w-full">
            <div className="input-wrapper relative h-12">
              <input
                className="form-input absolute left-0 top-0 z-10 h-full w-full rounded-md border-2 border-white/20 bg-transparent px-4 outline-none focus:border-violet-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                placeholder=" "
                autoComplete="off"
              />
              <label
                className="form-label pointer-events-none absolute left-4 top-[calc(3rem_/_2_-_0.9rem_/_1.5)] z-20 opacity-80 transition-all duration-200 ease-in-out"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            {/* <p className="output-message"></p> */}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center rounded-md bg-violet-800 p-3 font-bold uppercase leading-6 tracking-wider transition-all duration-200 hover:bg-violet-900 active:scale-95 disabled:pointer-events-none disabled:bg-violet-900"
          >
            {isPending && <Loader size="small" />}
            <span className="ml-2">Sign up</span>
          </button>
        </form>

        <p>
          Already a user?{" "}
          <Link className="text-violet-400 underline" to="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
