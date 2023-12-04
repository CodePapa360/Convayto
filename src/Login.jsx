import { useState } from "react";
import { login } from "./services/apiAuth";

function Login({ onSetStatus }) {
  const [email, setEmail] = useState("rukkijulta@gufum.com");
  const [password, setPassword] = useState("123456789");

  function handleSignup(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(email, password);

    onSetStatus(true);
  }

  return (
    <form action="">
      <h2>Login</h2>
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
        Login
      </button>
    </form>
  );
}

export default Login;
