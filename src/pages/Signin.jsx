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
    <div>
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={isLoading}>
          Sign in
        </button>
      </form>

      <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default Signin;
