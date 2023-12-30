import { useState } from "react";
import { useSignup } from "../features/authentication/useSignup";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Full name</label>
        <input
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          type="text"
          id="fullname"
          placeholder="Full name"
        />

        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          id="username"
          placeholder="@username"
        />

        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />

        <button type="submit" disabled={isPending}>
          Sign up
        </button>
      </form>

      <Link to="/signin">Sign in</Link>
    </div>
  );
}

export default Signup;
