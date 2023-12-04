import { useState } from "react";
import { signup } from "./services/apiAuth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (!email || !password) return;

    signup(email, password);
  }

  return (
    <form action="">
      <h2>Sign up</h2>
      <label htmlFor="email">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="email"
      />

      <label htmlFor="password">Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        id="password"
      />

      <button onClick={handleSignup} type="submit">
        Signup
      </button>
    </form>
  );
}

export default Signup;
